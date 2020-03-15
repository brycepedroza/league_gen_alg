import React, { useEffect } from 'react';

let logic = require("./gen_alg_logic/test.js")

function App() {

  useEffect(s => {
    console.log(logic.test())
  });

  return (
    <div className="App">
      Welcome
    </div>
  );
}

export default App;
