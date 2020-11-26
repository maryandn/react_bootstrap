import React, {useContext, useEffect} from "react";
import CardList from "./cardList";
import useFetch from "../../hooks/useFetch";
import {CurrentUserContext} from "../../contexts/currentUser";
import {Row} from "react-bootstrap";
import AddProduct from "./addProduct";

export default function Article() {

    const [state] = useContext(CurrentUserContext)

    const apiUrl = `/product/${state.subCategoryId}`
    const [{response}, doFetch] = useFetch(apiUrl)

    useEffect(()=>{
        state.subCategoryId && doFetch({method: 'GET'})
    }, [state.subCategoryId, state.editCardProduct])

    return (
        <Row lg={4} md={2} sm={1}>
            {
                response !== null && <AddProduct action={true} specifications subCategoryId={state.subCategoryId}/>
            }
            {
                response !== null && response.map(product =>
                        <CardList
                            key = {product.id}
                            specifications={product}
                        />
                    )
            }
        </Row>
    )
}
