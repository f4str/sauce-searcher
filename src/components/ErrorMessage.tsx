import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps): React.ReactElement => {
  return <div>{message}</div>;
};

export default ErrorMessage;
