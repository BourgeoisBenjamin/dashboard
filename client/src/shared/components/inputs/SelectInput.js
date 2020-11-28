import {FormControl} from "@material-ui/core";
import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";

export default function SelectInput(props) {

    const menuItems = () => {
        let items = [];

        props.array.forEach((a) => {
            if (!a[props.arrayValueNotDisabled] && props.arrayValueNotDisabled) {
                items.push(
                    <Tooltip title={props.messageOnValueDisabled} aria-label="add" disableInteractive={true} aria-setsize={50}>
                        <span>
                            <MenuItem key={a[props.arrayKey]} value={a[props.arrayValue]} disabled={!a[props.arrayValueNotDisabled]}>
                                {a[props.arrayValue]}
                            </MenuItem>
                        </span>
                    </Tooltip>
                );
            } else {
                items.push(
                    <MenuItem key={a[props.arrayKey]} value={a[props.arrayValue]}>
                        {a[props.arrayValue]}
                    </MenuItem>
                );
            }
        });
        return items;
    };

    return (
        <FormControl style={{minWidth: 300}} variant="outlined">
            <InputLabel>{props.label}</InputLabel>
            <Select
                label={props.label}
                value={props.value}
                onChange={props.onChange}
                renderValue={props.renderValue}
            >
                <MenuItem disabled value="">
                    <em>{props.name}</em>
                </MenuItem>
                {menuItems()}
            </Select>
        </FormControl>
    )
}