import { getAds } from '../../../redux/adsRedux';
import { selectorIsLoggedIn } from '../../../redux/authRedux';
import Ads from '../../features/Ads/Ads';
import SearchForm from '../../features/SearchForm/SearchForm';
import { useSelector } from 'react-redux';

const Home = props => {
    const ads = useSelector(getAds);
    const isLoggedIn = useSelector(selectorIsLoggedIn);

    return(
        <div>
            <SearchForm />
            <Ads data={ads} isLoggedIn={isLoggedIn}/>
        </div>
    );
};

export default Home;