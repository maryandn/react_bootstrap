import {GET_PRODUCT} from "../types";

const initialState  = {
    product: {
        "id": null,
        "name": "",
        "code": null,
        "price": null,
        "quantity": null,
        "img": "",
        "brand": {
            "id": null,
            "name": ""
        },
        "color": {
            "id": null,
            "name": ""
        }
    }
}

export const productReducer = (state = initialState, action) => {
    switch (action.type){
        case  GET_PRODUCT:
            return {
                ...state, product: action.payload
            }
        default:
            return state
    }
}