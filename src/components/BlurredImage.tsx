import React, { useState } from 'react';
import { Button, Dimmer, Header, Image } from 'semantic-ui-react';

interface ImageGridColumnProps {
  imageUrl: string;
  score: string | number;
  imageNSFW: boolean;
}

const ImageGridColumn = ({
  imageUrl,
  score,
  imageNSFW,
}: ImageGridColumnProps): React.ReactElement => {
  const [blurred, setBlurred] = useState<boolean>(true);

  if (imageNSFW) {
    return (
      <Dimmer.Dimmable as={Image} fluid blurring dimmed={blurred}>
        <Dimmer active={blurred}>
          <Header as='h2' inverted>
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
    );
  }
  return (
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
  );
};

export default ImageGridColumn;
