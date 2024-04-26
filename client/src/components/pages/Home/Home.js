import { getAds } from '../../../redux/adsRedux';
import AllAds from '../../features/AllAds/AllAds';
import SearchForm from '../../features/SearchForm/SearchForm';
import { useSelector } from 'react-redux';

const Home = props => {
    const ads = useSelector(getAds);

    return(
        <div>
            <h1>Home</h1>
            <SearchForm />
            <AllAds data={ads} />
        </div>
    );
};

export default Home;