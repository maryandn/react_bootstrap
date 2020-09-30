import React from "react";
import Navbar from "react-bootstrap/Navbar";
import AuthForm from "./authForm";
import Button from "react-bootstrap/Button";

function TopBar() {
    const isStatus = localStorage.getItem('token')
    const authStatus = !!isStatus

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Super Shop</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                {
                    authStatus ?
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text> :
                        <div>
                            <AuthForm/>,
                        </div>
                }
                {
                    authStatus &&
                    <Button variant="outline-secondary">
                        Log Out
                    </Button>
                }

            </Navbar.Collapse>
        </Navbar>
    )
}

export default TopBar;
