# systems/database/chaterp-persistence-tests/tests/routers/test_employee_router_uc02b.py

import pytest
from fastapi.testclient import TestClient
from fastapi import FastAPI, UploadFile
from unittest.mock import AsyncMock, patch, MagicMock
from src.routers.employee_router import router
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException

FILENAME = "test_employee_router_uc02b.py"

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
    }

# ============================================================================
# ✅ TEST 1 : Succès de la récupération d’un employé par ID
# ============================================================================
@patch("src.managers.employee_manager.EmployeeManager.get_employee_by_id", new_callable=AsyncMock)
def test_get_employee_by_id_success(mock_get_by_id):
    test_name = "Employé trouvé avec succès par ID"
    function_name = "test_get_employee_by_id_success"
    print_test_start(test_name, function_name)

    # Arrange
    employee_id = 1
    expected_status = 200
    expected_employee = get_sample_employee()
    mock_get_by_id.return_value = expected_employee

    # Act
    response = client.get(f"/api/employees/{employee_id}")
    returned_status = response.status_code
    returned_data = response.json()

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_data == expected_employee, f"Expected employee data does not match returned data"

    # Display
    print(f"ID attendu : {expected_employee['id']}")
    print(f"ID reçu   : {returned_data['id']}")
    print(f"Nom attendu : {expected_employee['name']}")
    print(f"Nom reçu  : {returned_data['name']}")
    print(f"Rôle attendu : {expected_employee['role']}")
    print(f"Rôle reçu : {returned_data['role']}")
    print(f"État du test : {'Passed ✅' if returned_data == expected_employee else 'Failed ❌'}")

    print_test_end(test_name)

# ============================================================================
# ❌ TEST 2 : Employé introuvable par ID
# ============================================================================
@patch("src.managers.employee_manager.EmployeeManager.get_employee_by_id", new_callable=AsyncMock)
def test_get_employee_by_id_not_found(mock_get_by_id):
    test_name = "Employé introuvable par ID"
    function_name = "test_get_employee_by_id_not_found"
    print_test_start(test_name, function_name)

    # Arrange
    employee_id = 999
    expected_status = 404
    expected_detail = "Employé introuvable."
    mock_get_by_id.return_value = None

    # Act
    response = client.get(f"/api/employees/{employee_id}")
    returned_status = response.status_code
    returned_detail = response.json().get("detail")

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_detail == expected_detail, f"Expected detail '{expected_detail}', got '{returned_detail}'"

    # Display
    print(f"Code HTTP attendu   : {expected_status}")
    print(f"Code HTTP reçu      : {returned_status}")
    print(f"Message attendu     : {expected_detail}")
    print(f"Message reçu        : {returned_detail}")
    print(f"État du test        : {'Passed ✅' if returned_status == expected_status and returned_detail == expected_detail else 'Failed ❌'}")

    print_test_end(test_name)

# ============================================================================
# ⚠️ TEST 3 : Exception levée (erreur serveur)
# ============================================================================
@patch("src.managers.employee_manager.EmployeeManager.get_employee_by_id", new_callable=AsyncMock)
def test_get_employee_by_id_internal_error(mock_get_by_id):
    test_name = "Exception levée lors de la récupération par ID"
    function_name = "test_get_employee_by_id_internal_error"
    print_test_start(test_name, function_name)

    # Arrange
    employee_id = 1
    expected_status = 500
    expected_message = "mockMessage - Erreur inattendue"
    mock_get_by_id.side_effect = Exception(expected_message)

    # Act
    response = client.get(f"/api/employees/{employee_id}")
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

# ============================================================================
# ⚠️ TEST 4 : Exception HTTP levée dans manager.upload_employee_photo
# ============================================================================
@patch("src.managers.employee_manager.EmployeeManager.upload_employee_photo", new_callable=AsyncMock)
def test_upload_employee_photo_raises_http_exception(mock_upload_photo):
    test_name = "Exception HTTP levée dans manager.upload_employee_photo"
    function_name = "test_upload_employee_photo_raises_http_exception"
    print_test_start(test_name, function_name)

    # Arrange
    mock_upload_photo.side_effect = HTTPException(status_code=403, detail="Accès refusé")
    dummy_file = ("file", ("photo.jpg", b"dummy content", "image/jpeg"))

    # Act
    response = client.post("/api/employees/photo-upload", files=[dummy_file])
    returned_status = response.status_code
    returned_detail = response.json().get("detail")

    # Assert
    assert returned_status == 403
    assert returned_detail == "Accès refusé"

    # Display
    print(f"Code HTTP attendu   : 403")
    print(f"Code HTTP reçu      : {returned_status}")
    print(f"Message attendu     : Accès refusé")
    print(f"Message reçu        : {returned_detail}")
    print(f"État du test        : {'Passed ✅' if returned_status == 403 and returned_detail == 'Accès refusé' else 'Failed ❌'}")

    print_test_end(test_name)
