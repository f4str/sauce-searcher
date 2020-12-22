import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import Title from './components/Title';
import Search from './components/Search';
import Anime from './components/Anime';
import Manga from './components/Manga';
import VisualNovel from './components/VisualNovel';
import Doujin from './components/Doujin';
import './App.css';

const parsePattern = () => {
	return 1;
};

function App() {
	const [index, setIndex] = useState(0);
	const [query, setQuery] = useState('');
	const [result, setResult] = useState(null);
	
	const handleClick = () => {
		if (!query || !/\S/.test(query)) {
			setResult(null);
			return;
		}
		
		const currentIndex = index > 0 ? index : parsePattern(index);
		switch (currentIndex) {
			case 1:
				setResult(<Anime query={query} />);
				break;
			case 2:
				setResult(<Manga query={query} />);
				break;
			case 3:
				setResult(<VisualNovel query={query} />);
				break;
			case 4:
				setResult(<Doujin query={query} />);
				break;
			default:
				break;
		}
	};
	
	return (
		<div className="App">
			<Title title="Sauce Searcher" />
			<Search index={index} setIndex={setIndex} query={query} setQuery={setQuery} handleClick={handleClick} />
			{
				result ? 
				<Container style={{ margin: '30px', padding: '20px', border: '2px solid white' }}>
					{result}
				</Container>
				: null
			}
		</div>
	);
}

export default App;
