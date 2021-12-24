import * as React from "react";

export default function NotificationList({notification , ...props}){
    const {onConfirm, data,onClose} = props;
    //onConfirm is the function to call when confirm
    //data is the varible that onConfirm needed(item.id)
    //onClose will set isOpenConfirmation to false
    const handleConfirm= () => {
        onConfirm(data);
        onClose();
    };
    const handleCancel = () => {
        onClose();
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