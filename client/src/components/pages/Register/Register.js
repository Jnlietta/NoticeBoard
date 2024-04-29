import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

const Register = props => {
    return(
        <Form>

            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" placeholdder="Enter login" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholdder="Password" />
            </Form.Group>

            <Button variant="promary" type="submit">Submit</Button>
            
        </Form>
    );
};

export default Register;