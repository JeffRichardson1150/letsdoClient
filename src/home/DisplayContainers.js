import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import JarEventCreate from '../eventJar/JarEventCreate';
import JarContainer from '../eventJar/JarContainer';
import EventContainer from '../events/EventContainer';
import APIURL from '../helpers/environment.js'


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
  

const DisplayContainers = (props) => {
 console.log("line 23 at the beginning of DisplayContainers")
    //  ################################ for the Jar button on an event to store in the jar table ################################
    const [addEventToJar, setAddEventToJar] = useState(false)
    console.log("line 26 after addEventToJar state variable")
    
    
    const [initialize, setInitialize] = useState(true)
    console.log("line 30 after initialize state variable")
    const [jarEvents, setJarEvents] = useState([]);  
    console.log("line 32 after jarEvents state variable")
    const [events, setEvents] = useState([]);  // Going to retrieve an array of event objects from eventful API
    console.log("line 34 after events state variable")
    let oEvents = [];
    const [EVDB, setEVDB] = useState(window.EVDB); // For the eventful API calls, pull EVDB from the Script tag in index.html
  
    console.log("****************** you're in DisplayContainers in DisplayContainers.js  ********")

    // ########## FUNCTION FETCH JAR EVENTS : GET EVENTS FROM THE JAR DATABASE TABLE AND DISPLAY IN A LIST ON CONSOLE 
    const fetchJarEvents = () => {
        console.log("************ execute a fetch using GET method & route = /api/jar.  pass the Token as Authorization*************************")
        console.log("***************  props.token : ", props.token)
        // fetch('http://localhost:3000/api/jar', {
        fetch(`${APIURL}/api/jar`, {  // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
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

    // ########## FUNCTION FETCH EVENTS : GET EVENTS FROM EVENTFUL API AND DISPLAY IN A LIST ON CONSOLE 
    const fetchEvents = () => {
        console.log("You're in fetchEvents in DisplayContainers.js")
        console.log(`Gonna check if EVDB is not undefined. EVDB = ${EVDB}`)
        if (EVDB !== undefined) {
            EVDB.API.call("/events/search", _oArgs, function (oData) {
                console.log("*** oData : ", oData)
                console.log("*** oData.events : ", oData.events)
                console.log("*** oData.events.event : ", oData.events.event)
            //   setEvents(events.push(oData.events))
              oEvents = oData.events.event;
            //   console.log("oEvents = ", oEvents)
              console.log("************* in fetchEvents...we just set events to oData.events.event: ", events)
            })  
          } else {
            console.log("no api")
          }  
        }  

      
      useEffect(() => {
          console.log(`USE EFFECT TRIGGERED`)
        fetchJarEvents()
        fetchEvents()
        // EventContainer(events, fetchEvents);
        EventContainer();
    }, [])
      
        //  ################################ for the Jar button on an event to store in the jar table ################################
        //** This didn't work */
        useEffect(() => {
            console.log ("***** You're in DisplayContainers. addEventToJar, the Jar button on the Event Container. changed to: ", addEventToJar)
            // create jar event
            // jarEventMapper();
            // ??? EventContainer(props.addEventToJar);
        }, [addEventToJar])
    
      
    return (
            <Container>
                <Row>
                    {/* <Col md="3">
                        <JarEventCreate fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col> */}
                    <Col md="6">
                        <JarContainer jarEvents={jarEvents} fetchJarEvents={fetchJarEvents} token={props.token} addEventToJar={addEventToJar} />
                    </Col>
                    <Col md="6">
                        {/* <EventContainer />; */}
                        {console.log(`this is the events state variable`, oEvents)}
                        {/* { events !== [] ? <EventContainer events={events} fetchEvents={fetchEvents}/> : <p>No Fetch</p>} */}
                        {/* <EventContainer events={oEvents} fetchEvents={fetchEvents}/> */}
                        <EventContainer events={events} token={props.token} setAddEventToJar={setAddEventToJar} />
                        {console.log("Returned from EventContainer")}
                    </Col>
                </Row>
            </Container>
        )
    }

    export default DisplayContainers;