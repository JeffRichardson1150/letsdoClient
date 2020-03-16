import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import JarEventCreate from '../eventJar/JarEventCreate';
import JarDisplay from '../eventJar/JarDisplay';
import EventDisplay from '../events/EventDisplay';


const DisplayContainers = (props) => {

    useEffect(() => {
            fetchJarEvents();
        }, [])

    return (
            <Container>
                <Row>
                    {/* comment out JarEventCreate while I test the event retrieval */}
                    {/* <Col md="3">
                        <JarEventCreate fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col> */}
                    <Col md="6">
                        <JarDisplay jarEvents={jarEvents} fetchJarEvents={fetchJarEvents} token={props.token} />
                    </Col>
                    <Col md="6">
                        <EventDisplay events={events} getEvents={getEvents} token={props.token} />
                    </Col>
                </Row>
            </Container>
        )
    }

    export default DisplayContainers;