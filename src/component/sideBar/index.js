import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import useFetch from "../../hooks/useFetch";
import Categories from "./categories";

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

export default function NestedList() {
    const classes = useStyles();

    const apiUrl = '/categories/'
    const [{response}, doFetch] = useFetch(apiUrl)


    useEffect(() => {
        doFetch({method: 'GET'})
    }, [])

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
        >
            {(response !== null && !response.code) && response.map(category => <Categories
                key={category.id}
                category={category.name}
                id={category.id}
            />)}

        </List>
    );
}
