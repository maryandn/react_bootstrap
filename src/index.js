import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom'
import {applyMiddleware, compose, createStore} from "redux";

import App from './App';
import {CurrentUserProvider} from "./contexts/currentUser";
import './interceptor'
import SimpleBackdrop from "./component/isLoading";
import {rootReducer} from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";


const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk
    )
))

store.subscribe(() => {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart.cart))
})

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
