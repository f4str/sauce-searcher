import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Container, Grid, Image, Header, Loader, Dimmer, Button } from 'semantic-ui-react';

interface VisualNovelProps {
  query: string;
  active: string | null;
}

const api = process.env.REACT_APP_API_SERVER;

const VisualNovel = forwardRef(({ query, active }: VisualNovelProps, ref) => {
  const [found, setFound] = useState<boolean>(false);
  const [message, setMessage] = useState<string | React.ReactElement>('');
  const [blurred, setBlurred] = useState<boolean>(true);

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
    const search = first === '|' && last === '|' ? query.slice(1, -1) : query;

    const response = await fetch(`${api}/vn/${search}`);
    if (response.status === 200) {
      const data = await response.json();
      setFound(true);
      setBlurred(true);
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

  useImperativeHandle(ref, () => {
    return {
      fetchData,
    };
  });

  const textGridRow = (name: string, data: string) => {
    if (data && data !== '') {
      return (
        <Grid.Row key={name} style={{ marginBottom: '10px' }}>
          <span className="bold">{name}</span>
          {data}
        </Grid.Row>
      );
    }

    return null;
  };

  if (active === 'visual novel') {
    if (found) {
      return (
        <Container className="smaller-font">
          <Grid columns={2} textAlign="left">
            <Grid.Column largeScreen={4} tablet={6} mobile={6}>
              {!imageNSFW ? (
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
              ) : (
                <Dimmer.Dimmable as={Image} fluid blurring dimmed={blurred}>
                  <Dimmer active={blurred}>
                    <Header as="h2" inverted>
                      NSFW
                    </Header>
                    <Button
                      onClick={() => {
                        setBlurred(false);
                      }}
                    >
                      View
                    </Button>
                  </Dimmer>
                  <Image
                    src={imageUrl}
                    fluid
                    label={{
                      color: 'blue',
                      content: score,
                      icon: 'star',
                      ribbon: true,
                    }}
                    onClick={() => setBlurred(true)}
                  />
                </Dimmer.Dimmable>
              )}
            </Grid.Column>
            <Grid.Column largeScreen={10} tablet={9} mobile={9}>
              <Grid.Row style={{ marginBottom: '10px' }}>
                <Header inverted textAlign="left">
                  <a href={url} className="link">
                    {title}
                  </a>
                </Header>
              </Grid.Row>
              {textGridRow('Type: ', 'Visual Novel')}
              {textGridRow('Released: ', released)}
              {textGridRow('Length: ', length)}
              {textGridRow('Anime Adaptation: ', anime ? 'Yes' : 'No')}
              {textGridRow('Staff: ', staff.join(', '))}
              {textGridRow('Tags: ', tags.slice(0, 20).join(', '))}
            </Grid.Column>
          </Grid>
          <Grid columns={1} textAlign="left">
            {description ? (
              <Grid.Column>
                <span className="bold">Description:</span> {description}
              </Grid.Column>
            ) : null}
          </Grid>
        </Container>
      );
    }

    return <div>{message}</div>;
  }

  return <div />;
});

export default VisualNovel;
