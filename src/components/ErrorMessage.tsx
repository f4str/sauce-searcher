import React from 'react';

interface ErrorMessageProps {
  active: string | null;
  message: string;
}

const ErrorMessage = ({ active, message }: ErrorMessageProps): React.ReactElement => {
  return <div>{active === 'error' ? message : null}</div>;
};

export default ErrorMessage;
