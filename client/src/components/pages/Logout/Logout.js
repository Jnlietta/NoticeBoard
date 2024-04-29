import { useEffect } from "react";
import { API_URL } from "../../../config";
import { logOut } from "../../../redux/authRedux";
import { useDispatch } from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const options = {
            method: 'DELETE',
        };
    
        fetch(`${API_URL}/auth/logout`, options)
            .then(res => {
                dispatch(logOut());
            });
    }, [dispatch]);


    return null;
}

export default Logout;