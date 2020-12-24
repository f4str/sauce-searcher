const express = require('express');
const router = express.Router();
const axios = require('axios');
const VNDB = require('vndb-api');

const parser = require('./parser');


router.get('/', function(req, res) {
	res.send('server is running');
});

router.get('/anime/:query(*)', async (req, res) => {
	try {
		const url = `https://api.jikan.moe/v3/search/anime?q=${req.params.query}`;
		const response = await axios.get(url);
		const query = response.data;
		const results = query['results'];
		if (results && results.length > 0) {
			const id = results[0]['mal_id'];
			const url = `https://api.jikan.moe/v3/anime/${id}`;
			const response = await axios.get(url);
			const anime = parser.parseAnime(response.data);
			res.status(200).send(anime);
		}
		else {
			res.status(404).send('anime not found');
		}
	}
	catch (err) {
		console.log(err);
		res.status(404).send('anime not found');
	}
});

router.get('/manga/:query(*)', async (req, res) => {
	try {
		const url = `https://api.jikan.moe/v3/search/manga?q=${req.params.query}`;
		const response = await axios.get(url);
		const query = response.data;
		const results = query['results'];
		if (results && results.length > 0) {
			const id = results[0]['mal_id'];
			const url = `https://api.jikan.moe/v3/manga/${id}`;
			const response = await axios.get(url);
			const manga = parser.parseManga(response.data);
			res.status(200).send(manga);
		}
		else {
			res.status(404).send('manga not found');
		}
	}
	catch (err) {
		console.log(err);
		res.status(404).send('manga not found');
	}
});

router.get('/vn/:query(*)', async (req, res) => {
	const vndb = new VNDB('sauce-searcher');
	
	try {
		const query = `get vn basic,details,anime,tags,stats,staff (title ~ "${req.params.query}")`;
		const response = await vndb.query(query);
		const results = response['items'];
		if (results && results.length > 0) {
			const vn = parser.parseVisualNovel(results[0])
			res.status(200).send(vn);
		}
		else {
			res.status(404).send('visual novel not found');
		}
	}
	catch (err) {
		res.status(404).send('visual novel not found');
	}
	finally {
		vndb.destroy();
	}
});

router.get('/doujin/:id', async (req, res) => {
	try {
		const url = `https://nhentai.net/api/gallery/${req.params.id}`;
		const response = await axios.get(url);
		const data = response.data;
		const doujin = parser.parseDoujin(data);
		res.status(200).send(doujin);
	}
	catch (err) {
		console.log(err);
		res.status(404).send('doujin not found');
	}
});

module.exports = router;
