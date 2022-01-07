import Skeleton from "@mui/material/Skeleton";
import * as React from "react";

export default function NotificationList({notification , ...props}){
    const {state} = props;
    return(
        <div className={state}>
            <div className="loader">
                {/* <h1><Skeleton sx={{ bgcolor: 'rgb(208, 233, 255);' ,width:"100vw",height:"100vh"}}/></h1> */}
                <img src="/000loading.svg"/>
            </div>
        </div>
    )
}