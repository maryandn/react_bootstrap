import React, {useEffect} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import SubCategories from "./subCategories";
import useFetch from "../../hooks/useFetch";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";


export default function Categories(props) {
    const [open, setOpen] = React.useState(false);
    const apiUrl = `/categories/sub_categories/${props.id}`
    const [{response}, doFetch] = useFetch(apiUrl)

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        doFetch({method: 'GET'})
    }, [])

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={props.category}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            {
                open &&
                <button className='btn bg-dark text-light w-100'>
                    <AddCircleOutlineIcon/>
                </button>
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

