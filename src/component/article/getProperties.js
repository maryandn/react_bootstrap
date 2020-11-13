import React, {useContext, useEffect} from "react";
import Form from "react-bootstrap/Form";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";
import Col from "react-bootstrap/Col";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export default function GetProperties(props) {

    const [, setState] = useContext(CurrentUserContext)
    const apiUrl = `/product/${props.url}`
    const [{isLoading, response}, doFetch] = useFetch(apiUrl)

    const onSelectProperties = (e) => {
        const id = response.find(item => item.id === +e.target.value)
        if (props.properties === 'Бренд') {
            setState(state => ({...state, setPropertiesBrand: id}))
        } else {
            setState(state => ({...state, setPropertiesColor: id}))
        }
    }

    console.log(response);

    useEffect(() => {
        doFetch({method: 'GET'})
    }, [])

    return (
        <>
            <Col xs={5}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label size="sm">Выбрать {props.properties}</Form.Label>
                    <Form.Control as="select"
                                  onChange={onSelectProperties}
                                  defaultValue="Choose..."
                    >
                        <option>Choose...</option>
                        {(response !== null && !response.code) && response.map(properties_item => (
                                <option key={properties_item.id} value={properties_item.id}>
                                    {properties_item.name}
                                </option>
                            )
                        )}
                    </Form.Control>
                    <Form.Control
                        as="select"
                        className="mr-sm-2"
                        id="inlineFormCustomSelect"
                        custom
                    >
                        <option value="0">Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Control>
                </Form.Group>
            </Col>

            <Col xs={5}>
                <Form.Group>
                    <Form.Label size="sm">Название {props.properties}</Form.Label>
                    <div className="input-group mb-3">
                        <input className="form-control"
                               type={props.type}
                               name={props.name}
                               placeholder={props.placeholder}
                               value={props.value}
                               onChange={event => props.onchange(event.target.value)}
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
                            // onClick={handleShow}
                    >
                        <AddCircleOutlineIcon />
                    </button>
                </Form.Group>
            </Col>
        </>

    )
}
