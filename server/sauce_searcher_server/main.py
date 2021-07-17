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
async def read_status():
    """Check if server is running."""
    return {'message': 'Server is running'}


@app.get('/anime/{name:path}', response_model=Anime)
async def read_anime(name: str):
    """Get anime data by name."""
    anime = get_anime(name)
    return anime


@app.get('/manga/{name:path}', response_model=Manga)
async def read_manga(name: str):
    """Get manga data by name."""
    manga = get_manga(name)
    return manga


@app.get('/ln/{name:path}', response_model=LightNovel)
@app.get('/light_novel/{name:path}', response_model=LightNovel)
async def read_light_novel(name: str):
    """Get light novel data by name."""
    light_novel = get_light_novel(name)
    return light_novel


@app.get('/vn/{name:path}', response_model=VisualNovel)
@app.get('/visual_novel/{name:path}', response_model=VisualNovel)
async def read_visual_novel(name: str):
    """Get visual novel data by name."""
    visual_novel = get_visual_novel(name)
    return visual_novel


@app.get('/doujin/{digits:path}', response_model=Doujin)
async def read_doujin(digits: int):
    """Get doujin data by digits."""
    doujin = get_doujin(digits)
    return doujin
