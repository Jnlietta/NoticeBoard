/* SELECTORS */

/* ACTIONS */

// action name creator
const reducerName = 'auth';
const createActionName = name => `app/${reducerName}/${name}`;

const LOG_IN  = createActionName('LOG_IN');
const LOG_OUT  = createActionName('LOG_OUT');

export const logIn = payload => ({ type: LOG_IN, payload });
export const logOut = payload => ({ type: LOG_OUT, payload });

/* THUNKS */

/* INITIAL STATE */

const initialState = {
  data: [],
  requests: [],
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOG_IN:
      return { ...statePart, data: action.payload };
    case LOG_OUT:
      return { ...statePart, data: null };
    default:
      return statePart;
  }
}