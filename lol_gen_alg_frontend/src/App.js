import React, { useEffect } from 'react';
import Champions from './components/champions.js'
import './App.css'


function App() {

  useEffect(s => {
    // gen_alg.full_gen_alg(ENEMY_TEAM);
  });

  return (
    <div className="App">
      <h1> Pick Your Team Composition </h1>
      <Champions/>
    </div>
  );
}

export default App;
