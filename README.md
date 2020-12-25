# Sauce Searcher Server

Express server used to perform HTTP GET requests to get JSON search results for anime, manga, light novels, visual novels, and doujins.

## Installation

Install NodeJS and npm
- On Ubuntu 
```bash
$ sudo apt update
$ sudo apt install nodejs
```
- On Mac
```bash
$ brew update
$ brew install node
```
- On Windows, go to https://nodejs.org/en/download/

Clone the repository
```bash
$ git clone https://github.com/f4str/sauce-searcher-server
```

Change directories into the folder
```bash
$ cd sauce-searcher-server
```

## Staring the server

Install the dependencies using npm
```bash
$ npm install
```

Start the server
```bash
$ npm start
```

The server will start on port http://localhost5000 if a specific port has not been specified. 

## Making API calls

You can make API calls to search for anime, manga, light novels, visual novels, and doujins using the appropriate routes described below. Spaces and special characters are allowed. 

### Anime: 

```
http://localhost/anime/[name]
```

Ex: `http://localhost/anime/death note`

### Manga

```
http://localhost/manga/[name]
```

Ex: `http://localhost/manga/fullmetal alchemist`

### Light Novels

```
http://localhost/ln/[name]
```

Ex: `http://localhost/ln/overlord`

### Visual Novels

```
http://localhost/vn/[name]
```

Ex: `http://localhost/vn/clannad`

### Doujin

```
http://localhost/doujin/[digits]

```

Ex: `http://localhost/doujin/184806`

## Disclaimers 

Depending on the number of requests made, you may be throttled or IP banned from the respective site. I am not responsible for any misuse of the server or any of its services.
