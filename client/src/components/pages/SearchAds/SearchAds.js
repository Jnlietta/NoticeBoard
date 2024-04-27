import { useSelector } from "react-redux";
import { getSearchAds } from "../../../redux/adsRedux";
import Ads from "../../common/Ads/Ads";

const SearchAds = props => {
    const ads = useSelector(getSearchAds);

    return(
        <Ads data = {ads} />
    );
};

export default SearchAds;