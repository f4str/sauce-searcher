import React, { useState, useEffect } from 'react';
import { Container, Grid, Image, Header, Loader } from 'semantic-ui-react';

interface MangaProps {
  query: string;
}

interface Relations {
  [key: string]: string[];
}

const api = process.env.REACT_APP_API_SERVER;

const Manga = ({ query }: MangaProps): React.ReactElement => {
  const [found, setFound] = useState<boolean>(false);
  const [message, setMessage] = useState<string | React.ReactElement>('');

  const [title, setTitle] = useState<string>('');
  const [titleEnglish, setTitleEnglish] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [volumes, setVolumes] = useState<number | string>(0);
  const [chapters, setChapters] = useState<number | string>(0);
  const [status, setStatus] = useState<string>('');
  const [published, setPublished] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [score, setScore] = useState<number | string>(0);
  const [synopsis, setSynopsis] = useState<string>('');
  const [relations, setRelations] = useState<Relations>({});
  const [genres, setGenres] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [serializations, setSerializations] = useState<string[]>([]);

  const fetchData = async (search: string) => {
    const loader = (
      <Loader key='loader' active inline='centered' size='large'>
        Searching
      </Loader>
    );
    setMessage(loader);
    setFound(false);

    const response = await fetch(`${api}/manga/${search}`);
    if (response.ok) {
      const data = await response.json();
      setFound(true);
      setTitle(data.title);
      setTitleEnglish(data.title_english);
      setUrl(data.url);
      setImageUrl(data.image);
      setType(data.type);
      setVolumes(data.volumes ? data.volumes : '?');
      setChapters(data.chapters ? data.chapters : '?');
      setStatus(data.status);
      setPublished(data.published ? data.published.string : '');
      setRating(data.rating);
      setScore(data.score);
      setSynopsis(data.synopsis);
      setRelations(data.relations);
      setGenres(data.genres);
      setAuthors(data.authors);
      setSerializations(data.serializations);
    } else {
      setFound(false);
      setMessage('Manga not found');
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

  const textGridRow = (name: string, data: string) => {
    if (data && data !== '') {
      return (
        <Grid.Row key={name} style={{ marginBottom: '10px' }}>
          <span className='bold'>{name}</span>
          {data}
        </Grid.Row>
      );
    }

    return null;
  };

  const nameConverter = (names: string[]) => {
    return names.map((n) => n.split(', ').reverse().join(' ')).join(', ');
  };

  if (found)
    return (
      <Container className='smaller-font'>
        <Grid columns={2} textAlign='left'>
          <Grid.Column largeScreen={4} tablet={6} mobile={6}>
            <Image
              src={imageUrl}
              fluid
              label={{
                color: 'blue',
                content: score,
                icon: 'star',
                ribbon: true,
              }}
            />
          </Grid.Column>
          <Grid.Column largeScreen={10} tablet={9} mobile={9}>
            <Grid.Row style={{ marginBottom: '10px' }}>
              <Header inverted textAlign='left'>
                <a href={url} className='link'>
                  {title}
                </a>
              </Header>
            </Grid.Row>
            {textGridRow('English Title: ', titleEnglish)}
            <Grid.Row style={{ marginBottom: '10px' }}>
              <span className='bold'>Type: </span>
              {type} | <span className='bold'>Status: </span>
              {status}
            </Grid.Row>
            <Grid.Row style={{ marginBottom: '10px' }}>
              <span className='bold'>Volumes: </span>
              {volumes} | <span className='bold'>Chapters: </span>
              {chapters}
            </Grid.Row>
            {textGridRow('Rating: ', rating)}
            {textGridRow('Published: ', published)}
            {textGridRow('Authors: ', nameConverter(authors))}
            {textGridRow('Serializations: ', serializations.join(', '))}
            {textGridRow('Genres: ', genres.join(', '))}
          </Grid.Column>
        </Grid>
        <Grid columns={1} textAlign='left'>
          <Grid.Column>
            <span className='bold'>Synopsis:</span> {synopsis}
          </Grid.Column>
          <Grid.Column>
            {Object.entries(relations).map((r) => {
              return textGridRow(`${r[0]}: `, r[1].join(', '));
            })}
          </Grid.Column>
        </Grid>
      </Container>
    );

  return <div>{message}</div>;
};

export default Manga;
