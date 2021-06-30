import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap'
import './pages.css'
import { useState } from 'react';
import { useEffect } from 'react';
import Error from './components/Error';

const url = 'http://employeerevabursementsystem-env.eba-s9jgpymb.us-east-2.elasticbeanstalk.com';

export function Home() {
    return (
        <>
            <Container>
                <Row>
                    <Col lg="auto">
                        <h1>Home</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto">
                        <Link to="/user">Profile</Link>
                    </Col>
                </Row>

                <br/>
                <br/>
            </Container>
        </>
    );
}

export function User() {
    return (
        <>
            <Container>

                <Row>
                    <Col lg="auto">
                        <h1>Profile</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto">
                        <Link to="/">Home</Link>
                    </Col>
                    <Col xs="auto">
                        <Link to="/signup">Signup</Link>
                    </Col>
                    <Col xs="auto">
                        <Link to="/login">Login</Link>
                    </Col>
                </Row>

                <br/>
                <br/>
            </Container>
        </>
    );
}

export function Signup() {
    const [validated, setValidated] = useState(false);

    // const [users, setUsers] = useState();

    // fetch(`${url}/users`).then(response => response.json()).then(response => setUsers(response.content));

    let form;

    const [isError, setIsError] = useState(false);

    const handleSubmit = (event) => {
        form = event.currentTarget;

        if (form.checkValidity()) {
            fetch(`${url}/users`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username:  form.formBasicUsername.value,
                    password:  form.formBasicPassword.value,
                    email:     form.formBasicEmail.value,
                    firstName: form.formBasicFirstName.value,
                    lastName:  form.formBasicLastName.value
                })})
                .then(response => {
                        if (response.status === 200) {
                            return response.json
                        } else {
                            throw new Error('Failed to fetch')
                        }
                    }
                )
                // .then(response => console.log(response))
                .catch((error) => {
                    setIsError(true);
                    console.log("FOUND ERROR ");
                    console.log(error)
                });
        }

        event.preventDefault();
        event.stopPropagation();

        setValidated(true);
    }

    return (
        <>
            <Container>

                <Row>
                    <Col lg="auto">
                        <h1>Create an account</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto">
                        <Link to="/user">Profile</Link>
                    </Col>
                    <Col xs="auto">
                        <Link to="/login">Login</Link>
                    </Col>
                </Row>

                <br/>
                <br/>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Row>

                        {/* Required fields */}
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username <p className="required">*</p></Form.Label>
                                <Form.Control required type="username" placeholder="Username" size=""/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password <p className="required">*</p></Form.Label>
                                <Form.Control required type="password" placeholder="Password"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address <p className="required">*</p></Form.Label>
                                <Form.Control required type="email" placeholder="Enter email"/>
                            </Form.Group>
                        </Col>

                        <Col xs="auto"/>

                        {/* Optional fields */}
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="firstname" placeholder="First name"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="lastname" placeholder="Last name"/>
                            </Form.Group>
                        </Col>

                        <Col xs={4}/>
                    </Row>

                    <p hidden={!isError} style={{color: 'red'}}>
                        An account with this username or email already exists!
                    </p>

                    <br/>

                    {/* Submit button */}
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export function Login() {
    const [validated, setValidated] = useState(false);
    
    let form;
    
    const handleSubmit = (event) => {
        form = event.currentTarget;

        if (form.checkValidity()) {
            fetch(`${url}/users`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: form.formBasicUsername.value,
                    password: form.formBasicPassword.value
                })})
                .then(response => response.json())
                .then(response => console.log(response))
                .catch((error) => {
                    console.log(error);
                });

        } else {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    return (
        <>
            <Container>

                <Row>
                    <Col lg="auto">
                        <h1>Login</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs="auto">
                        <Link to="/user">Profile</Link>
                    </Col>
                    <Col xs="auto">
                        <Link to="/signup">Sign Up</Link>
                    </Col>
                </Row>

                <br/>
                <br/>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Row>

                        {/* Required fields */}
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username <p className="required">*</p></Form.Label>
                                <Form.Control required type="username" placeholder="Username"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password <p className="required">*</p></Form.Label>
                                <Form.Control required type="password" placeholder="Password"/>
                            </Form.Group>
                        </Col>

                        <Col xs="auto"/>

                        <Col xs={4}/>
                    </Row>

                    <br/>

                    {/* Submit button */}
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </>
    );
}