/*
  #### called from App.js in protectedViews #####
        <DisplayContainers token={sessionToken} userName={sessionUserName}/> : 

*/


import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import JarContainer from '../eventJar/JarContainer';
import EventContainer from '../events/EventContainer';
import APIURL from '../helpers/environment.js'
import './DisplayContainers.css'

import ComplexGrid from '../events/EventDetail'

import {List, CircularProgress} from "@material-ui/core";
  
// ### Arguments for the Eventful API call
// ###    Need to use the city specified in the search field in the Navbar or default to the geolocate location of the use
let _oArgs = {
    app_key:"tQrWMD6FT4Thf7D4",
    category: "music",
    q: "Music",
    // where: "New York City Metro Area",
    where: "Indianapolis",
    page_size: 25,
    image_sizes: "large,medium",
    sort_order: "popularity",
    within: 5
  };
  
  
  
  let APIevents = []; // store the array of event objects retrieved from the eventful API (via EVDB.API.call)
  let APIobject = {};
  
  
  const DisplayContainers = (props) => {

    const [jarEvents, setJarEvents] = useState([]);  
    const [eventArray, setEventArray] = useState([]);  // Going to retrieve an array of event objects from eventful API
    const [stillFetching, setStillFetching] = useState(true);  // Going to retrieve an array of event objects from eventful API
    const [EVDB, setEVDB] = useState(window.EVDB); // For the eventful API calls, pull EVDB from the Script tag in index.html

    const userName = localStorage.getItem('userName');


    //  ################################ for the Jar button on an event to store in the jar table ################################
  
    // ########## FUNCTION FETCH JAR EVENTS : GET EVENTS FROM THE JAR DATABASE TABLE AND DISPLAY IN A LIST ON CONSOLE 
    const fetchJarEvents = () => {
        fetch(`${APIURL}/api/jar/getAll/${userName}`, {  // calls localhost or heroku server based on APIURL which is set in helpers/###.js
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            return res.json(); 
        })
        .then((logData) => setJarEvents(logData))  // array of events fetched from jar table
        .catch(err => console.log(err))
    }

    // ########## FUNCTION FETCH EVENTS : GET EVENTS FROM EVENTFUL API AND DISPLAY IN A LIST ON CONSOLE 
    const fetchEvents = async () => {  // trying async & await
        if (EVDB !== undefined) {
            EVDB.API.call("/events/search", _oArgs, 
            function (APIobject) {
                setStillFetching(false)
                setEventArray(APIobject.events.event)  // array of events fetched from Eventful API
            })  
          } else {
            console.log("no api")
          }  
        }  
      
      useEffect(() => {
        fetchJarEvents()
        fetchEvents()
    }, [])
      
    return (
            <div className="outerContainer">

            <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <JarContainer jarEvents={jarEvents} fetchJarEvents={fetchJarEvents} token={props.token} userName={props.userName} />
                    </Col>

                    <Col md={6} >

                        { stillFetching ? 
                            <div id="gettingData">
                                <h4>Finding Events...</h4>
                                <CircularProgress />
                            </div> : 
                            <div >
                                <EventContainer eventArray={eventArray} fetchJarEvents={fetchJarEvents} token={props.token} userName={props.userName}/>
                            </div>
                    }
                    </Col>

                </Row>
            </Container>
            </div>

        )
}


    export default DisplayContainers;