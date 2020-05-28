import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import JarContainer from '../eventJar/JarContainer';
import JarEventCreate from '../eventJar/JarEventCreate';
import JarEventUpdate from '../eventJar/JarEventUpdate';
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
  
  
  
  let APIevents = []; // store the array of event objects retrieved from the eventful API (via EVDB.API.call)
  let APIobject = {};
  
  
  let eventsNotReadyToRender = true;

  let eventArray = 
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
  
  const DisplayContainers = (props) => {
      

    const [addEventToJar, setAddEventToJar] = useState(false) // state variable to pass between EventContainer and JarContainer to know when the Jar button was pushed on an event in the Event Container on the screen
    // const [initialize, setInitialize] = useState(true) // debugging - trying to control the useEffect to overcome the unpredictability of the events state variable
    const [jarEvents, setJarEvents] = useState([]);  
    const [eventArray2, setEventArray2] = useState([]);  // Going to retrieve an array of event objects from eventful API
    // const [events, setEvents] = useState([]);  // Going to retrieve an array of event objects from eventful API
    const [EVDB, setEVDB] = useState(window.EVDB); // For the eventful API calls, pull EVDB from the Script tag in index.html

    //  ################################ for the Jar button on an event to store in the jar table ################################
  
    console.log("****************** you're in DisplayContainers in DisplayContainers.js  ********")

    // ########## FUNCTION FETCH JAR EVENTS : GET EVENTS FROM THE JAR DATABASE TABLE AND DISPLAY IN A LIST ON CONSOLE 
    const fetchJarEvents = () => {
        console.log("************ execute a fetch using GET method & route = /api/jar.  pass the Token as Authorization*************************")
        fetch(`${APIURL}/api/jar`, {  // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            eventsNotReadyToRender = false;
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
                console.log(`APIobject (the data returned from Eventful API) is ${APIobject}`);
                setEventArray2(eventArray2.push(APIobject.events.event));
                console.log(eventArray2)
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
            console.log ("***** You're in DisplayContainers. addEventToJar, the Jar button on the Event Container. changed to: ", addEventToJar)
            // create jar event
            // jarEventMapper();
            // ??? EventContainer(props.addEventToJar);
        }, [addEventToJar]);
    
    
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
                           {/* <EventContainer APIobject={APIobject} token={props.token} setAddEventToJar={setAddEventToJar} /> */}
                           {console.log("eventArray = ", eventArray)}
                        <EventContainer eventArray={eventArray} token={props.token} setAddEventToJar={setAddEventToJar} />
                            {console.log("In the return() of DisplayContainers. Returned from EventContainer")}
                    </Col>
                </Row>
                    <Col md="12">
                        <JarEventCreate fetchJarEvents={fetchJarEvents} token={props.token} />
                        {/* <JarEventCreate /> */}
                    </Col>
                    {/* <Col md="9">

                    </Col> */}

                <Row>
                <Col md="12">
                        <JarEventUpdate eventArray={eventArray} fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col>
                    {/* <Col md="9"> 
                        </Col>*/}

                </Row>
            </Container>
        )
}

    export default DisplayContainers;