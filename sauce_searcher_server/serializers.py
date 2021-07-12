import datetime
import json
import os
from typing import Any, Dict, List

from sauce_searcher_server.constants import DOUJIN_BASE_IMAGE, DOUJIN_BASE_URL, VISUAL_NOVEL_BASE_URL, VISUAL_NOVEL_TAGS_FILE
from sauce_searcher_server.models import (
    Anime,
    Doujin,
    DoujinTag,
    LightNovel,
    MALEntry,
    Manga,
    VisualNovel,
    VisualNovelTag,
)


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


def format_tag(tag: DoujinTag) -> str:
    name = tag.name
    count = tag.count
    return f'{name} ({count:,})'


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
    url = f'{VISUAL_NOVEL_BASE_URL}{data["id"]}'
    released = datetime.datetime.fromisoformat(data['released'])
    lewd_image = data['image_flagging'] and data['image_flagging']['sexual_avg'] > 1
    violent_image = data['image_flagging'] and data['image_flagging']['violence_avg'] > 1
    image_nsfw = lewd_image or violent_image
    anime = bool(data['anime'])
    staff = [x['name'] for x in data.get('staff', []) if x['role'].lower() == 'staff']

    lengths = [
        'N/A',
        'Very short (<2 hours)',
        'Short (2 - 10 hours)',
        'Medium (10 - 30 hours)',
        'Long (30 - 50 hours)',
        'Very long (>50 hours)',
    ]
    length = lengths[data.get('length', 0)]

    dir_path = os.path.dirname(os.path.realpath(__file__))
    with open(os.path.join(dir_path, VISUAL_NOVEL_TAGS_FILE)) as f:
        tag_mappings = json.load(f)

    tags: List[VisualNovelTag] = []
    for tag in data.get('tags', []):
        vn_tag = VisualNovelTag(id=tag[0], score=tag[1], spoiler=tag[2])
        vn_tag.name = tag_mappings.get(str(vn_tag.id))
        if vn_tag.name and vn_tag.spoiler < 2:
            tags.append(vn_tag)

    sorted_tags = sorted(tags, key=lambda t: t.score)
    parsed_tags = [tag.name for tag in sorted_tags]

    visual_novel = VisualNovel(
        id=data['id'],
        title=data['title'],
        url=url,
        released=released,
        description=data['description'],
        image=data['image'],
        image_nsfw=image_nsfw,
        tags=parsed_tags,
        staff=staff,
        anime=anime,
        length=length,
        score=data['rating'],
        languages=data['languages'],
    )
    return visual_novel


def parse_doujin(data: Dict[str, Any]) -> Doujin:
    url = f'{DOUJIN_BASE_URL}{data["id"]}'
    image = f'{DOUJIN_BASE_IMAGE}{data["media_id"]}/thumb.jpg'
    upload_date = datetime.datetime.fromtimestamp(data['upload_date'])
    tags: List[str] = []
    languages: List[str] = []
    artists: List[str] = []
    categories: List[str] = []
    parodies: List[str] = []
    characters: List[str] = []
    groups: List[str] = []

    all_tags = data.get('tags', [])
    for tag in all_tags:
        doujin_tag = DoujinTag(**tag)
        formatted_tag = format_tag(doujin_tag)
        type = doujin_tag.type.lower()
        if type == 'tag':
            tags.append(formatted_tag)
        elif type == 'language':
            languages.append(formatted_tag)
        elif type == 'artist':
            artists.append(formatted_tag)
        elif type == 'category':
            categories.append(formatted_tag)
        elif type == 'parody':
            parodies.append(formatted_tag)
        elif type == 'character':
            characters.append(formatted_tag)
        elif type == 'group':
            groups.append(formatted_tag)

    doujin = Doujin(
        id=data['id'],
        title=data['title']['pretty'],
        full_title=data['title']['english'],
        url=url,
        image=image,
        pages=data['num_pages'],
        upload_date=upload_date,
        tags=tags,
        languages=languages,
        artists=artists,
        categories=categories,
        parodies=parodies,
        characters=characters,
        groups=groups,
    )
    return doujin
