import {navItems} from "./nav-item";
import {useRouter} from "next/router";
import {useEffect, useContext, useState,useLayoutEffect} from "react";
import {GlobalContext} from "../context/GlobalContext"
import SideBar from "./SideBar";
import {MultipleSelectPlaceholder, SingleSelect, SingleSelect2} from "../components/Select";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import NotificationAlert from "../components/custom/noti";




export default function Layout({children}) {
    const [userSelect , setUserSelect] = useState("")
    const [isAuth , setIsAuth] = useState(false)
    const router = useRouter()
    const {user , logout} = useContext(GlobalContext)
    const u = user.user
    const [notificationList,setNotificationList]= useState([{type:"disconnect",channel:"Whatsapp",content:"Please connect again.",sender:"Disconnected"},{type:"disconnect",channel:"Whatsapp",content:"Please connect again.",sender:"Disconnected"}])



    //auto remove notification

    const layout = (
        <div className={"layout"}><SideBar navItems={navItems} />
            <div className={"layout-main"}>
                {children}
            </div>
            <div className={"notification-container"}>
                {/* eslint-disable-next-line react/jsx-key */}
                {notificationList.map(li=> <NotificationAlert  notification={li}  setNotificationList={setNotificationList}/>)}

            </div>
        </div>
    )


    const unAuth = (<div className={"unauth"}>{children}</div>)

    useEffect(()=>{
        if(user.token != null){
            setIsAuth(true)
        }else {
            setIsAuth(false)
        }
        console.log("is auth :" , isAuth)
    },[user])

    return (
        isAuth ? layout : unAuth
    )
}
