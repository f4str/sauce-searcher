from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sauce_searcher_server.api import get_anime
from sauce_searcher_server.models import Anime

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
def read_root():
    """Check if server is running."""
    return {'message': 'Server is running'}


@app.get('/anime/{query:path}', name='path-convertor')
def read_anime(query: str) -> Anime:
    """Get anime data by name."""
    anime = get_anime(query)
    return anime


@app.get('/manga/{query:path}', name='path-convertor')
def read_manga(query: str):
    """Get manga data by name."""
    return {'manga': query}


@app.get('/ln/{query:path}', name='path-convertor')
def read_ln(query: str):
    """Get light novel data by name."""
    return {'ln': query}


@app.get('/vn/{query:path}', name='path-convertor')
def read_vn(query: str):
    """Get visual novel data by name."""
    return {'vn': query}


@app.get('/doujin/{query:path}', name='path-convertor')
def read_doujin(query: int):
    """Get doujin data by ID."""
    return {'doujin': query}
