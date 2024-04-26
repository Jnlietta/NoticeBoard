import AllPosts from '../../features/AllAds/AllAds';
import SearchForm from '../../features/SearchForm/SearchForm';

const Home = props => {
    return(
        <div>
            <h1>Home</h1>
            <SearchForm />
            <AllPosts />
        </div>
    );
};

export default Home;