import React from 'react';
import { Grid } from 'semantic-ui-react';

interface TextGridColumnProps {
  label: string;
  text: string | number;
}

const TextGridColumn = ({ label, text }: TextGridColumnProps): React.ReactElement => {
  if (text && text !== '') {
    return (
      <Grid.Column>
        <span className='bold'>{label}: </span>
        {text}
      </Grid.Column>
    );
  }
  return <div />;
};

export default TextGridColumn;
