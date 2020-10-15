import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter as Router} from 'react-router-dom'
import {CurrentUserProvider} from "./contexts/currentUser";
import './interceptor'

ReactDOM.render(
    <CurrentUserProvider>
        <Router>
            <App/>
        </Router>
    </CurrentUserProvider>,
document.getElementById('root')
)
;
