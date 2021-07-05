import React from 'react';
import { Container } from 'semantic-ui-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps): React.ReactElement => {
  return <Container className='query'>{message}</Container>;
};

export default ErrorMessage;
