// systems/frontend/chaterp-web-tests/tests/handlers/employeeHandler.uc04.test.ts

import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest';
import { deleteEmployeeHandler } from '../../../chaterp-web/src/handlers/employeeHandler';

const FILENAME = 'employeeHandler.uc04.test.ts';

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

describe('deleteEmployeeHandler - Tests', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    // ============================================================================
    // ✅ TEST 1 : Succès - Suppression d’un employé existant
    // ============================================================================
    it('retourne un succès lors de la suppression d’un employé existant', async () => {
        const testName = 'Succès suppression employé';
        const functionName = 'deleteEmployeeHandler - succès';
        printTestStart(testName, functionName);

        // Arrange
        const employeeId = 3;
        const expected_success = true;
        const expected_message = 'Employé supprimé avec succès.';

        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => ({
            HttpEmployeeApiAdapter: function () {
                return {
                    deleteEmployee: vi.fn().mockResolvedValue({ message: expected_message }),
                };
            },
        }));

        const { deleteEmployeeHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await deleteEmployeeHandler(employeeId);
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
    // ❌ TEST 2 : Échec - Employé introuvable
    // ============================================================================
    it('retourne une erreur si l’employé est introuvable', async () => {
        const testName = 'Échec suppression - employé introuvable';
        const functionName = 'deleteEmployeeHandler - introuvable';
        printTestStart(testName, functionName);

        // Arrange
        const employeeId = 999;
        const expected_success = false;
        const expected_errors = ['Employé introuvable.'];

        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => ({
            HttpEmployeeApiAdapter: function () {
                return {
                    deleteEmployee: vi.fn().mockRejectedValue(new Error(expected_errors[0])),
                };
            },
        }));

        const { deleteEmployeeHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await deleteEmployeeHandler(employeeId);
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
    // ⚠️ TEST 3 : Exception - Erreur inattendue lors de la suppression
    // ============================================================================
    it('retourne une erreur si une exception est levée lors de la suppression', async () => {
        const testName = 'Exception levée lors de la suppression';
        const functionName = 'deleteEmployeeHandler - exception';
        printTestStart(testName, functionName);

        // Arrange
        const employeeId = 4;
        const expected_success = false;
        const expected_errors = ['Erreur serveur inattendue'];

        vi.doMock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => ({
            HttpEmployeeApiAdapter: function () {
                return {
                    deleteEmployee: vi.fn().mockRejectedValue(new Error(expected_errors[0])),
                };
            },
        }));

        const { deleteEmployeeHandler } = await import('../../../chaterp-web/src/handlers/employeeHandler');

        // Act
        const result = await deleteEmployeeHandler(employeeId);
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
    // ❌ TEST 4 : Échec - Validation ID invalide
    // ============================================================================
    it('retourne une erreur si l’ID est invalide', async () => {
        const testName = 'Échec validation - ID invalide';
        const functionName = 'deleteEmployeeHandler - ID invalide';
        printTestStart(testName, functionName);

        // Arrange
        const invalidId = -5;
        const expected_success = false;
        const expected_errors = ["L'ID doit être un entier positif."];

        // Act
        const result = await deleteEmployeeHandler(invalidId);
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
