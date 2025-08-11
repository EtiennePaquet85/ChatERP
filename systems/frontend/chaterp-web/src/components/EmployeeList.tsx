// systems/frontend/chaterp-web/src/components/EmployeeList.tsx

import React from "react";
import type { EmployeeWithId } from "../types/employeeTypes";
import "../styles/employees.css";

import { HttpClient } from "../utils/httpClient";  // Import du client HTTP

const DEFAULT_AVATAR_URL =
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

// Instanciation unique du client HTTP pour gérer les URLs des photos
const httpClient = new HttpClient();

interface Props {
    employees: EmployeeWithId[];
    onSelect: (employee: EmployeeWithId) => void;
}

export const EmployeeList: React.FC<Props> = ({ employees, onSelect }) => {
    // Fonction pour obtenir l'URL complète de la photo
    const getPhotoUrl = (photoUrl?: string): string => {
        if (!photoUrl || !photoUrl.trim()) {
            return DEFAULT_AVATAR_URL;
        }
        if (photoUrl.startsWith("http") || photoUrl.startsWith("data")) {
            return photoUrl;
        }
        // Utilise HttpClient pour construire l'URL complète (préfixe backend, etc.)
        return httpClient.getPhotoUrl(photoUrl);
    };

    return (
        <section className="employee-list">
            <div className="employee-grid">
                {employees.map((emp) => (
                    <div
                        key={emp.id}
                        className="employee-card"
                        onClick={() => onSelect(emp)}
                    >
                        <div className="employee-card-photo-container">
                            <img
                                src={getPhotoUrl(emp.photoUrl)}
                                alt={emp.name}
                                className="employee-photo"
                            />
                        </div>
                        <div className="employee-info">
                            <div className="employee-name">{emp.name}</div>
                            <div className="employee-role">{emp.role}</div>
                            <div className="employee-email">
                                ✉️ <span>{emp.email}</span>
                            </div>
                            <div className="employee-phone">
                                📞 <span>{emp.phone}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
