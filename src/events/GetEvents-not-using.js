import React, { useState, useEffect } from "react";
import {Table, Button} from 'reactstrap';


const GetEvents = (props) => {
    console.log("******************** You're in GetEvents")
    console.log("******************   props = ", props)


const deleteEvent = (event) => {
  console.log(event)
  fetch(`http://localhost:3000/api/jar/${event.id}`, {
      method: 'DELETE',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': props.token
      })
  })
  .then(() => props.fetchEvents())
}


const eventMapper = (props) => {
  console.log(props.events);
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
    //   <div>
    // {/* <script src="http://api.eventful.com/js/api" type="javascript"></script> */}
    // {console.log(EVDB)}
    //     Return
    //   </div>
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
            {/* {eventMapper(props)} */}
        </tbody>
    </Table>
    </>
    )};


  //   function conductSearch() {
  //   console.log("conductSearch")
  //   _oArgs.where = $eventLocation.val() ? $eventLocation.val() : "New York City Metro Area";
  //   _oArgs.q = $eventKeyword.val() ? $eventKeyword.val() : "Music";

  //   let resultJSON="http://api.eventful.com/json/events/search?app_key=tQrWMD6FT4Thf7D4&location=Indianapolis&date=2020-03-11&category=music";
  //   console.log(resultJSON)
  //   EVDB.API.call("/events/search", _oArgs, function(oData) {
  //     console.log(oData);
  //     // $content.html("");
  //     if (oData.events) {
  //       receiveEvents(oData.events.event);
  //       console.log(oData.events.event)
  //     } else {
  //       // $('<h2> No ' + _oArgs.q + ' Events in/near ' + _oArgs.where +'</h2>').appendTo($content);
  //       console.log("no events")
  //     }
  //   });
  // }

// conductSearch();



export default GetEvents;