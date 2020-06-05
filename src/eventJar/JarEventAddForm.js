// Installed React DatePicker
// npm install react-datepicker --save
/*
#####   Called from JarContainter in the Modal creation in the return() ###
  <JarEventAddForm />
*/

import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";

import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
 
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
const JarEventAddForm = () => {

    const [startDate, setStartDate] = useState( new Date() );
    const [time, setTime] = useState('20:00:00')

  const handleDateChange = date => {
      setStartDate(date)
    };

    const handleTimeChange = time => setTime(time)

 
    return (

    <Form>

        <Form.Group controlId="formGridEventTitle">
            <Form.Label>Event Title</Form.Label>
            <Form.Control placeholder="Short description of the event" />
        </Form.Group>

        <Form.Row>

        {/* Installed React date picker (npm install react-datepicker --save) */}
        <Form.Group as={Col} controlId="formGridDate">
            <Form.Label>Event Date</Form.Label>
            <Form.Control type="date" selected={startDate} />

            {/* <DatePicker
                onChange={handleDateChange}
                selected={startDate}
            /> */}

        </Form.Group>

        <Form.Group as={Col} controlId="formGridTime">
        <Form.Label>Start Time</Form.Label>
        <Form.Control type="time" value={time} />

            </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridVenue">
            <Form.Label>Venue Name</Form.Label>
            <Form.Control placeholder="Venue name" />
        </Form.Group>

        <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
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
                <option>AL</option>
                <option>AK</option>
                <option>AZ</option>
                <option>AR</option>
                <option>CA</option>
                <option>CO</option>
                <option>CT</option>
                <option>DE</option>
                <option>DC</option>
                <option>FL</option>
                <option>GA</option>
                <option>HI</option>
                <option>ID</option>
                <option>IL</option>
                <option>IN</option>
                <option>IA</option>
                <option>KS</option>
                <option>KY</option>
                <option>LA</option>
                <option>ME</option>
                <option>MD</option>
                <option>MA</option>
                <option>MI</option>
                <option>MN</option>
                <option>MS</option>
                <option>MO</option>
                <option>MT</option>
                <option>NE</option>
                <option>NV</option>
                <option>NH</option>
                <option>NJ</option>
                <option>NM</option>
                <option>NY</option>
                <option>NC</option>
                <option>ND</option>
                <option>OH</option>
                <option>OK</option>
                <option>OR</option>
                <option>PA</option>
                <option>RI</option>
                <option>SC</option>
                <option>SD</option>
                <option>TN</option>
                <option>TX</option>
                <option>UT</option>
                <option>VT</option>
                <option>VA</option>
                <option>WA</option>
                <option>WV</option>
                <option>WI</option>
                <option>WY</option>
            </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
            </Form.Group>
        </Form.Row>

    </Form>

    );
}
 

export default JarEventAddForm;