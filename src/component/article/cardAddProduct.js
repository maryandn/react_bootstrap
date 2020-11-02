import React from "react";
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from "react-bootstrap/Button";

function CardAddProduct() {

    return(
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
                <Button variant="outline-secondary">Button</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}

export default CardAddProduct
