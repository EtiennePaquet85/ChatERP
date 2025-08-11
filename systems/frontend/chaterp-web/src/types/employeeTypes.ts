// systems/frontend/chaterp-web/src/types/employeeTypes.ts

/** Format utilisé pour créer un employé (POST) */
export type EmployeeData = {
    name: string;
    role: string;
    email: string;
    phone: string;
    address: string;
    department: string;
    manager: string;
    status: string;
    hireDate: string;
    photoUrl: string;
};

/** Format utilisé pour lire un employé (GET), inclut l’ID */
export type EmployeeWithId = EmployeeData & {
    id: number;
};
