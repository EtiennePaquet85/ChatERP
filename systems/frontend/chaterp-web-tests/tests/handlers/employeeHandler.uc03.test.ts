// systems/frontend/chaterp-web-tests/tests/handlers/employeeHandler.uc03.test.ts

import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import type { EmployeeWithId } from '../../../chaterp-web/src/types/employeeTypes';

const FILENAME = 'employeeHandler.uc03.test.ts';

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
    id: 2,
    name: 'Jane Smith',
    role: 'Designer',
    email: 'jane@example.com',
    phone: '7654321',
    address: '456 avenue secondaire',
    department: 'Design',
    manager: 'Dwight',
    status: 'Actif',
    hireDate: '2022-06-15',
    photoUrl: 'http://url/photo2.jpg',
};

describe('updateEmployeeHandler - Tests', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    // ============================================================================
    // ✅ TEST 1 : Succès - Mise à jour d’un employé
    // ============================================================================
    it('retourne un succès lors de la mise à jour d’un employé valide', async () => {
        const testName = 'Succès mise à jour employé';
        const functionName = 'updateEmployeeHandler - succès';
        printTestStart(testName, functionName);

        // Arrange
        const employeeToUpdate: EmployeeWithId = mockEmployee;
        const expected_success = true;
        const expected_message = 'Employé mis à jour avec succès.';

        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => ({
            HttpEmployeeApiAdapter: function () {
                return {
                    updateEmployee: vi.fn().mockResolvedValue({ message: expected_message }),
                    createEmployee: vi.fn(),
                    getEmployeeById: vi.fn(),
                    getAllEmployees: vi.fn(),
                    deleteEmployee: vi.fn(),
                    uploadEmployeePhoto: vi.fn(),
                };
            },
        }));

        const { updateEmployeeHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await updateEmployeeHandler(employeeToUpdate);
        const returned_success = result.success;
        const returned_message = result.message;

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(returned_message).toBe(expected_message);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, message = "${expected_message}"`);
        console.log(`Résultat reçu    : success = ${returned_success}, message = "${returned_message}"`);
        console.log(`État du test     : ${(returned_success === expected_success && returned_message === expected_message) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });

    // ============================================================================
    // ❌ TEST 2 : Échec - Employé introuvable ou courriel déjà utilisé
    // ============================================================================
    it('retourne une erreur si l’employé est introuvable ou courriel déjà utilisé', async () => {
        const testName = 'Échec mise à jour - introuvable ou conflit';
        const functionName = 'updateEmployeeHandler - échec';
        printTestStart(testName, functionName);

        // Arrange
        const employeeToUpdate: EmployeeWithId = mockEmployee;
        const expected_success = false;
        const expected_errors = ['Employé introuvable ou courriel déjà utilisé par un autre employé.'];

        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => ({
            HttpEmployeeApiAdapter: function () {
                return {
                    updateEmployee: vi.fn().mockRejectedValue(new Error(expected_errors[0])),
                    createEmployee: vi.fn(),
                    getEmployeeById: vi.fn(),
                    getAllEmployees: vi.fn(),
                    deleteEmployee: vi.fn(),
                    uploadEmployeePhoto: vi.fn(),
                };
            },
        }));

        const { updateEmployeeHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await updateEmployeeHandler(employeeToUpdate);
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
    // ❌ TEST 3 : Échec - Validation des données (nom trop court)
    // ============================================================================
    it('retourne une erreur si le nom est trop court', async () => {
        const testName = 'Échec validation données invalides';
        const functionName = 'updateEmployeeHandler - validation erreur';
        printTestStart(testName, functionName);

        // Arrange
        const invalidEmployee: EmployeeWithId = {
            ...mockEmployee,
            name: 'J',
        };
        const expected_success = false;
        const expected_fieldErrors = {
            name: 'Le nom est requis et doit avoir au moins 2 caractères.',
        };
        const expected_errors = ['Certains champs sont incomplets ou contiennent des erreurs. Veuillez corriger les champs concernés.'];

        const { updateEmployeeHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await updateEmployeeHandler(invalidEmployee);
        const returned_success = result.success;
        const returned_fieldErrors = result.fieldErrors ?? {};
        const returned_errors = result.errors ?? [];

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(returned_fieldErrors).toMatchObject(expected_fieldErrors);
        expect(returned_errors).toStrictEqual(expected_errors);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, fieldErrors = ${JSON.stringify(expected_fieldErrors)}, errors = ${JSON.stringify(expected_errors)}`);
        console.log(`Résultat reçu    : success = ${returned_success}, fieldErrors = ${JSON.stringify(returned_fieldErrors)}, errors = ${JSON.stringify(returned_errors)}`);
        console.log(`État du test     : ${(returned_success === expected_success && JSON.stringify(returned_fieldErrors) === JSON.stringify(expected_fieldErrors) && JSON.stringify(returned_errors) === JSON.stringify(expected_errors)) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });

    // ============================================================================
    // ❌ TEST 4 : Échec - ID invalide
    // ============================================================================
    it('retourne une erreur si l’ID est invalide', async () => {
        const testName = 'Échec validation ID invalide';
        const functionName = 'updateEmployeeHandler - id invalide';
        printTestStart(testName, functionName);

        // Arrange
        const invalidIdEmployee: EmployeeWithId = {
            ...mockEmployee,
            id: -3,
        };
        const expected_success = false;
        const expected_errors = ["L'ID doit être un entier positif."];

        const { updateEmployeeHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await updateEmployeeHandler(invalidIdEmployee);
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
    // ⚠️ TEST 5 : Exception - Erreur inattendue lors de la mise à jour
    // ============================================================================
    it('retourne une erreur si une exception est levée lors de la mise à jour', async () => {
        const testName = 'Exception levée lors de la mise à jour';
        const functionName = 'updateEmployeeHandler - exception';
        printTestStart(testName, functionName);

        // Arrange
        const employeeToUpdate: EmployeeWithId = mockEmployee;
        const expected_success = false;
        const expected_errors = ['Erreur inattendue'];

        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => ({
            HttpEmployeeApiAdapter: function () {
                return {
                    updateEmployee: vi.fn().mockRejectedValue(new Error('Erreur inattendue')),
                    createEmployee: vi.fn(),
                    getEmployeeById: vi.fn(),
                    getAllEmployees: vi.fn(),
                    deleteEmployee: vi.fn(),
                    uploadEmployeePhoto: vi.fn(),
                };
            },
        }));

        const { updateEmployeeHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await updateEmployeeHandler(employeeToUpdate);
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
