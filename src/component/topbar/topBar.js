import React, {useContext} from "react";
import Navbar from "react-bootstrap/Navbar";
import AuthForm from "./authForm";
import Button from "react-bootstrap/Button";
import {CurrentUserContext} from "../../contexts/currentUser";

function TopBar() {

    const [isLoggedIn, setIsLoggedIn] = useContext(CurrentUserContext)
    // const isStatus = localStorage.getItem('token')
    // const authStatus = !!isStatus

    const handleSubmitLogOut = () =>{
        localStorage.clear()
        setIsLoggedIn(state => ({
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
