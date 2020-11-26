import React, {useContext, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";
import Col from "react-bootstrap/Col";
import AddProperties from "./addProperties";

export default function GetProperties({forwardRef, url, properties, defaultValue}) {

    const [state, ] = useContext(CurrentUserContext)
    const [defaultOptions, setDefaultOptions] = useState(true)
    const apiUrl = `/product/${url}`
    const [{response}, doFetch] = useFetch(apiUrl)

    const onSelectProperties = (e) => {
        setDefaultOptions(false)
    }

    useEffect(() => {
        doFetch({method: 'GET'})
    }, [state.setProperties])

    return (
        <>
            <Col xs={5}>
                <Form.Group id="exampleForm.ControlSelect1">
                    <Form.Label size="sm">Выбрать {properties}</Form.Label>
                    <Form.Control
                        ref={forwardRef}
                        as="select"
                        className="mr-sm-2"
                        onChange={onSelectProperties}
                        id="inlineFormCustomSelect"
                        custom
                    >
                        {
                            // defaultOptions ? <option defaultValue={defaultValue}>Choose...</option> : ''
                            defaultOptions ? <option defaultValue={defaultValue}>Choose...</option> : ''
                        }
                        {(response !== null && !response.code) && response.map(properties_item => (
                                <option key={properties_item.id}
                                        value={properties_item.id}
                                >
                                    {properties_item.name}
                                </option>
                            )
                        )}
                    </Form.Control>
                </Form.Group>
            </Col>

            <AddProperties propsUrl={url} propsSpecification={properties}/>
        </>

    )
}
