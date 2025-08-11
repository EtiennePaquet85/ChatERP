// systems/frontend/chaterp-web/src/adapters/iEmployeeApiAdapter.ts

import type { EmployeeData, EmployeeWithId } from '../types/employeeTypes';

/**
 * Contrat de l’adaptateur d’accès aux employés.
 */
export interface IEmployeeApiAdapter {
    /** Crée un employé (UC01a) */
    createEmployee(data: EmployeeData): Promise<{ message: string; id: number }>;

    /** Téléverse une photo d’employé (UC01b) */
    uploadEmployeePhoto(file: Blob): Promise<{ storageUrl: string }>;

    /** Récupère tous les employés (UC02a) */
    getAllEmployees(): Promise<EmployeeWithId[]>;

    /** Récupère un employé par ID (UC02b) */
    getEmployeeById(id: number): Promise<EmployeeWithId | undefined>;

    /** Met à jour un employé (UC03) */
    updateEmployee(employee: EmployeeWithId): Promise<{ message: string }>;

    /** Supprime un employé (UC04) */
    deleteEmployee(id: number): Promise<{ message: string }>;
}
