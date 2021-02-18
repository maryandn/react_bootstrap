import React, {useContext, useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import AuthForm from "./authForm";
import Button from "react-bootstrap/Button";
import {CurrentUserContext} from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";
import {Link} from "react-router-dom";
import Cart from "./cart";
import Form from "./Form";
import {useDispatch} from "react-redux";
import {cartAddFromBdActions} from "../../redux/actions/cart-action";

function TopBar() {

    const dispatch = useDispatch()
    const [state, setState] = useContext(CurrentUserContext)
    const apiUrl = state.tokenValid ? '/user' : '/token/refresh/'
    const [{response}, doFetch] = useFetch(apiUrl)
    const token = localStorage.getItem('token')

    const handleSubmitLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        setState(state => ({
            ...state,
            isLoggedIn: false
        }))
    }

    useEffect(() => {
        if (token) {
            setState(state => ({
                ...state,
                isLoggedIn: true
            }))
        }
    }, [])

    useEffect(() => {
        if (state.isLoggedIn === true && state.tokenValid === true) {
            doFetch({method: 'GET'})
        } else if (state.isLoggedIn === true && state.tokenValid === false) {
            doFetch({method: 'POST'})
        }
    }, [state.isLoggedIn, state.tokenValid])


    useEffect(() => {
        if (apiUrl === '/user' && response !== null && response.code) {
            setState(state => ({
                ...state,
                tokenValid: false
            }))
        }

        if (response !== null && response.access) {
            localStorage.setItem('token', response.access)
            setState(state => ({
                ...state,
                tokenValid: true
            }))
        }
        if (apiUrl === '/token/refresh/' && response !== null && response.code) {
            handleSubmitLogOut()
        }
        if (apiUrl === '/user' && response !== null && state.tokenValid) {
            setState(state => ({
                ...state,
                userId: response.id
            }))
            dispatch(cartAddFromBdActions(response.id))
        }
    }, [response])

    return (
        <Navbar bg="dark" variant="dark">
            <Link to={'/'}>
                <Navbar.Brand>Super Shop</Navbar.Brand>
            </Link>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                {
                    <div>
                        <Form/>
                    </div>
                }
                {
                    state.isLoggedIn ?
                        <Navbar.Text>
                            Signed in as: <a href="#login">{(response !== null) ? response.username : ''}</a>
                        </Navbar.Text> :
                        <div>
                            <AuthForm/>,
                        </div>
                }
                {
                    state.isLoggedIn &&
                    <Button variant="outline-secondary"
                            onClick={handleSubmitLogOut}
                    >
                        Log Out
                    </Button>
                }
                {
                    <Cart/>
                }

            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;
