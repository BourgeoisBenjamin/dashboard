import {FormControl, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import React from "react";
import {LocationCity} from "@material-ui/icons";

export default function CityInput(props) {
    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">{props.name}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-amount"
                label={props.name}
                startAdornment={<InputAdornment position="start"><LocationCity/></InputAdornment>}
                onChange={props.onChange}
                value={props.value}
            />
        </FormControl>
    )
}