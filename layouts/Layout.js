import {navItems} from "./nav-item";
import {useRouter} from "next/router";
import {useEffect, useContext, useState,useLayoutEffect} from "react";
import {GlobalContext} from "../context/GlobalContext"
import SideBar from "./SideBar";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import NotificationAlert from "../components/custom/noti";
import {API, graphqlOperation} from "aws-amplify";
import {subscribeToChatroom, subscribeToChatroomUpdate} from "../src/graphql/subscriptions";




export default function Layout({children}) {
    const [userSelect , setUserSelect] = useState("")
    const [isAuth , setIsAuth] = useState(false)
    const router = useRouter()
    const {user , logout} = useContext(GlobalContext)
    const u = user.user
    // const [notificationList,setNotificationList]= useState([{type:"disconnect",channel:"Whatsapp",content:"Please connect again.",sender:"Disconnected"},{type:"disconnect",channel:"Whatsapp",content:"Please connect again.",sender:"Disconnected"}])
    const [notificationList,setNotificationList]= useState([])
    const [notiSub , setNotiSub] = useState()

    const sub = async ()=>{
        if(notiSub) notiSub.unsubscribe()
        console.log("subscribe notification start")
        const s = await API.graphql(graphqlOperation(subscribeToChatroom) ,{from_me:false})
            .subscribe({
                next: async (chat) => {
                    console.log("update chat " ,chat)
                    const no ={
                        type:"newMsg",
                        channel:chat.channel || "Whatsapp",
                        content:chat.body,
                        sender:chat.name
                    }
                    setNotificationList(prev=>[...prev,no])
                }
            })
        setNotiSub(prev=>s)
    }
    //auto remove notification

    const layout = (
        <div className={"layout"}><SideBar navItems={navItems} />
            <div className={"layout-main"}>
                {children}
            </div>
            <div className={"notification-container"}>
                {/* eslint-disable-next-line react/jsx-key */}
                {notificationList.map((li,i)=> <NotificationAlert  key={i} notification={li}  setNotificationList={setNotificationList}/>)}

            </div>
        </div>
    )


    const unAuth = (<div className={"unauth"}>{children}</div>)

    useEffect(async ()=>{
        if(user.token != null){
            setIsAuth(true)
            await sub()
        }else {
            setIsAuth(false)
            sub
        }
        console.log("is auth :" , isAuth)
    },[user])

    return (
        isAuth ? layout : unAuth
    )
}
