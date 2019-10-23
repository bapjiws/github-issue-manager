import React from 'react';
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

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <Issues />
      </header>
    </div>
  </ApolloProvider>
);

export default App;
