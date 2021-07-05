import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

interface HeaderGridColumnProps {
  title: string | number;
  url: string;
}

const HeaderGridColumn = ({ title, url }: HeaderGridColumnProps): React.ReactElement => {
  if (title && title !== '') {
    return (
      <Grid.Column>
        <Header inverted textAlign='left'>
          <a href={url} className='link'>
            {title}
          </a>
        </Header>
      </Grid.Column>
    );
  }
  return <div />;
};

export default HeaderGridColumn;
