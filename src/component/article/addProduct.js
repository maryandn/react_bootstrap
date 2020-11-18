import React, {useRef, useState} from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GetProperties from "./getProperties";
import Col from "react-bootstrap/Col";
import AddInput from "../global/addInput";
import AddImg from "../global/addImg";

export default function AddProduct() {

    const refBrand=useRef()
    const refColor=useRef()
    const refModel = useRef('')
    const refPrice = useRef(null)
    const refQuantity = useRef(null)

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    const addProduct = () => {
        console.log(refBrand.current.value)
        console.log(refColor.current.value)
        console.log(refModel.current.value)
        console.log(refPrice.current.value)
        console.log(refQuantity.current.value)
    }

    return (
        <>
            <button className='btn bg-dark text-light w-100' onClick={handleShow}>
                <AddCircleOutlineIcon/>
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
                            <GetProperties forwardRef={refBrand} properties={'Бренд'} url={'brand/'}/>
                        </Form.Row>
                        <Form.Row>
                            <GetProperties forwardRef={refColor} properties={'Цвет'} url={'color/'}/>
                        </Form.Row>
                        <Form.Row>
                            <Col xs={4}>
                                <Form.Label size="sm">Введите Модель</Form.Label>
                                <AddInput forwardRef={refModel} placeholder='Поле ввода'/>
                            </Col>
                            <Col xs={4}>
                                <Form.Label size="sm">Введите Цену </Form.Label>
                                <AddInput forwardRef={refPrice} placeholder='Поле ввода'/>
                            </Col>
                            <Col xs={4}>
                                <Form.Label size="sm">Введите Количество </Form.Label>
                                <AddInput forwardRef={refQuantity} placeholder='Поле ввода'/>
                            </Col>
                        </Form.Row>
                        <Form.Group>
                            <Form.Label size="sm">Добавить фотографию товара</Form.Label>
                            <AddImg/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary"
                            type="button"
                            onClick={addProduct}
                    >
                        Добавить
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
