# Sauce Searcher Server

The server creates a REST API using `FastAPI` for `Python` to perform HTTP GET requests to get JSON search results for anime, manga, light novels, visual novels, and doujins. Each request performs another API call to the query the information.

Although the server is required for the client, it can be run independently and used for any other application.

## Installation

Ensure `Python`, `pip`, and `venv` are installed.

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

Clone the repository.

```bash
git clone https://github.com/f4str/sauce-searcher
```

Change directories into this folder.

```bash
cd sauce-searcher/server
```

Create a virtual environment using `venv`.

```bash
python3 -m venv venv
source venv/bin/activate
```

Install all dependencies using `pip`.

```bash
pip install -e .[dev]
```

## Staring the server

Use the shell script `run.sh` to start the server.

```bash
./run.sh [--port PORT] [--host HOST]
```

Or use `uvicorn` to launch start the server manually.

```bash
uvicorn sauce_searcher_server.main:app [--port PORT] [--host HOST] --reload
```

The server will start on <http://localhost:8000> if the port and host are not specified. The `--reload` option restarts the server when files are changed. Omit this flag when running a production build.

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

### Light Novel

```http
http://localhost:8000/light_novel/{name}
http://localhost:8000/ln/{name}
```

Examples:

* `http://localhost:8000/ln/overlord`
* `http://localhost:8000/ln/konosuba`
* `http://localhost:8000/ln/your name`

### Visual Novel

```http
http://localhost:8000/visual_novel/{name}
http://localhost:8000/vn/{name}
```

Examples:

* `http://localhost:8000/vn/clannad`
* `http://localhost:8000/vn/kuroinu`
* `http://localhost:8000/vn/ef - a fairy tale of two`

### Doujin

```http
http://localhost:8000/doujin/{digits}
```

Examples:

* `http://localhost:8000/doujin/184806`
* `http://localhost:8000/doujin/50478`
* `http://localhost:8000/doujin/329071`

## Testing

The `tox` library is used to run all tests and code formatting. This is automatically installed with the dev requirements. The available options are as follows:

* Run linting checks using `flake8`

    ```bash
    tox -e lint
    ```

* Run type checks using `mypy`

    ```bash
    tox -e type
    ```

* Run unit tests `pytest`

    ```bash
    tox -e test
    ```

* Run all three of the tests above

    ```bash
    tox
    ```

* Format the code using `black` and `isort` to comply with linting conventions

    ```bash
    tox -e format
    ```

## Development

Upon pull request, merge, or push to the `master` branch, the three tests with `tox` will be run using GitHub Actions. The workflow will fail if any of the tests fail. See `.github/workflows` for more information on how the CI works.

Upon merge or push to the `master` branch, the server will be deployed to Heroku if the three tests with `tox` pass.

## Disclaimers

Depending on the number of requests made, you may be throttled or IP banned from the respective site. I am not responsible for any misuse of the server or any of its services.
