// systems/frontend/chaterp-web-tests/tests/handlers/employeeHandler.uc01a.test.ts

import { describe, it, expect, afterEach, vi } from 'vitest';
import { createEmployeeHandler } from '../../../chaterp-web/src/handlers/employeeHandler';
import type { EmployeeWithId, EmployeeData } from '../../../chaterp-web/src/types/employeeTypes';

const FILENAME = 'employeeHandler.uc01a.test.ts';

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

// Mock complet du module avec mock interne
vi.mock('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter', () => {
    const localValidEmployee: EmployeeWithId = {
        id: 1,
        name: 'Alice Martin',
        role: 'Développeuse',
        email: 'alice@erp.com',
        phone: '123456789',
        address: '123 rue des Tests',
        department: 'Informatique',
        manager: 'Bob',
        status: 'Actif',
        hireDate: '2024-01-01',
        photoUrl: '',
    };

    const createEmployeeMock = vi.fn().mockResolvedValue({ message: 'Employé créé avec succès.', id: 42 });

    return {
        HttpEmployeeApiAdapter: function () {
            return {
                createEmployee: createEmployeeMock,
                uploadEmployeePhoto: vi.fn().mockResolvedValue({ storageUrl: 'http://fake-url/photo.png' }),
                getAllEmployees: vi.fn().mockResolvedValue([localValidEmployee]),
                getEmployeeById: vi.fn().mockImplementation(async (id: number) => {
                    if (id === 999) throw new Error('Employé introuvable.');
                    return localValidEmployee;
                }),
                updateEmployee: vi.fn().mockResolvedValue({ message: 'Employé mis à jour avec succès.' }),
                deleteEmployee: vi.fn().mockResolvedValue({ message: 'Employé supprimé avec succès.' }),
            };
        },
        __createEmployeeMock: createEmployeeMock,
    };
});

// Mock global fetch
globalThis.fetch = vi.fn(() =>
    Promise.resolve({
        blob: () => Promise.resolve(new Blob(['dummy'], { type: 'image/png' })),
    } as unknown as Response)
);

const validEmployee: EmployeeData = {
    name: 'Alice Martin',
    role: 'Développeuse',
    email: 'alice@erp.com',
    phone: '123456789',
    address: '123 rue des Tests',
    department: 'Informatique',
    manager: 'Bob',
    status: 'Actif',
    hireDate: '2024-01-01',
    photoUrl: '',
};

// ============================================================================
// ✅ TEST 1 : Création réussie
// ============================================================================
describe('createEmployeeHandler - Succès', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('retourne un succès pour un employé valide', async () => {
        const testName = 'Succès de la création d’un employé';
        const functionName = 'createEmployeeHandler - succès';
        printTestStart(testName, functionName);

        // Arrange
        const expected_success = true;
        const expected_id = 42;
        const expected_message = 'Employé créé avec succès.';

        const adapterModule = await import('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter');
        const adapterInstance = new adapterModule.HttpEmployeeApiAdapter();

        // Act
        const result = await createEmployeeHandler(validEmployee);
        const returned_success = result.success;
        const returned_id = result.id;
        const returned_message = result.message;

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(returned_id).toBe(expected_id);
        expect(returned_message).toBe(expected_message);

        expect(adapterInstance.createEmployee).toHaveBeenCalledOnce();
        expect(adapterInstance.createEmployee).toHaveBeenCalledWith(validEmployee);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, id = ${expected_id}, message = "${expected_message}"`);
        console.log(`Résultat reçu    : success = ${returned_success}, id = ${returned_id}, message = "${returned_message}"`);
        console.log(`État du test     : ${(returned_success === expected_success && returned_id === expected_id) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });
});

// ============================================================================
// ❌ TEST 2 : Échec si données invalides
// ============================================================================
describe('createEmployeeHandler - Échec de validation', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('retourne des erreurs si l’employé est invalide', async () => {
        const testName = 'Échec de validation lors de la création';
        const functionName = 'createEmployeeHandler - erreur de validation';
        printTestStart(testName, functionName);

        // Arrange
        const invalidEmployee: EmployeeData = { ...validEmployee, email: '', name: '' };
        const expected_success = false;
        const expected_fieldErrors = ['name', 'email'];
        const expected_errors = ['Certains champs sont incomplets ou contiennent des erreurs. Veuillez corriger les champs concernés.'];

        // Act
        const result = await createEmployeeHandler(invalidEmployee);
        const returned_success = result.success;
        const returned_fieldErrors = Object.keys(result.fieldErrors ?? {});
        const returned_errors = result.errors;

        // Assert
        expect(returned_success).toBe(expected_success);
        expect(returned_fieldErrors).toEqual(expect.arrayContaining(expected_fieldErrors));
        expect(returned_errors).toStrictEqual(expected_errors);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, fieldErrors = ${JSON.stringify(expected_fieldErrors)}, errors = ${JSON.stringify(expected_errors)}`);
        console.log(`Résultat reçu    : success = ${returned_success}, fieldErrors = ${JSON.stringify(returned_fieldErrors)}, errors = ${JSON.stringify(returned_errors)}`);
        console.log(`État du test     : ${(returned_success === expected_success && returned_fieldErrors.includes('email') && returned_fieldErrors.includes('name')) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });
});

// ============================================================================
// ⚠️ TEST 3 : Exception levée par l’adaptateur
// ============================================================================
describe('createEmployeeHandler - Exception levée', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('retourne une erreur si l’adaptateur lance une exception', async () => {
        const testName = 'Exception levée lors de la création';
        const functionName = 'createEmployeeHandler - exception';
        printTestStart(testName, functionName);

        // Arrange
        const adapterModule = (await import('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter')) as {
            HttpEmployeeApiAdapter: new () => any;
            __createEmployeeMock: ReturnType<typeof vi.fn>;
        };

        const createEmployeeMock = adapterModule.__createEmployeeMock;
        createEmployeeMock.mockRejectedValueOnce(new Error('Erreur inattendue'));

        const expected_success = false;
        const expected_errors = ['Erreur inattendue'];

        // Act
        const result = await createEmployeeHandler(validEmployee);
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
