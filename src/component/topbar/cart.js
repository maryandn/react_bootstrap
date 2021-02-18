import React, {useContext, useState} from "react";
import Button from "react-bootstrap/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from "react-bootstrap/Modal";
import {useSelector, useDispatch} from "react-redux";
import {addOneQuantity, cartDelAction, subtractOneQuantity} from "../../redux/actions/cart-action";
import {CurrentUserContext} from "../../contexts/currentUser";


function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.cart)
    const [state, ] = useContext(CurrentUserContext)
    const baseUrl = "http://127.0.0.1:8000"
    let totalPrice = 0
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="pl-3">
            <Button className="pl-2" variant="outline-secondary" onClick={handleShow}>
                <small className="text-danger">{cart.length === 0 ? '' : cart.length}</small>
                <ShoppingCartIcon/>
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <div>Cart</div>
                </Modal.Header>
                <Modal.Body>
                    {
                        cart.length === 0 ? <div>Корзина пуста</div> :
                            cart.map(item => {
                                totalPrice += item.id_product.price * item.quantity
                                return <div className='row' key={item.id_product.id}>
                                    <div className='col-md-7'>
                                        <img style={{height: '50px'}}
                                             src={baseUrl + item.id_product.img}
                                             alt="no img"
                                        />
                                        {item.id_product.name}

                                    </div>
                                    <div className='col-md-5'>
                                        <button className="btn btn-light"
                                                disabled={item.quantity < 2 && true}
                                                onClick={() => dispatch(subtractOneQuantity(item.id_product.id,
                                                    state.isLoggedIn, item.quantity))
                                                }
                                        >
                                            -
                                        </button>
                                        {item.quantity}
                                        <button className="btn btn-light"
                                                onClick={() => dispatch(addOneQuantity(item.id_product.id,
                                                    state.isLoggedIn, item.quantity))
                                                }
                                        >
                                            +
                                        </button>
                                        {item.id_product.price * item.quantity}
                                        <CancelIcon onClick={
                                            () => dispatch(cartDelAction(item.id_product.id,
                                                state.isLoggedIn))
                                        }
                                        />
                                    </div>
                                </div>
                            })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        Total {totalPrice}₴ <button className='btn btn-success'>To order</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Cart