import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Grid } from 'semantic-ui-react';

const api = process.env.REACT_APP_API_SERVER;

const Doujin = forwardRef(({query, active}, ref) => {
	const [found, setFound] = useState(false);
	const [message, setMessage] = useState('');
	
	const [id, setId] = useState(0);
	const [title, setTitle] = useState('');
	const [fullTitle, setFullTitle] = useState('');
	const [uploadDate, setUploadDate] = useState('');
	const [pages, setPages] = useState(0);
	const [characters, setCharacters] = useState([]);
	const [parodies, setParodies] = useState([]);
	const [tags, setTags] = useState([]);
	const [artists, setArtists] = useState([]);
	const [groups, setGroups] = useState([]);
	const [languages, setLanguages] = useState([]);
	const [categories, setCategories] = useState([]);
	const [url, setUrl] = useState('');
	
	const fetchData = async () => {
		setMessage('');
		setFound(false);
		
		const first = query.charAt(0);
		const last = query.slice(-1);
		const search = first === '(' && last === ')' ? query.slice(1, -1) : query;
		
		const response = await fetch(`${api}/doujin/${search}`);
		if (response.status === 200) {
			const data = await response.json();
			setFound(true);
			setId(data['id']);
			setTitle(data['title']);
			setFullTitle(data['full_title']);
			setUploadDate(data['upload_date']);
			setPages(data['pages']);
			setCharacters(data['characters']);
			setParodies(data['parodies']);
			setTags(data['tags']);
			setArtists(data['artists']);
			setGroups(data['groups']);
			setLanguages(data['languages']);
			setCategories(data['categories']);
			setUrl(data['url']);
		}
		else {
			setFound(false);
			setMessage('doujin not found');
		}
	};
	
	useImperativeHandle(ref, () => {
		return {
			fetchData: fetchData
		}
	});
	
	return (
		<div>
			{ active === 'doujin' ? found ?
			<Grid columns={1} textAlign='left'>
				<Grid.Column>
					ID: {id}, {url}
				</Grid.Column>
				<Grid.Column>
					Title: {title}
				</Grid.Column>
				<Grid.Column>
					Full Title: {fullTitle}
				</Grid.Column>
				<Grid.Column>
					Pages: {pages}
				</Grid.Column>
				<Grid.Column>
					Upload Date: {uploadDate}
				</Grid.Column>
				<Grid.Column>
					Characters: {characters.join(', ')}
				</Grid.Column>
				<Grid.Column>
					Parodies: {parodies.join(', ')}
				</Grid.Column>
				<Grid.Column>
					Tags: {tags.join(', ')}
				</Grid.Column>
				<Grid.Column>
					Artists: {artists.join(', ')}
				</Grid.Column>
				<Grid.Column>
					Groups: {groups.join(', ')}
				</Grid.Column>
				<Grid.Column>
					Languages: {languages.join(', ')}
				</Grid.Column>
				<Grid.Column>
					Categories: {categories.join(', ')}
				</Grid.Column>
			</Grid> 
			: message : null }
		</div>
	)
});

export default Doujin;
