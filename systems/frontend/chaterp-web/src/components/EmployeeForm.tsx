// systems/frontend/chaterp-web/src/components/EmployeeForm.tsx

import React, { useRef } from "react";
import type { EmployeeData } from "../types/employeeTypes";
import type { ActionMode } from "../types/sharedTypes";
import "../styles/employees.css";
import "../styles/buttons.css";
import {
    EMPLOYEE_FIELD_LABELS as FIELD_LABELS,
    EMPLOYEE_FIELD_KEYS as FIELD_KEYS,
} from "../constants/employeeConstants";
import {
    BUTTON_LABELS,
    PLACEHOLDERS,
    ACTION_MODES,
} from "../constants/sharedConstants";

import { HttpClient } from "../utils/httpClient";

// Instanciation unique du client HTTP pour la gestion des URLs
const httpClient = new HttpClient();

interface Props {
    mode?: ActionMode;
    employee: EmployeeData;
    onChange?: (field: keyof EmployeeData, value: string) => void;
    onSubmit?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onCancel?: () => void;
    onReturn?: () => void;
    readOnly?: boolean;
    fieldErrors?: Partial<Record<keyof EmployeeData, string>>;
}

export const EmployeeForm: React.FC<Props> = ({
    employee,
    onChange,
    onSubmit,
    onEdit,
    onDelete,
    onCancel,
    onReturn,
    readOnly = false,
    mode,
    fieldErrors = {},
}) => {
    const DEFAULT_AVATAR = "/images/default-avatar.png";
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const getPhotoUrl = (photoUrl?: string): string => {
        if (!photoUrl) {
            return DEFAULT_AVATAR;
        }
        if (photoUrl.startsWith("http") || photoUrl.startsWith("data")) {
            return photoUrl;
        }
        // Utilise HttpClient pour construire l'URL complète
        return httpClient.getPhotoUrl(photoUrl);
    };

    const resolvedAvatar = getPhotoUrl(employee.photoUrl);

    const handleChange = (field: keyof EmployeeData, e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(field, e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    onChange?.("photoUrl", reader.result);
                    // Reset la valeur pour permettre re-sélection même fichier
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const renderFieldPair = (
        labelLeft: string,
        fieldLeft: keyof EmployeeData,
        typeLeft: string,
        labelRight: string,
        fieldRight: keyof EmployeeData,
        typeRight: string
    ) => (
        <>
            {/* Left field */}
            <label>{labelLeft}</label>
            {readOnly ? (
                <div className="field-readonly">{employee[fieldLeft] || PLACEHOLDERS.none}</div>
            ) : (
                <div>
                    <input
                        type={typeLeft}
                        value={employee[fieldLeft] || ""}
                        onChange={e => handleChange(fieldLeft, e)}
                        className={fieldErrors[fieldLeft] ? "input-error" : ""}
                    />
                    {fieldErrors[fieldLeft] && (
                        <div className="field-error">{fieldErrors[fieldLeft]}</div>
                    )}
                </div>
            )}

            {/* Right field */}
            <label>{labelRight}</label>
            {readOnly ? (
                <div className="field-readonly">{employee[fieldRight] || PLACEHOLDERS.none}</div>
            ) : (
                <div>
                    <input
                        type={typeRight}
                        value={employee[fieldRight] || ""}
                        onChange={e => handleChange(fieldRight, e)}
                        className={fieldErrors[fieldRight] ? "input-error" : ""}
                    />
                    {fieldErrors[fieldRight] && (
                        <div className="field-error">{fieldErrors[fieldRight]}</div>
                    )}
                </div>
            )}
        </>
    );

    const renderButtons = () => {
        switch (mode) {
            case ACTION_MODES.create:
                return (
                    <div className="button-group">
                        <button type="submit" className="button">{BUTTON_LABELS.create}</button>
                        {onReturn && (
                            <button type="button" className="button button-secondary" onClick={onReturn}>
                                {BUTTON_LABELS.cancel}
                            </button>
                        )}
                    </div>
                );
            case ACTION_MODES.read:
                return (
                    <div className="button-group">
                        {onEdit && (
                            <button type="button" className="button" onClick={onEdit}>
                                {BUTTON_LABELS.edit}
                            </button>
                        )}
                        {onDelete && (
                            <button type="button" className="button button-danger" onClick={onDelete}>
                                {BUTTON_LABELS.delete}
                            </button>
                        )}
                        {onReturn && (
                            <button type="button" className="button button-secondary" onClick={onReturn}>
                                {BUTTON_LABELS.return}
                            </button>
                        )}
                    </div>
                );
            case ACTION_MODES.update:
                return (
                    <div className="button-group">
                        <button type="submit" className="button">{BUTTON_LABELS.update}</button>
                        {onCancel && (
                            <button type="button" className="button button-secondary" onClick={onCancel}>
                                {BUTTON_LABELS.cancel}
                            </button>
                        )}
                    </div>
                );
            case ACTION_MODES.delete:
                return <div className="button-group" />;
            default:
                return null;
        }
    };

    return (
        <form
            className="employee-details-form"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit?.();
            }}
        >
            <div className="employee-details-photo-container">
                <div className="employee-details-photo-wrapper">
                    <img
                        src={resolvedAvatar}
                        alt={employee[FIELD_KEYS.name] || FIELD_LABELS.name}
                        className="employee-photo"
                    />

                    {/* ❌ Bouton X par-dessus l’image */}
                    {!readOnly && onChange && employee.photoUrl?.trim() && (
                        <button
                            type="button"
                            onClick={() => {
                                onChange("photoUrl", "");
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                }
                            }}
                            className="photo-remove-button"
                            title="Retirer la photo"
                        >
                            {BUTTON_LABELS.closeLogo}
                        </button>
                    )}

                    {/* 📷 Bouton pour choisir une photo */}
                    {!readOnly && onChange && (
                        <div className="button-center">
                            <button
                                type="button"
                                className="button"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                📷 {employee.photoUrl ? "Remplacer" : "Ajouter"}
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                                style={{ display: "none" }}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="employee-details-info">
                <div className="employee-details-grid">
                    {/* Name (wide row) */}
                    <label className="name-label">{FIELD_LABELS.name}</label>
                    {readOnly ? (
                        <div className="name-value">{employee.name || PLACEHOLDERS.none}</div>
                    ) : (
                        <div className="field-wide">
                            <input
                                className={`name-input ${fieldErrors.name ? "input-error" : ""}`}
                                type="text"
                                value={employee.name || ""}
                                onChange={e => handleChange("name", e)}
                            />
                            {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
                        </div>
                    )}
                    <div></div>
                    <div></div>

                    {/* Pair-wise fields */}
                    {renderFieldPair(FIELD_LABELS.role, "role", "text", FIELD_LABELS.department, "department", "text")}
                    {renderFieldPair(FIELD_LABELS.email, "email", "email", FIELD_LABELS.manager, "manager", "text")}
                    {renderFieldPair(FIELD_LABELS.phone, "phone", "tel", FIELD_LABELS.status, "status", "text")}
                    {renderFieldPair(FIELD_LABELS.address, "address", "text", FIELD_LABELS.hireDate, "hireDate", "date")}
                </div>

                {renderButtons()}
            </div>
        </form>
    );
};
