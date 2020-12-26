import React from 'react';

function ErrorMessage({active, message}) {
	return (
		<div>
			{ active === 'error' ? message : null }
		</div>
	);
}

export default ErrorMessage;