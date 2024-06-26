import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';
import { getUser, selectorIsLoggedIn } from "../../../redux/authRedux";
import NoPermission from "../../pages/NoPermission/NoPermission";


const AdForm = ({ action, actionText, formatDate, ...props }) => {
    const quillRef = useRef();

    const [title, setTitle] = useState(props.title || '');
    const [photo, setPhoto] = useState(props.photo || '');
    const [price, setPrice] = useState(props.price || '');
    const [date, setDate] = useState(formatDate || '');
    const [location, setLocation] = useState(props.location || '');
    const [content, setContent] = useState(props.content || '');

    const isLoggedIn = useSelector(selectorIsLoggedIn);

    const user = useSelector(getUser);
    const seller = user.id;

    const emptyQuill = '<p><br></p>';

    const [dateError, setDateError] = useState(false);
    const [contentError, setContentError] = useState(false);

    const handleSubmit = () => {
        const quillInstance = quillRef.current.getEditor();
        const textContent = quillInstance.getText();

        if(content === emptyQuill) return setContent('');
        setContentError(!content)
        setDateError(!date)

        if(content && date && seller) {
            action({ title, seller, photo, price, date, location, content: textContent });
          }
    };
    

    const { register, handleSubmit: validate, formState: { errors } } = useForm();

    if(!isLoggedIn) return <NoPermission /> ;

    else return (
        <Form onSubmit={validate(handleSubmit)} className="col-12 col-sm-6 mx-auto">
            <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    {...register("title", { required: true, minLength: 10, maxLength: 50 })}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text" placeholder="Enter title"
                    />
                {errors.title && <small className="d-block form-text text-danger mt-2">Title has wrong length (min is 10 max is 50)</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoto">
                <Form.Label>Photo</Form.Label>
                <Form.Control 
                    type="file" 
                    onChange={e => setPhoto(e.target.files[0])}
                    />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control 
                    {...register("price", { required: true })}
                    value={price} 
                    onChange={e => setPrice(e.target.value)}
                    type="text" placeholder="Enter price"
                    />
                {errors.price && <small className="d-block form-text text-danger mt-2">This field is required</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Date</Form.Label>
                <br/>
                <DatePicker 
                    selected={date} 
                    onChange={date => setDate(date)} 
                    />
                {dateError && <small className="d-block form-text text-danger mt-2">This field is required</small>}            
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    {...register("location", { required: true })}
                    value={location} 
                    onChange={e => setLocation(e.target.value)}
                    type="text" placeholder="Enter location"
                    />
                {errors.location && <small className="d-block form-text text-danger mt-2">This field is required</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContent">
                <Form.Label>Content</Form.Label>
                <ReactQuill 
                    ref={quillRef}
                    theme="snow" 
                    value={content} 
                    onChange={setContent} 
                    />
                {contentError && <small className="d-block form-text text-danger mt-2">Content can't be empty (min 20 max 1000 signs)</small>}
            </Form.Group>
            
            <Button variant="primary" type="submit" className="mb-3">{actionText}</Button>
        </Form>
    );
};

export default AdForm;