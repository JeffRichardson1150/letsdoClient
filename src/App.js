import React, {useState, useEffect} from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import JarContainer from './eventJar/JarContainer';

/*
1. We are using the useState hook to create a new state variable, sessionToken.  Because our sessionToken will change during the course of our app running (it will start empty, be given a value upon logging in, then emptied upon logout), we also use the second argument of useState, which allows us to change our sessionToken state variable.
2. We have an effect that runs once upon initial component load.  It updates our sessionToken state variable if Chrome has saved a sessionToken in localStorage.  Because we pass an empty array as a second argument, there is no change our effect is tracking to re-run later, so the effect runs only upon initial component load.
3. This function takes in a token (we'll use this function later in a component that will grab the sessionToken after an API call) and saves it two places--both in our localStorage and in our state variable, sessionToken.  The localStorage is a secure place to store this data, and will persist as long as our browser is open.  The state variable allows child components to quickly access the sessionToken for use.
*/

/*
  localStorage
  + There are five methods to choose from:
      > setItem(): Add key and value to localStorage  -  localStorage.setItem('singer', 'Leon Bridges')
          *localStorage only stores strings, so arrays & objects must be converted to string
              const person = {name: 'Bill Burr', occupation: 'comedian'}
              localStorage.setItem('comedian', JSON.stringify(person));
                 ==> key = 'comedian'  value = '{'name':'Bill Burr','occupation':'comedian'}'
      > getItem(): Retrieve a value by the key from localStorage 
            JSON.parse(localStorage.getItem('comedian')); - convert back from string to JavaScript object
                ==> getItem returns the string '{'name':'Bill Burr','occupation':'comedian'}'
                ==> JSON.parse returns the object {name: 'Bill Burr', occupation: 'comedian'}
      > removeItem(): Remove an item by key from localStorage
            localStorage.removeIten('singer');
            ==> removes the item ('singer', 'Leon Bridges')
      > clear(): Clear all localStorage
      > key(): Passed a number to retrieve nth key of a localStorage
            for (index=1; index<=10, index++) { console.log(localStorage.key(index)) }
*/
function App() {
  console.log("********************** HELLO FROM APP.JS ***********************");
  const [sessionToken, setSessionToken] = useState(''); //1

  useEffect(() => {  //2
    console.log("***************  in the useEffect in App.js - if localStorage has a session token, put it in sessionToken state variable***********")
    if (localStorage.getItem('token')){
      console.log(`******************** localStorage.getItem('token'): ${localStorage.getItem('token')} *****************************************`)
      setSessionToken(localStorage.getItem('token'));
      console.log(`***************************did we put the token in sessionToken? ${sessionToken} ******************************************`)
    }
  }, [])
   
  /*
    SIGNUP & LOGIN
    In signup, after posting a new username/(encrypted)password pair into the database, updateToken is called as a props Method (props.updateToken) passing the encrypted password ('token') as it .
  */
  const updateToken = (newToken) => {  //3
    console.log("********************** GONNA updateTOKEN IN APP.JS ***********************");
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log("******************** sessionToken is :", sessionToken);  
  }


  /*
  Logout function. We are resetting the state of our sessionToken to an empty string, and then we are also 
  clearing our token from our local storage. So basically, we'll determine if a user is logged in, based on 
  whether or not sessionToken exists in their local storage.
  */
  const clearToken = () => {
    console.log("************** in clearToken.  clear local Storage  &  setSessionToken to '' *****************")
    localStorage.clear();
    setSessionToken('');
  }

  /*
    This is an interesting function, and definitely worth our time to investigate.  The entire function returns the result of our ternary expression, which checks to see if our sessionToken state variable matches the token property in localStorage.  If the two match (which can only happen when they store the same sessionToken string), then the function fires off the WorkoutIndex component.  Otherwise, this function will return our Auth component so the user can attempt to grab a sessionToken through our server.  The reason the sessionToken variable can only match the token property in local storage when they both store a token is due to how we've built the clearToken function in App.js.  When there is no session token, the sessionToken state variable is reset to '', an empty string, while the localStorage is cleared, erasing our token property.  When an object has no property, it's undefined.  Therefore, the empty string stored by our sessionToken state variable is strictly unequal to the undefined token property in localStorage, and our Auth component is fired.
  */
  const protectedViews = () => {
    console.log("************ in protectedViews - if sessionToken === token in localStorge, call JarContainer to get jar contents. Else call Auth to login *******")
    console.log("sessionToken: ", sessionToken);
    console.log("localStorage token: ", localStorage.getItem('token'));
    return (
      sessionToken === localStorage.getItem('token') ? 
      <JarContainer token={sessionToken}/> : 
      <Auth updateToken={updateToken}/>
      )
  }

  /*
    Notice that we're calling the protectedViews function, not referencing it.  Whenever App.js has a state change and it reloads to the DOM, our protectedViews function should fire.  We use curly braces around protectedViews to allow us to write a Javascript expression (our function call in this case) that will return JSX content.
  */
  return (
    <div>
      <Sitebar clickLogout={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;
