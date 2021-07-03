import React, { useState, useEffect } from 'react';
import { Header, Icon, Menu, Popup, SemanticCOLORS } from 'semantic-ui-react';

interface TitleProps {
  title: string;
}

enum StatusColor {
  Loading = 'yellow',
  Up = 'green',
  Down = 'red',
}

enum StatusText {
  Loading = 'Serving is starting',
  Up = 'Server is up',
  Down = 'Server is down',
}

const api = process.env.REACT_APP_API_SERVER;

const Title = ({ title }: TitleProps): React.ReactElement => {
  const [color, setColor] = useState<SemanticCOLORS>(StatusColor.Loading);
  const [text, setText] = useState<string>(StatusText.Loading);

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
    <div style={{ margin: '30px' }}>
      <Header size='huge' inverted>
        {title}
      </Header>

      <div style={{ display: 'fixed', top: 0, right: 0 }}>
        <Menu.Item href='https://github.com/f4str/sauce-searcher' target='_blank'>
          <Icon name='github' inverted />
        </Menu.Item>
        <Popup content={text} size='mini' trigger={<Icon name='circle' color={color} />} />
      </div>
    </div>
  );
};

export default Title;
