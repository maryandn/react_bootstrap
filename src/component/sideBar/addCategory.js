import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useFetch from "../../hooks/useFetch";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// const [state, setState] = useState({ fName: "", lName: "" });
// const handleChange = e => {
//     const { name, value } = e.target;
//     setState(prevState => ({
//         ...prevState,
//         [name]: value
//     }));
// };

export default function AddCategory(props) {

    console.log(props.category_list)
    const [doFetchMethod, setDoFetchMethod] = useState(true)
    const [category, setCategory] = useState({});

    const apiUrl = doFetchMethod ? '/categories/' : `/categories/edit_category/${category.id}`
    const [{isLoading, response}, doFetch] = useFetch(apiUrl)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const name =
        {
            'name': category.name
        }

    const handleEditSubmit = (method) => {
        console.log(method + name)
        // doFetch({method: method, body: JSON.stringify(name)})
    }

    console.log(category.id)
    console.log(category.name)
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
                                          onChange={
                                              event => setCategory(event.target.value)
                                          }
                            >
                                {(props.category_list !== null && !props.category_list.code) && props.category_list.map(category_list =>
                                    <option key={category_list.id} value={category_list}>
                                        {category_list.name}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="login"
                                          name="login"
                                          placeholder="Логин"
                                          value={category.name}
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
                            onClick={handleEditSubmit('DELETE')}
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
                            onClick={handleEditSubmit('PUT')}
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
                            onClick={handleEditSubmit('POST')}
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
