import React from 'react';
import {Table, Button} from 'reactstrap';

const EventDisplay = (props) => {
console.log(props)
    const deleteEvent = (event) => {
        console.log(event)
        fetch(`http://localhost:3000/api/jar/${event.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchEvents()) // in GetEvents.js
    }

    const eventMapper = () => {
        return props.events.map((event, index) => {
            return(
                <tr key={index}>
                    <th scope="row">{event.id}</th>
                    <td>{event.category}</td>
                    <td>{event.city}</td>
                    <td>{event.date}</td>
                    <td>
                        <Button color="warning">Update</Button>
                        <Button color="danger" onClick={() => {deleteEvent(event)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    return(
        <>
        <h3>Events</h3>
        <hr/>
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Event Location</th>
                    <th>Event Date</th>
                </tr>
            </thead>
            <tbody>
                {eventMapper()}
            </tbody>
        </Table>
        </>
    )
}

export default EventDisplay;