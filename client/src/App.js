import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';

// import routes
import Home from './components/pages/Home/Home';
import Post from './components/pages/Post/Post';
import AddPost from './components/pages/AddPost/AddPost';
import EditPost from './components/pages/EditPost/EditPost';
import SearchPost from './components/pages/SearchPost/SearchPost';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';

import { loadAdsRequest } from './redux/adsRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';




const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAdsRequest())
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/add" element={<AddPost />} />
        <Route path="/post/edit/:id" element={<EditPost />} />
        <Route path="/post/search/:searchPhrase" element={<SearchPost />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;