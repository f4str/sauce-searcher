import React, { useState, useEffect } from 'react';
import { Segment, Icon, Menu, Popup, SemanticCOLORS } from 'semantic-ui-react';

enum StatusColor {
  Starting = 'yellow',
  Up = 'green',
  Down = 'red',
}

enum StatusText {
  Starting = 'Serving is starting',
  Up = 'Server is up',
  Down = 'Server is down',
}

const api = process.env.REACT_APP_API_SERVER;

const Status = (): React.ReactElement => {
  const [color, setColor] = useState<SemanticCOLORS>(StatusColor.Starting);
  const [text, setText] = useState<string>(StatusText.Starting);

  const checkServer = async () => {
    try {
      const response = await fetch(`${api}`);
      if (response.ok) {
        setColor(StatusColor.Up);
        setText(StatusText.Up);
      } else {
        setColor(StatusColor.Down);
        setText(StatusText.Down);
      }
    } catch {
      setColor(StatusColor.Down);
      setText(StatusText.Down);
    }
  };

  useEffect(() => {
    checkServer();
  }, []);

  return (
    <Segment inverted style={{ position: 'absolute', top: 0, right: 0 }}>
      <Menu.Item href='https://github.com/f4str/sauce-searcher' target='_blank'>
        <Icon name='github' inverted size='large' />
      </Menu.Item>

      <Popup content={text} inverted trigger={<Icon name='circle' size='large' color={color} />} />
    </Segment>
  );
};

export default Status;
