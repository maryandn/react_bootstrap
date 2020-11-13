import React, {useContext, useEffect, useState} from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GetProperties from "./getProperties";
import {CurrentUserContext} from "../../contexts/currentUser";

export default function EditProduct() {

    const [state,] = useContext(CurrentUserContext)
    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log(state.setPropertiesBrand.id)
        console.log(state.setPropertiesColor.id)
    }, [state.setPropertiesBrand, state.setPropertiesColor])

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    return (
        <>
            <button className='btn bg-dark text-light w-100' onClick={handleShow}>
                <AddCircleOutlineIcon />
            </button>
            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <GetProperties properties={'Бренд'} url={'brand/'}/>
                        </Form.Row>
                        <Form.Row>
                            <GetProperties properties={'Цвет'} url={'color/'}/>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/*{categoryStatus && <button className="btn btn-primary"*/}
                    {/*                           type="button"*/}
                    {/*                           onClick={() => setDoFetchMethod('POST')}*/}
                    {/*>*/}
                    {/*    {*/}
                    {/*        isLoading ?*/}
                    {/*            <span className="spinner-border spinner-border-sm" role="status"*/}
                    {/*                  aria-hidden="true"></span>*/}
                    {/*            : ''*/}
                    {/*    }*/}
                    {/*    {isLoading ? 'Loading...' : 'Добавить'}*/}

                    {/*</button>*/}
                    {/*}*/}
                    <button className="btn btn-primary" type="button">
                        Добавить
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
