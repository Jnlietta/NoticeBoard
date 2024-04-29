import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

const Login = props => {

    const [ login, setLogin ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ status, setStatus ] = useState(null); // null, loading, success, serverError, clientError, loginError


    const handleSubmit = e => {
        e.preventDefault();
    }

    return(
        <Form className=" col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

            <h1 className="my-4">Login</h1>

            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholdder="Enter login" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholdder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">Sign up</Button>

        </Form>
    );
};

export default Login;