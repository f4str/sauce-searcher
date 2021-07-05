import React, { useState, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import SearchLoader from './SearchLoader';
import { TextGridColumn, HeaderGridColumn } from './grids';

interface DoujinProps {
  query: string;
}

const api = process.env.REACT_APP_API_SERVER;

const Doujin = ({ query }: DoujinProps): React.ReactElement => {
  const [found, setFound] = useState<boolean>(false);
  const [message, setMessage] = useState<string | React.ReactElement>('');

  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [uploadDate, setUploadDate] = useState<string>('');
  const [pages, setPages] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [parodies, setParodies] = useState([]);
  const [tags, setTags] = useState([]);
  const [artists, setArtists] = useState([]);
  const [groups, setGroups] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [url, setUrl] = useState('');

  const fetchData = async (search: string) => {
    setMessage(<SearchLoader />);
    setFound(false);

    const response = await fetch(`${api}/doujin/${search}`);
    if (response.ok) {
      const data = await response.json();
      setFound(true);
      setId(data.id);
      setTitle(data.title);
      setPages(data.pages);
      setCharacters(data.characters);
      setParodies(data.parodies);
      setTags(data.tags);
      setArtists(data.artists);
      setGroups(data.groups);
      setLanguages(data.languages);
      setCategories(data.categories);
      setUrl(data.url);
      const upload = data.upload_date ? new Date(data.upload_date) : null;
      if (upload) {
        setUploadDate(
          upload.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        );
      } else {
        setUploadDate('?');
      }
    } else {
      setFound(false);
      setMessage('Doujin not found');
    }
  };

  useEffect(() => {
    if (!query || !/\S/.test(query)) {
      setFound(false);
      setMessage('Invalid query');
    } else {
      fetchData(query);
    }
  }, [query]);

  if (found) {
    return (
      <Container className='query'>
        <Grid columns={1} textAlign='left'>
          <HeaderGridColumn title={id} url={url} />
          <TextGridColumn label='Title' text={title} />
          <TextGridColumn label='Pages' text={pages} />
          <TextGridColumn label='Upload Date' text={uploadDate} />
          <TextGridColumn label='Characters' text={characters.join(', ')} />
          <TextGridColumn label='Parodies' text={parodies.join(', ')} />
          <TextGridColumn label='Tags' text={tags.join(', ')} />
          <TextGridColumn label='Artists' text={artists.join(', ')} />
          <TextGridColumn label='Groups' text={groups.join(', ')} />
          <TextGridColumn label='Languages' text={languages.join(', ')} />
          <TextGridColumn label='Categories' text={categories.join(', ')} />
        </Grid>
      </Container>
    );
  }

  return <Container className='query'>{message}</Container>;
};

export default Doujin;
