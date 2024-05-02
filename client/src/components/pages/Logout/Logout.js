import { useEffect } from "react";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/authRedux";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";


const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const options = {
            method: 'DELETE',
        };
    
        fetch(`${API_URL}/auth/logout`, options)
            .then(res => {
                dispatch(logOut());
                navigate('/');
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });

    }, [dispatch]);


    return null;
}

export default Logout;