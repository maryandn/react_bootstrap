import React, {useContext, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useFetch from "../../hooks/useFetch";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {CurrentUserContext} from "../../contexts/currentUser";

export default function AddCategory(props) {

    const [, setState] = useContext(CurrentUserContext)
    const [doFetchMethod, setDoFetchMethod] = useState('')
    console.log(doFetchMethod);
    const [category, setCategory] = useState({});
    const apiUrl = doFetchMethod === 'POST' ? '/categories/' : `/categories/edit_category/${category.id}/`
    const [{isLoading, response}, doFetch] = useFetch(apiUrl)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        doFetchMethod !== '' && doFetch({method: doFetchMethod, body: JSON.stringify({name: category.name})})
        setDoFetchMethod('')
    }, [doFetchMethod])

    useEffect(() => {
        response !== null && !response.error && setState(state => ({...state, editCategory: !state.editCategory}))
    }, [response])

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
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Выбрать Категорию</Form.Label>
                            <Form.Control as="select"
                                          onChange={(e => setCategory(props.category_list.find(item => item.id === +e.target.value)))}
                            >
                                <option>
                                    {category.name}
                                </option>
                                {(props.category_list !== null && !props.category_list.code) && props.category_list.map(category_item =>
                                    <option key={category_item.id} value={category_item.id}>
                                        {category_item.name}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="category"
                                          name="category"
                                          placeholder="Category"
                                          value={category.name}
                                          onChange={(event) => setCategory({...category, name: event.target.value})}
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
                            onClick={() => setDoFetchMethod('DELETE')}
                    >
                        {
                            isLoading ?
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"></span>
                                : ''
                        }
                        {isLoading ? 'Loading...' : 'Удалить'}
                    </button>
                    <button className="btn btn-primary"
                            type="button"
                            onClick={() => setDoFetchMethod('PUT')}
                    >
                        {
                            isLoading ?
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"></span>
                                : ''
                        }
                        {isLoading ? 'Loading...' : 'Изменить'}
                    </button>
                    <button className="btn btn-primary"
                            type="button"
                            onClick={() => setDoFetchMethod('POST')}
                    >
                        {
                            isLoading ?
                                <span className="spinner-border spinner-border-sm" role="status"
                                      aria-hidden="true"></span>
                                : ''
                        }
                        {isLoading ? 'Loading...' : 'Добавить'}

                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
