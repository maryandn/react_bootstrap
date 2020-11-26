import React, {memo, useContext, useEffect, useRef, useState} from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GetProperties from "./getProperties";
import Col from "react-bootstrap/Col";
import AddInput from "../global/addInput";
import AddImg from "../global/addImg";
import useFetch from "../../hooks/useFetch";
import {makeStyles} from "@material-ui/core/styles";
import {CurrentUserContext} from "../../contexts/currentUser";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        maxHeight: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    addButton: {
        fontSize: 140,
        alignItems: 'center',
    }
}));

function AddProduct(props) {

    const {id, brand, color, name, price, quantity} = props.specifications

    const [state, setState] = useContext(CurrentUserContext)

    const apiUrl = props.action ? `/product/${props.subCategoryId}` : `/product/change_product/${id}`
    const method = props.action ? 'POST' : 'PUT'
    const [{response}, doFetch] = useFetch(apiUrl)

    const [img, setImg] = useState('')

    const refBrand = useRef()
    const refColor = useRef()
    const refModel = useRef('')
    const refPrice = useRef(null)
    const refQuantity = useRef(null)

    const classes = useStyles();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    const addProductButton = () => {
        const random = Math.round(Math.random() * 10)
        const formData = new FormData()
        if (props.action) {
            formData.append('brand', refBrand.current.value)
            formData.append('color', refColor.current.value)
            formData.append('name', refModel.current.value)
            formData.append('price', refPrice.current.value)
            formData.append('quantity', refQuantity.current.value)
            formData.append('img', img)
            formData.append('code', random)
        } else {
            refBrand.current.value !== 'Choose...' && formData.append('brand', refBrand.current.value)
            refColor.current.value !== 'Choose...' && formData.append('color', refColor.current.value)
            formData.append('name', refModel.current.value)
            formData.append('price', refPrice.current.value)
            formData.append('quantity', refQuantity.current.value)
            img && formData.append('img', img)
        }
        doFetch({method: method, body: formData})
    }

    useEffect(() => {
        response !== undefined &&
        response !== null &&
        setState(state => ({...state, editCardProduct: !state.editCardProduct}))
    }, [response])

    return (
        <>

            {
                props.action === true ?
                    <div className="h-200 d-flex justify-content-center align-items-center" onClick={handleShow}>
                        <AddCircleOutlineIcon className={classes.addButton} color="disabled"/>
                    </div>
                    :
                    <div>
                        <IconButton aria-label="buy" onClick={handleShow}>
                            <EditIcon/>
                        </IconButton>
                    </div>
            }

            <Modal
                size="lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {`продукт из категории ${state.subCategoryName}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <GetProperties forwardRef={refBrand}
                                           properties={'Бренд'}
                                           url={'brand/'}
                                           defaultValue={brand}
                            />
                        </Form.Row>
                        <Form.Row>
                            <GetProperties forwardRef={refColor}
                                           properties={'Цвет'}
                                           url={'color/'}
                                           defaultValue={color}
                            />
                        </Form.Row>
                        <Form.Row>
                            <Col xs={4}>
                                <Form.Label size="sm">Введите Модель</Form.Label>
                                <AddInput forwardRef={refModel}
                                          placeholder='Поле ввода'
                                          defaultValue={name}
                                />
                            </Col>
                            <Col xs={4}>
                                <Form.Label size="sm">Введите Цену </Form.Label>
                                <AddInput forwardRef={refPrice}
                                          placeholder='Поле ввода'
                                          defaultValue={price}
                                />
                            </Col>
                            <Col xs={4}>
                                <Form.Label size="sm">Введите Количество </Form.Label>
                                <AddInput forwardRef={refQuantity}
                                          placeholder='Поле ввода'
                                          defaultValue={quantity}
                                />
                            </Col>
                        </Form.Row>
                        <Form.Group>
                            <Form.Label size="sm">Добавить фотографию товара</Form.Label>
                            <AddImg setState={setImg}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary"
                            type="button"
                            onClick={addProductButton}
                    >
                        {props.action ? 'Добавить' : 'Изменить'}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default memo(AddProduct)
