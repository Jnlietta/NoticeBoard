import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getAds = ({ ads }) => ads.data;
export const getSearchAds = ({ ads }) => ads.searchedData;
export const getAd = ({ ads }, id) => ads.data.find(ad => ad._id === id);

export const getRequest = ({ ads }) => ads.request;


/* ACTIONS */

// action name creator
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const LOAD_ADS = createActionName('LOAD_ADS');
export const LOAD_SEARCH_ADS = createActionName('LOAD_SEARCH_ADS');
export const ADD_AD = createActionName('ADD_AD');
export const EDIT_AD = createActionName('EDIT_AD');
const REMOVE_AD = createActionName('REMOVE_AD');


export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const loadSearchAds = payload => ({ payload, type: LOAD_SEARCH_ADS });
export const addAd = payload => ({ payload, type: ADD_AD });
export const editAd = payload => ({ type: EDIT_AD, payload });
export const removeAd = payload => ({ type: REMOVE_AD, payload });

/* THUNKS */
export const loadAdsRequest = () => {
  return async dispatch => {

    dispatch(startRequest());
    try {

      let res = await axios.get(`${API_URL}/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest());

    } catch(e) {
      dispatch(errorRequest(e.message));
    }

  };
};

export const loadSearchAdsRequest = ({ searchPhrase }) => {
  return async dispatch => {

    dispatch(startRequest());
    try {

      let res = await axios.get(`${API_URL}/ads/search/${searchPhrase}`);
      dispatch(loadSearchAds(res.data));
      dispatch(endRequest());

    } catch(e) {
      dispatch(errorRequest(e.message));
    }
    
  };
};

export const addAdRequest = (data) => {
  return async dispatch => {

    dispatch(startRequest({ name: ADD_AD }));
    try {

      const fd = new FormData();
      fd.append('title', data.ad.title);
      fd.append('seller', data.ad.seller);
      fd.append('photo', data.ad.photo);
      fd.append('price', data.ad.price);
      fd.append('date', data.ad.date);
      fd.append('location', data.ad.location);
      fd.append('content', data.ad.content);

      const options = {
        method: 'POST',
        body: fd
    };

    fetch(`${API_URL}/ads`, options)
        .then(res => {
            if (res.status === 201) {
              dispatch(loadAdsRequest())
            }
        })
      
      dispatch(endRequest({ name: ADD_AD }));

    } catch(e) {
      dispatch(errorRequest({ name: ADD_AD, error: e.message }));
    }

  };
};

export const editAdRequest = (data) => {
  return async dispatch => {

    console.log("request edit: ", data, data.seller, data.id);

    dispatch(startRequest({ name: ADD_AD }));
    try {

      let res = await axios.put(
        `${API_URL}/ads/${data.id}`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        },
      );

    //   const fd = new FormData();
    //   fd.append('title', data.title);
    //   fd.append('seller', data.seller);
    //   fd.append('photo', data.photo);
    //   fd.append('price', data.price);
    //   fd.append('date', data.date);
    //   fd.append('location', data.location);
    //   fd.append('content', data.content);

    //   console.log(fd);

    //   const options = {
    //     method: 'PUT',
    //     body: fd
    // };

    // fetch(`${API_URL}/ads/${data.id}`, options)
    //     .then(res => {
    //         if (res.status === 201) {
    //           dispatch(loadAdsRequest())
    //         }
    //     })

      dispatch(editAd(res.data));
      dispatch(endRequest({ name: ADD_AD }));

    } catch(e) {
      dispatch(errorRequest({ name: ADD_AD, error: e.message }));
    }

  };
};

export const removeAdRequest = ({ id }) => {
  return async dispatch => {

    dispatch(startRequest());
    try {

      await axios.delete(`${API_URL}/ads/${id}`);
      dispatch(endRequest());

    } catch(e) {
      dispatch(errorRequest(e.message));
    }
    
  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  searchedData: [],
  request: {},
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ADS:
      return { ...statePart, data: [...action.payload] };
    case LOAD_SEARCH_ADS:
      return { ...statePart, searchedData: [...action.payload] };
    case ADD_AD:
      return { ...statePart, data: [...statePart.data, { ...action.payload }] };
    case EDIT_AD:
      return { ...statePart, data: statePart.data.map(ad => (ad._id === action.payload.id ? { ...ad, ...action.payload } : ad))};
    case REMOVE_AD:
      return {...statePart, data: statePart.data.filter(ad => ad._id !== action.payload)};
    case START_REQUEST:
        return { ...statePart, request: { pending: true, error: null, success: false }} ;
    case END_REQUEST:
        return { ...statePart, request: { pending: false, error: null, success: true }} ;
    case ERROR_REQUEST:
        return { ...statePart, request: { pending: false, error: action.payload.message, success: false }} ;
    default:
      return statePart;
  }
}