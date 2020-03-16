import React, { useState, useEffect } from "react";
import {Table, Button} from 'reactstrap';


// let _oArgs = {
//   app_key:"tQrWMD6FT4Thf7D4",
//   category: "music",
//   q: "Music",
//   // where: "New York City Metro Area",
//   where: "Indianapolis",
//   page_size: 25,
//   image_sizes: "large,medium",
//   sort_order: "popularity",
//   within: 5
// };

const GetEvents = (props) => {

// const [events, setevents] = useState([]);
// const [EVDB, setEVDB] = useState(undefined);

// useEffect(() => {
//   setEVDB(window.EVDB)

//   fetchEvents()

//   // const script = document.createElement("script");

//   // script.src = "http://api.eventful.com/js/api"
//   // script.async = true;

//   // document.body.appendChild(script);
//   // console.log(EVDB)

//   // fetchEvents()
//   // return () => {
//   //   document.body.removeChild(script);
//   // }
// })


// const fetchEvents = () => {
//   // Builds a url based on your query, and saves the result in a state variable
//   // let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${search}`;
//   // url = startDate ? url + `&begin_date=${startDate}` : url;
//   // url = endDate ? url + `&end_date=${endDate}` : url;

//   // let url = "https://cors-anywhere.herokuapp.com/http://eventful.com/json/events/search?app_key=tQrWMD6FT4Thf7D4&location=Indianapolis&date=2020-03-11&category=music";


//   // fetch(url)
//   //   .then(res => res.json())
//   //   .then(data => {
//   //     console.log(data)
//   //     setevents(data)
//   //   })
//   //   .catch(err => console.log(err));

//   if(EVDB) {
//     EVDB.API.call("/events/search", _oArgs, function(oData) {
//       console.log(oData)
//     })
//   } else {
//     console.log("no api")
//   }
// }

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


const eventMapper = () => {
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
            {eventMapper()}
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