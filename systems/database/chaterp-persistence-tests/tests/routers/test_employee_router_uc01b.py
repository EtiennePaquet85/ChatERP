# systems/database/chaterp-persistence-tests/tests/routers/test_employee_router_uc01b.py

import pytest
from fastapi.testclient import TestClient
from fastapi import FastAPI
from unittest.mock import AsyncMock, patch
from src.routers.employee_router import router
from io import BytesIO

FILENAME = "test_employee_router_uc01b.py"

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

def create_test_file(filename="photo.jpg", content_type="image/jpeg"):
    file_content = b"fake image bytes"
    return (filename, file_content, content_type)

# ============================================================================ 
# ✅ TEST 1 : Succès du téléversement d'une photo 
# ============================================================================ 
@patch("src.managers.employee_manager.EmployeeManager.upload_employee_photo", new_callable=AsyncMock)
def test_upload_employee_photo_success(mock_upload_photo):
    test_name = "Succès du téléversement d’une photo"
    function_name = "test_upload_employee_photo_success"
    print_test_start(test_name, function_name)

    # Arrange
    filename, content, content_type = create_test_file()
    files = {"file": (filename, BytesIO(content), content_type)}
    expected_status = 200
    expected_url = "/photos/photo.jpg"
    mock_upload_photo.return_value = expected_url

    # Act
    response = client.post("/api/employees/photo-upload", files=files)
    returned_status = response.status_code
    returned_data = response.json()
    returned_url = returned_data.get("storageUrl")

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_url == expected_url, f"Expected URL '{expected_url}', got '{returned_url}'"

    # Display
    print(f"Résultat attendu : storageUrl = '{expected_url}'")
    print(f"Résultat reçu    : storageUrl = '{returned_url}'")
    print(f"État du test     : {'Passed ✅' if returned_url == expected_url else 'Failed ❌'}")

    print_test_end(test_name)

# ============================================================================ 
# ❌ TEST 2 : Format de fichier non supporté (application/pdf) 
# ============================================================================ 
def test_upload_employee_photo_invalid_format():
    test_name = "Format de fichier non supporté"
    function_name = "test_upload_employee_photo_invalid_format"
    print_test_start(test_name, function_name)

    # Arrange
    filename, content, content_type = create_test_file(content_type="application/pdf")
    files = {"file": (filename, BytesIO(content), content_type)}
    expected_status = 400
    expected_detail = "Format de fichier non supporté."

    # Act
    response = client.post("/api/employees/photo-upload", files=files)
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
# ⚠️ TEST 3 : Erreur interne simulée 
# ============================================================================ 
@patch("src.managers.employee_manager.EmployeeManager.upload_employee_photo", new_callable=AsyncMock)
def test_upload_employee_photo_internal_error(mock_upload_photo):
    test_name = "Exception levée lors du téléversement"
    function_name = "test_upload_employee_photo_internal_error"
    print_test_start(test_name, function_name)

    # Arrange
    filename, content, content_type = create_test_file()
    files = {"file": (filename, BytesIO(content), content_type)}
    expected_status = 500
    expected_message = "mockMessage - Erreur inattendue"
    mock_upload_photo.side_effect = Exception(expected_message)

    # Act
    response = client.post("/api/employees/photo-upload", files=files)
    returned_status = response.status_code
    returned_message = response.json().get("detail")  # <-- récupère le message exact

    # Assert
    assert returned_status == expected_status, f"Expected status {expected_status}, got {returned_status}"
    assert returned_message == expected_message, f"Expected message '{expected_message}', got '{returned_message}'"

    # Display
    print(f"Résultat attendu : HTTP {expected_status} avec message '{expected_message}'")
    print(f"Résultat reçu    : HTTP {returned_status} avec message '{returned_message}'")
    print(f"État du test     : {'Passed ✅' if returned_status == expected_status and returned_message == expected_message else 'Failed ❌'}")

    print_test_end(test_name)
