import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { API_URL } from '../../../config';
import { Alert, Spinner } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { logIn } from '../../../redux/authRedux';

const Login = props => {

    const [ login, setLogin ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ status, setStatus ] = useState(null); // null, loading, success, serverError, clientError

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        };

        setStatus('loading');
        fetch(`${API_URL}/auth/login`, options)
            .then(res => {
                if (res.status === 200) {
                    setStatus('success');
                    return res.json();
                } else if (res.status === 400) {
                    setStatus('clientError');
                } else {
                    setStatus('serverError');
                }
            })
            .then(data => {
                if (data && data.user) {
                    dispatch(logIn({ login, userId: data.user.id }));
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return(
        <Form className=" col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

            <h1 className="my-4">Login</h1>

            {status === "success" && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been successfully logged in!</p>
                </Alert>
            )}
            
            {status === "serverError" && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong..</Alert.Heading>
                    <p>Unexpected error.. Try again!</p>
                </Alert>
            )}

            {status === "clientError" && (
                <Alert variant="danger">
                    <Alert.Heading>Incorrect data</Alert.Heading>
                    <p>Login or password are incorrect.</p>
                </Alert>
            )}

            {status === "loading" && (
                <Spinner animation="border" role="status" className="block mx-auto">
                    <span className="visually-hidden">Loading..</span>
                </Spinner>
            )}

            {status !== "success" && (
                <div>
                    <Form.Group className="mb-3" controlId="formLogin">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholdder="Enter login" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholdder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">Sign up</Button>
                </div>
            )}

        </Form>
    );
};

export default Login;