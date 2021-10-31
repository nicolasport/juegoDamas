import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import App from '~/App';
import './scss/index.scss';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default {};
export const store = createStoreWithMiddleware(() => ('/*rootReducer*/')); // eslint-disable-line

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
