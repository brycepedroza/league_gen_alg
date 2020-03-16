import React, { useEffect } from 'react';

let gen_alg = require("./gen_alg_logic/main.js")

const ENEMY_TEAM = [
    "516",
    "113",
    "38",
    "236",
    "412"
]

function App() {

  useEffect(s => {
    gen_alg.full_gen_alg(ENEMY_TEAM);
  });

  return (
    <div className="App">
      Welcome
    </div>
  );
}

export default App;
