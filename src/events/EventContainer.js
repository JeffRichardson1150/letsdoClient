import React, {useState, useEffect} from 'react';
import {Table, Button} from 'reactstrap';
import APIURL from '../helpers/environment.js'
import JarEventCreate from '../eventJar/JarEventCreate'
import CopyEventToJar from './CopyEventToJar'
import ScrollArea from 'react-scrollbar';

import EventDetail from './EventDetail'


// const EventContainer = () => {
const EventContainer = (props) => {
    console.log("events array: ", props.eventArray)
    // console.log("props = ", props)
    // console.log("props.APIobject = ", props.APIobject)
    // console.log("props.APIobject.events = ", props.APIobject.events)

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
    const eventMapper = (eventArray) => {
        console.log("in eventMapper. eventArray = ", eventArray)
        return eventArray.map((event, index) => {
            return(
                
                <tr key={index}>
                <th scope="row">

                <EventDetail event={event} setEventAddedToJar={props.setEventAddedToJar} token={props.token} />
                    </th>
                {/* </tr>
                <tr key={index}> */}
                {/* <th scope="row">{event.id}</th>
                       
                    <td >{event.category}</td>
                    <td>{event.title}</td>
                    <td>{event.date}</td> */}
                
                    {/* <td>
                        <Button color="warning" size = "sm" onClick={() => putInJar(event)}>Jar</Button>
                    </td> */}
                </tr>
            )
        })
    }

    const doNothing = () => {

    }

    return(
        <>
        <h3>Events</h3>
        {/* <hr/> */}
            <Table >
                <tbody>
                    {/* {eventMapper('junk')}  */}
                    {/* {console.log("props.events.event = ", props.event)}
                    {(props.event !== undefined && props.event !== []) ? eventMapper(props.event) : doNothing() } */}
                    {eventMapper(props.eventArray)} 
                </tbody>
            </Table>
        {/* </ScrollArea> */}

        </>
    )
}

export default EventContainer;