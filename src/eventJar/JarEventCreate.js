/*
#####    Being Tested  ###

#### in EventContainer  putInJar  ####
<JarEventCreate event={event} />

#####   Commented out in JarContainter at the end of putInJar (fetch POST to jar table  ) ###
   <JarEventCreate event={event} />
*/

import React, {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import APIURL from '../helpers/environment.js'


const JarEventCreate = (props) => {
    const event = props.event;

    console.log("You're in JarEventCreate")
    // const [userName, setUserName] = useState('User Name');
    const [category, setCategory] = useState('Event Category');
    // const [deleteBox, setDeleteBox] = useState(false);
    // const [eventURL, setEventURL] = useState('URL for Event information');
    // const [eventImage, setEventImage] = useState('URL for Event Image');
    // const [title, setTitle] = useState('Event Title');
    // const [date, setDate] = useState('Event Date');
    // const [day, setDay] = useState('Day of Week');
    // const [time, setTime] = useState('Start Time');
    // const [venueName, setVenueName] = useState('Event Venue');
    // const [address, setAddress] = useState('Event Address');
    // const [city, setCity] = useState('Event City');
    // const [state, setState] = useState('State');
    // const [zip, setZip] = useState(99999);
    
    // const handleSubmit = (e) => {
    //     console.log("************* you're in handleSubmit ***************")
    //     e.preventDefault();
        // fetch('http://localhost:3000/api/jar/', {
        fetch(`${APIURL}/api/jar/`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
        method: 'POST',
        body: JSON.stringify(
            {
                // userName: userName, 
                // category: category,
                // deleteBox: deleteBox,
                // eventURL: eventURL,
                // eventImage: eventImage,
                // title: title,
                // date: date,
                // day: day,
                // time: time,
                // venueName: venueName,
                // address: address,
                // city: city,
                // state: state,
                // zip: zip
                
                // userName: userName, 
                // category: category,
                eventURL: event.url,
                eventImage: event.image.medium.url,
                title: event.title,
                // date: date,
                // day: day,
                // time: time,
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
        console.log("****** POST was successful ******")
        return res.json()
    })
    .then((logData) => {
        console.log("************************* res.json successful - logData = ", logData);
        setCategory('Event Category');
        // setCity('Event City');
        // setDate('Event Date');
        props.fetchJarEvents();
    })
    // }

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

            {/* <input type="select" name="category" value={category} onChange={(e) => setCategory(e.target.value)}/>
                <option value="Header">Choose Category</option>
                <option value="Music">Music</option>
                <option value="Festival">Festival</option>
                <option value="Comedy">Comedy</option> */}
           
            <Input type="select" size="sm" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {/* <Input type="select" name="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}> */}
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
            {/* #############################  replace placeholder with CSS something to put a label in there that can be typed over ######################## */}
{/* next line commented out for compile error : */}
            {/* <Input name="title" size="sm" value={title} onChange={(e) => setTitle(e.target.value)}/> */}
            {/* <Input name="city" placeholder="Location" value={city} onChange={(e) => setCity(e.target.value)}/> */}
            {/* <Input name="city" placeholder="Location" value={city} onChange={(e) => city = e.target.value}/> */}
        </Col>
        </FormGroup>

        <FormGroup>
        <Col md="12">
            <Label htmlFor="date"/>
{/* next line commented out for compile error : */}

            {/* <Input name="date" size="sm" type="text" value={date} onChange={(e) => setDate(e.target.value)}/> */}
            {/* <Input name="date" placeholder="Event Date" value={date} onChange={(e) => setDate(e.target.value)}/> */}
            {/* <Input name="date" placeholder="Date" value={date} onChange={(e) => date = e.target.value}/> */}
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