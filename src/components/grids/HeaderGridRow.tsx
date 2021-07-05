import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

interface HeaderGridRowProps {
  title: string;
  url: string;
}

const HeaderGridRow = ({ title, url }: HeaderGridRowProps): React.ReactElement => {
  if (title && title !== '') {
    return (
      <Grid.Row style={{ marginBottom: '10px' }}>
        <Header inverted textAlign='left'>
          <a href={url} className='link'>
            {title}
          </a>
        </Header>
      </Grid.Row>
    );
  }
  return <div />;
};

export default HeaderGridRow;
