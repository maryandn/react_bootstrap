import React from "react";

export default function AddImg(props) {
    const onImageChange = event => {
        props.setState(event.target.files[0])
    }
    return (
        <div>
            <input type="file" accept="image/*" multiple={false} onChange={onImageChange}/>
        </div>
    )
}
