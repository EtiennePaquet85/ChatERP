// systems/frontend/chaterp-web-tests/tests/handlers/employeeHandler.uc02b.test.ts

import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import type { EmployeeWithId } from '../../../chaterp-web/src/types/employeeTypes';

const FILENAME = 'employeeHandler.uc02b.test.ts';

function printTestStart(testName: string, functionName: string) {
    console.log('');
    console.log('====================================================================');
    console.log(`Début test - ${testName}`);
    console.log('--------------------------------------------------------------------');
    console.log(`📄  File  : ${FILENAME}`);
    console.log(`▶️  Func  : ${functionName}`);
}

function printTestEnd(testName: string) {
    console.log('--------------------------------------------------------------------');
    console.log(`Fin test - ${testName}`);
    console.log('====================================================================');
}

const mockEmployee: EmployeeWithId = {
    id: 1,
    name: 'Alice Martin',
    role: 'Développeuse',
    email: 'alice@example.com',
    phone: '514-123-4567',
    address: '123 rue Principale, Montréal',
    department: 'TI',
    manager: 'Jean Dupuis',
    status: 'Actif',
    hireDate: '2023-01-15',
    photoUrl: 'https://example.com/photos/alice.jpg',
};

describe('getEmployeeByIdHandler - Tests', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    // ============================================================================
    // ✅ TEST 1 : Succès - Récupération d’un employé par ID
    // ============================================================================
    it('retourne un employé avec succès pour un ID valide', async () => {
        const testName = 'Succès récupération employé par ID valide';
        const functionName = 'getEmployeeByIdHandler - succès';
        printTestStart(testName, functionName);

        // Arrange
        const validId = 1; // ID valide (employé créé)
        const expected_success = true;
        const expected_employee = mockEmployee;

        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => {
            return {
                HttpEmployeeApiAdapter: function () {
                    return {
                        getEmployeeById: vi.fn().mockResolvedValue(expected_employee),
                        getAllEmployees: vi.fn(),
                        createEmployee: vi.fn(),
                        updateEmployee: vi.fn(),
                        deleteEmployee: vi.fn(),
                        uploadEmployeePhoto: vi.fn(),
                    };
                },
            };
        });

        const { getEmployeeByIdHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await getEmployeeByIdHandler(validId);
        const returned_success = result.success;
        const returned_employee = result.employee;

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(returned_employee).toBeDefined();
        expect(returned_employee).toEqual(expected_employee);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, employé ID = ${expected_employee.id}`);
        console.log(`Résultat reçu    : success = ${returned_success}, employé ID = ${returned_employee?.id}`);
        console.log(`État du test     : ${(returned_success === expected_success && returned_employee?.id === expected_employee.id) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });

    // ============================================================================
    // ❌ TEST 2 : Échec - Employé introuvable (retour null)
    // ============================================================================
    it('retourne une erreur si l’employé est introuvable', async () => {
        const testName = 'Échec récupération employé introuvable';
        const functionName = 'getEmployeeByIdHandler - employé introuvable';
        printTestStart(testName, functionName);

        // Arrange
        const invalidId = 999; // ID invalide (employé non créé)
        const expected_success = false;

        // Correction ici : message d'erreur attendu correspond au message dans EMPLOYEE_MESSAGES
        const expected_errors = ['Employé non trouvé.'];

        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => {
            return {
                HttpEmployeeApiAdapter: function () {
                    return {
                        getEmployeeById: vi.fn().mockResolvedValue(null),
                        getAllEmployees: vi.fn(),
                        createEmployee: vi.fn(),
                        updateEmployee: vi.fn(),
                        deleteEmployee: vi.fn(),
                        uploadEmployeePhoto: vi.fn(),
                    };
                },
            };
        });

        const { getEmployeeByIdHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await getEmployeeByIdHandler(invalidId);
        const returned_success = result.success;
        const returned_errors = result.errors ?? [];

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(returned_errors).toStrictEqual(expected_errors);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, errors = ${JSON.stringify(expected_errors)}`);
        console.log(`Résultat reçu    : success = ${returned_success}, errors = ${JSON.stringify(returned_errors)}`);
        console.log(`État du test     : ${(returned_success === expected_success && JSON.stringify(returned_errors) === JSON.stringify(expected_errors)) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });

    // ============================================================================
    // ❌ TEST 3 : Échec - ID invalide (validation)
    // ============================================================================
    it('retourne une erreur si l’ID est invalide', async () => {
        const testName = 'Échec validation ID invalide';
        const functionName = 'getEmployeeByIdHandler - id invalide';
        printTestStart(testName, functionName);

        // Arrange
        const invalidId = -5; // ID invalide (négatif non accepté)
        const expected_success = false;

        // Correction ici : message d'erreur attendu correspond à celui retourné par validateEmployeeId
        const expected_errors = ["L'ID doit être un entier positif."];

        const { getEmployeeByIdHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await getEmployeeByIdHandler(invalidId);
        const returned_success = result.success;
        const returned_errors = result.errors ?? [];

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(returned_errors).toStrictEqual(expected_errors);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, errors = ${JSON.stringify(expected_errors)}`);
        console.log(`Résultat reçu    : success = ${returned_success}, errors = ${JSON.stringify(returned_errors)}`);
        console.log(`État du test     : ${(returned_success === expected_success && JSON.stringify(returned_errors) === JSON.stringify(expected_errors)) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });

    // ============================================================================
    // ⚠️ TEST 4 : Exception levée (erreur serveur)
    // ============================================================================
    it('retourne une erreur si une exception est levée par l’adaptateur', async () => {
        const testName = 'Exception levée lors de la récupération par ID';
        const functionName = 'getEmployeeByIdHandler - exception';
        printTestStart(testName, functionName);

        // Arrange
        const validId = 1;
        const expected_success = false;
        const expected_errors = ['Erreur inattendue'];

        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => {
            return {
                HttpEmployeeApiAdapter: function () {
                    return {
                        getEmployeeById: vi.fn().mockRejectedValue(new Error('Erreur inattendue')),
                        getAllEmployees: vi.fn(),
                        createEmployee: vi.fn(),
                        updateEmployee: vi.fn(),
                        deleteEmployee: vi.fn(),
                        uploadEmployeePhoto: vi.fn(),
                    };
                },
            };
        });

        const { getEmployeeByIdHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await getEmployeeByIdHandler(validId);
        const returned_success = result.success;
        const returned_errors = result.errors ?? [];

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(returned_errors).toStrictEqual(expected_errors);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, errors = ${JSON.stringify(expected_errors)}`);
        console.log(`Résultat reçu    : success = ${returned_success}, errors = ${JSON.stringify(returned_errors)}`);
        console.log(`État du test     : ${(returned_success === expected_success && JSON.stringify(returned_errors) === JSON.stringify(expected_errors)) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });
});
