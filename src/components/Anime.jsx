import React, { useState, forwardRef, useImperativeHandle } from 'react';

const api = process.env.REACT_APP_API_SERVER;

const Anime = forwardRef(({query, active}, ref) => {
	const [found, setFound] = useState(false);
	const [message, setMessage] = useState('');
	
	const fetchAnimeData = async () => {
		setMessage('');
		setFound(false);
		const response = await fetch(`${api}/anime/${query}`);
		if (response.status === 200) {
			const data = await response.json();
			setFound(true);
		}
		else {
			setFound(false);
			setMessage('anime not found');
		}
	};
	
	useImperativeHandle(ref, () => {
		return {
			fetchAnimeData: fetchAnimeData
		}
	});
	
	return (
		<div>
			{ active === 'anime' ? found ?
			"anime found"
			: message : null }
		</div>
	)
});

export default Anime;
