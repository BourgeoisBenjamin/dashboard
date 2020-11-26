import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {FiSettings} from "react-icons/fi";
import history from "../../../../history";

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
        // props.onClickDelete();
    };

    const onClickSettings = () => {
        setAnchorEl(null);
        props.onClickSettings();
    };

    return (
        <div>
            <FiSettings color="white" size={30} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
            {/*<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>*/}
            {/*    Open Menu*/}
            {/*</Button>*/}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onClickSettings}>Settings</MenuItem>
                <MenuItem onClick={onClickDelete} color="red">Delete</MenuItem>
            </Menu>
        </div>
    );
}