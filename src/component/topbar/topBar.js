import React, {useContext, useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import AuthForm from "./authForm";
import Button from "react-bootstrap/Button";
import {CurrentUserContext} from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

function TopBar() {

    const apiUrl = '/user'
    const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)
    const [state, setState] = useContext(CurrentUserContext)
    const [render, setRender] = useState(state.currentUser)

    useEffect(()=>{
        if (state.isLoggedIn) {
            if(localStorage.length){
                doFetch({method: 'GET'})
            } else {
                setState(state => ({
                    ...state,
                    isLoggedIn: false
                }))
            }
        }
    }, [])

    console.log(state.currentUser)

    const handleSubmitLogOut = () => {
        localStorage.clear()
        setState(state => ({
            ...state,
            isLoggedIn: false
        }))
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Super Shop</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
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

            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;
