// Installed React DatePicker
// npm install react-datepicker --save

import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
 
import "react-datepicker/dist/react-datepicker.css";
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
const JarEventAddForm = () => {

    const [startDate, setStartDate] = useState( new Date() );

  const handleChange = date => {
      setStartDate(date)
    };
 
    return (

    <Form>

        {/* Installed React date picker (npm install react-datepicker --save) */}
        <Form.Group>
            <DatePicker
                selected={startDate}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control as="select" value="Choose...">
                <option>Choose...</option>
                <option>...</option>
            </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
            </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

    </Form>

    );
}
 

export default JarEventAddForm;