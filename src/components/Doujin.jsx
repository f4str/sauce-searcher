import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Grid } from 'semantic-ui-react';

const api = process.env.REACT_APP_API_SERVER;

const Doujin = forwardRef(({query, active}, ref) => {
	const [found, setFound] = useState(false);
	const [message, setMessage] = useState('');
	
	const [id, setId] = useState(0);
	const [title, setTitle] = useState('');
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
	
	const arrayGridColumn = (name, array) => {
		if (array && array.length > 0) {
			return <Grid.Column><span className='bold'>{name}</span>{array.join(', ')}</Grid.Column>
		}
		else {
			return null;
		}
	}
	
	return (
		<div>
			{ active === 'doujin' ? found ?
			<Grid columns={1} textAlign='left'>
				<Grid.Column>
					<a className='bold link' href={url}>{id}</a>
				</Grid.Column>
				<Grid.Column>
					<span className='bold'>Title:</span> {title}
				</Grid.Column>
				<Grid.Column>
					<span className='bold'>Pages:</span> {pages}
				</Grid.Column>
				<Grid.Column>
					<span className='bold'>Upload Date: </span> 
					{new Date(uploadDate).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})}
				</Grid.Column>
				{arrayGridColumn('Characters: ', characters)}
				{arrayGridColumn('Parodies: ', parodies)}
				{arrayGridColumn('Tags: ', tags)}
				{arrayGridColumn('Artists: ', artists)}
				{arrayGridColumn('Groups: ', groups)}
				{arrayGridColumn('Languages: ', languages)}
				{arrayGridColumn('Categories: ', categories)}
			</Grid> 
			: message : null }
		</div>
	)
});

export default Doujin;
