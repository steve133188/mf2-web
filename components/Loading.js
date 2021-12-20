import {Avatar} from "./Icon";
import SideBar from "../layouts/SideBar";
import Skeleton from "@mui/material/Skeleton";
import * as React from "react";

export default function NotificationList({notification , ...props}){
//when click the notification, set unreadCount to 0
    //const {isFinish} = props;
    return(
        <div className={"preloader"}>
            <div className="loader">
                <Skeleton variant="circular"/>
                <h1>
                <Skeleton/>

                </h1>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>
                <Skeleton/>

            </div>
        </div>
    )
}