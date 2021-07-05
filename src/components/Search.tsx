import React, { useState, useEffect } from 'react';
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
  const [active, setActive] = useState<string | null | React.ReactElement>(null);

  useEffect(() => {
    setPlaceholder(panes[index].placeholder);
  }, [index]);

  const handleTabChange = (event: React.MouseEvent<HTMLDivElement>, data: TabProps) => {
    setIndex(data.activeIndex as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const parseIndex = (): number => {
    if (index > 0) {
      return index;
    }
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

  const parseQuery = (): string => {
    if (query.length <= 2) {
      return query;
    }

    const first = query.charAt(0);
    const last = query.slice(-1);
    if (
      (first === '{' && last === '}') ||
      (first === '<' && last === '>') ||
      (first === '[' && last === ']') ||
      (first === '|' && last === '|') ||
      (first === '(' && last === ')')
    ) {
      return query.slice(1, -1);
    }

    return query;
  };

  const handleClick = () => {
    if (!query || !/\S/.test(query)) {
      setActive(null);
      return;
    }
    const currentIndex = parseIndex();
    const currentQuery = parseQuery();

    switch (currentIndex) {
      case 1:
        setActive(<Anime query={currentQuery} />);
        break;
      case 2:
        setActive(<Manga query={currentQuery} />);
        break;
      case 3:
        setActive(<LightNovel query={currentQuery} />);
        break;
      case 4:
        setActive(<VisualNovel query={currentQuery} />);
        break;
      case 5:
        setActive(<Doujin query={currentQuery} />);
        break;
      default:
        setActive(<ErrorMessage message='Invalid search pattern' />);
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
        {active}
      </Container>
    </div>
  );
};

export default Search;
