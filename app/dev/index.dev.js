import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../components/App'
import todoApp from '../reducers'
import DevTools from './DevTools';

// let store = createStore(todoApp)
import configureStore from '../redux/configureStore';
const store = configureStore();

let rootElement = document.getElementById('app')
render(
  <Provider store={ store }>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  rootElement
)