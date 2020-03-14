import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import JarEventCreate from './JarEventCreate';
import JarDisplay from './JarDisplay';


const JarContainer = (props) => {

    const [jarEvents, setJarEvents] = useState([]);  // workoutlog has variable workouts
    // let eventTi tle = "initialize title";
    console.log("****************** you're in JarContainer in JarContainer.js  use /api/jar to get item(s) from the jar ********")

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

    useEffect(() => {
            fetchJarEvents();
        }, [])

    return (
            <Container>
                <Row>
                    <Col md="3">
                        <JarEventCreate fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col>
                    <Col md="9">
                        <JarDisplay jarEvents={jarEvents} fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col>
                </Row>
            Jar Index
            </Container>
        )
    }

    export default JarContainer;