import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Container, Grid, Image, Header, Loader } from 'semantic-ui-react';

const api = process.env.REACT_APP_API_SERVER;

const LightNovel = forwardRef(({query, active}, ref) => {
	const [found, setFound] = useState(false);
	const [message, setMessage] = useState('');
	
	const [title, setTitle] = useState('');
	const [titleEnglish, setTitleEnglish] = useState('');
	const [url, setUrl] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [type, setType] = useState('');
	const [volumes, setVolumes] = useState(0);
	const [chapters, setChapters] = useState(0);
	const [status, setStatus] = useState('');
	const [published, setPublished] = useState('');
	const [rating, setRating] = useState('');
	const [score, setScore] = useState(0)
	const [synopsis, setSynopsis] = useState('');
	const [relations, setRelations] = useState([]);
	const [genres, setGenres] = useState([]);
	const [authors, setAuthors] = useState([]);
	
	const fetchData = async () => {
		setMessage(<Loader key='loader' active inline='centered' size='large'>Searching</Loader>);
		setFound(false);
		
		const first = query.charAt(0);
		const last = query.slice(-1);
		const search = first === '[' && last === ']' ? query.slice(1, -1) : query;
		
		const response = await fetch(`${api}/ln/${search}`);
		if (response.status === 200) {
			const data = await response.json();
			setFound(true);
			setTitle(data['title']);
			setTitleEnglish(data['title_english']);
			setUrl(data['url']);
			setImageUrl(data['image']);
			setType(data['type']);
			setVolumes(data['volumes'] ? data['volumes'] : '?');
			setChapters(data['chapters'] ? data['chapters'] : '?');
			setStatus(data['status']);
			setPublished(data['published'] ? data['published']['string'] : '');
			setRating(data['rating']);
			setScore(data['score']);
			setSynopsis(data['synopsis']);
			setRelations(data['relations']);
			setGenres(data['genres']);
			setAuthors(data['authors']);
		}
		else {
			setFound(false);
			setMessage('Light novel not found');
		}
	};
	
	useImperativeHandle(ref, () => {
		return {
			fetchData: fetchData
		}
	});
	
	const textGridRow = (name, data) => {
		if (data && data !== '') {
			return <Grid.Row key={name} style={{marginBottom: '10px'}}><span className='bold'>{name}</span>{data}</Grid.Row>
		}
		else {
			return null;
		}
	};
	
	const nameConverter = (names) => {
		return names.map(n => n.split(', ').reverse().join(" ")).join(', ');
	};
	
	return (
		<div>
			{ active === 'light novel' ? found ?
			<Container className='smaller-font'>
				<Grid columns={2} textAlign='left'>
					<Grid.Column largeScreen={4} tablet={6} mobile={6}>
						<Image src={imageUrl} fluid label={{
							color: 'blue',
							content: score,
							icon: 'star',
							ribbon: true
						}} />
					</Grid.Column>
					<Grid.Column largeScreen={10} tablet={9} mobile={9}>
						<Grid.Row>
							<a href={url} className='link'><Header inverted textAlign='left'>{title}</Header></a>
						</Grid.Row>
						{textGridRow('', titleEnglish)}
						<Grid.Row style={{marginBottom: '10px'}}>
							<span className='bold'>Type: </span>{type} | <span className='bold'>Status: </span>{status}
						</Grid.Row>
						<Grid.Row style={{marginBottom: '10px'}}>
							<span className='bold'>Volumes: </span>{volumes} | <span className='bold'>Chapters: </span>{chapters}
						</Grid.Row>
						{textGridRow('Rating: ', rating)}
						{textGridRow('Published: ', published)}
						{textGridRow('Authors: ', nameConverter(authors))}
						{textGridRow('Genres: ', genres.join(', '))}
					</Grid.Column>
				</Grid>
				<Grid columns={1} textAlign='left'>
					<Grid.Column>
						<span className='bold'>Synopsis:</span> {synopsis}
					</Grid.Column>
					<Grid.Column>
						{Object.entries(relations).map(r => {
							return textGridRow(`${r[0]}: `, r[1].join(', '))
						})}
					</Grid.Column>
				</Grid>
			</Container>
			: message : null }
		</div>
	)
});

export default LightNovel;
