import React from 'react';
import { Header, Icon, Menu } from 'semantic-ui-react';

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps): React.ReactElement => {
  return (
    <div>
      <Header size="huge" inverted style={{ margin: '30px' }}>
        {title}
        <Menu.Item
          href="https://github.com/f4str/sauce-searcher"
          target="_blank"
          style={{ marginLeft: '10px' }}
        >
          <Icon name="github" inverted />
        </Menu.Item>
      </Header>
    </div>
  );
};

export default Title;
