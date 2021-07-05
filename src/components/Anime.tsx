import React, { useState, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import SearchLoader from './SearchLoader';
import BlurredImage from './BlurredImage';
import {
  TextGridRow,
  TextGridColumn,
  HeaderGridRow,
  RelationsGridColumn,
  ListGridColumn,
} from './grids';

interface AnimeProps {
  query: string;
}

interface Relations {
  [key: string]: string[];
}

const api = process.env.REACT_APP_API_SERVER;

const Anime = ({ query }: AnimeProps): React.ReactElement => {
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

  const fetchData = async (search: string) => {
    setMessage(<SearchLoader />);
    setFound(false);

    const response = await fetch(`${api}/anime/${search}`);
    if (response.ok) {
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

  useEffect(() => {
    if (!query || !/\S/.test(query)) {
      setFound(false);
      setMessage('Invalid query');
    } else {
      fetchData(query);
    }
  }, [query]);

  if (found)
    return (
      <Container className='smaller-font'>
        <Grid columns={2} textAlign='left'>
          <Grid.Column largeScreen={4} tablet={6} mobile={6}>
            <BlurredImage imageUrl={imageUrl} score={score} imageNSFW={false} />
          </Grid.Column>
          <Grid.Column largeScreen={10} tablet={9} mobile={9}>
            <HeaderGridRow title={title} url={url} />
            <TextGridRow label='English Title' text={titleEnglish} />
            <TextGridRow label={['Type', 'Episodes']} text={[type, episodes]} />
            <TextGridRow label='Status' text={status} />
            <TextGridRow label='Rating' text={rating} />
            <TextGridRow label='Studios' text={studios.join(', ')} />
            <TextGridRow label='Source' text={source} />
            <TextGridRow label='Duration' text={duration} />
            <TextGridRow label='Season' text={premiered} />
            <TextGridRow label='Aired' text={aired} />
            <TextGridRow label='Genres' text={genres.join(', ')} />
          </Grid.Column>
        </Grid>
        <Grid columns={1} textAlign='left'>
          <TextGridColumn label='Synopsis' text={synopsis} />
          <RelationsGridColumn relations={relations} />
          <ListGridColumn label='Openings' data={openings} />
          <ListGridColumn label='Endings' data={endings} />
        </Grid>
      </Container>
    );

  return <div>{message}</div>;
};

export default Anime;
