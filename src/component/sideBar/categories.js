import React, {useEffect} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DraftsIcon from '@material-ui/icons/Drafts';
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import SubCategories from "./subCategories";
import useFetch from "../../hooks/useFetch";


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
                <ListItemIcon>
                    <DraftsIcon/>
                </ListItemIcon>
                <ListItemText primary={props.category}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            {
                (response !== null && !response.code) && response.map(sub_category => <SubCategories
                    key={sub_category.id}
                    open={open}
                    sub_category={sub_category.name}/>)
            }
        </>
    )
}

