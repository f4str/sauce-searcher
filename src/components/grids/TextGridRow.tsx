import React from 'react';
import { Grid } from 'semantic-ui-react';

interface TextGridRowProps {
  label: string | number | (string | number)[];
  text: string | number | (string | number)[];
}

const TextGridRow = ({ label, text }: TextGridRowProps): React.ReactElement => {
  if (Array.isArray(label) && Array.isArray(text)) {
    if (label.every((x) => x && x !== '')) {
      return (
        <Grid.Row key={label.toString()} className='grid-row'>
          {label
            .map<React.ReactNode>((value, index) => (
              <>
                <span className='bold'>{value}: </span>
                {text[index]}
              </>
            ))
            .reduce((previous, current) => [previous, ' | ', current])}
        </Grid.Row>
      );
    }
  } else if (label && label !== '') {
    return (
      <Grid.Row key={label.toString()} className='grid-row'>
        <span className='bold'>{label}: </span>
        {text}
      </Grid.Row>
    );
  }
  return <div />;
};

export default TextGridRow;
