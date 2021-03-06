import React, { useState, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import SearchLoader from './SearchLoader';
import BlurredImage from './BlurredImage';
import { TextGridRow, TextGridColumn, HeaderGridRow, RelationsGridColumn } from './grids';

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
  const [score, setScore] = useState<number | string>(0);
  const [synopsis, setSynopsis] = useState<string>('');
  const [relations, setRelations] = useState<Relations>({});
  const [genres, setGenres] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [serializations, setSerializations] = useState<string[]>([]);

  const fetchData = async (search: string) => {
    setMessage(<SearchLoader />);
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

  const nameConverter = (names: string[]): string => {
    return names.map((n) => n.split(', ').reverse().join(' ')).join(', ');
  };

  if (found)
    return (
      <Container className='query'>
        <Grid columns={2} textAlign='left'>
          <Grid.Column computer={4} widescreen={4} largeScreen={4} tablet={6} mobile={6}>
            <BlurredImage imageUrl={imageUrl} score={score} imageNSFW={false} />
          </Grid.Column>
          <Grid.Column computer={12} widescreen={12} largeScreen={12} tablet={10} mobile={10}>
            <HeaderGridRow title={title} url={url} />
            <TextGridRow label='English Title' text={titleEnglish} />
            <TextGridRow label={['Type', 'Status']} text={[type, status]} />
            <TextGridRow label={['Volumes', 'Chapters']} text={[volumes, chapters]} />
            <TextGridRow label='Published' text={published} />
            <TextGridRow label='Authors' text={nameConverter(authors)} />
            <TextGridRow label='Serializations' text={serializations.join(', ')} />
            <TextGridRow label='Genres' text={genres.join(', ')} />
          </Grid.Column>
        </Grid>
        <Grid columns={1} textAlign='left'>
          <TextGridColumn label='Synopsis' text={synopsis} />
          <RelationsGridColumn relations={relations} />
        </Grid>
      </Container>
    );

  return <Container className='query'>{message}</Container>;
};

export default Manga;
