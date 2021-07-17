import React from 'react';
import { Header } from 'semantic-ui-react';

const Title = (): React.ReactElement => {
  return (
    <div className='Title'>
      <Header size='huge' inverted>
        Sauce Searcher
      </Header>
    </div>
  );
};

export default Title;
