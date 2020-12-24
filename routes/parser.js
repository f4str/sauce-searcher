const vnTags = require('./vn_tags.json');

function parseVisualNovel(json) {
	const tags = json['tags'].reduce((acc, tag) => {
		const name = vnTags[tag[0]];
		if (name && tag[1] > 2 && tag[2] < 2) {
			acc.push(name);
		}
		return acc;
	}, []);
	tags.sort((a, b) => b['relevance'] - a['relevance']);
	json['tags'] = tags;
	
	const staff = json['staff'].reduce((acc, staff) => {
		if (staff['role'].toLowerCase() == 'staff') {
			acc.push(staff['name']);
		}
		return acc;
	}, []);
	json['staff'] = staff;
	
	json['anime'] = json['anime'].length > 0;
	return json;
}

function formatTag(tag) {
	return `${tag['name']} (${tag['count'].toLocaleString('en')})`;
}

function parseDoujin(data) {
	const doujin = {
		id: data['id'],
		title: data['title']['pretty'],
		full_title: data['title']['english'],
		pages: data['pages'],
		upload_date: new Date(data['upload_date'] * 1e3),
		tags: [],
		languages: [],
		artists: [],
		categories: [],
		parodies: [],
		characters: [],
		groups: [],
		link: `https://nhentai.net/g/${data['id']}`,
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

module.exports = { parseVisualNovel, parseDoujin }