import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

// import JarEventCreate from '../eventJar/JarEventCreate'

import APIURL from '../helpers/environment.js'

const token = localStorage.getItem('token');


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

export default function EventDetail(props) {
  const classes = useStyles();  
  let event = props.event;

  const putInJar = (eventForJar) => {
    // console.log(eventForJar)
    console.log("putInJar, event: ", eventForJar.event)
    console.log(eventForJar.event.image.medium.url)
    console.log("token : ", token)
    fetch(`${APIURL}/api/jar/`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
      method: 'POST',
      body: JSON.stringify(
          {
              userName: 'userName', 
              category: 'category',
              eventID: eventForJar.event.id,
              eventURL: eventForJar.event.url,
              eventImageURL: eventForJar.event.image.medium.url,
              eventTitle: eventForJar.event.title,
              eventDateTime:  eventForJar.event.start_time,
              venueName: eventForJar.event.venue_name,
              venueAddress: eventForJar.event.venue_address,
              venueCity: eventForJar.event.city_name,
              venueState: eventForJar.event.region_abbr,
              venueZip: eventForJar.event.postal_code
  
          }
      ),
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': token
      })
  }   ) .then((res) => {
      console.log("****** POST was successful ******")
      props.setEventAddedToJar(true)
      console.log("EventDetail - set EventAddedToJar")
      return res.json()
  
  })
  .then((logData) => {
      console.log("************************* res.json successful - logData = ", logData);
  //     // setCategory('Event Category');
  //     // setCity('Event City');
  //     // setDate('Event Date');
      // props.fetchJarEvents();
      // props.setEventAddedToJar('true')
  })
  
  //   return(
  //   {/* <JarEventCreate event={event} /> */}
  //       )
  
  }
  
  

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image} href={event.url} target=
            "_blank">
              <img className={classes.img} alt="complex" src={event.image.medium.url} />
            </ButtonBase>
          </Grid>
          <Grid item xs={8} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle2">
                <a href={event.url} target="_blank">{event.title}</a>
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {event.start_time}
                </Typography>
                <Typography className={classes.small_text} color="textSecondary">
                  {event.venue_name}
                </Typography>
                <Typography className={classes.small_text} color="textSecondary">
                  {event.venue_address}
                </Typography>
                <Typography className={classes.small_text} color="textSecondary">
                  {event.city_name}, {event.region_abbr} {event.postal_code}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={2} container direction="column">
            <Button color="warning" size = "sm" onClick={() => putInJar({event})}>Jar</Button>

              {/* <Typography variant="subtitle1">$19.00</Typography> */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
