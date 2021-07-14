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
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
async def read_root():
    """Check if server is running."""
    return {'message': 'Server is running'}


@app.get('/anime/{query:path}', response_model=Anime)
async def read_anime(query: str):
    """Get anime data by name."""
    anime = get_anime(query)
    return anime


@app.get('/manga/{query:path}', response_model=Manga)
async def read_manga(query: str):
    """Get manga data by name."""
    manga = get_manga(query)
    return manga


@app.get('/ln/{query:path}', response_model=LightNovel)
@app.get('/light_novel/{query:path}', response_model=LightNovel)
async def read_light_novel(query: str):
    """Get light novel data by name."""
    light_novel = get_light_novel(query)
    return light_novel


@app.get('/vn/{query:path}', response_model=VisualNovel)
@app.get('/visual_novel/{query:path}', response_model=VisualNovel)
async def read_visual_novel(query: str):
    """Get visual novel data by name."""
    visual_novel = get_visual_novel(query)
    return visual_novel


@app.get('/doujin/{query:path}', response_model=Doujin)
async def read_doujin(query: int):
    """Get doujin data by ID."""
    doujin = get_doujin(query)
    return doujin
