import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import React from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

export default function EmailInput(props) {
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">{props.name}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start"><MailOutlineIcon/></InputAdornment>}
                labelWidth={props.labelWidth}
                onChange={props.onChange}
                value={props.value}
            />
        </FormControl>
    )
}