import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { Issues } from './Issues';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
});

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
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Issues />
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
    </ApolloProvider>
  );
};

export default App;
