require('./css/main.css');

import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import todoApp from './redux/reducers'
import DevTools from './components/DevTools';
import configureStore from './redux/configureStore';

const store = configureStore();
let rootElement = document.getElementById('app')

/**
 * Add devtools only for development.
 */
var devTools = (<div></div>);
if (process.env.NODE_ENV !== 'production') {
  devTools = <DevTools />;
}

/**
 * Render the root element.
 */
render(
  <Provider store={ store }>
    <div>
      <App />
      { devTools }
    </div>
  </Provider>,
  rootElement
)