import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;

    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className={classes.InputElement + ' form-control'} value={props.value} onChange={props.changed} placeholder={props.placeholder} />
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement + ' form-control'} value={props.value} onChange={props.changed} />
            break;
        default:
            inputElement = <input className={classes.InputElement + ' form-control'} value={props.value} onChange={props.changed} placeholder={props.placeholder} />
    };

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;