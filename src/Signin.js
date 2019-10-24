import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3, 2),
  }
}));

export const Signin = ({ setLoggedIn }) => {
  console.log('setLoggedIn:', setLoggedIn);
  const classes = useStyles();
  const [ token, setToken ] = useState('');

  const handleChange = event => {
    setToken(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoggedIn(true);
    localStorage.setItem('token', token);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h3">
        Please enter your Personal Access Token.
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          value={token}
          onChange={handleChange}
          id="outlined-password-input"
          label="GitHub token"
          type="password"
          margin="normal"
          variant="outlined"
        />
      </form>
    </Paper>
  )
};