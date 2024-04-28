import { useDispatch } from "react-redux";
import { addAd } from "../../../redux/adsRedux";
import { useNavigate } from "react-router-dom";
import AdForm from "../AdForm/AdForm";

const AddPostForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = ad => {
        dispatch(addAd(ad));
        navigate('/');
    }

    return(
        <AdForm
            action={handleSubmit}
            actionText="Add advert"
            />
    );
};

export default AddPostForm;