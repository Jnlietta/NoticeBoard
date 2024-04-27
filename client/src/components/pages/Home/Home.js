import { getAds } from '../../../redux/adsRedux';
import Ads from '../../common/Ads/Ads';
import SearchForm from '../../features/SearchForm/SearchForm';
import { useSelector } from 'react-redux';

const Home = props => {
    const ads = useSelector(getAds);

    return(
        <div>
            <SearchForm />
            <Ads data={ads} />
        </div>
    );
};

export default Home;