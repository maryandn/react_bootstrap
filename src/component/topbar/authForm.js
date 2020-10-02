import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";
import { useForm } from "react-hook-form";

export default function AuthForm() {

    const { handleSubmit, register, errors } = useForm();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [isLoginState, setIsLoginState] = useState(true)
    const [, setIsLoggedIn] = useContext(CurrentUserContext)
    const descriptionText = isLoginState ? 'Need an account?' : 'Have an account?'
    const apiUrl = isLoginState ? '/token/' : '/signup'
    const [{isLoading, response, error}, doFetch] = useFetch(apiUrl)

    const [errorValidation, setErrorValidation] = useState(null)
    // const [userNameValidation, setUserNameValidation] = useState(false)
    // const [passwordValidation, setPasswordValidation] = useState(false)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if (!username){
            setErrorValidation('логин не может быть пустой')
        } else if (username.length < 6){
            setErrorValidation('мало символов')
        } else {
            setErrorValidation('')
        }
    }, [username])

    const handleFinalSubmit = (event) => {
        // event.preventDefault();

        // if (isLoginState) {
        //     if (passwordValidation){
        //
        //     }
        // } else {
        //
        // }
        const user = isLoginState ?
            {
                "username": username,
                "password": password
            } :
            {
                "username": username,
                "password": password,
                "email": email,
                "profile": {
                    "phone": phone
                }
            };

        doFetch({method: 'POST', body: JSON.stringify(user)})

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
        if (response != null) {
            console.log(response)
            if (typeof (response.access) !== 'undefined') {
                localStorage.setItem('token', response.access)
            }
            if (typeof (response.refresh) !== 'undefined') {
                localStorage.setItem('token', response.refresh)
            }
            if (typeof (response.detail) !== 'undefined') {
                const notFoundUser = response.detail
                console.log(notFoundUser)
            }
            // if(typeof (response.username) !== 'undefined'){
            //     setNotFoundUserName(response.username ? true : false)
            // }
            // if(typeof (response.password) !== 'undefined'){
            //     setNotFoundPassword(response.password ? true : false)
            // }
        }
    }, [response])

    localStorage.length && setIsLoggedIn(state => ({
        ...state,
        isLoggedIn: true
    }))

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
                                          name='fast'
                                          placeholder="Логин"
                                          value={username}
                                          onChange={event => setUsername(event.target.value)}
                                          ref={register({
                                              required: 'ftjdxdfhxdfjxdfgj'
                                          })}
                            />
                            {errorValidation ?
                                <Form.Text className="text-muted">
                                    {errorValidation}{errors.fast && <span>{errors.fast.message}</span>}
                                </Form.Text> : ''
                            }
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Пароль"
                                          value={password}
                                          onChange={event => setPassword(event.target.value)}
                            />
                            {/*{notFoundPassword ?*/}
                            {/*    <Form.Text className="text-muted">*/}
                            {/*        Это поле не может быть пустым.*/}
                            {/*    </Form.Text> : ''*/}
                            {/*}*/}
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
                    <button className="btn btn-primary"
                            type="button"
                            onClick={handleSubmit(handleFinalSubmit)}
                    >
                        {
                            isLoading ?
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"></span>
                                : ''
                        }
                        {isLoading ? 'Loading...' : 'Отправить'}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
