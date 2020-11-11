import React, {useState} from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GetBrands from "./getBrands";
import GetColors from "./getColors";

export default function EditProduct() {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    return (
        <>
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
                        Add Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <GetBrands/>
                            <GetColors/>
                        </Form.Group>
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
