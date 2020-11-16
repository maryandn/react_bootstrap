import React, {useContext, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";
import Col from "react-bootstrap/Col";
import AddProperties from "./addProperties";

export default function GetProperties(props) {

    const [state, setState] = useContext(CurrentUserContext)
    const [defaultOptions, setDefaultOptions] = useState(true)
    const apiUrl = `/product/${props.url}`
    const [{isLoading, response}, doFetch] = useFetch(apiUrl)

    const onSelectProperties = (e) => {
        const id = response.find(item => item.id === +e.target.value)
        if (props.properties === 'Бренд') {
            setState(state => ({...state, setPropertiesBrand: id}))
        } else {
            setState(state => ({...state, setPropertiesColor: id}))
        }
        setDefaultOptions(false)
    }

    useEffect(() => {
        doFetch({method: 'GET'})
    }, [state.setProperties])

    return (
        <>
            <Col xs={5}>
                <Form.Group id="exampleForm.ControlSelect1">
                    <Form.Label size="sm">Выбрать {props.properties}</Form.Label>
                    <Form.Control
                        as="select"
                        className="mr-sm-2"
                        onChange={onSelectProperties}
                        id="inlineFormCustomSelect"
                        custom
                    >
                        {
                            defaultOptions ? <option>Choose...</option> : ''
                        }
                        {(response !== null && !response.code) && response.map(properties_item => (
                                <option key={properties_item.id} value={properties_item.id}>
                                    {properties_item.name}
                                </option>
                            )
                        )}
                    </Form.Control>
                </Form.Group>
            </Col>

            <AddProperties propsUrl={props.url} propsSpecification={props.properties}/>
        </>

    )
}
