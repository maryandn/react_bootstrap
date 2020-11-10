import React, {useContext} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {CurrentUserContext} from "../../contexts/currentUser";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function SimpleBackdrop() {

    const [state, ] = useContext(CurrentUserContext)
    const classes = useStyles();

    console.log(state.isLoading);
    return (
        <div>
            <Backdrop className={classes.backdrop} open={state.isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
