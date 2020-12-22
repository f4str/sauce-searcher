import React, { useState, useEffect } from 'react';
import { Container, Input, Tab, Segment } from 'semantic-ui-react';

const panes = [
	{ menuItem: 'Auto', searchText: 'Search using u/robaragi patterns' },
	{ menuItem: 'Anime', searchText: 'Search by anime name' },
	{ menuItem: 'Manga', searchText: 'Search by manga name' },
	{ menuItem: 'Visual Novel', searchText: 'Search by visual novel name' },
	{ menuItem: 'Doujin', searchText: 'Search by 6 digits' },
];

function Search() {
	const [index, setIndex] = useState(0);
	const [searchText, setSearchText] = useState('Search');
	const [inputText, setInputText] = useState('');
	
	useEffect(() => {
		setSearchText(panes[index].searchText)
	}, [index]);
	
	const handleTabChange = (e, { activeIndex }) => {
		setIndex(activeIndex);
	}
	
	const handleInputChange = (e) => {
		setInputText(e.target.value);
	}
	
	const handleClick = () => {
		
	}
	
	return (
		<Container style={{ width: '50%' }}>
			<Segment inverted 
				style={{overflow: 'auto', maxHeight: '50vh', margin: 'auto', padding: '1px' }}>
				<Tab panes={panes} 
					style={{
						color: 'white',
						margin: 'auto',
					}}
					menu={{
						borderless: true,
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
				style={{
					width: '100%',
				}}
				size='medium' 
				placeholder={searchText}
				inverted 
				onChange={handleInputChange} 
			/>
			{ inputText }
		</Container>
	)
}

export default Search;
