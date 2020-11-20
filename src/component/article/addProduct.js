import React, {memo, useContext, useEffect, useRef, useState} from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GetProperties from "./getProperties";
import Col from "react-bootstrap/Col";
import AddInput from "../global/addInput";
import AddImg from "../global/addImg";
import useFetch from "../../hooks/useFetch";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import {CurrentUserContext} from "../../contexts/currentUser";

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
        marginTop: '49.5%',
        marginBottom: '49.5%',
    }
}));

function AddProduct(props) {

    const [, setState] = useContext(CurrentUserContext)

    const apiUrl = `/product/${props.subCategoryId}`
    const [{response}, doFetch] = useFetch(apiUrl)

    const [img, setImg] = useState('')
    
    const refBrand = useRef()
    const refColor = useRef()
    const refModel = useRef('')
    const refPrice = useRef(null)
    const refQuantity = useRef(null)

    const classes = useStyles();
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);

    const addProductButton = () => {
        const random = Math.round(Math.random() * 10)
        const formData = new FormData()
        formData.append('brand', refBrand.current.value)
        formData.append('color', refColor.current.value)
        formData.append('name', refModel.current.value)
        formData.append('price', refPrice.current.value)
        formData.append('quantity', refQuantity.current.value)
        formData.append('img', img)
        formData.append('code', random)

        doFetch({method: 'POST', body: formData})
    }

    useEffect(() => {
        response !== undefined &&
        response !== null &&
        setState(state => ({...state, editCardProduct: !state.editCardProduct}))
    }, [response])

    return (
        <div className="h-100 pr-1 pt-2">
            <Card className={classes.root} onClick={handleShow}>
                <AddCircleOutlineIcon className={classes.addButton} color="disabled"/>
            </Card>
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
                            <AddImg setState={setImg}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary"
                            type="button"
                            onClick={addProductButton}
                    >
                        Добавить
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default memo(AddProduct)
