import React from 'react';
import IconPicker from './IconPicker'; //Imports all Feather icons from the feather-icons-react library
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Icon Picker Component</h1>
      <IconPicker rowsInOnePage={5} columnsInOnePage={5} iconHeight={50} iconWidth={50} />
    </div>
  );
}

export default App;
