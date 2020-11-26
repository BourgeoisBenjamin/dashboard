import {FiAlertTriangle} from "react-icons/fi";
import React from "react";
import './WidgetError.css'

export default function(props)
{
    return (
        <div className="widget-error" style={{display: props.appear ? 'block' : 'none'}}>
            <div className="logo">
                <FiAlertTriangle size={50}/>
            </div>
            <div className="error-text">
                <p>{props.message}</p>
            </div>
        </div>
    );
}