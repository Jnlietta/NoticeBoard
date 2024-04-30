import { useDispatch, useSelector } from "react-redux";
import { editAdRequest, getAd } from "../../../redux/adsRedux";
import { Navigate, useNavigate } from "react-router-dom";
import AdForm from "../AdForm/AdForm";

const EditAdForm = () => {

    const id = window.location.pathname.split('/').filter(Boolean).pop();
    const adById = useSelector(state => getAd(state, id));
    const seller = adById.seller._id;
    
    const formatDate = new Date(adById.date);
    console.log(formatDate, adById);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = ad => {
        dispatch(editAdRequest({...ad, seller, id}));
        navigate('/');
    }

    if(!adById) return <Navigate to="/" />

    return(
        <AdForm
            action={handleSubmit}
            actionText="Edit Advert"
            formatDate={formatDate}
            {...adById}
            />
    );
};

export default EditAdForm;