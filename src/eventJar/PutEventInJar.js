import React from 'react';


  const putEventInJar = (eventForJar) => {
    // console.log(eventForJar)
    console.log("putInJar, event: ", eventForJar.event)
    console.log(eventForJar.event.image.medium.url)
    console.log("token : ", token)
    fetch(`${APIURL}/api/jar/`, {   // calls localhost or heroku server based on APIURL which is set in helpers/environment.js
      method: 'POST',
      body: JSON.stringify(
          {
              userName: 'userName', 
              category: 'category',
              eventID: eventForJar.event.id,
              eventURL: eventForJar.event.url,
              eventImageURL: eventForJar.event.image.medium.url,
              eventTitle: eventForJar.event.title,
              eventDateTime:  eventForJar.event.start_time,
              venueName: eventForJar.event.venue_name,
              venueAddress: eventForJar.event.venue_address,
              venueCity: eventForJar.event.city_name,
              venueState: eventForJar.event.region_abbr,
              venueZip: eventForJar.event.postal_code
  
          }
      ),
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': token
      })
  }   ) .then((res) => {
      console.log("****** POST was successful ******")
      props.setEventAddedToJar(true)
      console.log("EventDetail - set EventAddedToJar")
      return res.json()
  
  })
  .then((logData) => {
      console.log("************************* res.json successful - logData = ", logData);
  })
  
  }

  export default putEventInJar;
