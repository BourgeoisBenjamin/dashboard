import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {FiSettings} from "react-icons/fi";

// eslint-disable-next-line import/no-anonymous-default-export
export default function(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickDelete = () => {
        setAnchorEl(null);
        props.onClickDelete();
    };

    const onClickSettings = () => {
        setAnchorEl(null);
        props.onClickSettings();
    };

    return (
        <div>
            <FiSettings color="white" size={30} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem key={0} onClick={onClickSettings}>Settings</MenuItem>
                <MenuItem key={1} onClick={onClickDelete} color="red">Delete</MenuItem>
            </Menu>
        </div>
    );
}