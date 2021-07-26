# Sauce Searcher

Sauce searcher is a web interface used to search and get information for anime, manga, light novels, visual novels, and doujins. When built, the application can be run either locally on deployed online to a web service. A sample instance of the application can be found at <https://f4str.github.io/sauce-searcher>.

## Technology

Since this is a fullstack application, the server and client are separated into two separate directories that need to be run together.

* The server is a `Python` application that uses `FastAPI` to create a REST API to perform HTTP GET requests.

* The client is a `React` with `TypeScript` application that performs API calls to the server.

## Requirements

The server and client both require their own requirements. For the server ensure the following are installed.

* `Python`
* `pip`
* `venv`

For the client ensure the following are installed.

* `Node.js`
* `Yarn`

For more details on how to install each requirement, view the `README.md` on the respective server or client directory.

## Quickstart

After installing all the requirements, clone the repository.

```bash
git clone https://github.com/f4str/sauce-searcher
```

Open two terminals in the cloned directory. One terminal will be used for the server and the other will be used for the client.

In one terminal, change run the following commands to install all dependencies and launch the server.

```bash
# change directories to the server
cd server

# create new virtual environment using venv
python3 -m venv venv
source venv/bin/activate

# install all dependencies using pip
pip install -e .[dev]

# start the server
./run.sh
```

In the other terminal, run the following commands to install all dependencies and launch the client.

```bash
# change directories to the client
cd client

# install all dependencies using yarn
yarn

# start the client
yarn start
```

The application is available on <http://localhost:8080>.

For more information or details on either the server or client separately, view the `README.md` for the respective directory.
