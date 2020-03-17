import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap';
import APIURL from '../helpers/environment.js'
import JarEventCreate from '../eventJar/JarEventCreate'
import CopyEventToJar from './CopyEventToJar'

let props = {event:
[
    {
        userName: "jeffrichardson573@gmail.com",
        category: "Music",
        deleteBox: false,
        eventURL: "http://newyorkcity.eventful.com/events/daughtry-bergen-pac-/E0-001-071934718-7?utm_source=apis&utm_medium=apim&utm_campaign=apic",
        eventImage: "http://d1marr3m5x4iac.cloudfront.net/images/medium/I0-001/040/825/885-9.jpeg_/daughtry-85.jpeg",
        title: "Daughtry - Bergen PAC",
        date: "2020-03-24",
        day: "Tuesday",
        time: "19:00:00",
        venueName: "Bergen Performing Arts Center",
        address: "30 North Van Brunt Street",
        city: "Englewood",
        state: "NJ",
        zip: "07631"
    },
    {
        userName: "jeffrichardson573@gmail.com",
        category: "Music",
        deleteBox: false,
        eventURL: "http://newyorkcity.eventful.com/events/hella-mega-tourgreen-dayfall-out-boyweezer-pr-/E0-001-130407856-7?utm_source=apis&utm_medium=apim&utm_campaign=apic",
        eventImage: "http://d1marr3m5x4iac.cloudfront.net/images/medium/I0-001/002/547/642-7.jpeg_/green-day-42.jpeg",
        title: "Hella Mega Tour-Green Day/Fall Out Boy/Weezer Pres. by Harley-Davidson",
        date: "2020-08-22",
        day: "Monday",
        time: "17:30:00",
        venueName: "Citi Field",
        address: "123-01 Roosevelt Ave",
        city: "Queens Village",
        state: "NY",
        zip: "000000"
    },
    {
        userName: "jeffrichardson573@gmail.com",
        category: "Music",
        deleteBox: false,
        eventURL: "http://newyorkcity.eventful.com/events/kenny-chesney-florida-georgia-line-and-old-d-/E0-001-130867951-3?utm_source=apis&utm_medium=apim&utm_campaign=apic",
        eventImage: "http://d1marr3m5x4iac.cloudfront.net/images/medium/I0-001/003/648/014-3.png_/kenny-chesney-14.png",
        title: "Kenny Chesney with Florida Georgia Line and Old Dominion",
        date: "2019-09-25",
        day: "Friday",
        time: "02:02:12",
        venueName: "MetLife Stadium",
        address: "1 Metlife Stadium",
        city: "East Rutherford",
        state: "NJ",
        zip: "07073"

    }
]
}

// const EventContainer = (props) => {
const EventContainer = () => {
console.log("**** You're in EventContainer. props = ", props)
    // Need to convert this code to suit my jars vs workouts
    // workouts is a state variable / my state variable is event...it's set to logData in fetchWorkouts (E in JarFetch.js) 
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
    const deleteEvent = (event) => {
        console.log(event)
        // fetch(`http://localhost:3000/api/jar/${event.id}`, {
        fetch(`${APIURL}/api/jar/${event.id}`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchEvents())
    }

        //  ################################ for the Jar button on an event to store in the jar table ################################
    const putInJar = (event) => {
        console.log("Put the event in the jar. event = ", event)
        return(
        <JarEventCreate event={event} />
        )
        // return (
        // // <CopyEventToJar event={event} token={sessionToken} />
        // // return props.setAddEventToJar=true;
        // props.setAddEventToJar(true)
        // // console.log("addEventToJar was set?")
        // // JarEventCreate(fetchJarEvents, props.token)
        // )
    }


    // Convert this workouts code to apply to my jars 
    const eventMapper = (events) => {
        console.log("in eventMapper. events = ", events)
        return events.map((event, index) => {
            return(
                <tr key={index}>
                    <th scope="row">{event.id}</th>
                    <td>{event.category}</td>
                    <td>{event.title}</td>
                    <td>{event.date}</td>
                    <td>
                        <Button color="warning" onClick={() => putInJar(event)}>Jar</Button>
                        {/* <Button color="warning" onClick={() => {putInJar(event)}}>Jar</Button> */}
                        {/* <Button color="warning" onClick={() => function()}}>Jar</Button> */}
                        {/* <Button color="warning" onClick={JarEventCreate}>Jar</Button> */}
                        {/* <Button color="warning" onClick={<JarEventCreate events={props.event} />}>Jar</Button> */}
                        {/* <Button color="warning" onClick={JarEventCreate}>Jar</Button> */}
                        {/* <Button color="danger" onClick={() => {deleteEvent(event)}}>Delete</Button> */}
                    </td>
                </tr>
            )
        })
    }

    return(
        <>
        <h3>Events</h3>
        <hr/>
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Event</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {/* {eventMapper('junk')}  */}
                {console.log(props.event)}
                {eventMapper(props.event)} 
                {/* {eventMapper(events)}  */}
            </tbody>
        </Table>
        </>
    )
}

export default EventContainer;