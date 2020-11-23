import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import React from "react";
import DialpadIcon from '@material-ui/icons/Dialpad';
import FormHelperText from "@material-ui/core/FormHelperText";

export default function(props) {
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">{props.name}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start"><DialpadIcon/></InputAdornment>}
                label={props.name}
                onChange={props.onChange}
                value={props.value}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]' }}
            />
        </FormControl>
    )
}