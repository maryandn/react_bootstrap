import React, {useContext, useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {CurrentUserContext} from "../../contexts/currentUser";


export default function EditSubCategory(props){

    const [state, setState] = useContext(CurrentUserContext)
    const [doFetchMethod, setDoFetchMethod] = useState('')
    const [subCategory, setSubCategory] = useState({name: ''})
    const [categoryStatus, setCategoryStatus] = useState(false);
    const [apiUrl, setApiUrl] = useState('')
    const [{isLoading, response}, doFetch] = useFetch(apiUrl)
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        setSubCategory({name: ''})
    }
    const handleShow = () => setShow(true);

    console.log(state.editSubCategory);
    const urlManager = () => {
        if (doFetchMethod === 'POST') {
            setApiUrl(`/categories/sub_categories/${props.id}/`)
        } else {
            return setApiUrl(`/categories/edit_sub_categories/${subCategory && subCategory.id}/`)
        }
    }

    const onChangeCategory = (e) => {
        if (e.target.value) {
            setSubCategory(props.sub_category_list.find(item => item.id === +e.target.value))
            setCategoryStatus(false)
        } else {
            setSubCategory({...subCategory, name: ''})
            setCategoryStatus(true)
        }
    }

    const onHandleInput = (event) => {
        setSubCategory({...subCategory, name: event.target.value})
        if (subCategory) {
            !subCategory.id && setCategoryStatus(true)
        }
    }

    useEffect(() => {
        if (doFetchMethod) {
            urlManager();
            doFetch({method: doFetchMethod, body: JSON.stringify({name: subCategory.name, categories: props.id})})
            setDoFetchMethod('')
            setSubCategory({name: ''})
            setCategoryStatus(true)
        }
    }, [doFetchMethod])


    useEffect(() => {
        response !== null && !response.error && setState(state => ({...state, editSubCategory: !state.editSubCategory}))
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
                                          onChange={onChangeCategory}
                            >
                                <option>
                                    --------------
                                </option>
                                {(props.sub_category_list !== null && !props.sub_category_list.code) && props.sub_category_list.map(category_item => (
                                        <option key={category_item.id} value={category_item.id}>
                                            {category_item.name}
                                        </option>
                                    )
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicLogin">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="category"
                                          name="category"
                                          placeholder="Category"
                                          value={subCategory ? subCategory.name : ''}
                                          onChange={(e) => onHandleInput(e)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {subCategory && subCategory.id && <button className="btn btn-primary"
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
                    </button>}
                    {subCategory && subCategory.id && <button className="btn btn-primary"
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
                    </button>}
                    {categoryStatus && <button className="btn btn-primary"
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
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}
