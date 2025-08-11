// systems/frontend/chaterp-web/src/handlers/employeeHandler.ts

import type { EmployeeData, EmployeeWithId } from '../types/employeeTypes';
import { HttpEmployeeApiAdapter } from '../adapters/httpEmployeeApiAdapter';
import type { IEmployeeApiAdapter } from '../adapters/iEmployeeApiAdapter';
import { EMPLOYEE_MESSAGES } from '../constants/employeeConstants';
import { MESSAGES } from '../constants/sharedConstants';

/* 🟢 Initialisation de l’adaptateur (implémentation REST) */
const employeeAdapter: IEmployeeApiAdapter = new HttpEmployeeApiAdapter();

/* 🔎 Validation des données */

// Vérifie si une adresse courriel est syntaxiquement valide
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Vérifie si une date est syntaxiquement valide
function isValidDate(dateString: string): boolean {
    if (!dateString) return false;
    return !isNaN(Date.parse(dateString));
}

// Valide les données de création ou de mise à jour d’un employé
export function validateEmployeeData(data: EmployeeData): Partial<Record<keyof EmployeeData, string>> {
    const fieldErrors: Partial<Record<keyof EmployeeData, string>> = {};

    if (!data.name || data.name.trim().length < 2)
        fieldErrors.name = EMPLOYEE_MESSAGES.invalidName;

    if (!data.role || data.role.trim().length === 0)
        fieldErrors.role = EMPLOYEE_MESSAGES.invalidRole;

    if (!data.email || !isValidEmail(data.email))
        fieldErrors.email = EMPLOYEE_MESSAGES.invalidEmail;

    if (!data.phone || data.phone.trim().length < 7)
        fieldErrors.phone = EMPLOYEE_MESSAGES.invalidPhone;

    if (!data.address || data.address.trim().length < 5)
        fieldErrors.address = EMPLOYEE_MESSAGES.invalidAddress;

    if (!data.department || data.department.trim().length === 0)
        fieldErrors.department = EMPLOYEE_MESSAGES.invalidDepartment;

    if (!data.manager || data.manager.trim().length === 0)
        fieldErrors.manager = EMPLOYEE_MESSAGES.invalidManager;

    if (!data.status || data.status.trim().length === 0)
        fieldErrors.status = EMPLOYEE_MESSAGES.invalidStatus;

    if (!data.hireDate || !isValidDate(data.hireDate))
        fieldErrors.hireDate = EMPLOYEE_MESSAGES.invalidHireDate;

    return fieldErrors;
}

// Valide l’identifiant d’un employé (pour UC02, UC03, UC04)
export function validateEmployeeId(id: number): string[] {
    const errors: string[] = [];

    if (!Number.isInteger(id) || id <= 0) {
        errors.push(EMPLOYEE_MESSAGES.invalidId);
    }

    return errors;
}

/* 🚀 Opérations métier */

// Créer un employé (UC01a)
export async function createEmployeeHandler(
    data: EmployeeData
): Promise<{
    success: boolean;
    message?: string;
    id?: number;
    fieldErrors?: Partial<Record<keyof EmployeeData, string>>;
    errors?: string[];
}> {
    const fieldErrors = validateEmployeeData(data);

    if (Object.keys(fieldErrors).length > 0) {
        return {
            success: false,
            fieldErrors,
            errors: [MESSAGES.fieldsInvalid],
        };
    }

    try {
        const result = await employeeAdapter.createEmployee(data);
        return { success: true, message: result.message, id: result.id };
    } catch (error: unknown) {
        return {
            success: false,
            errors: [error instanceof Error ? error.message : MESSAGES.unknownServerError],
        };
    }
}

// Téléverser une photo d’employé (UC01b)
export async function uploadEmployeePhotoHandler(base64Photo: string): Promise<{
    success: boolean;
    storageUrl?: string;
    errors?: string[];
}> {
    if (!base64Photo.startsWith("data:")) {
        return { success: false, errors: ["Format d'image invalide."] };
    }

    try {
        const blob = await fetch(base64Photo).then(res => res.blob());
        const result = await employeeAdapter.uploadEmployeePhoto(blob);
        return { success: true, storageUrl: result.storageUrl };
    } catch (error: unknown) {
        return {
            success: false,
            errors: [error instanceof Error ? error.message : MESSAGES.unknownServerError],
        };
    }
}

// Récupérer tous les employés (UC02a)
export async function getAllEmployeesHandler(): Promise<{
    success: boolean;
    employees?: EmployeeWithId[];
    errors?: string[];
}> {
    try {
        const employees = await employeeAdapter.getAllEmployees();
        return { success: true, employees };
    } catch (error: unknown) {
        return {
            success: false,
            errors: [error instanceof Error ? error.message : MESSAGES.unknownServerError],
        };
    }
}

// Récupérer un employé par son ID (UC02b)
export async function getEmployeeByIdHandler(
    id: number
): Promise<{ success: boolean; employee?: EmployeeWithId; errors?: string[] }> {
    const idErrors = validateEmployeeId(id);
    if (idErrors.length > 0) return { success: false, errors: idErrors };

    try {
        const employee = await employeeAdapter.getEmployeeById(id);
        if (!employee) return { success: false, errors: [EMPLOYEE_MESSAGES.employeeNotFound] };
        return { success: true, employee };
    } catch (error: unknown) {
        return {
            success: false,
            errors: [error instanceof Error ? error.message : MESSAGES.unknownServerError],
        };
    }
}

// Mettre à jour un employé (UC03)
export async function updateEmployeeHandler(
    employee: EmployeeWithId
): Promise<{
    success: boolean;
    message?: string;
    fieldErrors?: Partial<Record<keyof EmployeeData, string>>;
    errors?: string[];
}> {
    const fieldErrors = validateEmployeeData(employee);
    const idErrors = validateEmployeeId(employee.id);

    if (Object.keys(fieldErrors).length > 0 || idErrors.length > 0) {
        return {
            success: false,
            fieldErrors,
            errors: [
                ...idErrors,
                ...(Object.keys(fieldErrors).length > 0 ? [MESSAGES.fieldsInvalid] : []),
            ],
        };
    }

    try {
        const result = await employeeAdapter.updateEmployee(employee);
        return { success: true, message: result.message };
    } catch (error: unknown) {
        return {
            success: false,
            errors: [error instanceof Error ? error.message : MESSAGES.unknownServerError],
        };
    }
}

// Supprimer un employé (UC04)
export async function deleteEmployeeHandler(
    id: number
): Promise<{ success: boolean; message?: string; errors?: string[] }> {
    const idErrors = validateEmployeeId(id);
    if (idErrors.length > 0) return { success: false, errors: idErrors };

    try {
        const result = await employeeAdapter.deleteEmployee(id);
        return { success: true, message: result.message };
    } catch (error: unknown) {
        return {
            success: false,
            errors: [error instanceof Error ? error.message : MESSAGES.unknownServerError],
        };
    }
}
