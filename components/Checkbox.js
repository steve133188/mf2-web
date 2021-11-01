import React from "react";
import {Pill} from "./Pill";

export function Checkbox1(props) {
    return (
        <>
            <label className="checkboxContainer">{props.children}
                <input type="checkbox" checked={props.checked}/>
                <span className="checkmark"></span>
            </label>
        </>
    )
}

export function CheckboxNew({children, ...props}) {
    const {src, checked} = props;
    return (
        <div className="newCheckboxContainer">
            <div className="checkboxContentGrp">
                <img src={src} alt=""/>{children}
            </div>
            <label className="newCheckboxLabel">

                <input type="checkbox" name="checkbox"/>

            </label>
        </div>
    )
}

export function CheckboxNew2({children, ...props}) {
    const {checked} = props;
    return (
        <div className="newCheckboxContainer">
            <label className="newCheckboxLabel">

                <input type="checkbox" name="checkbox"/>

            </label>
            <div className="checkboxContentGrp">
                {children}
            </div>
        </div>
    )
}

export function CheckboxNewSingle() {
    return (
        <div className="newCheckboxContainer">
            <label className="newCheckboxLabel">
                <input type="checkbox" name="checkbox"/>
            </label>
        </div>
    )
}

export function Checkbox2(props) {
    return (
        <>
            <label className="checkboxContainer"><img
                src={props.src} alt=""/>{props.children}
                <input type="checkbox" checked={props.checked}/>
                <span className="checkmark"></span>
            </label>
        </>
    )
}

export function CheckboxPill({children, ...props}) {
    const {color, checked, checkbox, onClick} = props
    return (
        <>
            <label className="checkboxContainer" onClick={onClick}>
                <Pill color={color}>children</Pill>
                <input type="checkbox" checked={checked}/>
                <span className="checkmark"></span>
            </label>
        </>
    )
}

export function SingleBox(props) {
    const {fill, name, value, onClick} = props
    const classnamee = "checkmark " + {fill}
    return (
        <label className="testCheckboxContainer">
            <input type="checkbox" name={name} value={value} onClick={onClick}/>
            <span className={classnamee}></span>
        </label>
    )
}

export function ColumnCheckbox(props) {
    return (
        <label className="columnCheckboxContainer"><img
            src="icon-columnControl.svg" alt=""/>{props.children}
            <input type="checkbox" checked={props.checked}/>
            <span className="checkmark"></span>
        </label>
    )
}

{/*
<label className="checkboxContainer">Unread
    <input type="checkbox" checked="checked"/>
    <span className="checkmark"></span>
</label>
<label className="checkboxContainer">Unassigned
    <input type="checkbox"/>
    <span className="checkmark"></span>
</label>
<label className="checkboxContainer">ChatBox
    <input type="checkbox"/>
    <span className="checkmark"></span>
</label>
*/
}