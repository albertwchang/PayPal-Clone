import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';

const store = configureStore();
const Application = <Provider store={store}><App /></Provider>;
render(Application, document.getElementById('app'));
