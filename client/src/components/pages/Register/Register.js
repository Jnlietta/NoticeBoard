import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

const Register = props => {

    const [ login, setLogin ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ avatar, setAvatar ] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();

        console.log( login, password, phone, avatar);
    };

    return(
        <Form className=" col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

            <h1 className="my-4">Sign in</h1>

            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholdder="Enter login" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholdder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholdder="Phone number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" onChange={e => setAvatar(e.target.files[0])}/>
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>

        </Form>
    );
};

export default Register;