import Skeleton from "@mui/material/Skeleton";
import * as React from "react";

export default function NotificationList({notification , ...props}){
    const {state} = props;
    return(
        <div className={state}>
            <div className="loader"/>
        </div>
    )
}