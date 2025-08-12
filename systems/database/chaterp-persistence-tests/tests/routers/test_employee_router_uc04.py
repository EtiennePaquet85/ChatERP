# systems/database/chaterp-persistence-tests/tests/routers/test_employee_router_uc04.py

import pytest
from fastapi.testclient import TestClient
from fastapi import FastAPI
from unittest.mock import AsyncMock, patch
from src.routers.employee_router import router

FILENAME = "test_employee_router_uc04.py"

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


# ============================================================================
# ✅ TEST 1 : Succès de la suppression d’un employé
# ============================================================================
@patch("src.managers.employee_manager.EmployeeManager.delete_employee", new_callable=AsyncMock)
def test_delete_employee_success(mock_delete):
    test_name = "Succès de la suppression d’un employé"
    function_name = "test_delete_employee_success"
    print_test_start(test_name, function_name)

    # Arrange
    employee_id = 3
    expected_status = 200
    expected_message = "Employé supprimé avec succès."
    mock_delete.return_value = True

    # Act
    response = client.delete(f"/api/employees/{employee_id}")
    returned_status = response.status_code
    returned_data = response.json()
    returned_message = returned_data.get("message")

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_message == expected_message, f"Expected message '{expected_message}', got '{returned_message}'"

    # Display
    print(f"Message attendu : {expected_message}")
    print(f"Message reçu    : {returned_message}")
    print(f"État du test    : {'Passed ✅' if returned_message == expected_message else 'Failed ❌'}")

    print_test_end(test_name)


# ============================================================================
# ❌ TEST 2 : Échec de suppression (employé introuvable)
# ============================================================================
@patch("src.managers.employee_manager.EmployeeManager.delete_employee", new_callable=AsyncMock)
def test_delete_employee_not_found(mock_delete):
    test_name = "Échec de suppression (employé introuvable)"
    function_name = "test_delete_employee_not_found"
    print_test_start(test_name, function_name)

    # Arrange
    employee_id = 999
    expected_status = 404
    expected_detail = "Employé introuvable."
    mock_delete.return_value = False

    # Act
    response = client.delete(f"/api/employees/{employee_id}")
    returned_status = response.status_code
    returned_detail = response.json().get("detail")

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_detail == expected_detail, f"Expected detail '{expected_detail}', got '{returned_detail}'"

    # Display
    print(f"Code HTTP attendu : {expected_status}")
    print(f"Code HTTP reçu    : {returned_status}")
    print(f"Message attendu   : {expected_detail}")
    print(f"Message reçu      : {returned_detail}")
    print(f"État du test      : {'Passed ✅' if returned_status == expected_status and returned_detail == expected_detail else 'Failed ❌'}")

    print_test_end(test_name)


# ============================================================================
# ⚠️ TEST 3 : Exception levée lors de la suppression
# ============================================================================
@patch("src.managers.employee_manager.EmployeeManager.delete_employee", new_callable=AsyncMock)
def test_delete_employee_internal_error(mock_delete):
    test_name = "Exception levée lors de la suppression"
    function_name = "test_delete_employee_internal_error"
    print_test_start(test_name, function_name)

    # Arrange
    employee_id = 4
    expected_status = 500
    expected_message = "mockMessage - Erreur serveur"
    mock_delete.side_effect = Exception(expected_message)

    # Act
    response = client.delete(f"/api/employees/{employee_id}")
    returned_status = response.status_code
    returned_detail = response.json().get("detail")

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert expected_message in returned_detail, f"Expected message to contain '{expected_message}', got '{returned_detail}'"

    # Display
    print(f"Résultat attendu : HTTP {expected_status} avec message contenant '{expected_message}'")
    print(f"Résultat reçu    : HTTP {returned_status} avec message = '{returned_detail}'")
    print(f"État du test     : {'Passed ✅' if returned_status == expected_status and expected_message in returned_detail else 'Failed ❌'}")

    print_test_end(test_name)
