import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import rootReducer from '../redux/reducers';
import { syncHistory, routeReducer } from 'redux-simple-router'

import history from '../history';
const reduxRouterMiddleware = syncHistory(history)

const reducer = combineReducers(Object.assign({}, rootReducer, {
  routing: routeReducer
}));


const finalCreateStore = compose(
  // Middleware you want to use in production:
  // applyMiddleware(p1, p2, p3)
  // Other store enhancers if you use any
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(reducer, initialState);
}