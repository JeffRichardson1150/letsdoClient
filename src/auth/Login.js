import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';  //1

/*
1. We import lots of bootstrap components, many of which are related to the bootstrap form.  If you're curious about bootstrap forms, please take a look here:
https://getbootstrap.com/docs/4.0/components/forms/ (Links to an external site.)
2. We have created state variables 'username' and 'password' which will be fed information from the input fields in our form.  Even though we could grab the values of these input fields without using state variables, whenever manipulable information on your webpage is uncontrolled by React, it's an opportunity for bugs to arise in your program.
3. Notice that the value of the input fields is ultimately controlled by React, owing to point #2 above.  Because this component doesn't implement any use for setUsername or setPassword, the input fields will be stuck with no text inside, even if the user types in them.
*/
const Login = (props) => {
    const [username, setUsername] = useState(''); //2
    const [password, setPassword] = useState('');  //2

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("******************* I'm in handleSubmit ********************************")
        fetch("http://localhost:3000/api/login", {
            method: 'POST',
            body: JSON.stringify({userName: username, password: password}),
            headers: new Headers({
            'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            console.log("**************************** calling updateToken with data.sessionToken: ", data.sessionToken)
            props.updateToken(data.sessionToken)
            console.log("****************************** back from updateToken with props = ", props)
        })
        // console.log(username, password)
    }


    return(
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username}/>
                    {console.log(username)}
                    {/* <Input name="username" value={username}/>  3 */}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name="password" value={password}/>
                    {/* <Input name="password" value={password}/>  3 */}
                    {console.log(password)}

                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Login;