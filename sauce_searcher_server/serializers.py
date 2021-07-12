from typing import Any, Dict, List

from sauce_searcher_server.models import Anime, Doujin, LightNovel, MALEntry, Manga, VisualNovel


def get_title_english(data: Dict[str, Any]) -> str:
    title_english = data.get('title_english')
    if title_english:
        return title_english

    title_synonyms = data.get('title_synonyms')
    if title_synonyms:
        return title_synonyms[0]
    else:
        return data['title']


def format_mal_entry(relation: MALEntry, show_type=False) -> str:
    name = relation.name
    type = relation.type
    if show_type:
        if type == 'manga':
            type = 'manga/light novel'
        return f'{name} ({type})'
    else:
        return name


def format_song(song: str) -> str:
    start = song.index('"')
    return song[start:]


def get_relations(data: Dict[str, List[dict]]) -> Dict[str, List[str]]:
    related = data.get('related', {})
    relations = {}
    for k, v in related.items():
        relations[k] = [format_mal_entry(MALEntry(**x), True) for x in v]
    return relations


def parse_anime(data: Dict[str, Any]) -> Anime:
    title_english = get_title_english(data)
    relations = get_relations(data)
    studios = [format_mal_entry(MALEntry(**x)) for x in data.get('studios', [])]
    genres = [format_mal_entry(MALEntry(**x)) for x in data.get('genres', [])]
    openings = [format_song(x) for x in data.get('opening_themes', [])]
    endings = [format_song(x) for x in data.get('ending_themes', [])]

    anime = Anime(
        id=data['mal_id'],
        title=data['title'],
        title_english=title_english,
        url=data['url'],
        image=data['image_url'],
        type=data['type'],
        source=data['source'],
        episodes=data['episodes'],
        status=data['status'],
        airing=data['airing'],
        premiered=data['premiered'],
        broadcast=data['broadcast'],
        aired=data['aired'],
        duration=data['duration'],
        rating=data['rating'],
        score=data['score'],
        synopsis=data['synopsis'],
        relations=relations,
        studios=studios,
        genres=genres,
        openings=openings,
        endings=endings,
    )
    return anime


def parse_manga(data: Dict[str, Any]) -> Manga:
    title_english = get_title_english(data)
    relations = get_relations(data)
    genres = [format_mal_entry(MALEntry(**x)) for x in data.get('genres', [])]
    authors = [format_mal_entry(MALEntry(**x)) for x in data.get('authors', [])]
    serializations = [format_mal_entry(MALEntry(**x)) for x in data.get('serializations', [])]

    manga = Manga(
        id=data['mal_id'],
        title=data['title'],
        title_english=title_english,
        url=data['url'],
        image=data['image_url'],
        type=data['type'],
        volumes=data['volumes'],
        chapters=data['chapters'],
        status=data['status'],
        publishing=data['publishing'],
        published=data['published'],
        score=data['score'],
        synopsis=data['synopsis'],
        relations=relations,
        genres=genres,
        authors=authors,
        serializations=serializations,
    )
    return manga


def parse_light_novel(data: Dict[str, Any]) -> LightNovel:
    title_english = get_title_english(data)
    relations = get_relations(data)
    genres = [format_mal_entry(MALEntry(**x)) for x in data.get('genres', [])]
    authors = [format_mal_entry(MALEntry(**x)) for x in data.get('authors', [])]

    light_novel = LightNovel(
        id=data['mal_id'],
        title=data['title'],
        title_english=title_english,
        url=data['url'],
        image=data['image_url'],
        type=data['type'],
        volumes=data['volumes'],
        chapters=data['chapters'],
        status=data['status'],
        publishing=data['publishing'],
        published=data['published'],
        score=data['score'],
        synopsis=data['synopsis'],
        relations=relations,
        genres=genres,
        authors=authors,
    )
    return light_novel


def parse_visual_novel(data: Dict[str, Any]) -> VisualNovel:
    pass


def parse_doujin(data: Dict[str, Any]) -> Doujin:
    pass
