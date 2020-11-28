import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import React from "react";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

export default function UsernameInput(props) {
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">{props.name}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start"><PersonOutlineIcon/></InputAdornment>}
                labelWidth={props.labelWidth}
                onChange={props.onChange}
                value={props.value}
            />
        </FormControl>
    )
}