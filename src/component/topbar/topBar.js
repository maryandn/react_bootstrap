import React, {useContext} from "react";
import Navbar from "react-bootstrap/Navbar";
import AuthForm from "./authForm";
import Button from "react-bootstrap/Button";
import {CurrentUserContext} from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

function TopBar() {

    const apiUrl = '/user'
    const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)
    const [state, setState] = useContext(CurrentUserContext)

    const getName = () => {
        doFetch({method: 'GET'})
        console.log('getName')
    }

    const handleSubmitLogOut = () =>{
        localStorage.clear()
        setState(state => ({
            ...state,
            isLoggedIn: false
        }))
    }

    console.log(isLoading);
    console.log(response);
    console.log(error);

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Super Shop</Navbar.Brand>
            <Button variant="outline-secondary"
                    onClick={getName}
            >
                Name
            </Button>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                {
                    state.isLoggedIn ?
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
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
