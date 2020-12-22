import React, { useState, useEffect } from 'react';

function Anime({query}) {
	const [result, setResult] = useState(null);
	
	const search = async () => {
		try {
			const url = `https://api.jikan.moe/v3/search/anime?q=${query}`;
			const response = await fetch(url);
			const json = await response.json();
			const results = json['results'];
			if (results && results.length > 0) {
				const id = results[0]['mal_id'];
				const url = `https://api.jikan.moe/v3/anime/${id}`;
				const response = await fetch(url);
				const json = await response.json();
				setResult(JSON.stringify(json));
			}
			else {
				setResult("anime not found");
			}
		}
		catch (err) {
			alert(err);
			setResult("");
		}
		
	};
	
	useEffect(() => {
		search();
	});
	
	return (
		<div>
			{result}
		</div>
	)
}

export default Anime;
