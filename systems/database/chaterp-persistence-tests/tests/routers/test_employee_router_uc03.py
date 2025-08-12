# systems/database/chaterp-persistence-tests/tests/routers/test_employee_router_uc03.py

import pytest
from fastapi.testclient import TestClient
from fastapi import FastAPI
from unittest.mock import AsyncMock, patch
from src.routers.employee_router import router
from src.schemas.employee_schemas import EmployeeData

FILENAME = "test_employee_router_uc03.py"

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

def get_sample_employee_data():
    return {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "role": "Designer",
        "phone": "7654321",
        "address": "456 avenue secondaire",
        "department": "Design",
        "manager": "Dwight",
        "status": "Actif",
        "hireDate": "2022-06-15",
        "photoUrl": "http://url/photo2.jpg"
    }

# ============================================================================ 
# ✅ TEST 1 : Succès de la mise à jour d’un employé
# ============================================================================ 
@patch("src.managers.employee_manager.EmployeeManager.update_employee", new_callable=AsyncMock)
def test_update_employee_success(mock_update):
    test_name = "Succès de la mise à jour d’un employé"
    function_name = "test_update_employee_success"
    print_test_start(test_name, function_name)

    # Arrange
    employee_id = 2
    employee_data = get_sample_employee_data()
    expected_status = 200
    expected_message = "Employé mis à jour avec succès."
    mock_update.return_value = True

    # Act
    response = client.put(f"/api/employees/{employee_id}", json=employee_data)
    returned_status = response.status_code
    returned_data = response.json()

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_data.get("message") == expected_message, f"Expected message '{expected_message}', got '{returned_data.get('message')}'"

    # Display
    print(f"Message attendu : {expected_message}")
    print(f"Message reçu    : {returned_data.get('message')}")
    print(f"État du test   : {'Passed ✅' if returned_data.get('message') == expected_message else 'Failed ❌'}")

    print_test_end(test_name)

# ============================================================================ 
# ❌ TEST 2 : Échec de mise à jour (employé introuvable ou courriel déjà utilisé)
# ============================================================================ 
@patch("src.managers.employee_manager.EmployeeManager.update_employee", new_callable=AsyncMock)
def test_update_employee_not_found_or_conflict(mock_update):
    test_name = "Échec de mise à jour (employé introuvable ou courriel déjà utilisé)"
    function_name = "test_update_employee_not_found_or_conflict"
    print_test_start(test_name, function_name)

    # Arrange
    employee_id = 999
    employee_data = get_sample_employee_data()
    expected_status = 404
    expected_detail = "Employé introuvable ou courriel déjà utilisé par un autre employé."
    mock_update.return_value = False

    # Act
    response = client.put(f"/api/employees/{employee_id}", json=employee_data)
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
# ⚠️ TEST 3 : Exception levée (erreur serveur)
# ============================================================================ 
@patch("src.managers.employee_manager.EmployeeManager.update_employee", new_callable=AsyncMock)
def test_update_employee_internal_error(mock_update):
    test_name = "Exception levée lors de la mise à jour"
    function_name = "test_update_employee_internal_error"
    print_test_start(test_name, function_name)

    # Arrange
    employee_id = 2
    employee_data = get_sample_employee_data()
    expected_status = 500
    expected_message = "mockMessage - Erreur inattendue"
    mock_update.side_effect = Exception(expected_message)

    # Act
    response = client.put(f"/api/employees/{employee_id}", json=employee_data)
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
