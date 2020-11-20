import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles} from "@material-ui/core/styles";
import React, {useContext} from "react";
import {CurrentUserContext} from "../../contexts/currentUser";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function SubCategories(props) {

    const classes = useStyles();
    const [, setState] = useContext(CurrentUserContext)

    const onClickId = () => {
        setState(state => ({
            ...state,
            subCategoryId: props.id
        }))

    }
    return (

        <Collapse in={props.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    <ListItemText primary={props.sub_category} onClick={onClickId}/>
                </ListItem>
            </List>
        </Collapse>

    )
}
