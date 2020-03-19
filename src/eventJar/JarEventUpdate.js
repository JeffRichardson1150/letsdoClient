import React, {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input, Row, Col} from 'reactstrap';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import APIURL from '../helpers/environment.js'


const JarEventUpdate = (props) => {

    console.log("You're in JarEventCreate")
    const [id, setID] = useState(0);
    const [userName, setUserName] = useState('User Name');
    const [category, setCategory] = useState('Event Category');
    const [deleteBox, setDeleteBox] = useState(false);
    const [eventURL, setEventURL] = useState('URL for Event information');
    const [eventImage, setEventImage] = useState('URL for Event Image');
    const [title, setTitle] = useState('Event Title');
    const [date, setDate] = useState('Event Date');
    const [day, setDay] = useState('Day of Week');
    const [time, setTime] = useState('Start Time');
    const [venueName, setVenueName] = useState('Event Venue');
    const [address, setAddress] = useState('Event Address');
    const [city, setCity] = useState('Event City');
    const [state, setState] = useState('State');
    const [zip, setZip] = useState(99999);
    
    const handleSubmit = (e) => {
        console.log("************* you're in handleSubmit ***************")
        e.preventDefault();
        // fetch('http://localhost:3000/api/jar/', {
        fetch(`${APIURL}/api/jar/:{id}`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
        method: 'PUT',
        body: JSON.stringify(
            {
                id: id,
                userName: userName, 
                category: category,
                deleteBox: deleteBox,
                eventURL: eventURL,
                eventImage: eventImage,
                title: title,
                date: date,
                day: day,
                time: time,
                venueName: venueName,
                address: address,
                city: city,
                state: state,
                zip: zip
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
        setCity('Event City');
        setDate('Event Date');
        props.fetchJarEvents();
    })
    }

    return(
    <>
    <h3>Update a Jar Event</h3>
    <Form onSubmit={handleSubmit}>
        <Row>
        <FormGroup>
        <Col md="4">
            <Label htmlFor="id"/>
            {/* #############################  replace placeholder with CSS something to put a label in there that can be typed over ######################## */}
            <Input name="id" value={id} onChange={(e) => setID(e.target.value)}/>
            {/* <Input name="city" placeholder="Location" value={city} onChange={(e) => setCity(e.target.value)}/> */}
            {/* <Input name="city" placeholder="Location" value={city} onChange={(e) => city = e.target.value}/> */}
        </Col>
        </FormGroup>
       
        <FormGroup>
        <Col md="12">
            <Label htmlFor="city"/>
            {/* #############################  replace placeholder with CSS something to put a label in there that can be typed over ######################## */}
            <Input name="city" value={city} onChange={(e) => setCity(e.target.value)}/>
            {/* <Input name="city" placeholder="Location" value={city} onChange={(e) => setCity(e.target.value)}/> */}
            {/* <Input name="city" placeholder="Location" value={city} onChange={(e) => city = e.target.value}/> */}
        </Col>
        </FormGroup>
        <FormGroup>
        <Col md="12">
            <Label htmlFor="category"/>
            <Input type="select" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            {/* <Input type="select" name="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}> */}
            {/* <Input type="select" name="category" placeholder="Category" value={category} onChange={(e) => category = e.target.value}> */}
                <option value="Music">Choose Category</option>
                <option value="Music">Music</option>
                <option value="Festival">Festival</option>
                <option value="Comedy">Comedy</option>
            </Input>
        </Col>
        </FormGroup>
        <FormGroup>
        <Col md="12">
            <Label htmlFor="date"/>
            <Input name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
            {/* <Input name="date" placeholder="Event Date" value={date} onChange={(e) => setDate(e.target.value)}/> */}
            {/* <Input name="date" placeholder="Date" value={date} onChange={(e) => date = e.target.value}/> */}
            </Col>
        </FormGroup>
        <FormGroup>
        <Col sm="2">
            <Button type="submit">Add</Button>
            </Col>
        </FormGroup>
        </Row>
    </Form>
    </>

    )
}

export default JarEventUpdate;