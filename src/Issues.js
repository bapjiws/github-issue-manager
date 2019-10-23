import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { makeStyles } from '@material-ui/core/styles';
import {
  CircularProgress,
  Typography
} from '@material-ui/core';

import { Issue } from './Issue';

const useStyles = makeStyles({
  message: {
    color: 'black'
  }
});

// TODO: make `owner` and `name` dynamic.
// TODO: login and name are not needed to render.
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
  const classes = useStyles();
  const { loading, error, data } = useQuery(OPEN_ISSUES);
  const [issuesList, setIssuesList] = useState([]);
  const handleCloseIssue = id => {
    setIssuesList(issuesList.filter(({ node }) => node.id !== id ));
  };
  useEffect(() => {
    if (data !== undefined) {
      setIssuesList(issues.edges);
    }
  }, [data]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error :(</p>;

  const { repository: { issues } } = data;
  console.log('issues:', issues);

  return issuesList.length === 0 ?
    <Typography variant="h5" component="h2" className={classes.message}>
      No issues assigned to you! 🎉
    </Typography> :
    issuesList.map(({ node: { bodyText, createdAt, id, title, url, assignees: { edges: [ { node: { avatarUrl } } ] }} }) => (
      <Issue key={id} {...{avatarUrl, bodyText, createdAt, id, title, url, handleCloseIssue}} />
    ));
};