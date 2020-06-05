/*
#####   Called from DisplayContainters  ###
    <EventContainer eventArray={eventArray} fetchJarEvents={fetchJarEvents} token={props.token} />
*/

// import React, {useState, useEffect} from 'react';
import React from 'react';
import {Table} from 'reactstrap';
// import APIURL from '../helpers/environment.js'
// import JarEventCreate from '../eventJar/JarEventCreate'
// import ScrollArea from 'react-scrollbar';

import EventDetail from './EventDetail'


const EventContainer = (props) => {

    // const deleteEvent = (event) => {
    //     fetch(`${APIURL}/api/jar/${event.id}`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
    //         method: 'DELETE',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': props.token
    //         })
    //     })
    //     .then(() => props.fetchEvents())  // after deleting the event from the jar table, refresh the Jar Container on the screen
    // }

        //  ################################ for the Jar button on an event to store in the jar table ################################
    // const putInJar = (event) => {
    //     return(
    //     <JarEventCreate event={event} />
    //     )
    // }

    const eventMapper = (eventArray) => {
        return eventArray.map((event, index) => {
            return(
                
                <tr key={index}>
                <th scope="row">

                <EventDetail event={event} fetchJarEvents={props.fetchJarEvents} token={props.token} />
                    </th>
                </tr>
            )
        })
    }

    // const doNothing = () => {

    // }

    return(
        <>
        <h3>Events</h3>
            <Table >
                <tbody>
                    {eventMapper(props.eventArray)} 
                </tbody>
            </Table>

        </>
    )
}

export default EventContainer;