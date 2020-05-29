import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import JarContainer from '../eventJar/JarContainer';
// import JarEventCreate from '../eventJar/JarEventCreate';
// import JarEventUpdate from '../eventJar/JarEventUpdate';
import EventContainer from '../events/EventContainer';
import APIURL from '../helpers/environment.js'
import './DisplayContainers.css'

import ComplexGrid from '../events/EventDetail'

import {List, CircularProgress} from "@material-ui/core";
  

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

    const [eventAddedToJar, setEventAddedToJar] = useState(false) // state variable to pass between EventContainer and JarContainer to know when the Jar button was pushed on an event in the Event Container on the screen
    // const [initialize, setInitialize] = useState(true) // debugging - trying to control the useEffect to overcome the unpredictability of the events state variable
    const [jarEvents, setJarEvents] = useState([]);  
    const [eventArray, setEventArray] = useState([]);  // Going to retrieve an array of event objects from eventful API
    const [stillFetching, setStillFetching] = useState(true);  // Going to retrieve an array of event objects from eventful API
    // const [events, setEvents] = useState([]);  // Going to retrieve an array of event objects from eventful API
    const [EVDB, setEVDB] = useState(window.EVDB); // For the eventful API calls, pull EVDB from the Script tag in index.html

    //  ################################ for the Jar button on an event to store in the jar table ################################
  
    console.log("****************** you're in DisplayContainers in DisplayContainers.js  ********")

    // ########## FUNCTION FETCH JAR EVENTS : GET EVENTS FROM THE JAR DATABASE TABLE AND DISPLAY IN A LIST ON CONSOLE 
    const fetchJarEvents = () => {
        console.log("************ fetchJarEvents - execute a fetch using GET method & route = /api/jar.  pass the Token as Authorization*************************")
        fetch(`${APIURL}/api/jar`, {  // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            // eventsNotReadyToRender = false;
            setEventAddedToJar(false)
            return res.json(); 
        })
        .then((logData) => setJarEvents(logData))
        .catch(err => console.log(err))
    }

    // ########## FUNCTION FETCH EVENTS : GET EVENTS FROM EVENTFUL API AND DISPLAY IN A LIST ON CONSOLE 
    const fetchEvents = async () => {  // trying async & await
    // const fetchEvents = async () => {  // trying async & await
        console.log("You're in fetchEvents in DisplayContainers.js")
        console.log(`Gonna check if EVDB is not undefined. EVDB = ${EVDB}`)
        if (EVDB !== undefined) {
            console.log("EVDB is not undefined")
            EVDB.API.call("/events/search", _oArgs, 
            function (APIobject) {
                setStillFetching(false)
                setEventArray(APIobject.events.event)
            })  
                // setEvents(events.push(APIobject.events.event))
          } else {
            console.log("no api")
          }  
        }  
      
      useEffect(() => {
          console.log(`USE EFFECT TRIGGERED`)
        fetchJarEvents()
        fetchEvents()
    }, [])
      
        //  ################################ for the Jar button on an event to store in the jar table ################################
        useEffect(() => {
            console.log ("***** You're in DisplayContainers. eventAddedToJar, the Jar button on the Event Container. changed to: ", eventAddedToJar)
            fetchJarEvents()

            // create jar event
            // jarEventMapper();
            // ??? EventContainer(props.addEventToJar);
        }, [eventAddedToJar]);
    
        
    return (
            <div className="outerContainer">

            <Container>
                <Row className="justify-content-md-center">
                    {/* <Col md="3">
                        <JarEventCreate fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col> */}
                    <Col md={6}>
                        <JarContainer jarEvents={jarEvents} fetchJarEvents={fetchJarEvents} token={props.token} setEventAddedToJar={setEventAddedToJar} />
                    </Col>

                    <Col md={6}>

                        { stillFetching ? 
                            <div id="gettingData">
                                <h4>Finding Events...</h4>
                                <CircularProgress />
                            </div> : 
                            <div>
                            {/* <List> */}
                                {console.log("eventArray = ", eventArray)}
                                <EventContainer eventArray={eventArray} setEventAddedToJar={setEventAddedToJar} fetchJarEvents={fetchJarEvents} token={props.token} />
                                {/* <ComplexGrid /> */}
                                {console.log("In the return() of DisplayContainers. Returned from EventContainer")}
                            {/* </List> */}
                            </div>
                    }
                    </Col>

                </Row>
                {/* <Row> */}

                    {/* <Col md="12">
                        <JarEventCreate fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col> */}

                    {/* <Col md="9">

                        </Col> */}
                {/* </Row> */}

                {/* <Row>
                <Col md="12">
                        <JarEventUpdate eventArray={eventArray} fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col> */}
                    {/* <Col md="9"> 
                        </Col>*/}

                {/* </Row> */}
            </Container>
            </div>

        )
}


    export default DisplayContainers;