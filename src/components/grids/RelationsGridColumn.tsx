import React from 'react';
import { Grid } from 'semantic-ui-react';
import { TextGridRow } from '.';

interface Relations {
  [key: string]: string[];
}

interface RelationsGridColumnProps {
  relations: Relations;
}

const RelationsGridColumn = ({ relations }: RelationsGridColumnProps): React.ReactElement => {
  return (
    <Grid.Column>
      {Object.entries(relations).map((r) => {
        return <TextGridRow label={`${r[0]}`} text={r[1].join(', ')} />;
      })}
    </Grid.Column>
  );
};

export default RelationsGridColumn;
