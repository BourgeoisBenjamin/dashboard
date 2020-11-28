import {Alert} from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import React from "react";

export default function ErrorDialog(props)
{
    return (
        <Snackbar open={props.open} onClose={props.onClose} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
            <Alert onClose={props.onClose} severity="error" variant="filled">
                {props.text}
            </Alert>
        </Snackbar>
    );
}