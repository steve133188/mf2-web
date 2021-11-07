import React from "react";

export function Checkbox({children, ...props}) {
    const {src, checked} = props;
    return (
        <div className="newCheckboxContainer">
            <div className="checkboxContentGrp teamSelect">
                {src ? <img src={src} alt=""/> : "" }{children}
            </div>
            <label className="newCheckboxLabel">

                <input type="checkbox" name="checkbox"/>

            </label>
        </div>
    )
}
