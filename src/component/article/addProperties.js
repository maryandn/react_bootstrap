import React, {useContext, useEffect, useRef, useState} from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";

export default function AddProperties(props) {

    const [, setState] = useContext(CurrentUserContext)
    const apiUrl = `/product/${props.propsUrl}`
    const [{isLoading, response}, doFetch] = useFetch(apiUrl)
    const [valueState, setValueState] = useState('')
    const valueRef = useRef('')

    useEffect(() => {
        if (valueState){
            doFetch({method: 'POST', body: JSON.stringify({name: valueState})})
            setValueState('')
        }
    }, [valueState])

    useEffect(()=>{
        valueRef.current.value = ''
        setState(state => ({...state, setProperties: !state.setProperties}))
    }, [response])

    const submitButton = () => {
        setValueState(valueRef.current.value)
    }

    return (
        <>
            <Col xs={5}>
                <Form.Group>
                    <Form.Label size="sm">Название {props.propsSpecification}</Form.Label>
                    <div className="input-group mb-3">
                        <input className="form-control"
                               ref={valueRef}
                               placeholder= {`Ведите название ${props.propsSpecification}a`}
                        >
                        </input>
                    </div>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group>
                    <Form.Label size="sm">
                        Действие
                    </Form.Label>
                    <button className='btn bg-primary text-light w-100'
                            type='button'
                            onClick={submitButton}
                    >
                        <AddCircleOutlineIcon/>
                    </button>
                </Form.Group>
            </Col>
        </>
    )
}
