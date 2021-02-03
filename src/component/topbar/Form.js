import React, {useState} from "react";
import validate from "../../validate";
import useForm from "../../hooks/useForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Form() {
    const { handleChange, handleSubmit, values, errors } = useForm(
        submit,
        validate
    );

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function submit() {
        console.log(values);
        values.login = ''
        setShow(!show)
    }

    return (
        <>
            <Button variant="outline-secondary" onClick={handleShow}>
                Test
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Sign
                        <Button variant="link">
                            rt
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form noValidate onSubmit={handleSubmit}>
                        <div>
                            <label>Login</label>
                            <div>
                                <input
                                    name="login"
                                    type="login"
                                    value={values.login}
                                    onChange={handleChange}
                                    className={`${errors.login && "inputError"}`}
                                />
                                {errors.login && <p className="error">{errors.login}</p>}
                            </div>
                        </div>
                        <div>
                            <label>Email</label>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className={`${errors.email && "inputError"}`}
                                />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                        </div>
                        <div>
                            <label>Password</label>
                            <div>
                                <input
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className={`${errors.password && "inputError"}`}
                                />
                                {errors.password && <p className="error">{errors.password}</p>}
                            </div>
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <div>
                                <input
                                    name="confirm_password"
                                    type="password"
                                    value={values.confirm_password}
                                    onChange={handleChange}
                                    className={`${errors.confirm_password && "inputError"}`}
                                />
                                {errors.confirm_password && (
                                    <p className="error">{errors.confirm_password}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>Phone</label>
                            <div>
                                <input
                                    name="phone"
                                    type="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    className={`${errors.phone && "inputError"}`}
                                />
                                {errors.phone && <p className="error">{errors.phone}</p>}
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Form;
