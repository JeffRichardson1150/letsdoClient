import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';


const JarIndex = (props) => {

    const [jarEvent, setJarEvent] = useState([]);

    const fetchJarEvents = () => {
        fetch('http://localhost:3000/api/jar', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json())
        .then((logData) => {
            setJarEvent(logData)
            console.log(logData)
        })
    }

    useEffect(() => {
        fetchJarEvents();
    }, [])

    return(
        <Container>
            <Row>
                <Col md="3">
                    {/* The create component will go here */}
                </Col>
            </Row>
            <Col md="9">
                <h2> Log a jar event to see a table. </h2>
            </Col>
            Jar Index
        </Container>
    )
}

export default JarIndex;