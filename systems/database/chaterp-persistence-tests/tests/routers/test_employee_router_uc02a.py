# systems/database/chaterp-persistence-tests/tests/routers/test_employee_router_uc02a.py

import pytest
from fastapi.testclient import TestClient
from fastapi import FastAPI
from unittest.mock import AsyncMock, patch
from src.routers.employee_router import router

FILENAME = "test_employee_router_uc02a.py"

app = FastAPI()
app.include_router(router)
client = TestClient(app)

def print_test_start(test_name: str, function_name: str):
    print()
    print(f"====================================================================")
    print(f"Début test - {test_name}")
    print(f"--------------------------------------------------------------------")
    print(f"📄  File  : {FILENAME}")
    print(f"▶️  Func  : {function_name}")

def print_test_end(test_name: str):
    print(f"--------------------------------------------------------------------")
    print(f"Fin test - {test_name}")
    print(f"====================================================================")

def get_sample_employees():
    return [
        {
            "id": 1,
            "name": "Alice Martin",
            "email": "alice@example.com",
            "role": "Développeuse",
            "phone": "514-123-4567",
            "address": "123 rue Principale, Montréal",
            "department": "TI",
            "manager": "Jean Dupuis",
            "status": "Actif",
            "hireDate": "2023-01-15",
            "photoUrl": "https://example.com/photos/alice.jpg"
        },
        {
            "id": 2,
            "name": "Bob",
            "email": "bob@example.com",
            "role": "Designer",
            "phone": "514-987-6543",
            "address": "456 avenue des Arts, Montréal",
            "department": "Marketing",
            "manager": "Julie Tremblay",
            "status": "Actif",
            "hireDate": "2022-08-01",
            "photoUrl": "https://example.com/photos/bob.jpg"
        }
    ]

# ============================================================================ 
# ✅ TEST 1 : Succès de la récupération de tous les employés
# ============================================================================ 
@patch("src.managers.employee_manager.EmployeeManager.get_all_employees", new_callable=AsyncMock)
def test_get_all_employees_success(mock_get_all):
    test_name = "Succès de la consultation de tous les employés"
    function_name = "test_get_all_employees_success"
    print_test_start(test_name, function_name)

    # Arrange
    mock_get_all.return_value = get_sample_employees()
    expected_status = 200
    expected_count = len(get_sample_employees())

    # Act
    response = client.get("/api/employees")
    returned_status = response.status_code
    returned_data = response.json()
    returned_count = len(returned_data)

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_count == expected_count, f"Expected {expected_count} employees, got {returned_count}"

    # Display
    print(f"Résultat attendu : {expected_count} employés")
    print(f"Résultat reçu    : {returned_count} employés")
    print(f"État du test     : {'Passed ✅' if returned_count == expected_count else 'Failed ❌'}")

    print_test_end(test_name)

# ============================================================================ 
# ✅ TEST 2 : Retourne liste vide si aucun employé
# ============================================================================ 
@patch("src.managers.employee_manager.EmployeeManager.get_all_employees", new_callable=AsyncMock)
def test_get_all_employees_empty_list(mock_get_all):
    test_name = "Liste vide d’employés retournée avec succès"
    function_name = "test_get_all_employees_empty_list"
    print_test_start(test_name, function_name)

    # Arrange
    expected_status = 200
    expected_data = []
    mock_get_all.return_value = expected_data

    # Act
    response = client.get("/api/employees")
    returned_status = response.status_code
    returned_data = response.json()

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert isinstance(returned_data, list) and len(returned_data) == 0, "Expected empty list"

    # Display
    print(f"Résultat attendu : {expected_data}")
    print(f"Résultat reçu    : {returned_data}")
    print(f"État du test     : {'Passed ✅' if len(returned_data) == 0 else 'Failed ❌'}")

    print_test_end(test_name)

# ============================================================================ 
# ⚠️ TEST 3 : Exception levée (erreur serveur)
# ============================================================================ 
@patch("src.managers.employee_manager.EmployeeManager.get_all_employees", new_callable=AsyncMock)
def test_get_all_employees_internal_error(mock_get_all):
    test_name = "Exception levée lors de la récupération"
    function_name = "test_get_all_employees_internal_error"
    print_test_start(test_name, function_name)

    # Arrange
    expected_status = 500
    expected_message = "mockMessage - Erreur inattendue"
    mock_get_all.side_effect = Exception(expected_message)

    # Act
    response = client.get("/api/employees")
    returned_status = response.status_code
    returned_detail = response.json().get("detail")

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_detail == expected_message, f"Expected message '{expected_message}', got '{returned_detail}'"

    # Display
    print(f"Résultat attendu : HTTP {expected_status} avec message '{expected_message}'")
    print(f"Résultat reçu    : HTTP {returned_status} avec message '{returned_detail}'")
    print(f"État du test     : {'Passed ✅' if returned_status == expected_status and returned_detail == expected_message else 'Failed ❌'}")

    print_test_end(test_name)
