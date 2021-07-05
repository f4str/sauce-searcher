import React, { useState, useEffect, useRef } from 'react';
import { Container, Input, Segment, Tab, TabProps } from 'semantic-ui-react';
import Anime from './Anime';
import Manga from './Manga';
import LightNovel from './LightNovel';
import VisualNovel from './VisualNovel';
import Doujin from './Doujin';
import ErrorMessage from './ErrorMessage';

interface Pane {
  menuItem: string;
  placeholder: string;
}

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
  if (first === '<' && last === '>') {
    return 2;
  }
  if (first === '[' && last === ']') {
    return 3;
  }
  if (first === '|' && last === '|') {
    return 4;
  }
  if (first === '(' && last === ')') {
    return 5;
  }

  return -1;
};

const panes: Pane[] = [
  { menuItem: 'Auto', placeholder: '{anime}, <manga>, [light novel], |visual novel|, (doujin)' },
  { menuItem: 'Anime', placeholder: 'Search by anime name' },
  { menuItem: 'Manga', placeholder: 'Search by manga name' },
  { menuItem: 'Light Novel', placeholder: 'Search by light novel name' },
  { menuItem: 'Visual Novel', placeholder: 'Search by visual novel name' },
  { menuItem: 'Doujin', placeholder: 'Search by doujin digits' },
];

const Search = (): React.ReactElement => {
  const [placeholder, setPlaceholder] = useState<string>('Search');
  const [index, setIndex] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [active, setActive] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const animeRef = useRef<fetchDataRef>(null);
  const mangaRef = useRef<fetchDataRef>(null);
  const lightNovelRef = useRef<fetchDataRef>(null);
  const visualNovelRef = useRef<fetchDataRef>(null);
  const doujinRef = useRef<fetchDataRef>(null);

  useEffect(() => {
    setPlaceholder(panes[index].placeholder);
  }, [index]);

  const handleTabChange = (event: React.MouseEvent<HTMLDivElement>, data: TabProps) => {
    setIndex(data.activeIndex as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div>
      <Container style={{ width: '50%' }}>
        <Segment inverted style={{ overflow: 'auto', margin: 'auto', padding: '1px' }}>
          <Tab
            panes={panes}
            menu={{
              attached: true,
              tabular: true,
              inverted: true,
            }}
            renderActiveOnly
            onTabChange={handleTabChange}
          />
        </Segment>
        <Input
          action={{
            icon: 'search',
            onClick: () => {
              handleClick();
            },
          }}
          style={{ width: '100%' }}
          size='small'
          placeholder={placeholder}
          inverted
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </Container>
      <Container
        style={{
          margin: '30px',
          padding: '30px',
          border: active ? '2px solid white' : 'none',
          lineHeight: 'normal',
        }}
      >
        <Anime ref={animeRef} query={query} active={active} />
        <Manga ref={mangaRef} query={query} active={active} />
        <LightNovel ref={lightNovelRef} query={query} active={active} />
        <VisualNovel ref={visualNovelRef} query={query} active={active} />
        <Doujin ref={doujinRef} query={query} active={active} />
        <ErrorMessage active={active} message={message} />
      </Container>
    </div>
  );
};

export default Search;
