import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Container, Grid, Image, Header, Loader } from 'semantic-ui-react';

const api = process.env.REACT_APP_API_SERVER;

const Anime = forwardRef(({query, active}, ref) => {
	const [found, setFound] = useState(false);
	const [message, setMessage] = useState('');
	
	const [title, setTitle] = useState('');
	const [titleEnglish, setTitleEnglish] = useState('');
	const [url, setUrl] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [type, setType] = useState('');
	const [source, setSource] = useState('');
	const [episodes, setEpisodes] = useState(0);
	const [status, setStatus] = useState('');
	const [premiered, setPremiered] = useState('');
	const [aired, setAired] = useState('');
	const [duration, setDuration] = useState('');
	const [rating, setRating] = useState('');
	const [score, setScore] = useState(0)
	const [synopsis, setSynopsis] = useState('');
	const [relations, setRelations] = useState([]);
	const [studios, setStudios] = useState([]);
	const [genres, setGenres] = useState([]);
	const [openings, setOpenings] = useState([]);
	const [endings, setEndings] = useState([]);
	
	const fetchData = async () => {
		setMessage(<Loader key='loader' active inline='centered' size='large'>Searching</Loader>);
		setFound(false);
		
		const first = query.charAt(0);
		const last = query.slice(-1);
		const search = first === '{' && last === '}' ? query.slice(1, -1) : query;
		
		const response = await fetch(`${api}/anime/${search}`);
		if (response.status === 200) {
			const data = await response.json();
			setFound(true);
			setTitle(data['title']);
			setTitleEnglish(data['title_english']);
			setUrl(data['url']);
			setImageUrl(data['image']);
			setType(data['type']);
			setSource(data['source']);
			setEpisodes(data['episodes'] ? data['episodes'] : '?');
			setStatus(data['status']);
			setPremiered(data['premiered']);
			setAired(data['aired'] ? data['aired']['string'] : '?');
			setDuration(data['duration']);
			setRating(data['rating']);
			setScore(data['score']);
			setSynopsis(data['synopsis']);
			setRelations(data['relations']);
			setStudios(data['studios']);
			setGenres(data['genres']);
			setOpenings(data['openings']);
			setEndings(data['endings']);
		}
		else {
			setFound(false);
			setMessage('Anime not found');
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
	
	return (
		<div>
			{ active === 'anime' ? found ?
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
						<Grid.Row style={{marginBottom: '10px'}}>
							<a href={url} className='link'><Header inverted textAlign='left'>{title}</Header></a>
						</Grid.Row>
						{textGridRow('English Title: ', titleEnglish)}
						<Grid.Row style={{marginBottom: '10px'}}>
							<span className='bold'>Type: </span>{type} | <span className='bold'>Episodes: </span>{episodes}
						</Grid.Row>
						{textGridRow('Status: ', status)}
						{textGridRow('Rating: ', rating)}
						{textGridRow('Studios: ', studios.join(', '))}
						{textGridRow('Source: ', source)}
						{textGridRow('Duration: ', duration)}
						{textGridRow('Season: ', premiered)}
						{textGridRow('Aired: ', aired)}
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
					<Grid.Column>
						<Grid.Row style={{marginBottom: '5px'}}><span className='bold'>Openings</span></Grid.Row>
						{openings && openings.length > 0 ? 
						openings.map((x, i) => {
							return <Grid.Row key={`op${i}`} style={{marginBottom: '5px'}}>{i+1}. {x}</Grid.Row>
						})
						: 'None'}
					</Grid.Column>
					<Grid.Column>
						<Grid.Row style={{marginBottom: '5px'}}><span className='bold'>Endings</span></Grid.Row>
						{endings && endings.length > 0 ?
						endings.map((x, i) => {
							return <Grid.Row key={`ed${i}`} style={{marginBottom: '5px'}}>{i+1}. {x}</Grid.Row>
						})
						: 'None'}
					</Grid.Column>
				</Grid>
			</Container>
			: message : null }
		</div>
	)
});

export default Anime;
