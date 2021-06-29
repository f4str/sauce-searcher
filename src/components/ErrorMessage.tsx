import React from 'react';

interface ErrorMessageProps {
  active: string | null;
  message: string;
}

function ErrorMessage({ active, message }: ErrorMessageProps) {
  return <div>{active === 'error' ? message : null}</div>;
}

export default ErrorMessage;
