from fastapi.testclient import TestClient


def test_invalid_path(test_app: TestClient):
    response = test_app.get('/invalid')
    assert response.status_code == 404


def test_validation(test_app: TestClient):
    response = test_app.get('/doujin/words')
    assert response.status_code == 422


def test_not_found(test_app: TestClient):
    response = test_app.get('/doujin/123456789')
    assert response.status_code == 404
