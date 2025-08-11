# systems/database/chaterp-persistence/src/routers/employee_router.py

"""Routeur FastAPI exposant les endpoints CRUD pour les employés."""

from __future__ import annotations
from fastapi import APIRouter, HTTPException, status, Path, UploadFile, File
from fastapi.responses import JSONResponse
from src.managers.employee_manager import EmployeeManager
from src.schemas.employee_schemas import EmployeeData, EmployeeWithId

# Création du routeur avec le préfixe commun /api
router = APIRouter(prefix="/api")


# Créer un nouvel employé (UC01a)
@router.post("/employees", status_code=status.HTTP_201_CREATED)
async def create_employee(employee: EmployeeData) -> dict[str, str | int]:
    """Endpoint API pour créer un nouvel employé."""
    manager = EmployeeManager()
    try:
        new_id = await manager.create_employee(employee)
        if new_id is None:
            raise HTTPException(status_code=400, detail="Le courriel est déjà utilisé.")
        return {"message": "Employé créé avec succès.", "id": new_id}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Upload de la photo d'un employé (UC01b)
@router.post("/employees/photo-upload")
async def upload_employee_photo(file: UploadFile = File(...)) -> JSONResponse:
    """Upload de photo d'employé, retourne l'URL relative /photos/xxx.jpg."""
    if file.content_type not in ("image/png", "image/jpeg", "image/jpg"):
        raise HTTPException(status_code=400, detail="Format de fichier non supporté.")
    try:
        manager = EmployeeManager()
        storageUrl = await manager.upload_employee_photo(file)
        return JSONResponse(content={"storageUrl": storageUrl})
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Récupérer tous les employés (UC02a)
@router.get("/employees", response_model=list[EmployeeWithId])
async def get_all_employees() -> list[EmployeeWithId]:
    """Endpoint API pour récupérer tous les employés."""
    manager = EmployeeManager()
    try:
        return await manager.get_all_employees()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Récupérer un employé par son ID (UC02b)
@router.get("/employees/{id}", response_model=EmployeeWithId)
async def get_employee_by_id(id: int) -> EmployeeWithId:
    """Endpoint API pour récupérer un employé par son identifiant."""
    manager = EmployeeManager()
    try:
        employee = await manager.get_employee_by_id(id)
        if employee is None:
            raise HTTPException(status_code=404, detail="Employé introuvable.")
        return employee
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Mettre à jour un employé (UC03)
@router.put("/employees/{id}")
async def update_employee(
    employee: EmployeeData,
    id: int = Path(..., gt=0),
) -> dict[str, str]:
    """Endpoint API pour mettre à jour un employé existant."""
    manager = EmployeeManager()
    try:
        success = await manager.update_employee(id, employee)
        if not success:
            raise HTTPException(
                status_code=404,
                detail="Employé introuvable ou courriel déjà utilisé par un autre employé.",
            )
        return {"message": "Employé mis à jour avec succès."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Supprimer un employé (UC04)
@router.delete("/employees/{id}")
async def delete_employee(id: int = Path(..., gt=0)) -> dict[str, str]:
    """Endpoint API pour supprimer un employé."""
    manager = EmployeeManager()
    try:
        success = await manager.delete_employee(id)
        if not success:
            raise HTTPException(status_code=404, detail="Employé introuvable.")
        return {"message": "Employé supprimé avec succès."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
