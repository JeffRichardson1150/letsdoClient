import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import JarEventCreate from './JarEventCreate';
import JarDisplay from './JarDisplay';
import GetEvents from '../events/GetEvents';

let _oArgs = {
    app_key:"tQrWMD6FT4Thf7D4",
    category: "music",
    q: "Music",
    where: "New York City Metro Area",
    // where: "Indianapolis",
    page_size: 25,
    image_sizes: "large,medium",
    sort_order: "popularity",
    within: 5
  };
  

const DisplayContainers = (props) => {

    const [events, setEvents] = useState([]);
    const [EVDB, setEVDB] = useState(undefined);

    const [jarEvents, setJarEvents] = useState([]);  // workoutlog has variable workouts
    // let eventTi tle = "initialize title";
    console.log("****************** you're in DisplayContainers in DisplayContainers.js  use /api/jar to get item(s) from the jar ********")

    const fetchJarEvents = () => {
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

    // Following is a bunch of stuff from eventful API documentation about using it
    // Builds a url based on your query, and saves the result in a state variable
    // let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${search}`;
    // url = startDate ? url + `&begin_date=${startDate}` : url;
    // url = endDate ? url + `&end_date=${endDate}` : url;
  
    // let url = "https://cors-anywhere.herokuapp.com/http://eventful.com/json/events/search?app_key=tQrWMD6FT4Thf7D4&location=Indianapolis&date=2020-03-11&category=music";
  
  
    // fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     setevents(data)
    //   })
    //   .catch(err => console.log(err));
  
    const fetchEvents = () => {
        console.log("You're in fetchEvents in DisplayContainers.js")
        console.log(`Gonna check if EVDB is true. EVDB = ${EVDB}`)
        if(EVDB) {
          EVDB.API.call("/events/search", _oArgs, function(oData) {
            console.log(`fetched data from eventful : ${oData}`)
            ((oData) => setEvents(oData))

          })
        } else {
          console.log("no api")
        }
      }
      
    //   useEffect(() => {
    //     setEVDB(window.EVDB)
    //     fetchEvents()
    //   })
      
      
    useEffect(() => {
        console.log("setEVDB**************************************")
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~FOR EVENTFUL API ~~~~~~~~~~~~~~~~~~~~~~~
        setEVDB(window.EVDB)
        console.log(`************ Just set EVDB in the useEffect to windows.EVDB.  EVDB = ${EVDB} *******************************`)
        console.log("fetchJarEvents************************************")
        fetchJarEvents();
        console.log("Calling fetchEvents from the useEffect in DisplayContainers**********************");
        fetchEvents()

        }, [])

    return (
            <Container>
                <Row>
                    {/* <Col md="3">
                        <JarEventCreate fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col> */}
                    <Col md="6">
                        <JarDisplay jarEvents={jarEvents} fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col>
                    <Col md="6">
                        {/* <GetEvents />; */}
                        {console.log(`this is the events state variable ${events}`)}
                        <GetEvents events={events} fetchEvents={fetchEvents}/>
                        {console.log("Did you get it????????????????????????????????")}
                    </Col>
                </Row>
            Jar Index
            </Container>
        )
    }

    export default DisplayContainers;