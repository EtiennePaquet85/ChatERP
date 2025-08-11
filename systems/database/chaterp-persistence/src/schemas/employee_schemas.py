# systems/database/chaterp-persistence/src/schemas/employee_schemas.py

"""Pydantic schemas for Employee CRUD."""

from pydantic import BaseModel, EmailStr


class EmployeeData(BaseModel):
    """Objet utilisé pour créer ou mettre à jour un employé (sans ID)."""

    name: str
    role: str
    email: EmailStr
    phone: str
    address: str
    department: str
    manager: str
    status: str
    hireDate: str
    photoUrl: str


class EmployeeWithId(EmployeeData):
    """Objet utilisé pour lire un employé (avec ID)."""

    id: int
