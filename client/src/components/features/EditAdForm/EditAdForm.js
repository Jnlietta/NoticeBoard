import { useDispatch, useSelector } from "react-redux";
import { editAd, getAd } from "../../../redux/adsRedux";
import { Navigate, useNavigate } from "react-router-dom";
import AdForm from "../AdForm/AdForm";

const EditAdForm = () => {

    const id = window.location.pathname.split('/').filter(Boolean).pop();
    const adToEdit = useSelector(state => getAd(state, id));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = Ad => {
        dispatch(editAd({...Ad, id}));
        navigate('/');
    }

    if(!adToEdit) return <Navigate to="/" />

    return(
        <AdForm
            action={handleSubmit}
            actionText="Edit Advert"
            // {...adToEdit}
            />
    );
};

export default EditAdForm;