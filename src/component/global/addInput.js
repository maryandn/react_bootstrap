import React from "react";

const AddInput = ({defaultValue, placeholder, forwardRef}) => {

    return (
        <div className="input-group mb-3">
            <input className="form-control"
                   ref={forwardRef}
                   placeholder= {placeholder}
                   defaultValue={defaultValue ? defaultValue : ''}
            >
            </input>
        </div>
    )
}

export default AddInput
