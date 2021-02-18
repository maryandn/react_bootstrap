import React, {useContext, useEffect} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import SubCategories from "./subCategories";
import useFetch from "../../hooks/useFetch";
import EditSubCategory from "./editSubCategory";
import {CurrentUserContext} from "../../contexts/currentUser";


export default function Categories(props) {

    const [state,] = useContext(CurrentUserContext)
    const apiUrl = `/categories/sub_categories/${props.id}/`
    const [{response}, doFetch] = useFetch(apiUrl)

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (state.tokenValid) {
            doFetch({method: 'GET'})
        }
    }, [state.editSubCategory, state.tokenValid])

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={props.category}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            {
                open &&
                <EditSubCategory sub_category_list={response} id={props.id}/>
            }
            {
                (response !== null && !response.code) && response.map(sub_category => <SubCategories
                    key={sub_category.id}
                    open={open}
                    sub_category={sub_category.name}
                    id={sub_category.id}
                />)
            }
        </>
    )
}

