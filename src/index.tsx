import 'semantic-ui-css/semantic.min.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from './services/config-store';

import './style.css';
import App from './components/app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);