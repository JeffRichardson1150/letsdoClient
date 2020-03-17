/*
1. Notice the specific reactstrap imports, we're only grabbing what we need from the file.  If you're curious to learn more about <Navbar> and <NavbarBrand> from Reactstrap, take a look here for the Reactstrap docs:
https://reactstrap.github.io/components/navbar/ (Links to an external site.)
and feel free to take a look here for more information on the component bootstrap has built in:  https://getbootstrap.com/docs/4.0/components/navbar/ (Links to an external site.)
2. Our arrow function component is named Sitebar simply to avoid a naming conflict with the <Navbar> we use from bootstrap.
3. Notice we are rendering a single parent element, <Navbar>, in this case, which holds the child element <NavbarBrand>. React enforces this 1-parent rule for all of its components.
*/
import React, { useState } from 'react';
// import { Form } from 'react-bootstrap-validation';

import { isCompositeComponentWithType } from 'react-dom/test-utils';

// import {NavDropdown, Form, FormControl} from "react-router-dom";
// import Nav from 'react-bootstrap/Nav'
// import ReactBoostrap, {
//     // Nav, 
//     // Navbar, 
//     NavDropdown, MenuItem, Tabs, ButtonToolbar, Button, Table, ButtonGroup, Row, Col, Grid, Panel, Form, FormGroup, FormControl} from 'react-bootstrap';

import { //1
    Form, FormGroup, Label, Input,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    Button,
    DropdownItem
} from 'reactstrap';

// import {Form, FormGroup, Label, Input, Button} from 'reactstrap';  //1



const Sitebar = (props) => { //2
    
    console.log("************ HELLO FROM SITEBAR IN NAVBAR.JS ****************")

    const [isOpen, setIsOpen] = useState(false);
    const [location, setLocation] = useState('');


    const toggle = () => {
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        console.log("in toggle....isOpen : ", isOpen)
    }
    //3
    return (
        <Navbar color="faded" light expand="md">
            <NavbarBrand href="/">Event Jar</NavbarBrand>
            {/* Logout button */}
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>  {/* what's this do? */}
                <Nav className="ml-auto" navbar>
                    {/* <Form inline>
                        <FormControl>

                        </FormControl>
                    </Form> */}

                     {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                        <Button type="submit">Submit</Button>
                    </Form> */}
               {/*     <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                    
            {/* ***************** TRYING TO GET AN INPUT FIELD ON MY NAVBAR ******************************** */}
                    <Label htmlFor="location">Location</Label>
                    <Input onChange={(e) => setLocation(e.target.value)} name="location" value={location}/>

                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Options
                  </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                Option 1
                    </DropdownItem>
                            <DropdownItem>
                                Option 2
                    </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Reset
                    </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem>
                        <Button onClick={props.clickLogout}>Logout</Button>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar >
    )
}

export default Sitebar;