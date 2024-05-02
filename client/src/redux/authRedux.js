/* SELECTORS */
export const selectorIsLoggedIn = ({ auth }) => auth.isLoggedIn;
export const getUser = ({ auth }) => auth.data;
export const selectorLoading = ({ auth }) => auth.loading;


/* ACTIONS */

// action name creator
const reducerName = 'auth';
const createActionName = name => `app/${reducerName}/${name}`;

const LOG_IN  = createActionName('LOG_IN');
const LOG_OUT  = createActionName('LOG_OUT');
const FINISH_LOADING = createActionName('FINISH_LOADING');

export const logIn = payload => ({ type: LOG_IN, payload });
export const logOut = payload => ({ type: LOG_OUT, payload });
export const finishLoading = payload => ({ type: FINISH_LOADING, payload });

/* THUNKS */

/* INITIAL STATE */

const initialState = {
  data: {},
  isLoggedIn: null,
  loading: true,
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN:
      return { ...statePart, data: action.payload, isLoggedIn: true, loading: false };
    case LOG_OUT:
      return { ...statePart, data: null, isLoggedIn: false };
    case FINISH_LOADING:
      return{ ...statePart, loading: false };
    default:
      return statePart;
  }
}