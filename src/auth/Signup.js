import React, {useState} from 'react';
// import {Form, FormGroup, Label, Input, Button} from 'reactstrap';  //1
import {Form, FormGroup, Label, Button} from 'reactstrap';  //1
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
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    // let userName = '';
    // let password = '';
    
    const handleSubmit = (event) => {
        event.preventDefault();  // prevent refresh of the screen from a Form submit
        fetch(`${APIURL}/api/user`, {
            method: 'POST',
            body: JSON.stringify({userName: userName, password: password}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => 
                response.json()            
            ).then((data) => {
                props.updateToken(data.sessionToken, userName) // sessionToken gets created in usercontroller with JWT

            })
        }

        
        return(
            <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="userNameHTML">Username</Label>
                    <input 
                    type="text"
                    id="userNameID"
                    onChange={(e) => setUserName(e.target.value)} name="userName" value={userName}/>
                    {/* <Input onChange={(e) => e.target.value!=null ? setUsername(e.target.value) : <p>"user name is required"</p>} name="username" value={username}/> */}
                    {/* <Input name="username" value={username}/> 2 */}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="passwordHTML">Password</Label>
                    <input 
                    type="password" 
                    id="passwordID" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)}
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