from enum import Enum

from fastapi import HTTPException
import requests

from sauce_searcher_server.constants import (
    ANIME_ID_QUERY,
    ANIME_NAME_QUERY,
    DOUJIN_ID_QUERY,
    LIGHT_NOVEL_ID_QUERY,
    LIGHT_NOVEL_NAME_QUERY,
    MANGA_ID_QUERY,
    MANGA_NAME_QUERY,
    VNDB_QUERY,
)
from sauce_searcher_server.models import Anime, Doujin, LightNovel, Manga, VisualNovel
from sauce_searcher_server.serializers import (
    parse_anime,
    parse_doujin,
    parse_light_novel,
    parse_manga,
    parse_visual_novel,
)
from sauce_searcher_server.vndb import VNDBSession


class QueryType(str, Enum):
    anime = 'Anime'
    manga = 'Manga'
    light_novel = 'Light Novel'
    visual_novel = 'Visual Novel'
    doujin = 'Doujin'


def get_mal_id(query: str, query_type: QueryType) -> int:
    if query_type == QueryType.anime:
        url = f'{ANIME_NAME_QUERY}{query}'
    elif query_type == QueryType.manga:
        url = f'{MANGA_NAME_QUERY}{query}'
    elif query_type == QueryType.light_novel:
        url = f'{LIGHT_NOVEL_NAME_QUERY}{query}'
    else:
        raise ValueError(f'MAL ID does not exist for {query_type}')

    response = requests.get(url)
    if response.ok:
        data = response.json()
        results = data['results']
        if results and query_type == QueryType.anime:
            mal_id = results[0]['mal_id']
            return mal_id
        elif results:
            for result in results:
                if result['type'] == query_type:
                    return result['mal_id']

        raise HTTPException(status_code=404, detail=f'{query_type} name not found')
    else:
        raise HTTPException(status_code=response.status_code, detail=response.reason)


def get_anime(query: str) -> Anime:
    mal_id = get_mal_id(query, QueryType.anime)
    url = f'{ANIME_ID_QUERY}{mal_id}'

    response = requests.get(url)
    if response.ok:
        data = response.json()
        anime = parse_anime(data)
        return anime
    else:
        raise HTTPException(status_code=404, detail='Anime not found')


def get_manga(query: str) -> Manga:
    mal_id = get_mal_id(query, QueryType.manga)
    url = f'{MANGA_ID_QUERY}{mal_id}'

    response = requests.get(url)
    if response.ok:
        data = response.json()
        manga = parse_manga(data)
        return manga
    else:
        raise HTTPException(status_code=404, detail='Manga not found')


def get_light_novel(query: str) -> LightNovel:
    mal_id = get_mal_id(query, QueryType.light_novel)
    url = f'{LIGHT_NOVEL_ID_QUERY}{mal_id}'

    response = requests.get(url)
    if response.ok:
        data = response.json()
        light_novel = parse_light_novel(data)
        return light_novel
    else:
        raise HTTPException(status_code=404, detail='Light Novel not found')


def get_visual_novel(query: str) -> VisualNovel:
    with VNDBSession() as sess:
        sess.login()
        response = sess.get('vn', VNDB_QUERY, f'(title ~ "{query}")')

    results = response.get('items')
    if results:
        data = results[0]
        visual_novel = parse_visual_novel(data)
        return visual_novel
    else:
        raise HTTPException(status_code=404, detail='Visual Novel not found')




def get_doujin(query: int) -> Doujin:
    url = f'{DOUJIN_ID_QUERY}{query}'

    response = requests.get(url)
    if response.ok:
        data = response.json()
        doujin = parse_doujin(data)
        return doujin
    else:
        raise HTTPException(status_code=404, detail='Doujin not found')
