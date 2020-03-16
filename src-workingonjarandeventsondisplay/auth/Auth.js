import React from 'react';
import {Container, Row, Col} from 'reactstrap'; //1
import Signup from './Signup';
import Login from './Login';
/*
1. We are importing all of the Bootstrap tools that allow us to use its grid system.  For further reference on Bootstrap grid, refer here:
https://getbootstrap.com/docs/4.0/layout/grid/ (Links to an external site.)
2. We are creating a functional component. It has no state, and it will simply pull in the props that will be passed down eventually.  Currently, this component is basically going to hold our login and signup forms side by side.  We have stubbed them out as text, but we'll add them as components later.
*/
const Auth = (props) => {  //2
    console.log("********************** HELLO FROM AUTH.JS ***********************");
    return(
        <Container className="auth-container">
            <Row>
                <Col md="6">
                    <Signup updateToken={props.updateToken}/>
                </Col>
                <Col md="6" className="login-col">
                    <Login updateToken={props.updateToken}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;