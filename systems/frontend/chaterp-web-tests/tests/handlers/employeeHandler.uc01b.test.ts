// systems/frontend/chaterp-web-tests/tests/handlers/employeeHandler.uc01b.test.ts

import { describe, it, expect, afterEach, vi } from 'vitest';
import { uploadEmployeePhotoHandler } from '../../../chaterp-web/src/handlers/employeeHandler';

const FILENAME = 'employeeHandler.uc01b.test.ts';

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
    const uploadEmployeePhotoMock = vi.fn().mockResolvedValue({ storageUrl: 'http://fake-url/photo.png' });

    return {
        HttpEmployeeApiAdapter: function () {
            return {
                uploadEmployeePhoto: uploadEmployeePhotoMock,
                createEmployee: vi.fn(),
                getAllEmployees: vi.fn(),
                getEmployeeById: vi.fn(),
                updateEmployee: vi.fn(),
                deleteEmployee: vi.fn(),
            };
        },
        __uploadEmployeePhotoMock: uploadEmployeePhotoMock,
    };
});

// Mock global fetch to simulate blob conversion from base64 string
globalThis.fetch = vi.fn(() =>
    Promise.resolve({
        blob: () => Promise.resolve(new Blob(['dummy'], { type: 'image/png' })),
    } as unknown as Response)
);

describe('uploadEmployeePhotoHandler - Succès', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('retourne succès avec URL pour une photo valide en base64', async () => {
        const testName = 'Succès du téléversement d’une photo';
        const functionName = 'uploadEmployeePhotoHandler - succès';
        printTestStart(testName, functionName);

        // Arrange
        const validBase64Photo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';

        const adapterModule = await import('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter');
        const adapterInstance = new adapterModule.HttpEmployeeApiAdapter();
        const expected_success = true;
        const expected_storageUrl = "http://fake-url/photo.png";

        // Act
        const result = await uploadEmployeePhotoHandler(validBase64Photo);
        const returned_success = result.success;
        const returned_storageUrl = result.storageUrl;

        // Assert
        expect(returned_success).toBe(true);
        expect(typeof returned_storageUrl).toBe('string');
        expect(returned_storageUrl).toBe(expected_storageUrl);

        expect(adapterInstance.uploadEmployeePhoto).toHaveBeenCalledOnce();

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, storageUrl = "${expected_storageUrl}"`);
        console.log(`Résultat reçu    : success = ${returned_success}, storageUrl = "${returned_storageUrl}"`);
        console.log(`État du test     : ${(returned_success === true && returned_storageUrl === expected_storageUrl) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });
});

describe('uploadEmployeePhotoHandler - Échec format invalide', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('retourne erreur si la chaîne base64 ne commence pas par "data:"', async () => {
        const testName = 'Format de photo invalide';
        const functionName = 'uploadEmployeePhotoHandler - format invalide';
        printTestStart(testName, functionName);

        // Arrange
        const invalidBase64Photo = 'invalid_base64_string_without_data_prefix';
        const expected_success = false;
        const expected_errors = ["Format d'image invalide."];

        // Act
        const result = await uploadEmployeePhotoHandler(invalidBase64Photo);
        const returned_success = result.success;
        const returned_errors = result.errors;

        // Assert
        expect(returned_success).toBe(false);
        expect(returned_errors).toEqual(expected_errors);

        // Display
        console.log(`Résultat attendu : success = ${expected_success}, errors = ${JSON.stringify(expected_errors)}`);
        console.log(`Résultat reçu    : success = ${returned_success}, errors = ${JSON.stringify(returned_errors)}`);
        console.log(`État du test     : ${(returned_success === false && returned_errors?.includes(expected_errors[0])) ? 'Passed ✅' : 'Failed ❌'}`);

        printTestEnd(testName);
    });
});

describe('uploadEmployeePhotoHandler - Exception levée par l’adaptateur', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('retourne erreur si l’adaptateur lance une exception', async () => {
        const testName = 'Exception levée lors du téléversement';
        const functionName = 'uploadEmployeePhotoHandler - exception';
        printTestStart(testName, functionName);

        // Arrange
        const adapterModule = (await import('../../../chaterp-web/src/adapters/httpEmployeeApiAdapter')) as any;
        const uploadEmployeePhotoMock = adapterModule.__uploadEmployeePhotoMock;
        uploadEmployeePhotoMock.mockRejectedValueOnce(new Error('Erreur inattendue'));

        const validBase64Photo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';
        const expected_success = false;
        const expected_errors = ['Erreur inattendue'];

        // Act
        const result = await uploadEmployeePhotoHandler(validBase64Photo);
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
