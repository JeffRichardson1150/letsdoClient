import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';  //1
import APIURL from '../helpers/environment.js'


/*
1. Our use of bootstrap is the same as in our Login component.  Ultimately, these forms contain the same information, but differ only in their titles and the action they initiate with our server when a successful user account is made or processed.
2. Once again, because our input fields are tied the state variables, which currently never change, their text content will be static as well (in this case it will be empty).
*/
/* My problem  with response.json()
    on this console.log, console says : Promise {<rejected>: TypeError: Failed to execute 'json' on
    'Response': body stream is locked at http://localhost:4000  
    When do response.json(), it locks the body.  Can't follow up with console.log(response.json)
            */

const Signup = (props) => {
    console.log("********************** HELLO FROM SIGNUP.JS ***********************");
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // const [signupName, setSignupName] = useState('');

    const validateSignupName = (signupName) => {
        // let atIndex = signupName.search("@"); // index of the first @
        let atIndex = signupName.indexOf("@"); // index of the first @
        let atLastIndex = signupName.lastIndexOf("@"); // index of the last @
        let secondHalf = signupName.slice(atIndex); // the string following the @
        let dotIndex = secondHalf.indexOf(".com"); // in the string following the @, the index of the first .com
        let dotLastIndex = secondHalf.lastIndexOf(".com"); // in the string following the @, the index of the last .com
        let dotCom = secondHalf.slice(-4);

        if (atIndex === atLastIndex &&
            atIndex !== -1 &&
            dotIndex >= atIndex + 1 &&
            dotIndex === dotLastIndex &&
            dotCom === ".com") {
                console.log("********* this username works")
            // setUserName(userName)
        } else {
            console.log("***********Try Again...format of password is test@test.com")
        }
    }

    const handleSubmit = (signupName) => {
        signupName.preventDefault();  // prevent refresh of the screen from a Form submit
        // console.log(JSON.stringify({ user: { userName: userName, password: password } }));
        // console.log(JSON.stringify({ userName: userName, password: password }));
        // fetch("http://localhost:3000/api/user", {
        validateSignupName(signupName)
        fetch(`${APIURL}/api/user`, {
            method: 'POST',
            body: JSON.stringify({ userName: userName, password: password }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) =>
                response.json()
        ).then((data) => {
            console.log("the next .then with props = ", props)
            console.log("this is what the argument data is for this .then", data)
            props.updateToken(data.sessionToken)
        })
    }

    // const validateUserName = (userName) => {
    //     let atIndex = userName.indexOf("@");
    //     if (atIndex === userName.lastIndexOf("@") && atIndex !== -1) { // there is 1 and only 1 @
    //         let secondHalf = userName.slice(atIndex);
    //         let dotIndex = secondHalf.indexOf(".com")

    //         if (dotIndex >= atIndex + 1 && 

    //             dotIndex === secondHalf.lastIndexOf(".com") && 
    //             secondHalf.lastIndexOf(".com") === -4) { //   There is 1 and only 1.com AND it occurs as the last 4 characters AND there is at least 1 character between the @and the.
    //                 setUserName(e.target.value)
    //         }

    //     }

    // }


    return (
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit(userName)}>
                <FormGroup>
                    <Label htmlFor="userName">Username</Label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    {/* <Input onChange={(e) => e.target.value!=null ? setUsername(e.target.value) : <p>"user name is required"</p>} name="username" value={username}/> */}
                    {/* <Input name="username" value={username}/> 2 */}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password}/> */}
                    {/* <Input name="password" value={password}/> 2 */}
                </FormGroup>
                <Button color="primary" type="submit">Signup</Button>
            </Form>
        </div>
    )
}

export default Signup;