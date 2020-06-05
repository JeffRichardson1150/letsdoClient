/*
#####   Called from DisplayContainters  ###
*/

/*
using code from WorkoutTable.js
1.  We are mapping through our props.workouts array.  Remember that props.workouts is a reference to the workouts we pulled from our back-end.  These were objects containing individual workout data.  Our callback function, with params 'workout' and 'index' is defined according to the callback function of all .map methods: 'workout' will represent every workout object in our props.workouts array each time the map loop runs, while 'index' is the index number of that workout object in the workouts array.

2.  .map() needs a return for every element in the array we map over.  Without a return, .map() won't build a new array.  Read up on the .map method in the MDN if this confuses you.

3.  For every workout object, we create a new table row.  React will throw a warning if we don't attach a unique key to repeated JSX elements (our <tr>s, in this case), so we use the index number of every workout as a unique identifier for that table row.  Check the React docs for more info.

4.  We include two buttons that are non-functional right now.  That's alright.  Having the UI present moves the needle a little closer to the goal!
*/

import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
// import { Table, Button, Container, Row, Col, Modal, Form, Control, Help } from 'react-bootstrap';
import { Table, Button, Container, Row, Col, Modal, Form } from 'reactstrap';

// import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import ButtonBase from '@material-ui/core/ButtonBase';

import APIURL from '../helpers/environment.js'
import JarEventDetail from './JarEventDetail'

import JarEventAddForm from './JarEventAddForm'


const JarContainer = (props) => {

    // for the Modal (the form for a new event)....will display when show is true
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //  ################################ for the Jar button on an event to store in the jar table ################################
    const deleteJarEvent = (jarEvent) => {
        // fetch(`http://localhost:3000/api/jar/${jarEvent.id}`, {
        fetch(`${APIURL}/api/jar/${jarEvent.id}`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(() => props.fetchJarEvents())
    }


    // Convert this workouts code to apply to my jars 
    const jarEventMapper = () => {
        return props.jarEvents.map((jarEvent, index) => {
            return (

                <tr key={index}>
                    <th scope="row">

                        <JarEventDetail jarEvent={jarEvent} deleteJarEvent={deleteJarEvent} token={props.token} userName={props.userName}/>
                    </th>
                </tr>
            )

        })

    }

    //  ################################ for the Jar button on an event to store in the jar table ################################
    useEffect(() => {
    }, [props.addEventToJar])

    const handleSaveChanges = (event) => {

    //     const putInJar = (eventForJar) => {
    //         fetch(`${APIURL}/api/jar/`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
    //           method: 'POST',
    //           body: JSON.stringify(
    //               {
    //                   userName: 'userName', 
    //                   category: 'category',
    //                   eventID: eventForJar.event.id,
    //                   eventURL: eventForJar.event.url,
    //                   eventImageURL: eventForJar.event.image.medium.url,
    //                   eventTitle: eventForJar.event.title,
    //                   eventDateTime:  eventForJar.event.start_time,
    //                   venueName: eventForJar.event.venue_name,
    //                   venueAddress: eventForJar.event.venue_address,
    //                   venueCity: eventForJar.event.city_name,
    //                   venueState: eventForJar.event.region_abbr,
    //                   venueZip: eventForJar.event.postal_code
          
    //               }
    //           ),
    //           headers: new Headers({
    //               'Content-Type': 'application/json',
    //               'Authorization': props.token
    //           })
    //       }   ) .then((res) => {
    //           props.setEventAddedToJar(true)
    //           return res.json()
          
    //       })
    //       .then((logData) => {
    //       })
    //       }    
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={10}>
                        <h3>My Jar</h3>
                    </Col>
                    <Col md={2}>
                        <Button color="success" size="sm" onClick={handleShow}>Add</Button>

                    </Col>
                </Row>

            </Container>
            <Table >
                <tbody>
                    {jarEventMapper()}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add an Event</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <JarEventAddForm />
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default JarContainer;