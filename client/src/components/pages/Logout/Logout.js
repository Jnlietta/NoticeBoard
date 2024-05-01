import { useEffect } from "react";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/authRedux";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";


const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            method: 'DELETE',
        };
    
        fetch(`${API_URL}/auth/logout`, options)
            .then(res => {
                dispatch(logOut());
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });

    }, [dispatch]);


    return <Navigate to="/" />;
}

export default Logout;