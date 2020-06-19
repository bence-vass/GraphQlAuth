import React from 'react';
import fig from "../images/figill.svg";

const Fig = (props) => {
    return (
        <div className={'fig'} style={props.style}>
            <img src={fig} alt="fig"/>
            {props.children ? <div className={'text'} style={props.textStyle}>{props.children}</div> : null}
        </div>
    );
};

export default Fig;