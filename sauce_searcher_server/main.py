from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from sauce_searcher_server.api import (
    get_anime,
    get_doujin,
    get_light_novel,
    get_manga,
    get_visual_novel,
)
from sauce_searcher_server.models import Anime, Doujin, LightNovel, Manga, VisualNovel

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
def read_manga(query: str) -> Manga:
    """Get manga data by name."""
    manga = get_manga(query)
    return manga


@app.get('/ln/{query:path}', name='path-convertor')
def read_ln(query: str) -> LightNovel:
    """Get light novel data by name."""
    light_novel = get_light_novel(query)
    return light_novel


@app.get('/vn/{query:path}', name='path-convertor')
def read_vn(query: str) -> VisualNovel:
    """Get visual novel data by name."""
    visual_novel = get_visual_novel(query)
    return visual_novel


@app.get('/doujin/{query:path}', name='path-convertor')
def read_doujin(query: int) -> Doujin:
    """Get doujin data by ID."""
    doujin = get_doujin(query)
    return doujin
