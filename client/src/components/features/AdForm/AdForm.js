import { useState } from "react";
import { Button, Form } from "react-bootstrap";


const AdForm = ({ action, actionText, ...props }) => {
    const [title, setTitle] = useState(props.title || '');
    const [seller, setSeller] = useState(props.seller || '');
    const [photo, setPhoto] = useState(props.photo || '');
    const [price, setPrice] = useState(props.price || '');
    const [date, setDate] = useState(props.date || '');
    const [location, setLocation] = useState(props.location || '');
    const [content, setContent] = useState(props.content || '');

    const emptyQuill = '<p><br></p>';

    const [dateError, setDateError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const handleSubmit = () => {
        if(content === emptyQuill) return setContent('');
        setContentError(!content)
        setDateError(!date)
        if(content && date) {
            action({ title, seller, photo, price, date, location, content });
          }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Seeller</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Photo</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control />
            </Form.Group>
            <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control />
            </Form.Group>

            <Button variant="primary" type="submit">{actionText}</Button>
        </Form>
    );
};

export default AdForm;