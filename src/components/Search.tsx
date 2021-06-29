import React, { useState, useEffect } from 'react';
import { Container, Input, Segment, Tab, TabProps } from 'semantic-ui-react';

interface SearchProps {
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleClick: () => void;
}

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

const Search = ({ index, setIndex, setQuery, handleClick }: SearchProps): React.ReactElement => {
  const [placeholder, setPlaceholder] = useState<string>('Search');

  useEffect(() => {
    setPlaceholder(panes[index].placeholder);
  }, [index]);

  const handleTabChange = (event: React.MouseEvent<HTMLDivElement>, data: TabProps) => {
    setIndex(data.activeIndex as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
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
        size="small"
        placeholder={placeholder}
        inverted
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </Container>
  );
};

export default Search;
