// systems/frontend/chaterp-web-tests/tests/handlers/employeeHandler.uc02a.test.ts

import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import type { EmployeeWithId } from '../../../chaterp-web/src/types/employeeTypes';

const FILENAME = 'employeeHandler.uc02a.test.ts';

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

const mockEmployees: EmployeeWithId[] = [
    {
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
    },
    {
        id: 2,
        name: 'Bob',
        role: 'Designer',
        email: 'bob@example.com',
        phone: '514-987-6543',
        address: '456 avenue des Arts, Montréal',
        department: 'Marketing',
        manager: 'Julie Tremblay',
        status: 'Actif',
        hireDate: '2022-08-01',
        photoUrl: 'https://example.com/photos/bob.jpg',
    },
];

describe('getAllEmployeesHandler - Tests', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    // ============================================================================
    // ✅ TEST 1 : Succès - Récupération de plusieurs employés
    // ============================================================================
    it('retourne plusieurs employés avec succès', async () => {
        const testName = 'Succès de la consultation de plusieurs employés';
        const functionName = 'getAllEmployeesHandler - succès multiples';
        printTestStart(testName, functionName);

        // Arrange
        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => {
            return {
                HttpEmployeeApiAdapter: function () {
                    return {
                        getAllEmployees: vi.fn().mockResolvedValue(mockEmployees),
                        createEmployee: vi.fn(),
                        getEmployeeById: vi.fn(),
                        updateEmployee: vi.fn(),
                        deleteEmployee: vi.fn(),
                        uploadEmployeePhoto: vi.fn(),
                    };
                },
            };
        });

        const { getAllEmployeesHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        const expected_success = true;
        const expected_employees_number = mockEmployees.length;

        // Act
        const result = await getAllEmployeesHandler();
        const returned_success = result.success;
        const returned_employees_number = result.employees?.length ?? 0;

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(result.employees).toBeDefined();
        expect(returned_employees_number).toBe(expected_employees_number);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, employees = ${expected_employees_number} employé(s)`);
        console.log(`Résultat reçu    : success = ${returned_success}, employees = ${returned_employees_number} employé(s)`);
        console.log(`État du test     : ${(returned_success === expected_success && returned_employees_number === expected_employees_number) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });

    // ============================================================================
    // ✅ TEST 2 : Succès - Récupération liste vide
    // ============================================================================
    it('retourne une liste vide si aucun employé', async () => {
        const testName = 'Liste vide retournée avec succès';
        const functionName = 'getAllEmployeesHandler - succès liste vide';
        printTestStart(testName, functionName);

        // Arrange
        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => {
            return {
                HttpEmployeeApiAdapter: function () {
                    return {
                        getAllEmployees: vi.fn().mockResolvedValue([]),
                        createEmployee: vi.fn(),
                        getEmployeeById: vi.fn(),
                        updateEmployee: vi.fn(),
                        deleteEmployee: vi.fn(),
                        uploadEmployeePhoto: vi.fn(),
                    };
                },
            };
        });

        const { getAllEmployeesHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        const expected_success = true;
        const expected_employees_number = 0;

        // Act
        const result = await getAllEmployeesHandler();
        const returned_success = result.success;
        const returned_employees_number = result.employees?.length ?? -1;

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(result.employees).toBeDefined();
        expect(returned_employees_number).toBe(expected_employees_number);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, employees = ${expected_employees_number} employé(s)`);
        console.log(`Résultat reçu    : success = ${returned_success}, employees = ${returned_employees_number} employé(s)`);
        console.log(`État du test     : ${(returned_success === expected_success && returned_employees_number === expected_employees_number) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });

    // ============================================================================
    // ⚠️ TEST 3 : Exception levée (erreur serveur)
    // ============================================================================
    it('retourne une erreur si une exception est levée', async () => {
        const testName = 'Erreur levée lors de la récupération';
        const functionName = 'getAllEmployeesHandler - erreur exception';
        printTestStart(testName, functionName);

        // Arrange
        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => {
            return {
                HttpEmployeeApiAdapter: function () {
                    return {
                        getAllEmployees: vi.fn().mockRejectedValue(new Error('Erreur de connexion')),
                        createEmployee: vi.fn(),
                        getEmployeeById: vi.fn(),
                        updateEmployee: vi.fn(),
                        deleteEmployee: vi.fn(),
                        uploadEmployeePhoto: vi.fn(),
                    };
                },
            };
        });

        const { getAllEmployeesHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        const expected_success = false;
        const expected_errors = ['Erreur de connexion'];

        // Act
        const result = await getAllEmployeesHandler();
        const returned_success = result.success;
        const returned_errors = result.errors ?? [];

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(result.errors).toBeDefined();
        expect(returned_errors).toStrictEqual(expected_errors);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, errors = ${JSON.stringify(expected_errors)}`);
        console.log(`Résultat reçu    : success = ${returned_success}, errors = ${JSON.stringify(returned_errors)}`);
        console.log(`État du test     : ${(returned_success === expected_success && JSON.stringify(returned_errors) === JSON.stringify(expected_errors)) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });
});
