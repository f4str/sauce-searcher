const vnTags = require('./vn_tags.json');


function parseAnime(data) {
	const genres = data['genres'].map(x => x['name']);
	const studios = data['studios'].map(x => x['name']);
	const related = data['related'];
	const relations = {};
	for (const r in related) {
		relations[r] = related[r].map(x => `${x['name']} (${x['type']})`);
	}
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
		title_english: data['title_english'],
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
		relations: relations,
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
	const related = data['related'];
	const relations = {};
	for (const r in related) {
		relations[r] = related[r].map(x => `${x['name']} (${x['type']})`);
	}
	
	const manga = {
		id: data['mal_id'],
		title: data['title'],
		title_english: data['title_english'],
		url: data['url'],
		image: data['image_url'],
		type: data['type'],
		volumes: data['volumes'] ? data['volumes'] : 'N/A',
		chapters: data['chapters'] ? data['chapters'] : 'N/A',
		status: data['status'],
		publishing: data['publishing'],
		published: data['published'],
		score: data['score'],
		synopsis: data['synopsis'],
		relations: relations,
		genres: genres,
		authors: authors,
		serializations: serializations
	};
	return manga;
}

function parseVisualNovel(data) {
	let tags = data['tags'].reduce((acc, tag) => {
		const name = vnTags[tag[0]];
		if (name && tag[2] < 2) {
			const mapped = {
				name: name,
				relevance: tag[1],
				spoiler: tag[2]
			}
			acc.push(mapped);
		}
		return acc;
	}, []);
	tags = tags.sort((a, b) => b['relevance'] - a['relevance']).map(x => x['name'])
	
	const staff = data['staff'].reduce((acc, staff) => {
		if (staff['role'].toLowerCase() == 'staff') {
			acc.push(staff['name']);
		}
		return acc;
	}, []);
	
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
		image_nsfw: data['image_flagging']['sexual_avg'] > 1 || data['image_flagging']['violence_avg'] > 1,
		tags: tags,
		staff: staff,
		anime: data['anime'].length > 0,
		length: lengths[data['length'] ? data['length'] : 0],
		rating: data['rating'],
		languages: data['languages'],
		url: `https://vndb.org/v${data['id']}`,
	}
	
	return vn;
}

function formatTag(tag) {
	return `${tag['name']} (${tag['count'].toLocaleString('en')})`;
}

function parseDoujin(data) {
	const doujin = {
		id: data['id'],
		title: data['title']['pretty'],
		full_title: data['title']['english'],
		pages: data['num_pages'],
		upload_date: new Date(data['upload_date'] * 1e3),
		tags: [],
		languages: [],
		artists: [],
		categories: [],
		parodies: [],
		characters: [],
		groups: [],
		url: `https://nhentai.net/g/${data['id']}`,
	};
	
	for (const tag of data['tags']) {
		switch (tag['type']) {
			case 'tag':
				doujin['tags'].push(formatTag(tag));
				break;
			case 'language':
				doujin['languages'].push(formatTag(tag));
				break;
			case 'artist':
				doujin['artists'].push(formatTag(tag));
				break;
			case 'category':
				doujin['categories'].push(formatTag(tag));
				break;
			case 'parody':
				doujin['parodies'].push(formatTag(tag));
				break;
			case 'character':
				doujin['characters'].push(formatTag(tag));
				break;
			case 'group':
				doujin['groups'].push(formatTag(tag));
				break;
			default:
				break;
		}
	}
	return doujin;
}

module.exports = { parseAnime, parseManga, parseVisualNovel, parseDoujin }