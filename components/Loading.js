import Skeleton from "@mui/material/Skeleton";
import * as React from "react";

export default function NotificationList({notification , ...props}){
    const {state} = props;
    return(
        <div className={state}>
            <div className="loader">
                <h1><Skeleton sx={{ bgcolor: '#0ABAB5' }}/></h1>
            </div>
        </div>
    )
}