import React from 'react';
import { Loader } from 'semantic-ui-react';

const SearchLoader = (): React.ReactElement => {
  return (
    <div>
      <Loader key='loader' active inline='centered' size='large'>
        Searching
      </Loader>
    </div>
  );
};

export default SearchLoader;
