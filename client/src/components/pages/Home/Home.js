import AllPosts from '../../features/AllPosts/AllPosts';
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