// systems/frontend/chaterp-web/src/types/employeeTypes.ts

/** Format utilis� pour cr�er un employ� (POST) */
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

/** Format utilis� pour lire un employ� (GET), inclut l�ID */
export type EmployeeWithId = EmployeeData & {
    id: number;
};
