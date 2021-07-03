import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Container, Grid, Image, Header, Loader } from 'semantic-ui-react';

interface AnimeProps {
  query: string;
  active: string | null;
}

interface Relations {
  [key: string]: string[];
}

const api = process.env.REACT_APP_API_SERVER;

const Anime = forwardRef(({ query, active }: AnimeProps, ref) => {
  const [found, setFound] = useState<boolean>(false);
  const [message, setMessage] = useState<string | React.ReactElement>('');

  const [title, setTitle] = useState<string>('');
  const [titleEnglish, setTitleEnglish] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [source, setSource] = useState<string>('');
  const [episodes, setEpisodes] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [premiered, setPremiered] = useState<string>('');
  const [aired, setAired] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [score, setScore] = useState<number | string>(0);
  const [synopsis, setSynopsis] = useState<string>('');
  const [relations, setRelations] = useState<Relations>({});
  const [studios, setStudios] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [openings, setOpenings] = useState<string[]>([]);
  const [endings, setEndings] = useState<string[]>([]);

  const fetchData = async () => {
    const loader = (
      <Loader key='loader' active inline='centered' size='large'>
        Searching
      </Loader>
    );
    setMessage(loader);
    setFound(false);

    const first = query.charAt(0);
    const last = query.slice(-1);
    const search = first === '{' && last === '}' ? query.slice(1, -1) : query;

    const response = await fetch(`${api}/anime/${search}`);
    if (response.status === 200) {
      const data = await response.json();
      setFound(true);
      setTitle(data.title);
      setTitleEnglish(data.title_english);
      setUrl(data.url);
      setImageUrl(data.image);
      setType(data.type);
      setSource(data.source);
      setEpisodes(data.episodes ? data.episodes : '?');
      setStatus(data.status);
      setPremiered(data.premiered);
      setAired(data.aired ? data.aired.string : '?');
      setDuration(data.duration);
      setRating(data.rating);
      setScore(data.score);
      setSynopsis(data.synopsis);
      setRelations(data.relations);
      setStudios(data.studios);
      setGenres(data.genres);
      setOpenings(data.openings);
      setEndings(data.endings);
    } else {
      setFound(false);
      setMessage('Anime not found');
    }
  };

  useImperativeHandle(ref, () => {
    return {
      fetchData,
    };
  });

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

  if (active === 'anime') {
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
                {type} | <span className='bold'>Episodes: </span>
                {episodes}
              </Grid.Row>
              {textGridRow('Status: ', status)}
              {textGridRow('Rating: ', rating)}
              {textGridRow('Studios: ', studios.join(', '))}
              {textGridRow('Source: ', source)}
              {textGridRow('Duration: ', duration)}
              {textGridRow('Season: ', premiered)}
              {textGridRow('Aired: ', aired)}
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
            <Grid.Column>
              <Grid.Row style={{ marginBottom: '5px' }}>
                <span className='bold'>Openings</span>
              </Grid.Row>
              {openings && openings.length > 0
                ? openings.map((x, i) => {
                    return (
                      <Grid.Row key={`op${i + 1}`} style={{ marginBottom: '5px' }}>
                        {i + 1}. {x}
                      </Grid.Row>
                    );
                  })
                : 'None'}
            </Grid.Column>
            <Grid.Column>
              <Grid.Row style={{ marginBottom: '5px' }}>
                <span className='bold'>Endings</span>
              </Grid.Row>
              {endings && endings.length > 0
                ? endings.map((x, i) => {
                    return (
                      <Grid.Row key={`ed${i + 1}`} style={{ marginBottom: '5px' }}>
                        {i + 1}. {x}
                      </Grid.Row>
                    );
                  })
                : 'None'}
            </Grid.Column>
          </Grid>
        </Container>
      );

    return <div>{message}</div>;
  }

  return <div />;
});

export default Anime;
