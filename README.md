# Sauce Searcher Server

Rest API server using [FastAPI](https://fastapi.tiangolo.com/) for Python to perform HTTP GET requests to get JSON search results for anime, manga, light novels, visual novels, and doujins.

## Installation

Clone the repository.

```bash
git clone https://github.com/f4str/sauce-searcher-server
```

Change directories into the folder.

```bash
cd sauce-searcher-server
```

Install Python and create a virtual environment.

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies using pip.

```bash
pip install -e .[dev]
```

## Staring the server

Use the shell script `run.sh` to start the server.

```bash
./run.sh
```

Or use uvicorn to launch start the server manually

```bash
uvicorn sauce_searcher_server.main:app --port 8000 --reload
```

The server will start on port <http://localhost:8000> if a specific port has not been specified.

## Making API calls

You can make API calls to search for anime, manga, light novels, visual novels, and doujins using the appropriate routes described below. Spaces and special characters are allowed.

### Anime

```http
http://localhost:8000/anime/{name}
```

Examples:

* `http://localhost:8000/anime/death note`
* `http://localhost:8000/anime/steins;gate`
* `http://localhost:8000/anime/re/zero`

### Manga

```http
http://localhost:8000/manga/{name}
```

Examples:

* `http://localhost:8000/manga/fullmetal alchemist`
* `http://localhost:8000/manga/tokyo ghoul`
* `http://localhost:8000/manga/a silent voice`

### Light Novels

```http
http://localhost:8000/ln/{name}
```

Examples:

* `http://localhost:8000/ln/overlord`
* `http://localhost:8000/ln/konosuba`
* `http://localhost:8000/ln/your name`

### Visual Novels

```http
http://localhost:8000/vn/{name}
```

Examples:

* `http://localhost:8000/vn/clannad`
* `http://localhost:8000/vn/kuroinu`
* `http://localhost:8000/vn/steins;gate`

### Doujin

```http
http://localhost:8000/doujin/{digits}
```

Examples:

* `http://localhost:8000/doujin/184806`
* `http://localhost:8000/doujin/50478`
* `http://localhost:8000/doujin/329071`

## Disclaimers

Depending on the number of requests made, you may be throttled or IP banned from the respective site. I am not responsible for any misuse of the server or any of its services.
