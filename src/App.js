import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, from } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Issues } from './Issues';
import { Signin } from './Signin';
import './App.css';

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql'
});

const client = new ApolloClient({
  link: from([
    authMiddleware,
    httpLink
  ]),
  cache: new InMemoryCache()
});

const App = () => {
  const [ updateApp , setUpdateApp ] = useState(false);
  const handleUpdateApp = () => setUpdateApp(!updateApp);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          {
            localStorage.getItem('token') ? <Issues handleUpdateApp={handleUpdateApp} /> : <Signin handleUpdateApp={handleUpdateApp} />
          }
        </header>
      </div>
    </ApolloProvider>
  );
};

export default App;
