import React, { useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import { Issues } from './Issues';
import './App.css';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_GRAPHQL_API}`
  }
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
          <Issues />
        </header>
      </div>
    </ApolloProvider>
  );
};

export default App;
