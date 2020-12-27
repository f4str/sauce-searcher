import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Container, Grid, Image, Header, Loader, Dimmer, Button } from 'semantic-ui-react';

const api = process.env.REACT_APP_API_SERVER;

const VisualNovel = forwardRef(({query, active}, ref) => {
	const [found, setFound] = useState(false);
	const [message, setMessage] = useState('');
	const [blurred, setBlurred] = useState(true);
	
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [imageNSFW, setImageNSFW] = useState(false);
	const [released, setReleased] = useState(null);
	const [description, setDescription] = useState('');
	const [tags, setTags] = useState([]);
	const [staff, setStaff] = useState([]);
	const [anime, setAnime] = useState(false);
	const [length, setLength] = useState('');
	const [score, setScore] = useState(0);
	
	const fetchData = async () => {
		setMessage(<Loader key='loader' active inline='centered' size='large'>Searching</Loader>);
		setFound(false);
		
		const first = query.charAt(0);
		const last = query.slice(-1);
		const search = first === '|' && last === '|' ? query.slice(1, -1) : query;
		
		const response = await fetch(`${api}/vn/${search}`);
		if (response.status === 200) {
			const data = await response.json();
			setFound(true);
			setBlurred(true);
			setTitle(data['title']);
			setUrl(data['url']);
			setImageUrl(data['image']);
			setImageNSFW(data['image_nsfw']);
			setReleased(data['released'] ? new Date(data['released']) : null);
			setDescription(data['description']);
			setTags(data['tags']);
			setStaff(data['staff']);
			setAnime(data['anime']);
			setLength(data['length']);
			setScore(data['score']);
		}
		else {
			setFound(false);
			setMessage('Visual novel not found');
		}
	};
	
	useImperativeHandle(ref, () => {
		return {
			fetchData: fetchData
		};
	});
	
	const textGridRow = (name, data) => {
		if (data && data !== '') {
			return (
				<Grid.Row key={name} style={{marginBottom: '10px'}}>
					<span className='bold'>{name}</span>{data}
				</Grid.Row>
			);
		}
		else {
			return null;
		}
	};
	
	return (
		<div>
			{ active === 'visual novel' ? found ?
			<Container className='smaller-font'>
				<Grid columns={2} textAlign='left'>
					<Grid.Column largeScreen={4} tablet={6} mobile={6}>
						{ !imageNSFW ?
						<Image src={imageUrl} fluid 
							label={{
								color: 'blue',
								content: score,
								icon: 'star',
								ribbon: true
							}}
						/>
						:
						<Dimmer.Dimmable as={Image} fluid blurring dimmed={blurred}>
							<Dimmer active={blurred}>
								<Header as='h2' inverted>
									NSFW
								</Header>
								<Button onClick={() => {setBlurred(false)}}>View</Button>
							</Dimmer>
							<Image src={imageUrl} fluid 
								label={{
									color: 'blue',
									content: score,
									icon: 'star',
									ribbon: true
								}}
								onClick={() => setBlurred(true)}
								/> 
						</Dimmer.Dimmable>
						}
					</Grid.Column>
					<Grid.Column largeScreen={10} tablet={9} mobile={9}>
						<Grid.Row style={{marginBottom: '10px'}}>
							<Header inverted textAlign='left'><a href={url} className='link'>{title}</a></Header>
						</Grid.Row>
						{textGridRow('Type: ', 'Visual Novel')}
						{textGridRow('Released: ', released ? released.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'}) : '?')}
						{textGridRow('Length: ', length)}
						{textGridRow('Anime Adaptation: ', anime ? 'Yes' : 'No')}
						{textGridRow('Staff: ', staff.join(', '))}
						{textGridRow('Tags: ', tags.slice(0, 20).join(', '))}
					</Grid.Column>
				</Grid>
				<Grid columns={1} textAlign='left'>
					{ description ?
					<Grid.Column>
						<span className='bold'>Description:</span> {description}
					</Grid.Column>
					: null }
				</Grid>
			</Container>
			: message : null }
		</div>
	);
});

export default VisualNovel;
