import React, { useState, forwardRef, useImperativeHandle } from 'react';

function VisualNovel({query}) {
	const [result, setResult] = useState(null);
	
	return (
		<div>
			{result}
		</div>
	)
}

export default VisualNovel;
