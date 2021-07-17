import React from 'react';
import Status from './components/Status';
import Title from './components/Title';
import Search from './components/Search';
import './App.css';

const App = (): React.ReactElement => {
  return (
    <div className='App'>
      <Status />
      <Title />
      <Search />
    </div>
  );
};

export default App;
