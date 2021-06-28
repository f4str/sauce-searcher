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

interface fetchDataRef {
  fetchData: () => Promise<void>;
}

const parsePattern = (query: string) => {
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
  const [index, setIndex] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [active, setActive] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  
  const animeRef = useRef<fetchDataRef>(null);
  const mangaRef = useRef<fetchDataRef>(null);
  const lightNovelRef = useRef<fetchDataRef>(null);
  const visualNovelRef = useRef<fetchDataRef>(null);
  const doujinRef = useRef<fetchDataRef>(null);
  
  const handleClick = () => {
    if (!query || !/\S/.test(query)) {
      setActive(null);
      return;
    }
    const currentIndex = index > 0 && index <= 5 ? index : parsePattern(query);
    switch (currentIndex) {
      case 1:
        setActive('anime');
        if (animeRef.current) {
          animeRef.current.fetchData();
        }
        break;
      case 2:
        setActive('manga');
        if (mangaRef.current) {
          mangaRef.current.fetchData();
        }
        break;
      case 3:
        setActive('light novel');
        if (lightNovelRef.current) {
          lightNovelRef.current.fetchData();
        }
        break;
      case 4:
        setActive('visual novel');
        if (visualNovelRef.current) {
          visualNovelRef.current.fetchData();
        }
        break;
      case 5:
        setActive('doujin');
        if (doujinRef.current) {
          doujinRef.current.fetchData();
        }
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
      <Container style={{ margin: '30px', padding: '30px', border: active ? '2px solid white' : 'none', lineHeight: 'normal' }}>
        <Anime ref={animeRef} query={query} active={active} />
        <Manga ref={mangaRef} query={query} active={active} />
        <LightNovel ref={lightNovelRef} query={query} active={active} />
        <VisualNovel ref={visualNovelRef} query={query} active={active} />
        <Doujin ref={doujinRef} query={query} active={active} />
        <ErrorMessage active={active} message={message} />
      </Container>
    </div>
  );
}

export default App;
