// systems/frontend/chaterp-web/src/pages/EmployeesPage.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeComponent } from "../components/EmployeeComponent";
import { EmployeeList } from "../components/EmployeeList";
import { Spinner } from "../components/Spinner";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import type { EmployeeWithId, EmployeeData } from "../types/employeeTypes";
import type { ActionMode } from "../types/sharedTypes";
import {
    createEmployeeHandler,
    getAllEmployeesHandler,
    getEmployeeByIdHandler,
    updateEmployeeHandler,
    deleteEmployeeHandler,
    uploadEmployeePhotoHandler,
} from "../handlers/employeeHandler";
import {
    ACTION_MODES,
    BUTTON_LABELS,
    MESSAGES,
} from "../constants/sharedConstants";
import { EMPLOYEE_MESSAGES, EMPTY_EMPLOYEE_DATA } from "../constants/employeeConstants";
import "../styles/employees.css";
import "../styles/buttons.css";

export function EmployeesPage() {
    const [mode, setMode] = useState<ActionMode>(ACTION_MODES.readAll);
    const [initialData, setInitialData] = useState<EmployeeData>(EMPTY_EMPLOYEE_DATA);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeWithId | null>(null);
    const [employees, setEmployees] = useState<EmployeeWithId[]>([]);
    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof EmployeeData, string>>>({});

    const navigate = useNavigate();

    const resetMessages = () => {
        setErrors([]);
        setFieldErrors({});
        setSuccessMessage(null);
    };

    // 🔄 Charger les employés au montage
    useEffect(() => {
        refreshEmployees();
    }, []);

    // 🕒 Effacement automatique du message de succès après 3s
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const refreshEmployees = async () => {
        setLoading(true);
        const result = await getAllEmployeesHandler();
        if (result.success && result.employees) {
            setEmployees(result.employees);
        } else {
            setErrors(result.errors || [EMPLOYEE_MESSAGES.loadEmployeesError]);
        }
        setLoading(false);
    };

    // 🔁 Gérer upload si photo base64
    const preparePhotoAndData = async (data: EmployeeData): Promise<EmployeeData> => {
        if (data.photoUrl?.startsWith("data:")) {
            const uploadResult = await uploadEmployeePhotoHandler(data.photoUrl);
            if (uploadResult.success && uploadResult.storageUrl) {
                return { ...data, photoUrl: uploadResult.storageUrl };
            } else {
                throw new Error(uploadResult.errors?.[0] || "Échec de l'envoi de la photo.");
            }
        }
        return data;
    };

    // 🧩 Fonction de mise à jour avec gestion conditionnelle de la photo
    const updateEmployeeWithOptionalPhoto = async (
        id: number,
        baseData: EmployeeData
    ): Promise<{
        success: boolean;
        message?: string;
        fieldErrors?: Partial<Record<keyof EmployeeData, string>>;
        errors?: string[];
    }> => {
        const preparedData = await preparePhotoAndData(baseData);
        const employeeWithPhoto: EmployeeWithId = {
            ...preparedData,
            id,
        };
        return await updateEmployeeHandler(employeeWithPhoto);
    };

    const handleCreate = async (newEmployeeData: EmployeeData) => {
        resetMessages();
        setCreating(true);
        try {
            // Étape 1 – Créer employé sans photo
            const result = await createEmployeeHandler(newEmployeeData);
            if (result.success && result.id) {
                // Étape 2–4 – Mise à jour avec la photo (si applicable)
                const photoUpdateResult = await updateEmployeeWithOptionalPhoto(result.id, newEmployeeData);

                if (photoUpdateResult.success) {
                    await refreshEmployees();
                    setMode(ACTION_MODES.readAll);
                    setSuccessMessage(result.message ?? MESSAGES.createSuccess);
                } else {
                    setErrors(photoUpdateResult.errors || [MESSAGES.createError]);
                    setFieldErrors(photoUpdateResult.fieldErrors || {});
                }
            } else {
                setErrors(result.errors || [MESSAGES.createError]);
                setFieldErrors(result.fieldErrors || {});
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrors([error.message]);
            } else {
                setErrors(["Une erreur inconnue est survenue."]);
            }
        } finally {
            setCreating(false);
        }
    };

    const handleRead = async (employeeId: number) => {
        resetMessages();
        const result = await getEmployeeByIdHandler(employeeId);
        if (result.success && result.employee) {
            setSelectedEmployee(result.employee);
            setMode(ACTION_MODES.read);
        } else {
            setErrors(result.errors || [MESSAGES.readError]);
        }
    };

    const handleUpdate = async (updatedEmployeeData: EmployeeData) => {
        if (!selectedEmployee) return;
        resetMessages();
        setUpdating(true);
        try {
            // Étape 1 – Mettre à jour l'employé sans modifier la photo
            const result = await updateEmployeeHandler({
                ...selectedEmployee,
                ...updatedEmployeeData,
                photoUrl: selectedEmployee.photoUrl,
            });

            if (result.success) {
                // Étape 2–4 – Mise à jour avec la photo (si applicable)
                const photoUpdateResult = await updateEmployeeWithOptionalPhoto(selectedEmployee.id, updatedEmployeeData);

                if (photoUpdateResult.success) {
                    await refreshEmployees();
                    await handleRead(selectedEmployee.id);
                    setSuccessMessage(result.message ?? MESSAGES.updateSuccess);
                } else {
                    setErrors(photoUpdateResult.errors || [MESSAGES.updateError]);
                    setFieldErrors(photoUpdateResult.fieldErrors || {});
                }
            } else {
                setErrors(result.errors || [MESSAGES.updateError]);
                setFieldErrors(result.fieldErrors || {});
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrors([error.message]);
            } else {
                setErrors(["Une erreur inconnue est survenue."]);
            }
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedEmployee) return;
        resetMessages();
        setDeleting(true);

        const result = await deleteEmployeeHandler(selectedEmployee.id);
        if (result.success) {
            await refreshEmployees();
            setSelectedEmployee(null);
            setMode(ACTION_MODES.readAll);
            setSuccessMessage(result.message ?? MESSAGES.deleteSuccess);
        } else {
            setErrors(result.errors || [MESSAGES.deleteError]);
            setMode(ACTION_MODES.read);
        }

        setDeleting(false);
    };

    const handleUpdateRequest = (emp: EmployeeWithId) => {
        setSelectedEmployee(emp);
        resetMessages();
        setMode(ACTION_MODES.update);
    };

    const handleDeleteRequest = (emp: EmployeeWithId) => {
        setSelectedEmployee(emp);
        resetMessages();
        setMode(ACTION_MODES.delete);
    };

    const handleReturn = () => {
        setSelectedEmployee(null);
        resetMessages();
        setMode(ACTION_MODES.readAll);
    };

    const handleCancel = () => {
        resetMessages();
        setMode(ACTION_MODES.read);
    };

    return (
        <>
            <Header />
            <main className="employees-page">
                <section className="employees-header">
                    <div
                        className="employees-title"
                        onClick={() => {
                            handleReturn();
                            navigate("/employees");
                        }}
                    >
                        {EMPLOYEE_MESSAGES.employeesPageTitle}
                    </div>
                    <button
                        className="button"
                        onClick={() => {
                            setSelectedEmployee(null);
                            setInitialData({ ...EMPTY_EMPLOYEE_DATA });
                            resetMessages();
                            setMode(ACTION_MODES.create);
                        }}
                    >
                        {BUTTON_LABELS.new}
                    </button>

                    {(successMessage || errors.length > 0) && (
                        <div className="inline-message">
                            {successMessage && (
                                <span className="inline-success">
                                    {successMessage}
                                    <button
                                        className="message-close"
                                        onClick={() => setSuccessMessage(null)}
                                        aria-label={BUTTON_LABELS.close}
                                    >
                                        {BUTTON_LABELS.closeLogo}
                                    </button>
                                </span>
                            )}
                            {errors.length > 0 && (
                                <span className="inline-error">
                                    {errors[0]}
                                    <button
                                        className="message-close"
                                        onClick={() => setErrors([])}
                                        aria-label={BUTTON_LABELS.close}
                                    >
                                        {BUTTON_LABELS.closeLogo}
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </section>

                {loading && <Spinner message={MESSAGES.loading} />}

                {!loading && mode === ACTION_MODES.create && (
                    <div className="relative-overlay">
                        <EmployeeComponent
                            mode={ACTION_MODES.create}
                            selectedEmployee={null}
                            onCreate={handleCreate}
                            onReturn={handleReturn}
                            initialData={initialData}
                            fieldErrors={fieldErrors}
                        />
                        {creating && <Spinner message={MESSAGES.creating} variant="overlay" />}
                    </div>
                )}

                {!loading && mode === ACTION_MODES.readAll && (
                    <EmployeeList
                        employees={employees}
                        onSelect={(emp) => {
                            setSelectedEmployee(emp);
                            setMode(ACTION_MODES.read);
                        }}
                    />
                )}

                {!loading && mode === ACTION_MODES.read && selectedEmployee && (
                    <EmployeeComponent
                        mode={ACTION_MODES.read}
                        selectedEmployee={selectedEmployee}
                        onEdit={handleUpdateRequest}
                        onDelete={handleDeleteRequest}
                        onReturn={handleReturn}
                    />
                )}

                {!loading && mode === ACTION_MODES.update && selectedEmployee && (
                    <div className="relative-overlay">
                        <EmployeeComponent
                            mode={ACTION_MODES.update}
                            selectedEmployee={selectedEmployee}
                            onUpdate={handleUpdate}
                            onCancel={handleCancel}
                            initialData={selectedEmployee}
                            fieldErrors={fieldErrors}
                        />
                        {updating && <Spinner message={MESSAGES.saving} variant="overlay" />}
                    </div>
                )}

                {!loading && mode === ACTION_MODES.delete && selectedEmployee && (
                    <div className="modal-wrapper">
                        <EmployeeComponent
                            mode={ACTION_MODES.delete}
                            selectedEmployee={selectedEmployee}
                            onReturn={handleCancel}
                        />
                        <div className="modal-overlay">
                            <div className="modal">
                                <p>
                                    {MESSAGES.confirmDeletePrefix}
                                    <strong>{selectedEmployee.name}</strong>
                                    {MESSAGES.confirmDeleteSuffix}
                                </p>
                                <div className="modal-buttons">
                                    <button
                                        className="button button-danger"
                                        onClick={handleDelete}
                                        disabled={deleting}
                                    >
                                        {BUTTON_LABELS.delete}
                                    </button>
                                    <button
                                        className="button button-secondary"
                                        onClick={handleCancel}
                                        disabled={deleting}
                                    >
                                        {BUTTON_LABELS.cancel}
                                    </button>
                                </div>
                            </div>

                            {deleting && (
                                <Spinner
                                    message={MESSAGES.deleting}
                                    variant="overlay"
                                    className="spinner-modal-overlay"
                                />
                            )}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}
