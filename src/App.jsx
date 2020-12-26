import React, { useState, useRef } from 'react';
import { Container } from 'semantic-ui-react';
import Title from './components/Title';
import Search from './components/Search';
import Anime from './components/Anime';
import Manga from './components/Manga';
import LightNovel from './components/LightNovel';
import VisualNovel from './components/VisualNovel';
import Doujin from './components/Doujin';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const parsePattern = (query) => {
	if (query.length <= 2) {
		return -1;
	}
	
	const first = query.charAt(0);
	const last = query.slice(-1);
	if (first === '{' && last === '}') {
		return 1;
	}
	else if (first === '<' && last === '>') {
		return 2;
	}
	else if (first === '[' && last === ']') {
		return 3;
	}
	else if (first === '|' && last === '|') {
		return 4;
	}
	else if (first === '(' && last === ')') {
		return 5;
	}
	else {
		return -1;
	}
};

function App() {
	const [index, setIndex] = useState(0);
	const [query, setQuery] = useState('');
	const [active, setActive] = useState(null);
	const [message, setMessage] = useState('');
	
	const animeRef = useRef(null);
	const mangaRef = useRef(null);
	const LightNovelRef = useRef(null);
	const VisualNovelRef = useRef(null);
	const doujinRef = useRef(null);
	
	const handleClick = () => {
		if (!query || !/\S/.test(query)) {
			setActive(null);
			return;
		}
		const currentIndex = index > 0 && index <= 5 ? index : parsePattern(query);
		switch (currentIndex) {
			case 1:
				setActive('anime');
				animeRef.current.fetchData();
				break;
			case 2:
				setActive('manga');
				mangaRef.current.fetchData();
				break;
			case 3:
				setActive('light novel');
				LightNovelRef.current.fetchData();
				break;
			case 4:
				setActive('visual novel');
				VisualNovelRef.current.fetchData();
				break;
			case 5:
				setActive('doujin');
				doujinRef.current.fetchData();
				break;
			default:
				setActive('error');
				setMessage('Invalid search pattern');
				break;
		}
	};
	
	return (
		<div className="App">
			<Title title="Sauce Searcher" />
			<Search index={index} setIndex={setIndex} setQuery={setQuery} handleClick={handleClick} />
			<Container style={{ margin: '30px', padding: '30px', border: active ? '2px solid white' : null, lineHeight: 'normal' }}>
				<Anime ref={animeRef} query={query} active={active} />
				<Manga ref={mangaRef} query={query} active={active} />
				<LightNovel ref={LightNovelRef} query={query} active={active} />
				<VisualNovel ref={VisualNovelRef} query={query} active={active} />
				<Doujin ref={doujinRef} query={query} active={active} />
				<ErrorMessage active={active} message={message} />
			</Container>
		</div>
	);
}

export default App;
