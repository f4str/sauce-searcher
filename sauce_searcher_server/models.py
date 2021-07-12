import datetime
from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class MALEntry(BaseModel):
    mal_id: int
    type: str
    name: str
    url: str


class Anime(BaseModel):
    id: int
    title: str
    title_english: str
    url: str
    image: str
    type: str
    source: str
    episodes: Optional[int] = None
    status: str
    airing: bool
    premiered: Optional[str] = None
    broadcast: Optional[str] = None
    aired: Dict[str, Any]
    duration: Optional[str] = None
    rating: Optional[str] = None
    score: Optional[float] = None
    synopsis: Optional[str] = None
    relations: Dict[str, List[str]]
    studios: List[str]
    genres: List[str]
    openings: List[str]
    endings: List[str]


class Manga(BaseModel):
    id: int
    title: str
    title_english: str
    url: str
    image: str
    type: str
    volumes: Optional[int] = None
    chapters: Optional[int] = None
    status: str
    publishing: bool
    published: Dict[str, Any]
    score: Optional[float] = None
    synopsis: Optional[str] = None
    relations: Dict[str, List[str]]
    genres: List[str]
    authors: List[str]
    serializations: List[str]


class LightNovel(BaseModel):
    id: int
    title: str
    title_english: str
    url: str
    image: str
    type: str
    volumes: Optional[int] = None
    chapters: Optional[int] = None
    status: str
    publishing: bool
    published: Dict[str, Any]
    score: Optional[float] = None
    synopsis: Optional[str] = None
    relations: Dict[str, List[str]]
    genres: List[str]
    authors: List[str]


class VisualNovel(BaseModel):
    id: int
    title: str
    url: str
    released: datetime.datetime
    description: Optional[str] = None
    image: str
    image_nsfw: bool
    tags: List[str]
    staff: List[str]
    anime: bool
    length: str
    score: Optional[float] = None
    languages: List[str]


class Doujin(BaseModel):
    id: int
    title: str
    full_title: str
    url: str
    image: str
    pages: int
    upload_date: datetime.datetime
    tags: List[str]
    languages: List[str]
    artists: List[str]
    categories: List[str]
    parodies: List[str]
    characters: List[str]
    groups: List[str]
