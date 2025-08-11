// systems/frontend/chaterp-web/src/components/EmployeeComponent.tsx

import React, { useState, useEffect } from "react";
import type { EmployeeData, EmployeeWithId } from "../types/employeeTypes";
import type { ActionMode } from "../types/sharedTypes";
import { ACTION_MODES, MESSAGES } from "../constants/sharedConstants";
import { EMPTY_EMPLOYEE_DATA } from "../constants/employeeConstants";
import { EmployeeForm } from "./EmployeeForm";
import "../styles/employees.css";

interface Props {
    mode: ActionMode;
    selectedEmployee: EmployeeWithId | null;
    onEdit?: (emp: EmployeeWithId) => void;
    onCreate?: (data: EmployeeData) => void;
    onUpdate?: (data: EmployeeData) => void;
    onDelete?: (emp: EmployeeWithId) => void;
    onCancel?: () => void;
    onReturn?: () => void;
    initialData?: EmployeeData;
    fieldErrors?: Partial<Record<keyof EmployeeData, string>>;
}

export const EmployeeComponent: React.FC<Props> = ({
    mode,
    selectedEmployee,
    onEdit,
    onCreate,
    onUpdate,
    onDelete,
    onCancel,
    onReturn,
    initialData,
    fieldErrors = {},
}) => {
    const [form, setForm] = useState<EmployeeData>(
        mode === ACTION_MODES.create || mode === ACTION_MODES.update
            ? initialData ?? EMPTY_EMPLOYEE_DATA
            : EMPTY_EMPLOYEE_DATA
    );

    const [localErrors, setLocalErrors] = useState<Partial<Record<keyof EmployeeData, string>>>({});

    useEffect(() => {
        if (mode === ACTION_MODES.create || mode === ACTION_MODES.update) {
            if (initialData) {
                setForm(initialData);
                setLocalErrors({});
            }
        }
    }, [initialData, mode]);

    useEffect(() => {
        if (mode === ACTION_MODES.create || mode === ACTION_MODES.update) {
            setLocalErrors(fieldErrors);
        }
    }, [fieldErrors, mode]);

    const handleChange = (field: keyof EmployeeData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setLocalErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleSubmit = () => {
        if (mode === ACTION_MODES.create) onCreate?.(form);
        else if (mode === ACTION_MODES.update) onUpdate?.(form);
    };

    return (
        <section className="employee-details-container">
            {mode === ACTION_MODES.create && (
                <EmployeeForm
                    mode={mode}
                    employee={form}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={onCancel}
                    onReturn={onReturn}
                    readOnly={false}
                    fieldErrors={localErrors}
                />
            )}

            {mode === ACTION_MODES.read && selectedEmployee && (
                <EmployeeForm
                    mode={mode}
                    employee={selectedEmployee}
                    onEdit={onEdit ? () => onEdit(selectedEmployee) : undefined}
                    onDelete={onDelete ? () => onDelete(selectedEmployee) : undefined}
                    onReturn={onReturn}
                    readOnly={true}
                />
            )}

            {mode === ACTION_MODES.update && (
                <EmployeeForm
                    mode={mode}
                    employee={form}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onCancel={onCancel}
                    onReturn={onReturn}
                    readOnly={false}
                    fieldErrors={localErrors}
                />
            )}

            {mode === ACTION_MODES.delete && selectedEmployee && (
                <EmployeeForm
                    mode={mode}
                    employee={selectedEmployee}
                    onReturn={onReturn}
                    readOnly={true}
                />
            )}

            {!mode && <p>{MESSAGES.noData}</p>}
        </section>
    );
};
