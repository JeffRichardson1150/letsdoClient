import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';  //1

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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();  // prevent refresh of the screen from a Form submit
        console.log( JSON.stringify({user:{username: username, password: password}}) );
        console.log( JSON.stringify({username: username, password: password}) );
        fetch("http://localhost:3000/api/user", {
            method: 'POST',
            body: JSON.stringify({userName: username, password: password}),
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

        // console.log("****** Signup.js .then - /api/user was successful *******")
        // console.log(response.json())
        
        return(
            <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username}/>
                    {/* <Input onChange={(e) => e.target.value!=null ? setUsername(e.target.value) : <p>"user name is required"</p>} name="username" value={username}/> */}
                    {/* <Input name="username" value={username}/> 2 */}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password}/>
                    {/* <Input name="password" value={password}/> 2 */}
                </FormGroup>
                <Button type="submit">Signup</Button>
            </Form>
        </div>
    )
}

export default Signup;