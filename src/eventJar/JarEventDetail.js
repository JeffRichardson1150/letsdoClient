/*
#####   Called from JarContainer in jarEventMapper  ###
  <JarEventDetail jarEvent={jarEvent} deleteJarEvent={deleteJarEvent} token={props.token} />
*/

// import React, {useState, useEffect} from 'react';
import React from 'react';
import {Button} from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

// import APIURL from '../helpers/environment.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  small_text: {
    fontSize: '.7em',
  }
}));


export default function JarEventDetail(props) {
  const classes = useStyles();  
  let jarEvent = props.jarEvent;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image} href={jarEvent.eventURL} target=
            "_blank">
              <img className={classes.img} alt="complex" src={jarEvent.eventImageURL} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle2">
                <a href={jarEvent.eventURL} target="_blank" rel="noopener noreferrer">{jarEvent.eventTitle}</a>
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {jarEvent.eventDateTime}
                </Typography>
                <Typography className={classes.small_text} color="textSecondary">
                  {jarEvent.venueName}
                </Typography>
                <Typography className={classes.small_text} color="textSecondary">
                  {jarEvent.venueAddress}
                </Typography>
                <Typography className={classes.small_text} color="textSecondary">
                  {jarEvent.venueCity}, {jarEvent.venueState} {jarEvent.venueZip}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2} container direction="column">
                <Button color="warning" size="sm">Update</Button>
                <Button color="danger" size = "sm" onClick={() => {props.deleteJarEvent(jarEvent)}}>Delete</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );

}
