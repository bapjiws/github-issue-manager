import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const ws = new WebSocket('ws://localhost:8080');

  useEffect(() => {
    ws.onopen = event => {
      console.log("WebSocket is open now.");
    };

    ws.onmessage = event => {
      console.log("WebSocket message received:", event);
    };
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
