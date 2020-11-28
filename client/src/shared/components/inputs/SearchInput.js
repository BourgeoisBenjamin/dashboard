import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import React from "react";
import SearchIcon from '@material-ui/icons/Search';

export default function SearchInput(props) {
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">{props.name}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                label={props.name}
                onChange={props.onChange}
                value={props.value}
            />
        </FormControl>
    )
}