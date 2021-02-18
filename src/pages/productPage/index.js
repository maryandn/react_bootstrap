import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {productAction} from "../../redux/actions/product-action";
import {Row} from "react-bootstrap";

export default function ProductPage() {

    const dispatch = useDispatch()
    const product = useSelector(state => state.product.product)
    const urlBase = 'http://127.0.0.1:8000'
    const {name, img} = product
    const url = window.location.pathname

    useEffect(() => {
        dispatch(productAction(url))
    }, [])

    return (
        <div className='container'>
            <div className="py-2 px-5 d-flex align-items-sm-start h-150">
                <h1 className="mb-0">{name}</h1>
            </div>
            <Row lg={2} md={1} sm={1}>
                <div className='p-2'>
                    <img src={urlBase + img}/>
                </div>
                <div className='p-2'>{name}</div>
            </Row>
        </div>
    )
}