import React from 'react';
import TapeDeck from './components/TapeDeck'
import './App.css';

const App: React.FC = () => {
return (
  <div className="App">
    <header>
    <h1>Welcome to Tapedeck</h1>
    </header>
    
   <TapeDeck/>
  </div>
);
}
export default App
