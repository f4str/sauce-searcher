import React, { useState, forwardRef, useImperativeHandle } from 'react';

function Manga({query}) {
	const [result, setResult] = useState(null);
	
	return (
		<div>
			{result}
		</div>
	)
}

export default Manga;
