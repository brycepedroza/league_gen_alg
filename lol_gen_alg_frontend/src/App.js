import React, { useEffect } from 'react';
import Champions from './components/champions.js'
import './App.css'

let gen_alg = require("./gen_alg_logic/main.js");

const ENEMY_TEAM = [
    "516",
    "113",
    "38",
    "236",
    "412"
]

function App() {

  useEffect(s => {
    // gen_alg.full_gen_alg(ENEMY_TEAM);
  });

  return (
    <div className="App">
      <h1> Welcome </h1>
      <Champions/>
    </div>
  );
}

export default App;
