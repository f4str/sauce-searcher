import React from 'react';
import { Header } from 'semantic-ui-react'

function Title({title}) {
	return (
		<div>
			<Header size='huge' inverted style={{ margin: '30px' }}>
				{title}
			</Header>
		</div>
	)
}

export default Title;
