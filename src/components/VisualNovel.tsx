import React, { useState, useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import SearchLoader from './SearchLoader';
import BlurredImage from './BlurredImage';
import { TextGridRow, HeaderGridRow, TextGridColumn } from './grids';

interface VisualNovelProps {
  query: string;
}

const api = process.env.REACT_APP_API_SERVER;

const VisualNovel = ({ query }: VisualNovelProps): React.ReactElement => {
  const [found, setFound] = useState<boolean>(false);
  const [message, setMessage] = useState<string | React.ReactElement>('');

  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageNSFW, setImageNSFW] = useState<boolean>(false);
  const [released, setReleased] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [staff, setStaff] = useState<string[]>([]);
  const [anime, setAnime] = useState<boolean>(false);
  const [length, setLength] = useState<string>('');
  const [score, setScore] = useState<number | string>(0);

  const fetchData = async (search: string) => {
    setMessage(<SearchLoader />);
    setFound(false);

    const response = await fetch(`${api}/vn/${search}`);
    if (response.ok) {
      const data = await response.json();
      setFound(true);
      setTitle(data.title);
      setUrl(data.url);
      setImageUrl(data.image);
      setImageNSFW(data.image_nsfw);
      setDescription(data.description);
      setTags(data.tags);
      setStaff(data.staff);
      setAnime(data.anime);
      setLength(data.length);
      setScore(data.score);
      const releasedDate = data.released ? new Date(data.released) : null;
      if (releasedDate) {
        setReleased(
          releasedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        );
      } else {
        setReleased('?');
      }
    } else {
      setFound(false);
      setMessage('Visual novel not found');
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
      <Container className='smaller-font'>
        <Grid columns={2} textAlign='left'>
          <Grid.Column largeScreen={4} tablet={6} mobile={6}>
            <BlurredImage imageUrl={imageUrl} score={score} imageNSFW={imageNSFW} />
          </Grid.Column>
          <Grid.Column largeScreen={10} tablet={9} mobile={9}>
            <HeaderGridRow title={title} url={url} />
            <TextGridRow label='Type' text='Visual Novel' />
            <TextGridRow label='Released' text={released} />
            <TextGridRow label='Length' text={length} />
            <TextGridRow label='Anime Adaptation' text={anime ? 'Yes' : 'No'} />
            <TextGridRow label='Staff' text={staff.join(', ')} />
            <TextGridRow label='Tags' text={tags.slice(0, 20).join(', ')} />
          </Grid.Column>
        </Grid>
        <Grid columns={1} textAlign='left'>
          <TextGridColumn label='Description' text={description} />
        </Grid>
      </Container>
    );
  }

  return <div>{message}</div>;
};

export default VisualNovel;
