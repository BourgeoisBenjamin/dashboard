import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import './BasicButton.css'

export default function(props) {
    return (
        <div className="basic-button">
            <div className="button">
                <button onClick={props.onClick} style={{marginLeft: props.loaderSize + 20}}>{props.name}</button>
                <div className="loader" style={{ opacity: (props.display ? '1' : '0'), marginLeft: props.marginLeft, visibility: (props.display ? 'visible' : 'hidden')}}>
                    <ClipLoader size={props.loaderSize} />
                </div>
            </div>
        </div>
    );
}