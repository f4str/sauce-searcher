import React, { useState, forwardRef, useImperativeHandle } from 'react';

const api = process.env.REACT_APP_API_SERVER;

const Manga = forwardRef(({query, active}, ref) => {
	const [found, setFound] = useState(false);
	const [message, setMessage] = useState('');
	
	const [result, setResult] = useState(null);
	
	const fetchData = async () => {
		setMessage('');
		setFound(false);
		
		const first = query.charAt(0);
		const last = query.slice(-1);
		const search = first === '<' && last === '>' ? query.slice(1, -1) : query;
		
		const response = await fetch(`${api}/manga/${search}`);
		if (response.status === 200) {
			const data = await response.json();
			setFound(true);
			setResult(JSON.stringify(data));
		}
		else {
			setFound(false);
			setMessage('manga not found');
		}
	};
	
	useImperativeHandle(ref, () => {
		return {
			fetchData: fetchData
		}
	});
	
	return (
		<div>
			{ active === 'manga' ? found ?
			result
			: message : null }
		</div>
	)
});

export default Manga;
