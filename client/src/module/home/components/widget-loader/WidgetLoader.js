import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
import './WidgetLoader.css'

export default function (props)
{
    return (
        <div className="widget-loader" style={{ display: (props.isLoading ? 'block' : 'none' ) }}>
            <ClipLoader size={50} />
        </div>
    );
}