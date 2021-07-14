ANIME_NAME_QUERY = 'https://api.jikan.moe/v3/search/anime?q='
MANGA_NAME_QUERY = 'https://api.jikan.moe/v3/search/manga?q='
LIGHT_NOVEL_NAME_QUERY = 'https://api.jikan.moe/v3/search/manga?q='

ANIME_ID_QUERY = 'https://api.jikan.moe/v3/anime/'
MANGA_ID_QUERY = 'https://api.jikan.moe/v3/manga/'
LIGHT_NOVEL_ID_QUERY = 'https://api.jikan.moe/v3/manga/'
DOUJIN_ID_QUERY = 'https://nhentai.net/api/gallery/'

DOUJIN_BASE_URL = 'https://nhentai.net/g/'
DOUJIN_BASE_IMAGE = 'https://t.nhentai.net/galleries/'

VISUAL_NOVEL_BASE_URL = 'https://vndb.org/v'
VISUAL_NOVEL_TAGS_FILE = 'vn_tags.json'
VISUAL_NOVEL_LENGTHS = [
    'N/A',
    'Very short (<2 hours)',
    'Short (2 - 10 hours)',
    'Medium (10 - 30 hours)',
    'Long (30 - 50 hours)',
    'Very long (>50 hours)',
]

VNDB_HOSTNAME = 'api.vndb.org'
VNDB_PORT = 19534
VNDB_DELIMITER = '\x04'
VNDB_BUFFER_SIZE = 2 ** 12
VNDB_QUERY = 'basic,details,anime,tags,stats,staff'
