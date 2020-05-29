/*
using code from WorkoutTable.js
1.  We are mapping through our props.workouts array.  Remember that props.workouts is a reference to the workouts we pulled from our back-end.  These were objects containing individual workout data.  Our callback function, with params 'workout' and 'index' is defined according to the callback function of all .map methods: 'workout' will represent every workout object in our props.workouts array each time the map loop runs, while 'index' is the index number of that workout object in the workouts array.

2.  .map() needs a return for every element in the array we map over.  Without a return, .map() won't build a new array.  Read up on the .map method in the MDN if this confuses you.

3.  For every workout object, we create a new table row.  React will throw a warning if we don't attach a unique key to repeated JSX elements (our <tr>s, in this case), so we use the index number of every workout as a unique identifier for that table row.  Check the React docs for more info.

4.  We include two buttons that are non-functional right now.  That's alright.  Having the UI present moves the needle a little closer to the goal!
*/

import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

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





const JarContainer = (props) => {
    const classes = useStyles();  

        //  ################################ for the Jar button on an event to store in the jar table ################################
    console.log("addEventToJar state variable = ", props.addEventToJar)
    console.log(props)
    // Need to convert this code to suit my jars vs workouts
    // workouts is a state variable / my state variable is jarEvent...it's set to logData in fetchWorkouts (fetchJarEvents in JarFetch.js) 
    // after an /api/log call
    // workout is a variable defined in the .map method used in workoutMapper in this Component (below)
    // const deleteWorkout = (workout) => {
    //     fetch(`http://localhost:3000/api/log/${workout.id}`, {
    //         method: 'DELETE',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': props.token
    //         })
    //     })
    //     .then(() => props.fetchWorkouts())
    // }
    const deleteJarEvent = (jarEvent) => {
        console.log(jarEvent)
        // fetch(`http://localhost:3000/api/jar/${jarEvent.id}`, {
        fetch(`${APIURL}/api/jar/${jarEvent.id}`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchJarEvents())
    }


    // Convert this workouts code to apply to my jars 
    const jarEventMapper = () => {
        console.log("You're in jarEventMapper. props = ", props)
        return props.jarEvents.map((jarEvent, index) => {

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
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle2">
                        <a href={jarEvent.eventURL} target="_blank">{jarEvent.eventTitle}</a>
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
                    <Grid item direction="column">
                        <Button color="warning" size="sm">Update</Button>
                        <Button color="danger" size = "sm" onClick={() => {deleteJarEvent(jarEvent)}}>Delete</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })

        }

    //  ################################ for the Jar button on an event to store in the jar table ################################
    useEffect(() => {
        console.log ("***** You're in the JarContainer useEffect watching addEventToJar, the Jar button on the Event Container. changed to: ", props.addEventToJar)
        // create jar event
        // jarEventMapper();
        // ??? EventContainer(props.addEventToJar);
    }, [props.addEventToJar])

    return(
        <>
        <h3>My Jar</h3>
        <hr/>
        <Table >
            <tbody>
                {jarEventMapper()}
            </tbody>
        </Table>
        </>
    )
}

export default JarContainer;