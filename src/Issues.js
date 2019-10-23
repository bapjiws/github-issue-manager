import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Typography } from '@material-ui/core';

import { Issue } from './Issue';

// TODO: make `owner` and `name` dynamic.
const OPEN_ISSUES = gql`
  {
    repository(owner: "bapjiws", name: "github-issue-manager") {
      issues(last: 20, states: OPEN, orderBy: {field: CREATED_AT, direction: DESC}, filterBy: {assignee: "bapjiws"}) {
        totalCount
        edges {
          node {
            id
            createdAt
            title
            url
            bodyText
            assignees(first: 1) {
              edges {
                node {
                  login
                  name
                  avatarUrl
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

  const { repository: { issues } } = data;
  console.log('issues:', issues);

  return issues.totalCount === 0 ?
    <Typography variant="h5" component="h2">
      NO ISSUES ASSIGNED TO YOU
    </Typography> :
    issues.edges.map(({ node: { bodyText, createdAt, id, title, url, assignees: { edges: [ { node: { avatarUrl } } ] }} }) => (
      <Issue key={id} {...{avatarUrl, bodyText, createdAt, id, title, url}} />
    ));
};