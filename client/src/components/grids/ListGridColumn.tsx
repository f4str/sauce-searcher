import React from 'react';
import { Grid } from 'semantic-ui-react';

interface ListGridColumnProps {
  label: string;
  data: (string | number)[];
}

const ListGridColumn = ({ label, data }: ListGridColumnProps): React.ReactElement => {
  return (
    <Grid.Column>
      <Grid.Row key={label} className='half-grid-row'>
        <span className='bold'>{label}</span>
      </Grid.Row>
      {data && data.length > 0
        ? data.map((x, i) => (
            <Grid.Row key={`${label}${i + 1}`} className='half-grid-row'>
              {i + 1}. {x}
            </Grid.Row>
          ))
        : 'None'}
    </Grid.Column>
  );
};

export default ListGridColumn;
