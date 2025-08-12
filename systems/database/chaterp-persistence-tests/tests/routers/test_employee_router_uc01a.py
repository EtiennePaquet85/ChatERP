# systems/database/chaterp-persistence-tests/tests/routers/test_employee_router_uc01a.py

import pytest
from fastapi.testclient import TestClient
from fastapi import FastAPI
from unittest.mock import AsyncMock, patch
from src.routers.employee_router import router

FILENAME = "test_employee_router_uc01a.py"

# Création d’une app FastAPI temporaire dédiée au test du routeur
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

def get_sample_employee():
    return {
        "name": "John Doe",
        "email": "john@example.com",
        "role": "Développeur",
        "phone": "1234567",
        "address": "123 rue principale",
        "department": "IT",
        "manager": "Michael",
        "status": "Actif",
        "hireDate": "2023-01-01",
        "photoUrl": "http://url/photo.jpg"
    }

# ============================================================================
# ✅ TEST 1 : Création réussie
# ============================================================================
@patch("src.managers.employee_manager.EmployeeManager.create_employee", new_callable=AsyncMock)
def test_create_employee_success(mock_create_employee):
    test_name = "Succès de la création d’un employé"
    function_name = "test_create_employee_success"
    print_test_start(test_name, function_name)

    # Arrange
    expected_id = 1
    expected_message = "Employé créé avec succès."
    mock_create_employee.return_value = expected_id

    # Act
    response = client.post("/api/employees", json=get_sample_employee())
    returned_status = response.status_code
    data = response.json()
    returned_message = data.get("message")
    returned_id = data.get("id")

    # Assert
    assert returned_status == 201, f"Expected 201, got {returned_status}"
    assert returned_message == expected_message, f"Expected message '{expected_message}', got '{returned_message}'"
    assert isinstance(returned_id, int), f"Expected id to be int, got {type(returned_id)}"

    # Display
    print(f"Résultat attendu : message = '{expected_message}', id = {expected_id}")
    print(f"Résultat reçu    : message = '{returned_message}', id = {returned_id}")
    print(f"État du test     : {'Passed ✅' if returned_message == expected_message and isinstance(returned_id, int) else 'Failed ❌'}")

    print_test_end(test_name)

# ============================================================================
# ❌ TEST 2 : Échec si email dupliqué
# ============================================================================
@patch("src.managers.employee_manager.EmployeeManager.create_employee", new_callable=AsyncMock)
def test_create_employee_duplicate_email(mock_create_employee):
    test_name = "Échec de validation lors de la création"
    function_name = "test_create_employee_duplicate_email"
    print_test_start(test_name, function_name)

    # Arrange
    expected_status = 400
    expected_detail = "Le courriel est déjà utilisé."
    mock_create_employee.return_value = None

    # Act
    response = client.post("/api/employees", json=get_sample_employee())
    returned_status = response.status_code
    returned_detail = response.json().get("detail")

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_detail == expected_detail, f"Expected detail '{expected_detail}', got '{returned_detail}'"

    # Display
    print(f"Résultat attendu : {expected_detail}")
    print(f"Résultat reçu    : {returned_detail}")
    print(f"État du test     : {'Passed ✅' if returned_detail == expected_detail else 'Failed ❌'}")

    print_test_end(test_name)

# ============================================================================
# ⚠️ TEST 3 : Erreur inattendue simulée
# ============================================================================
@patch("src.managers.employee_manager.EmployeeManager.create_employee", new_callable=AsyncMock)
def test_create_employee_internal_error(mock_create_employee):
    test_name = "Exception levée lors de la création"
    function_name = "test_create_employee_internal_error"
    print_test_start(test_name, function_name)

    # Arrange
    expected_status = 500
    expected_message = "mockMessage - Erreur inattendue"
    mock_create_employee.side_effect = Exception(expected_message)

    # Act
    response = client.post("/api/employees", json=get_sample_employee())
    returned_status = response.status_code
    returned_message = response.json().get("detail")  # <-- extrait juste le message

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_message == expected_message, f"Expected message '{expected_message}', got '{returned_message}'"

    # Display
    print(f"Résultat attendu : HTTP {expected_status} avec message '{expected_message}'")
    print(f"Résultat reçu    : HTTP {returned_status} avec message '{returned_message}'")
    print(f"État du test     : {'Passed ✅' if returned_status == expected_status and returned_message == expected_message else 'Failed ❌'}")

    print_test_end(test_name)
