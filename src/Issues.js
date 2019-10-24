import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { Issue } from './Issue';

const useStyles = makeStyles(theme => ({
  message: {
    color: 'black'
  },
  button: {
    margin: theme.spacing(1)
  },
}));

export const OPEN_ISSUES = gql`
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

let socket;
export const Issues = ({ handleUpdateApp }) => {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(OPEN_ISSUES);
  const [issuesList, setIssuesList] = useState([]);
  const handleCloseIssue = id => {
    setIssuesList(issuesList.filter(({ node }) => node.id !== id ));
  };
  useEffect(() => {
    socket = io('https://github-issue-dashboard.herokuapp.com');
  }, []);
  useEffect(() => {
    if (data !== undefined) {
      setIssuesList(data.repository.issues.edges);
    }
  }, [data]);

  if (loading) return <CircularProgress />;
  if (error) {
    localStorage.setItem('token', '');
    return (
      <Typography variant="h5" component="h2" className={classes.message}>
        {`${error.networkError.statusCode === 401 ? 'Invalid token' : 'Something went wrong'}. Please reload the app.`}
      </Typography>
    )
  }
  socket.on("Accessed /issues", () => refetch());

  return (
    <>
      {
        issuesList.length === 0 ?
          <Typography variant="h5" component="h2" className={classes.message}>
            No issues assigned to you! 🎉
          </Typography> :
          issuesList.map(({ node: { bodyText, createdAt, id, title, url, assignees: { edges: [ { node: { avatarUrl } } ] }} }) => (
            <Issue key={id} {...{avatarUrl, bodyText, createdAt, id, title, url, handleCloseIssue}} />
          ))
      }
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={() => {
          handleUpdateApp();
          localStorage.setItem('token', '');
        }}
      >
        Quit
      </Button>
    </>
  )
};