import * as React from "react";

export default function NotificationList({notification , ...props}){

    return(
        <div className={"confirmationBox"}>
            <div className="content">
                <h2>
                Are you sure you wish to delete this item?

                </h2>
            </div>
            <div className="btnGroup">
                <button>Confirm</button>
                <button className={"mf_bg_light_grey mf_color_text"}>Cancel</button>
            </div>
        </div>
    )
}