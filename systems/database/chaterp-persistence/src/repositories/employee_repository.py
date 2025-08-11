# systems/database/chaterp-persistence/src/repositories/employee_repository.py

"""Référentiel des employés : couche d'accès à la base de données."""

import os
import uuid
import shutil
import aiosqlite
from fastapi import UploadFile
from typing import Optional, List
from src.schemas.employee_schemas import EmployeeData, EmployeeWithId


class EmployeeRepository:
    """Référentiel responsable de toutes les opérations de persistance liées aux employés."""

    # Chemin absolu de la base SQLite
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    BASE_DIR = os.path.dirname(BASE_DIR)
    DB_PATH = os.path.join(BASE_DIR, "data", "employees.db")

    PHOTO_FOLDER = "photos/"

    print(f"DB_PATH utilisé par le repository = {DB_PATH}")

    def _ensure_relative_photo_url(self, url: Optional[str]) -> str:
        if not url:
            url = ""
        elif url.startswith(self.PHOTO_FOLDER):
            pass  # URL déjà correcte
        elif self.PHOTO_FOLDER in url:
            url = url.split(self.PHOTO_FOLDER, 1)[1].lstrip("/")
            url = f"{self.PHOTO_FOLDER}{url}"
        else:
            # Pas de PHOTO_FOLDER du tout, on force le préfixe
            url = f"{self.PHOTO_FOLDER}{url.lstrip('/')}"
        return url

    # UC01a - Vérifie si un email existe déjà dans la base
    async def email_exists(self, email: str) -> bool:
        """Vérifie si un email existe déjà dans la base."""
        async with aiosqlite.connect(self.DB_PATH) as db:
            async with db.execute("SELECT 1 FROM employees WHERE email = ?", (email,)) as cursor:
                row = await cursor.fetchone()
                return row is not None

    # UC01a - Insère un nouvel employé dans la base et retourne son ID
    async def create_employee(self, employee: EmployeeData) -> int:
        """Insère un nouvel employé dans la base et retourne son ID."""
        employee.photoUrl = self._ensure_relative_photo_url(employee.photoUrl)

        async with aiosqlite.connect(self.DB_PATH) as db:
            cursor = await db.execute(
                """
                INSERT INTO employees
                (name, role, email, phone, address, department, manager, status, hireDate, photoUrl)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    employee.name,
                    employee.role,
                    employee.email,
                    employee.phone,
                    employee.address,
                    employee.department,
                    employee.manager,
                    employee.status,
                    employee.hireDate,
                    employee.photoUrl,
                ),
            )
            await db.commit()
            last_id = cursor.lastrowid
            if last_id is None:
                raise RuntimeError("Échec lors de la récupération de l'identifiant nouvellement inséré.")
            return last_id

    # UC01b - Sauvegarde la photo de l'employé et retourne son URL relative
    async def upload_employee_photo(self, file: UploadFile) -> str:
        """Sauvegarde physiquement la photo de l'employé et retourne son URL absolue."""
        if not file.filename:
            raise ValueError("Le fichier n’a pas de nom.")

        ext = os.path.splitext(file.filename)[1].lower()
        if ext not in (".png", ".jpg", ".jpeg"):
            raise ValueError("Extension de fichier non supportée.")

        photo_dir = os.path.join(self.BASE_DIR, "data", "photos")
        os.makedirs(photo_dir, exist_ok=True)

        filename = f"employee_{uuid.uuid4().hex}{ext}"
        file_path = os.path.join(photo_dir, filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        storage_url = f"/{self.PHOTO_FOLDER}{filename}"
        return storage_url

    # UC02a - Récupère la liste de tous les employés
    async def get_all_employees(self) -> List[EmployeeWithId]:
        """Récupère la liste de tous les employés."""
        async with aiosqlite.connect(self.DB_PATH) as db:
            cursor = await db.execute(
                """
                SELECT id, name, role, email, phone, address, department, manager, status,
                       hireDate, photoUrl
                FROM employees
                ORDER BY id ASC
                """
            )
            rows = await cursor.fetchall()
            await cursor.close()

            return [
                EmployeeWithId(
                    id=row[0],
                    name=row[1],
                    role=row[2],
                    email=row[3],
                    phone=row[4],
                    address=row[5],
                    department=row[6],
                    manager=row[7],
                    status=row[8],
                    hireDate=row[9],
                    photoUrl=row[10],
                )
                for row in rows
            ]

    # UC02b - Récupère un employé à partir de son identifiant
    async def get_employee_by_id(self, id: int) -> Optional[EmployeeWithId]:
        """Récupère un employé à partir de son identifiant."""
        async with aiosqlite.connect(self.DB_PATH) as db:
            cursor = await db.execute(
                """
                SELECT id, name, role, email, phone, address, department, manager, status,
                       hireDate, photoUrl
                FROM employees
                WHERE id = ?
                """,
                (id,),
            )
            row = await cursor.fetchone()
            await cursor.close()

            if row is None:
                return None

            return EmployeeWithId(
                id=row[0],
                name=row[1],
                role=row[2],
                email=row[3],
                phone=row[4],
                address=row[5],
                department=row[6],
                manager=row[7],
                status=row[8],
                hireDate=row[9],
                photoUrl=row[10],
            )

    # UC03 - Met à jour un employé existant et supprime l'ancienne photo si elle a changé
    async def update_employee(self, id: int, employee: EmployeeData) -> None:
        """Met à jour un employé existant et supprime l'ancienne photo si elle a changé."""

        employee.photoUrl = self._ensure_relative_photo_url(employee.photoUrl)

        # 1. Récupérer l'ancien employé pour comparer les photoUrls
        old_employee = await self.get_employee_by_id(id)

        if old_employee:

            old_relative_url = self._ensure_relative_photo_url(old_employee.photoUrl)

            if old_relative_url and old_relative_url != employee.photoUrl:

                # 2. Supprimer l'ancienne photo locale
                old_filename = os.path.basename(old_employee.photoUrl)
                old_photo_path = os.path.join(self.BASE_DIR, "data", "photos", old_filename)

                if os.path.exists(old_photo_path):
                    try:
                        os.remove(old_photo_path)
                        print(f"🗑️ Ancienne photo supprimée : {old_photo_path}")
                    except Exception as e:
                        print(f"⚠️ Erreur lors de la suppression de l’ancienne photo : {e}")

        # 3. Mise à jour des données dans la base
        async with aiosqlite.connect(self.DB_PATH) as db:
            await db.execute(
                """
                UPDATE employees
                SET name = ?, role = ?, email = ?, phone = ?, address = ?, department = ?,
                    manager = ?, status = ?, hireDate = ?, photoUrl = ?
                WHERE id = ?
                """,
                (
                    employee.name,
                    employee.role,
                    employee.email,
                    employee.phone,
                    employee.address,
                    employee.department,
                    employee.manager,
                    employee.status,
                    employee.hireDate,
                    employee.photoUrl,
                    id,
                ),
            )
            await db.commit()

    # UC04 - Supprime un employé par son identifiant, ainsi que sa photo locale si elle existe
    async def delete_employee(self, id: int) -> None:
        """Supprime un employé par son identifiant, ainsi que sa photo locale si elle existe."""

        # 1. Récupérer l'employé pour obtenir l'URL de la photo
        employee = await self.get_employee_by_id(id)

        # 2. Supprimer la photo locale si elle existe
        if employee and employee.photoUrl:
            filename = os.path.basename(employee.photoUrl)  # extrait "employee_<uuid>.png"
            photo_path = os.path.join(self.BASE_DIR, "data", "photos", filename)

            if os.path.exists(photo_path):
                try:
                    os.remove(photo_path)
                    print(f"🗑️ Photo supprimée : {photo_path}")
                except Exception as e:
                    print(f"⚠️ Erreur lors de la suppression de la photo : {e}")

        # 3. Supprimer l'enregistrement dans la base
        async with aiosqlite.connect(self.DB_PATH) as db:
            await db.execute("DELETE FROM employees WHERE id = ?", (id,))
            await db.commit()
