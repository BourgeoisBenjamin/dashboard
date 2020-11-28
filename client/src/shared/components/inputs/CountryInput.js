import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import React from "react";
import PublicIcon from '@material-ui/icons/Public';

export default function CountryInput(props) {
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">{props.name}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                label={props.name}
                startAdornment={<InputAdornment position="start"><PublicIcon/></InputAdornment>}
                onChange={props.onChange}
                value={props.value}
            />
        </FormControl>
    )
}