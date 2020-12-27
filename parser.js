const vnTags = require('./public/vn_tags.json');

function getTitleEnglish(data) {
	let title_english = data['title_english'];
	if (!title_english) {
		if (data['title_synonyms'] && data['title_synonyms'].length > 0) {
			title_english = data['title_synonyms'][0];
		}
		else {
			title_english = data['title'];
		}
	}
	return title_english;
}

function getRelations(data) {	
	const format = (relation) => {
		const name = relation['name'];
		const type = relation['type'];
		
		if (type.toLowerCase() === 'manga') {
			return `${name} (manga/light novel)`;
		}
		else {
			return `${name} (${type})`;
		}
	}
	
	const related = data['related'];
	const relations = {};
	for (const r in related) {
		relations[r] = related[r].map(x => format(x));
	}
	return relations;
}

function parseAnime(data) {
	const genres = data['genres'].map(x => x['name']);
	const studios = data['studios'].map(x => x['name']);
	
	const openings = data['opening_themes'].map(x => {
		const start = x.indexOf('"');
		return x.substring(start);
	});
	
	const endings = data['ending_themes'].map(x => {
		const start = x.indexOf('"');
		return x.substring(start);
	});
	
	const anime = {
		id: data['mal_id'],
		title: data['title'],
		title_english: getTitleEnglish(data),
		url: data['url'],
		image: data['image_url'],
		type: data['type'],
		source: data['source'],
		episodes: data['episodes'],
		status: data['status'],
		airing: data['airing'],
		premiered: data['premiered'],
		broadcast: data['broadcast'],
		aired: data['aired'],
		duration: data['duration'],
		rating: data['rating'],
		score: data['score'],
		synopsis: data['synopsis'],
		relations: getRelations(data),
		studios: studios,
		genres: genres,
		openings: openings,
		endings: endings
	};
	return anime;
}

function parseManga(data) {
	const genres = data['genres'].map(x => x['name']);
	const authors = data['authors'].map(x => x['name']);
	const serializations = data['serializations'].map(x => x['name']);
	
	const manga = {
		id: data['mal_id'],
		title: data['title'],
		title_english: getTitleEnglish(data),
		url: data['url'],
		image: data['image_url'],
		type: data['type'],
		volumes: data['volumes'],
		chapters: data['chapters'],
		status: data['status'],
		publishing: data['publishing'],
		published: data['published'],
		score: data['score'],
		synopsis: data['synopsis'],
		relations: getRelations(data),
		genres: genres,
		authors: authors,
		serializations: serializations
	};
	return manga;
}

function parseLightNovel(data) {
	const genres = data['genres'].map(x => x['name']);
	const authors = data['authors'].map(x => x['name']);
	
	const manga = {
		id: data['mal_id'],
		title: data['title'],
		title_english: getTitleEnglish(data),
		url: data['url'],
		image: data['image_url'],
		type: data['type'],
		volumes: data['volumes'],
		chapters: data['chapters'],
		status: data['status'],
		publishing: data['publishing'],
		published: data['published'],
		score: data['score'],
		synopsis: data['synopsis'],
		relations: getRelations(data),
		genres: genres,
		authors: authors
	};
	return manga;
}

function parseVisualNovel(data) {
	let tags = data['tags'].reduce((acc, tag) => {
		const name = vnTags[tag[0]];
		const relevance = tag[1];
		const spoiler = tag[2];
		if (name && spoiler < 2) {
			const mapped = {
				name: name,
				relevance: relevance,
				spoiler: spoiler
			};
			acc.push(mapped);
		}
		return acc;
	}, []);
	tags = tags.sort((a, b) => b['relevance'] - a['relevance']).map(x => x['name']);
	
	const staff = data['staff'].reduce((acc, staff) => {
		if (staff['role'].toLowerCase() === 'staff') {
			acc.push(staff['name']);
		}
		return acc;
	}, []);
	
	const lewd_image = data['image_flagging'] ? data['image_flagging']['sexual_avg'] > 1 : false;
	const violent_image = data['image_flagging'] ? data['image_flagging']['violence_avg'] > 1 : false;
	
	const lengths = [
		'N/A', 
		'Very short (<2 hours)', 
		'Short (2 - 10 hours)', 
		'Medium (10 - 30 hours)', 
		'Long (30 - 50 hours)', 
		'Very long (>50 hours)'
	];
	
	const vn = {
		id: data['id'],
		title: data['title'],
		released: new Date(data['released']),
		description: data['description'],
		image: data['image'],
		image_nsfw: lewd_image || violent_image,
		tags: tags,
		staff: staff,
		anime: data['anime'].length > 0,
		length: lengths[data['length'] ? data['length'] : 0],
		score: data['rating'],
		languages: data['languages'],
		url: `https://vndb.org/v${data['id']}`,
	}
	
	return vn;
}

function parseDoujin(data) {
	const tags = [];
	const languages = [];
	const artists = [];
	const categories = [];
	const parodies = [];
	const characters = [];
	const groups = [];
	
	const formatTag = (tag) => {
		return `${tag['name']} (${tag['count'].toLocaleString('en')})`;
	}
	
	for (const tag of data['tags']) {
		switch (tag['type'].toLocaleString()) {
			case 'tag':
				tags.push(formatTag(tag));
				break;
			case 'language':
				languages.push(formatTag(tag));
				break;
			case 'artist':
				artists.push(formatTag(tag));
				break;
			case 'category':
				categories.push(formatTag(tag));
				break;
			case 'parody':
				parodies.push(formatTag(tag));
				break;
			case 'character':
				characters.push(formatTag(tag));
				break;
			case 'group':
				groups.push(formatTag(tag));
				break;
			default:
				break;
		}
	}
	
	const doujin = {
		id: data['id'],
		title: data['title']['pretty'],
		full_title: data['title']['english'],
		pages: data['num_pages'],
		upload_date: new Date(data['upload_date'] * 1e3),
		tags: tags,
		languages: languages,
		artists: artists,
		categories: categories,
		parodies: parodies,
		characters: characters,
		groups: groups,
		url: `https://nhentai.net/g/${data['id']}`,
	};
	
	return doujin;
}

module.exports = { parseAnime, parseManga, parseLightNovel, parseVisualNovel, parseDoujin }
