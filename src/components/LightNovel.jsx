import React, { useState, forwardRef, useImperativeHandle } from 'react';

function LightNovel({query}) {
	const [result, setResult] = useState(null);
	
	return (
		<div>
			{result}
		</div>
	)
}

export default LightNovel;
