# systems/database/chaterp-persistence/src/managers/employee_manager.py

"""Manager des employés : couche de logique métier."""

from __future__ import annotations
from fastapi import UploadFile
from src.repositories.employee_repository import EmployeeRepository
from src.schemas.employee_schemas import EmployeeData, EmployeeWithId


class EmployeeManager:
    """Manager orchestrant les opérations et règles métier sur les employés."""

    def __init__(self) -> None:
        self.repository = EmployeeRepository()

    """🚀 Opérations métier"""

    # Créer un employé (UC01a)
    async def create_employee(self, employee: EmployeeData) -> int | None:
        """Créer un employé (UC01) et retourne son ID ou None si email déjà utilisé."""
        exists = await self.repository.email_exists(employee.email)
        if exists:
            return None
        new_id = await self.repository.create_employee(employee)
        return new_id

    # Upload de la photo (UC01b)
    async def upload_employee_photo(self, file: UploadFile) -> str:
        """Sauvegarde la photo de l'employé (déléguée à la couche de persistance)."""
        return await self.repository.upload_employee_photo(file)

    # Récupérer tous les employés (UC02a)
    async def get_all_employees(self) -> list[EmployeeWithId]:
        """Récupérer tous les employés (UC02a)"""
        return await self.repository.get_all_employees()

    # Récupérer un employé par son ID (UC02b)
    async def get_employee_by_id(self, id: int) -> EmployeeWithId | None:
        """Récupérer un employé par son ID (UC02b)"""
        return await self.repository.get_employee_by_id(id)

    # Mettre à jour un employé (UC03)
    async def update_employee(self, id: int, updated_employee: EmployeeData) -> bool:
        """Mettre à jour un employé (UC03)"""
        current = await self.repository.get_employee_by_id(id)
        if current is None:
            return False

        if updated_employee.email != current.email:
            exists = await self.repository.email_exists(updated_employee.email)
            if exists:
                return False

        await self.repository.update_employee(id, updated_employee)
        return True

    # Supprimer un employé (UC04)
    async def delete_employee(self, id: int) -> bool:
        """Supprimer un employé (UC04)"""
        current = await self.repository.get_employee_by_id(id)
        if current is None:
            return False
        await self.repository.delete_employee(id)
        return True
