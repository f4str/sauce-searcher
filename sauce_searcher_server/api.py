from enum import Enum

from fastapi import HTTPException
import requests

from sauce_searcher_server.constants import (
    ANIME_ID_QUERY,
    ANIME_NAME_QUERY,
    LIGHT_NOVEL_ID_QUERY,
    LIGHT_NOVEL_NAME_QUERY,
    MANGA_ID_QUERY,
    MANGA_NAME_QUERY,
)
from sauce_searcher_server.models import Anime, Doujin, LightNovel, Manga, VisualNovel
from sauce_searcher_server.utils import parse_anime


class QueryType(str, Enum):
    anime = 'Anime'
    manga = 'Manga'
    light_novel = 'Light novel'
    visual_novel = 'Visual Novel'
    doujin = 'Doujin'


def get_mal_id(query: str, query_type: QueryType) -> int:
    if query_type == QueryType.anime:
        url = ANIME_NAME_QUERY + query
    elif query_type == QueryType.manga:
        url = MANGA_NAME_QUERY + query
    elif query_type == QueryType.light_novel:
        url = LIGHT_NOVEL_NAME_QUERY + query
    else:
        raise ValueError(f'MAL ID does not exist for {query_type}')

    response = requests.get(url)
    if response.ok:
        result = response.json()
        search_results = result['results']
        if search_results:
            mal_id = search_results[0]['mal_id']
            return mal_id
        else:
            raise HTTPException(status_code=404, detail=f'{query_type} name not found')
    else:
        raise HTTPException(status_code=response.status_code, detail=response.reason)


def get_anime(query: str) -> Anime:
    mal_id = get_mal_id(query, QueryType.anime)
    url = ANIME_ID_QUERY + str(mal_id)

    response = requests.get(url)
    if response.ok:
        result = response.json()
        anime = parse_anime(result)
        return anime
    else:
        raise HTTPException(status_code=404, detail='Anime not found')
