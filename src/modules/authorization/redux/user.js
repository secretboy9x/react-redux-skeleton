import { createConstants, createReducer } from 'redux-module-builder';

export const types = createConstants('users')('LOGIN', 'LOGGED_IN_USER', 'ERROR_LOGGING_IN', 'LOGOUT');

export const actions = {
  login: (username) => (dispatch) => {
    dispatch({ type: types.LOGIN });
    dispatch({
      type: types.LOGGED_IN_USER,
      payload: {name: username}
    });
    localStorage.setItem('current_login', JSON.stringify({currentUser: {name: username}}));
  },
  logout: () => (dispatch) => {
    dispatch({ type: types.LOGOUT });
    localStorage.clear();
  }
};

export const reducer = createReducer({
  [types.LOGIN]: (state) => {
    return {
      ...state,
      loading: true,
      errors: undefined
    };
  },
  [types.LOGGED_IN_USER]: (state, { payload }) => {
    return {
      ...state,
      loading: false,
      currentUser: payload
    };
  },
  [types.ERROR_LOGGING_IN]: (state, { payload }) => {
    return {
      ...state,
      errors: payload
    };
  },
  [types.LOGOUT]: (state) => {
    return {
      ...state,
      currentUser: undefined
    };
  }
});

const loginSession = JSON.parse(localStorage.getItem('current_login'));

/*
 * The initial state for this part of the component tree
 */
export const initialState = loginSession ? loginSession : {
  loading: false,
  errors: undefined,
  currentUser: undefined
};
