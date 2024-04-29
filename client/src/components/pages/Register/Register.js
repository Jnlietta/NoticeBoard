import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";

const Register = props => {
    return(
        <Form className=" col-12 col-sm-3 mx-auto">

            <h1 className="my-4">Sign in</h1>

            <Form.Group className="mb-3" controlId="formLogin">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" placeholdder="Enter login" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholdder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="tel" placeholdder="Phone number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFile">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>

        </Form>
    );
};

export default Register;