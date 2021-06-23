import { UserProvider } from './context/UserContext';
import LayoutCustom from './layout/LayoutCustom';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className='myContent'>
      <UserProvider>
        <LayoutCustom />
      </UserProvider>
    </div>
  );
}

export default App;
