import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { Issue } from './Issue';
import { IssueCard } from './IssueCard';

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

  return (
    <>
      {issues.edges.map(({ node: { bodyText, createdAt, id, title, url, assignees: { edges: [ { node: { avatarUrl } } ] }} }) => (
      <Issue key={id} {...{avatarUrl, bodyText, createdAt, title, url}} />
      ))}
      <IssueCard />
    </>
  );
};