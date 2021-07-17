from fastapi.testclient import TestClient


def test_status(test_app: TestClient):
    response = test_app.get('/')
    assert response.status_code == 200
    assert response.json() == {'message': 'Server is running'}


def test_anime(test_app: TestClient):
    response = test_app.get('/anime/death note')
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_manga(test_app: TestClient):
    response = test_app.get('/manga/fullmetal alchemist')
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_ln(test_app: TestClient):
    response = test_app.get('/ln/overlord')
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_vn(test_app: TestClient):
    response = test_app.get('/vn/clannad')
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_doujin(test_app: TestClient):
    response = test_app.get('/doujin/177013')
    assert response.status_code == 200
    assert len(response.json()) > 0
