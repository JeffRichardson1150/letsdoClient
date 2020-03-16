/*
using code from WorkoutTable.js
1.  We are mapping through our props.workouts array.  Remember that props.workouts is a reference to the workouts we pulled from our back-end.  These were objects containing individual workout data.  Our callback function, with params 'workout' and 'index' is defined according to the callback function of all .map methods: 'workout' will represent every workout object in our props.workouts array each time the map loop runs, while 'index' is the index number of that workout object in the workouts array.

2.  .map() needs a return for every element in the array we map over.  Without a return, .map() won't build a new array.  Read up on the .map method in the MDN if this confuses you.

3.  For every workout object, we create a new table row.  React will throw a warning if we don't attach a unique key to repeated JSX elements (our <tr>s, in this case), so we use the index number of every workout as a unique identifier for that table row.  Check the React docs for more info.

4.  We include two buttons that are non-functional right now.  That's alright.  Having the UI present moves the needle a little closer to the goal!
*/
import React from 'react';
import {Table, Button} from 'reactstrap';

const JarDisplay = (props) => {
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
    
    // let eventTi tle = "initialize title";
    console.log("****************** you're in JarContainer in JarContainer.js  use /api/jar to get item(s) from the jar ********")
    
    const fetchJarEvents = () => {
        const [jarEvents, setJarEvents] = useState([]);  // workoutlog has variable workouts
        console.log("************ execute a fetch using GET method & route = /api/jar.  pass the Token as Authorization*************************")
        console.log("***************  props.token : ", props.token)
        fetch('http://localhost:3000/api/jar', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            /*
            LEARNING MOMENT ***************
            I was dead in the water because logData (the next .then) kept coming up "undefined" even though the fetch was successful
            I had a block arrow function (had the {}) but I didn't have a "return" on the res.json(), so nothing got passed to the next .then
            I changed to block to add a console.log.  If res.json() is the only command, I can use the short form without a "return"
                    .then((res) => res.json();)
            */
            return res.json(); 
        })
        .then((logData) => setJarEvents(logData))
        .catch(err => console.log(err))
    }
    
    const deleteJarEvent = (jarEvent) => {
        console.log(jarEvent)
        fetch(`http://localhost:3000/api/jar/${jarEvent.id}`, {
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
        return props.jarEvents.map((jarEvent, index) => {
            return(
                <tr key={index}>
                    <th scope="row">{jarEvent.id}</th>
                    <td>{jarEvent.category}</td>
                    <td>{jarEvent.city}</td>
                    <td>{jarEvent.date}</td>
                    <td>
                        <Button color="warning">Update</Button>
                        <Button color="danger" onClick={() => {deleteJarEvent(jarEvent)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    return(
        <>
        <h3>My Jar</h3>
        <hr/>
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Event Location</th>
                    <th>Event Date</th>
                </tr>
            </thead>
            <tbody>
                {jarEventMapper()}
            </tbody>
        </Table>
        </>
    )
}

export default JarDisplay;