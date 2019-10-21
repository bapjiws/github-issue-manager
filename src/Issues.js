import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

// TODO: make `owner` and `name` dynamic.
const OPEN_ISSUES = gql`
  {
    repository(owner: "bapjiws", name: "github-issue-manager") {
      issues(last: 20, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}, filterBy: {assignee: "bapjiws"}) {
        totalCount
        edges {
          node {
            createdAt
            title
            url
            bodyText
            assignees(last: 20) {
              edges {
                node {
                  login
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const Issues = () => {
  const { loading, error, data } = useQuery(OPEN_ISSUES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log('data:', data);

  return <div>Issues: </div>;
};