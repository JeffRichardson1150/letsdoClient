import React, {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import APIURL from '../helpers/environment.js'


const JarEventCreate = (props) => {

    console.log("You're in JarEventCreate")
    const [userName, setUserName] = useState('User Name');
    const [category, setCategory] = useState('Event Category');
    const [deleteBox, setDeleteBox] = useState(false);
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
        fetch(`${APIURL}/api/jar/`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
        method: 'POST',
        body: JSON.stringify(
            {
                userName: userName, 
                category: category,
                deleteBox: deleteBox,
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
        console.log("************************* res.json successful - logDate = ", logData);
        // setCategory('');
        // setCity('');
        // setDate('');
        props.fetchJarEvents();
    })
    }

    return(
    <>
    {/* <h3>Create a Jar Event</h3>
    <Form onSubmit={handleSubmit}>
        <FormGroup>
            <Label htmlFor="city"/>
            <Input name="city" value={city} onChange={(e) => setCity(e.target.value)}/>
        </FormGroup>
        <FormGroup>
            <Label htmlFor="category"/>
            <Input type="select" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Music">Music</option>
                <option value="Festivals">Festivals</option>
                <option value="Comedy">Comedy</option>
            </Input>
        </FormGroup>
        <FormGroup>
            <Label htmlFor="date"/>
            <Input name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        </FormGroup>
        <FormGroup>
            <Button type="submit">Click to Submit</Button>
        </FormGroup>
    </Form> */}
    </>

    )
}

export default JarEventCreate;