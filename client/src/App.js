import { Routes, Route } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';

// import routes
import Home from './components/pages/Home/Home';
import Ad from './components/pages/Ad/Ad';
import AddAd from './components/pages/AddAd/AddAd';
import EditAd from './components/pages/EditAd/EditAd';
import SearchAd from './components/pages/SearchAds/SearchAds';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Logout from './components/pages/Logout/Logout';
import { API_URL } from './config';

import { loadAdsRequest } from './redux/adsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { finishLoading, logIn, selectorLoading } from './redux/authRedux';




const App = () => {

  const dispatch = useDispatch();

  const loading = useSelector(selectorLoading);

  useEffect(() => {

    fetch(`${API_URL}/auth/user`)
      .then(res => {
        if(res.status === 200){
          return res.json()
        } else {
          dispatch(finishLoading())
        }
      })
      .then(res => {
        if(res !== undefined){
        dispatch(logIn(res))
        }
      })

    dispatch(loadAdsRequest())
    dispatch(finishLoading())
  }, [dispatch]);

  return (
    <Container>
      <Header />
      {loading &&
        <Spinner animation="border" role="status" className="block mx-auto">
          <span className="visually-hidden">Loading..</span>
        </Spinner>
      }
      {!loading &&
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/ad/add" element={<AddAd />} />
          <Route path="/ad/edit/:id" element={<EditAd />} />
          <Route path="/ad/search/:searchPhrase" element={<SearchAd />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/logout" element={<Logout />} />
          <Route path="*" element={<Home />} />
        </Routes>
      }
      <Footer />
    </Container>
  );
};

export default App;