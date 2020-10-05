import React, {useContext} from "react";
import Navbar from "react-bootstrap/Navbar";
import AuthForm from "./authForm";
import Button from "react-bootstrap/Button";
import {CurrentUserContext} from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

function TopBar() {

    const apiUrl = '/user'
    const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)
    const [isLoggedIn, setIsLoggedIn] = useContext(CurrentUserContext)

    const config = {
        'Authorization': `Bearer ${localStorage}`
    }
    const handleSubmitLogOut = () =>{
        localStorage.clear()
        setIsLoggedIn(state => ({
            ...state,
            isLoggedIn: false
        }))
    }

    doFetch({method: 'POST', body: JSON.stringify(config)})

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Super Shop</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                {
                    isLoggedIn.isLoggedIn ?
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text> :
                        <div>
                            <AuthForm/>,
                        </div>
                }
                {
                    isLoggedIn.isLoggedIn &&
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
