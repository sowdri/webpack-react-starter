import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../redux/reducers';
import DevTools from '../dev/DevTools';

import { Router, Route } from 'react-router'
import { syncHistory, routeReducer } from 'redux-simple-router'

import history from '../history';
const reduxRouterMiddleware = syncHistory(history)

// add the route reducer to rootReducer
const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routeReducer
}));

const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(reduxRouterMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(initialState) {

  const store = finalCreateStore(reducer, initialState);

  reduxRouterMiddleware.listenForReplays(store);
  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../redux/reducers', () => store.replaceReducer(require('../redux/reducers') /*.default if you use Babel 6+ */ )
    );
  }

  return store;
}