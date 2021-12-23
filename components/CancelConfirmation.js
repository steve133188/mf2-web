import * as React from "react";

export default function NotificationList({notification , ...props}){
    const {onConfirm, onCancel} = props;
    const handleConfirm= () => {
        onConfirm();
    };
    const handleCancel = () => {
        onCancel();
    };
    return(
        <div className="popup">
            <div className={"confirmationBox"}>
                <div className="content">
                    <h2>
                    Are you sure you wish to delete this item?

                    </h2>
                </div>
                <div className="btnGroup">
                    <button onClick={() => handleConfirm()}>Confirm</button>
                    <button onClick={() => handleCancel()} className={"mf_bg_light_grey mf_color_text"}>Cancel</button>
                </div>
            </div>
        </div>

    );


}