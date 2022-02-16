// Cannot resize Switches

import React  from "react"

export function Input(props) {
    return (
        <div className="col-md-10">
            <input
                className="form-control"
                type={props.type}
                placeholder={props.value}
            />
        </div>
    )
}

export function MF_Input(props) {
    return (
        <div className="inputField" style={props.style||null}>
            <span>{props.title}</span>
            <input type={props.type ?? "text"} name={props.name||null} placeholder={props.placeholder||null} disabled={props.disabled ? "disabled" : ""} onChange={props.onChange} value={props.value} pattern={props.pattern||null} minlength={props.minlength} />
        </div>
    )
}

export function MF_Required_Input(props) {
    return (
        <div className="inputField">
            <span>{props.title}</span>
            <input type={props.type ?? "text"} name={props.name||null} placeholder={props.placeholder||null} disabled={props.disabled ? "disabled" : ""} onChange={props.onChange} value={props.value} ppattern={props.pattern||null} required/>
        </div>
    )
}

export function Search(props) {
    return (
        <div className="position-relative">
            <input
                type="text"
                className="form-control"
                placeholder={props.placeholder}
            />
            <span className="uil-search"></span>
        </div>
    )
}

export function Search2({children,...props}) {
    const {handleChange ,type, svg, invalid } = props
    const inputClassName = "searchSVG " + svg;
    const invalidClassName = "requiredMessage " + invalid;
    return (
        <div className="logoInputContainer">
            <span className={invalidClassName}>Email or Password invalid</span>
            <label className={inputClassName}>
                <input
                        type={type}
                        onChange={handleChange}
                        placeholder={children}
                        className={invalid}
                      />
            </label>
        </div>
    )
}

export function Search3({children,...props}) {
    return (
        <div className="logoInputContainer2">
            <span className="requiredMessage">This field is required.</span>
            <label className="searchSVG">
                <input placeholder={children} onChange={props.onChange}/>
            </label>
        </div>
    )
}

export function Select() {
    return (
        <div className="mb-3">
            <label>Single Select</label>
            <select className="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
    )
}


export function LogInputField(props) {
    return (
        <label className="logInputField">
            <input type="text" className="logInput" placeholder={props.children}/>
            <input type="submit" className="logSubmit" value="Log"/>
        </label>
    )
}

