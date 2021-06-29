import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Grid, Header, Loader } from 'semantic-ui-react';

interface DoujinProps {
  query: string;
  active: string | null;
}

const api = process.env.REACT_APP_API_SERVER;

const Doujin = forwardRef(({ query, active }: DoujinProps, ref) => {
  const [found, setFound] = useState<boolean>(false);
  const [message, setMessage] = useState<string | JSX.Element>('');

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

  const fetchData = async () => {
    const loader = (
      <Loader key="loader" active inline="centered" size="large">
        Searching
      </Loader>
    );
    setMessage(loader);
    setFound(false);

    const first = query.charAt(0);
    const last = query.slice(-1);
    const search = first === '(' && last === ')' ? query.slice(1, -1) : query;

    const response = await fetch(`${api}/doujin/${search}`);
    if (response.status === 200) {
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

  useImperativeHandle(ref, () => {
    return {
      fetchData,
    };
  });

  const arrayGridColumn = (name: string, array: string[]) => {
    if (array && array.length > 0) {
      return (
        <Grid.Column>
          <span className="bold">{name}</span>
          {array.join(', ')}
        </Grid.Column>
      );
    }

    return null;
  };

  if (active === 'doujin') {
    if (found) {
      return (
        <Grid columns={1} textAlign="left">
          <Grid.Column>
            <Header inverted textAlign="left">
              <a href={url} className="link">
                {id}
              </a>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <span className="bold">Title: </span>
            {title}
          </Grid.Column>
          <Grid.Column>
            <span className="bold">Pages: </span>
            {pages}
          </Grid.Column>
          <Grid.Column>
            <span className="bold">Upload Date: </span>
            {uploadDate}
          </Grid.Column>
          {arrayGridColumn('Characters: ', characters)}
          {arrayGridColumn('Parodies: ', parodies)}
          {arrayGridColumn('Tags: ', tags)}
          {arrayGridColumn('Artists: ', artists)}
          {arrayGridColumn('Groups: ', groups)}
          {arrayGridColumn('Languages: ', languages)}
          {arrayGridColumn('Categories: ', categories)}
        </Grid>
      );
    }

    return <div>{message}</div>;
  }

  return <div />;
});

export default Doujin;
