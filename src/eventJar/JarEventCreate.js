/*
#####    Being Tested  ###

#### in EventContainer  putInJar  ####
<JarEventCreate event={event} />

#####   Commented out in JarContainter at the end of putInJar (fetch POST to jar table  ) ###
   <JarEventCreate event={event} />
*/

import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
// import { isCompositeComponentWithType } from 'react-dom/test-utils';
import APIURL from '../helpers/environment.js'


const JarEventCreate = (props) => {
    const event = props.event;

    const [category, setCategory] = useState('Event Category');
    
    // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
        fetch(`${APIURL}/api/jar/`, {
        method: 'POST',
        body: JSON.stringify(
            {
                eventURL: event.url,
                eventImage: event.image.medium.url,
                title: event.title,
                venueName: event.venue_name,
                address: event.venue_address,
                city: event.city_name,
                state: event.region_abbr,
                zip: event.postal_code
            }
        ),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    }   ) .then((res) => {
        return res.json()
    })
    .then((logData) => {
        setCategory('Event Category');
        props.fetchJarEvents();
    })

    return(
    <>
    <br />
    <h3>Create a Jar Event</h3>
    {/* <Form onSubmit={handleSubmit}> */}
    <Form >
        <Row>
        <FormGroup>
        <Col md="12">
            <Label htmlFor="category"/>
           
            <Input type="select" size="sm" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Header">Choose Category</option>
                <option value="Music">Music</option>
                <option value="Festival">Festival</option>
                <option value="Comedy">Comedy</option>
            </Input>

        </Col>
        </FormGroup>
        <FormGroup>
        <Col md="12">
            <Label htmlFor="title"/>
        </Col>
        </FormGroup>

        <FormGroup>
        <Col md="12">
            <Label htmlFor="date"/>
            </Col>
        </FormGroup>
        <FormGroup>
        <Col sm="8">
            <Button type="submit" size="sm">Add</Button>
            </Col>
        </FormGroup>
        </Row>
    </Form>
    </>

    )
}

export default JarEventCreate;