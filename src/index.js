import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter as Router} from 'react-router-dom'
import {CurrentUserProvider} from "./contexts/currentUser";
import './interceptor'
import SimpleBackdrop from "./component/isLoading";

ReactDOM.render(
    <CurrentUserProvider>
        <Router>
            <App/>
            <SimpleBackdrop/>
        </Router>
    </CurrentUserProvider>,
document.getElementById('root')
)
;
