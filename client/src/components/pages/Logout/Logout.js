import { API_URL } from "../../../config";

const Logout = () => {
    const options = {
        method: 'DELETE',
    };

    fetch(`${API_URL}/auth/logout`, options)
        .then(res => {

        });
}

export default Logout;