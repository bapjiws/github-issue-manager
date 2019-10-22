import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Link,
  Tooltip,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    margin: '15px 0',
    width: 350,
  },
  media: {
    height: 140,
  },
});

export const Issue = ({ avatarUrl, bodyText, createdAt, title, url }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Tooltip title={`Created on ${new Date(createdAt).toDateString()}`} placement="top">
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </Tooltip>
        <Typography variant="body2" color="textSecondary" component="p">
          {bodyText}
        </Typography>
      </CardContent>
      <Grid container>
        <Grid item xs={10}>
          <CardActions>
            <Button size="small" color="primary">
              <Link href={url} target="_blank">
                TO REPO
              </Link>
            </Button>
            <Button size="small" color="primary">
              <Link href={url}>
                CLOSE ISSUE
              </Link>
            </Button>
          </CardActions>
        </Grid>
        <Grid item xs={2}>
          <Avatar src="https://avatars2.githubusercontent.com/u/10408485?v=4"/>
        </Grid>
      </Grid>
    </Card>
  );
};