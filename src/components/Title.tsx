import React from 'react';
import { Header } from 'semantic-ui-react';

const Title = (): React.ReactElement => {
  return (
    <Header size='huge' inverted style={{ marginTop: '30px', marginBottom: '20px' }}>
      Sauce Searcher
    </Header>
  );
};

export default Title;
