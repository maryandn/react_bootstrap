import React from "react";

const AddInput = ({placeholder, forwardRef}) => {

    return (
        <div className="input-group mb-3">
            <input className="form-control"
                   ref={forwardRef}
                   placeholder= {placeholder}
            >
            </input>
        </div>
    )
}

export default AddInput
