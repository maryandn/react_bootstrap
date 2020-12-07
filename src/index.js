import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom'
import {createStore} from "redux";

import App from './App';
import {CurrentUserProvider} from "./contexts/currentUser";
import './interceptor'
import SimpleBackdrop from "./component/isLoading";
import {rootReducer} from "./redux/reducers/rootReducer";

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <CurrentUserProvider>
            <Router>
                <App/>
                <SimpleBackdrop/>
            </Router>
        </CurrentUserProvider>
    </Provider>,
document.getElementById('root')
)
;
