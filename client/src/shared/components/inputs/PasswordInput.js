import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import React from "react";

export default function PasswordInput(props) {
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">{props.name}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start"><LockIcon/></InputAdornment>}
                labelWidth={props.labelWidth}
                type="password"
                value={props.value}
                onChange={props.onChange}
            />
        </FormControl>
    )
}