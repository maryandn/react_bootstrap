import React from "react";
import Form from "react-bootstrap/Form";

export default function GetColors() {


    return (
        <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Выбрать Категорию</Form.Label>
            <Form.Control as="select"
                          onChange={onChangeCategory}
            >
                <option>
                    --------------
                </option>
                {(props.category_list !== null && !props.category_list.code) && props.category_list.map(category_item => (
                        <option key={category_item.id} value={category_item.id}>
                            {category_item.name}
                        </option>
                    )
                )}
            </Form.Control>
        </Form.Group>
    )
}
