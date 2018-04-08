import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { redux as moduleRedux } from 'modules';

let modules = {};

Object.keys(moduleRedux).forEach(key => {
  const redux = moduleRedux[key];
  if (redux) {
    modules[key] = redux;
  }
});

export let actions = {};

export let initialState = {};
export let reducers = {
  form: reduxFormReducer
};

Object.keys(modules).forEach(key => {
  const container = modules[key];
  initialState[key] = container.initialState || {};
  actions[key] = container.actions;
  reducers[key] = container.reducer;
});

const appReducer = combineReducers(reducers);

export const rootReducer = (state, action) => {
  if (action.type === 'USERS_LOGOUT') {
    state = initialState;
  }

  return appReducer(state, action);
};
