import React, { useState, useEffect } from 'react';
import { Container, Input, Tab, Segment } from 'semantic-ui-react';

const panes = [
	{ menuItem: 'Auto', placeholder: '{anime}, <manga>, [light novel], |visual novel|, (doujin)' },
	{ menuItem: 'Anime', placeholder: 'Search by anime name' },
	{ menuItem: 'Manga', placeholder: 'Search by manga name' },
	{ menuItem: 'Light Novel', placeholder: 'Search by light novel name' },
	{ menuItem: 'Visual Novel', placeholder: 'Search by visual novel name' },
	{ menuItem: 'Doujin', placeholder: 'Search by doujin digits' },
];

function Search({index, setIndex, setQuery, handleClick}) {
	const [placeholder, setPlaceholder] = useState('Search');
	
	useEffect(() => {
		setPlaceholder(panes[index].placeholder)
	}, [index]);
	
	const handleTabChange = (e, { activeIndex }) => {
		setIndex(activeIndex);
	};
	
	const handleInputChange = (e) => {
		setQuery(e.target.value);
	};
	
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleClick();
		}
	}
	
	return (
		<Container style={{ width: '50%' }}>
			<Segment inverted 
				style={{overflow: 'auto', margin: 'auto', padding: '1px' }}>
				<Tab panes={panes} 
					menu={{
						attached: true,
						tabular: true,
						inverted: true,
					}}
					renderActiveOnly={true}
					onTabChange={handleTabChange}
				/>
			</Segment>
			<Input action={{ 
					icon: 'search',
					onClick: () => {handleClick()}
				}} 
				style={{ width: '100%' }}
				size='small' 
				placeholder={placeholder}
				inverted 
				onChange={handleInputChange} 
				onKeyDown={handleKeyDown}
			/>
		</Container>
	)
}

export default Search;
