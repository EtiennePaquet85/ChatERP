// systems/frontend/chaterp-web/src/constants/employeeConstants.ts

import type { EmployeeData } from "../types/employeeTypes";

export const EMPLOYEE_FIELD_KEYS: { [K in keyof EmployeeData]: K } = {
    name: "name",
    role: "role",
    email: "email",
    phone: "phone",
    address: "address",
    department: "department",
    manager: "manager",
    status: "status",
    hireDate: "hireDate",
    photoUrl: "photoUrl",
} as const;

export const EMPLOYEE_FIELD_LABELS = {
    name: "Nom :",
    role: "Rôle :",
    department: "Département :",
    email: "Courriel :",
    manager: "Gestionnaire :",
    phone: "Téléphone :",
    status: "Statut :",
    address: "Adresse :",
    hireDate: "Date d'embauche :",
} as const;

export const EMPLOYEE_MESSAGES = {
    invalidName: "Le nom est requis et doit avoir au moins 2 caractères.",
    invalidRole: "Le rôle est requis.",
    invalidEmail: "Un courriel valide est requis.",
    invalidPhone: "Le numéro de téléphone est requis et doit contenir au moins 7 caractères.",
    invalidAddress: "L'adresse est requise et doit avoir au moins 5 caractères.",
    invalidDepartment: "Le département est requis.",
    invalidManager: "Le nom du gestionnaire est requis.",
    invalidStatus: "Le statut est requis.",
    invalidHireDate: "La date d'embauche est requise.",
    invalidId: "L'ID doit être un entier positif.",
    loadEmployeesError: "Erreur lors du chargement des employés.",
    noEmployees: "Aucun employé à afficher",
    employeeNotFound: "Employé non trouvé.",
    employeesPageTitle: "Employés",
};

export const EMPTY_EMPLOYEE_DATA: EmployeeData = {
    name: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    manager: "",
    status: "",
    hireDate: "",
    photoUrl: "",
};
