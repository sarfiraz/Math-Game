import React,{useState,useEffect} from 'react';
import './App.css';
import Content from "./components/Content";



function App() {

  return (
    <div className="App">
        <Content  />
        {/*{startClicked ? <Start /> : <Content />}*/}
    </div>
  );
}

export default App;

