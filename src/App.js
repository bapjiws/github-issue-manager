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
  console.log('token:', token);

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
  const [ , setAttemptingToSignIn ] = useState(false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          {
            localStorage.getItem('token') ? <Issues /> : <Signin setAttemptingToSignIn={setAttemptingToSignIn} />
          }
        </header>
      </div>
    </ApolloProvider>
  );
};

export default App;
