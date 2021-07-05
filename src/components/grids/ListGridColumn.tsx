import React from 'react';
import { Grid } from 'semantic-ui-react';

interface ListGridColumnProps {
  label: string;
  data: (string | number)[];
}

const ListGridColumn = ({ label, data }: ListGridColumnProps): React.ReactElement => {
  return (
    <Grid.Column>
      <Grid.Row style={{ marginBottom: '5px' }}>
        <span className='bold'>{label}</span>
      </Grid.Row>
      {data && data.length > 0
        ? data.map((x, i) => (
            <Grid.Row key={`${label}${i + 1}`} style={{ marginBottom: '5px' }}>
              {i + 1}. {x}
            </Grid.Row>
          ))
        : 'None'}
    </Grid.Column>
  );
};

export default ListGridColumn;
