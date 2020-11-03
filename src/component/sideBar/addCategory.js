import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useFetch from "../../hooks/useFetch";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function AddCategory() {

    const [category, setCategory] = useState('');

    const apiUrl = '/token/'
    const [{isLoading, response}, doFetch] = useFetch(apiUrl)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleFinalSubmit = (event) => {
        doFetch({method: 'POST'})
    }

    return (
        <>
            {/*<Button variant="outline-secondary" onClick={handleShow}>*/}
            {/*    <AddCircleOutlineIcon/>*/}
            {/*</Button>*/}
            <button className='btn bg-dark text-light w-100' onClick={handleShow}>
                <AddCircleOutlineIcon/>
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        addCategory
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="login"
                                          name="login"
                                          placeholder="Логин"
                                          value={category}
                                          onChange={event => setCategory(event.target.value)}

                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className="btn btn-primary"
                            type="button"
                            onClick={handleFinalSubmit}
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
