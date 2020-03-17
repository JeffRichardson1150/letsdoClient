// controls whether using localHost version or the live version off Heroku
// where we have a call to our server routes, need to 
// import APIURL from '../../helpers/environment'
// fetch(`${APIURL}/pies1)   -  make sure if APIURL has a / at the end, don't put a / in this url
let APIURL = "";

switch(window.location.hostname) {
    // this is the local host name of your react app
    case 'localhost' || '127.0.0.1':
        // this is the local host name of your API
        APIURL = 'http://localhost:3000';
        break;
    // case <in heroku.com, click on the client on the left, click Settings,  scroll down to Domains & find the name of the base url of my server>
    // click on the client on the left, click Settings, scroll down
    // case 'jlr-letsdo.herokuapp.com' - can leave out the https:// in the client reference
    // now go to heroku and find my server the same way.  that will be my APIURL
        // APIURL = 'https://<server app name>'  like 'https://zsm-pieapijan2020.herokuapp.com'
}

export default APIURL;