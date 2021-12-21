import {Avatar} from "./Icon";
import SideBar from "../layouts/SideBar";
import Skeleton from "@mui/material/Skeleton";
import * as React from "react";

export default function NotificationList({notification , ...props}){
    const {state} = props;
//when click the notification, set unreadCount to 0
    //const {isFinish} = props;
    return(
        <div className={state}>
            <div className="loader">
                <h1><Skeleton sx={{ bgcolor: '#0ABAB5' }}/></h1>
            </div>
        </div>
    )
}