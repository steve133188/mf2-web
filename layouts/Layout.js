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
import {eventListenr, subscribeToChatroom, subscribeToChatroomUpdate} from "../src/graphql/subscriptions";




export default function Layout({children}) {
    const [userSelect , setUserSelect ] = useState("")
    const [isAuth , setIsAuth] = useState(false)
    const router = useRouter()
    const {user , logout , subInstance} = useContext(GlobalContext)
    const u = user.user
    // const [notificationList,setNotificationList]= useState([{type:"disconnect",channel:"Whatsapp",content:"Please connect again.",sender:"Disconnected"},{type:"disconnect",channel:"Whatsapp",content:"Please connect again.",sender:"Disconnected"}])
    const [notificationList,setNotificationList]= useState([])
    const [showNotificationList,setShowNotificationList]= useState([])
    const [notiSub , setNotiSub] = useState()
    const [unread , setUnread] = useState(0)

    const handleCount = () =>{
        setUnread(0)
    }

    const sub = async ()=>{
        if(notiSub) notiSub.unsubscribe()
        const s =await API.graphql(graphqlOperation(eventListenr )).subscribe({
            next: newData=>{
                console.log(newData)
                if(newData.value.data.eventListenr.action == "RECEIVED_MESSAGE"){
                    setUnread(unread=>unread+1)
                    setNotificationList(prev=>[newData.value.data.eventListenr ,...prev ])
                    console.log("received activity" ,notificationList)
                    setShowNotificationList(prev=>[newData.value.data.eventListenr , ...prev] )
                }
                // console.log(this.store)
            }
        })
        setNotiSub(s)
    }

    const layout = (
        <div className={"layout"}><SideBar navItems={navItems}  notices={notificationList} unread={unread} handleCount={handleCount} setNotificationList={setNotificationList}/>
            <div className={"layout-main"}>
                {children}
            </div>
            <div className={"notification-container"}  style={{padding:showNotificationList.length>0?"auto":"1px"}}  >
                {/* eslint-disable-next-line react/jsx-key */}
                {showNotificationList&&showNotificationList.map((li,i)=> <NotificationAlert  key={i} notification={li}  setNotificationList={setShowNotificationList}/>)}

            </div>
        </div>
    )

    const unAuth = (<div className={"unauth"}>{children}</div>)

    useEffect( async ()=>{
        if(user.token != null){
            setIsAuth(true)
            await sub()
        }else {
            setIsAuth(false)
        }
        console.log("is auth :" , isAuth)
    },[user])

    useEffect(()=>{

    } , [])

    return (
        isAuth ? layout : unAuth
    )
}
