import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useLocalStorage from "../../hooks/useLocalStorage";
import Redirect from "react-router-dom/es/Redirect";
import {CurrentUserContext} from "../../contexts/currentUser";
import useFetch from "../../hooks/useFetch";

export default function AuthForm() {
    const [show, setShow] = useState(false);

    const [isLoginState, setIsLoginState] = useState(true)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const descriptionText = isLoginState ? 'Need an account?' : 'Have an account?'
    const apiUrl = isLoginState ? '/token/' : '/signup'
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)
    const [isSuccessFullSubmit, setIsSuccessFullSubmit] = useState(false)
    const [, setToken] = useLocalStorage('token')
    const [, setCurrentUserState] = useContext(CurrentUserContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = isLoginState ? {"username": username, "password": password} : {username, password, email, profile: {phone}};
        console.log(JSON.stringify(user))
        doFetch({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                    user
            )
        })

        if (isLoginState) {
            setUsername('')
            setPassword('')
        } else {
            setUsername('')
            setPassword('')
            setPasswordConfirm('')
            setEmail('')
            setPhone('')
        }
    }

    useEffect(() => {
        if (!response) {
            return;
        }
        setToken(response.user.token);
        setIsSuccessFullSubmit(true)
        setCurrentUserState(state => ({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response.user
        }));
    }, [response, setToken, setCurrentUserState])
    if (isSuccessFullSubmit) {
        return <Redirect to='/'/>
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                {isLoginState ? 'Sign In' : 'Sign Up'}
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{isLoginState ? 'Sign In' : 'Sign Up'}{' '}
                        <Button variant="link"
                                onClick={() => setIsLoginState(!isLoginState)}>
                            {descriptionText}
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="login"
                                          placeholder="Логин"
                                          value={username}
                                          onChange={event => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Пароль"
                                          value={password}
                                          onChange={event => setPassword(event.target.value)}
                            />
                        </Form.Group>
                        {
                            !isLoginState &&
                            <Form.Group controlId="formBasicPasswordConfirm">
                                <Form.Label>Подтверждение пароля</Form.Label>
                                <Form.Control type="password"
                                              placeholder="Подтверждение пароля"
                                              value={passwordConfirm}
                                              onChange={event => setPasswordConfirm(event.target.value)}
                                />
                                {(password === passwordConfirm) ? '' :
                                    <Form.Text className="text-muted">
                                        Пароли не совпадают
                                    </Form.Text>
                                }
                            </Form.Group>
                        }
                        {
                            !isLoginState &&
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email"
                                              placeholder="Enter email"
                                              value={email}
                                              onChange={event => setEmail(event.target.value)}
                                />
                            </Form.Group>
                        }
                        {
                            !isLoginState &&
                            <Form.Group controlId="formBasicPhone">
                                <Form.Label>Номер Телефона</Form.Label>
                                <Form.Control type="phone"
                                              placeholder="Номер Телефона"
                                              value={phone}
                                              onChange={event => setPhone(event.target.value)}
                                />
                            </Form.Group>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"
                            onClick={handleSubmit}
                            disabled={isLoading}
                    >
                        Отправить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
