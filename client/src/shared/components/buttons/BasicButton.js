import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import './BasicButton.css'

export default function(props) {
    return (
        <div className="basic-button">
            <div className="button">
                <button onClick={props.onClick}>{props.name}</button>
                <div className="loader" style={{ display: (props.display ? 'block' : 'none'), marginLeft: props.marginLeft}}>
                    <ClipLoader size={props.loaderSize} />
                </div>
            </div>
        </div>
    );
}