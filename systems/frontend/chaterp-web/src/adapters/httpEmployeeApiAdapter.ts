// systems/frontend/chaterp-web/src/adapters/httpEmployeeAdapter.ts

import { HttpClient } from '../utils/httpClient';
import type { EmployeeData, EmployeeWithId } from '../types/employeeTypes';
import type { IEmployeeApiAdapter } from './iEmployeeApiAdapter';

export class HttpEmployeeApiAdapter implements IEmployeeApiAdapter {
    private readonly httpClient = new HttpClient();

    constructor(httpClient?: HttpClient) {
        this.httpClient = httpClient ?? new HttpClient(); // ← utilise celui par défaut seulement si aucun fourni
    }

    /** Appelle l’API REST (POST) pour créer un employé (UC01a) */
    async createEmployee(data: EmployeeData): Promise<{ message: string; id: number }> {
        return await this.httpClient.postAsJsonAsync('/api/employees', data);
    }

    /** Appelle l’API REST (POST) pour téléverser une photo d’employé (UC01b) */
    async uploadEmployeePhoto(file: Blob): Promise<{ storageUrl: string }> {
        const formData = new FormData();
        formData.append("file", file, "employee-photo.png");

        return await this.httpClient.postFormDataAsync<{ storageUrl: string }>(
            '/api/employees/photo-upload',
            formData
        );
    }

    /** Appelle l’API REST (GET) pour récupérer tous les employés (UC02a) */
    async getAllEmployees(): Promise<EmployeeWithId[]> {
        return await this.httpClient.getJsonAsync('/api/employees');
    }

    /** Appelle l’API REST (GET) pour récupérer un employé par ID (UC02b) */
    async getEmployeeById(id: number): Promise<EmployeeWithId | undefined> {
        return await this.httpClient.getJsonAsync(`/api/employees/${id}`);
    }

    /** Appelle l’API REST (PUT) pour mettre à jour un employé (UC03) */
    async updateEmployee(employee: EmployeeWithId): Promise<{ message: string }> {
        const { id, ...employeeData } = employee;
        return await this.httpClient.putAsJsonAsync(`/api/employees/${id}`, employeeData);
    }

    /** Appelle l’API REST (DELETE) pour supprimer un employé (UC04) */
    async deleteEmployee(id: number): Promise<{ message: string }> {
        return await this.httpClient.deleteAsync(`/api/employees/${id}`);
    }
}
