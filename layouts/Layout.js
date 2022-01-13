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

    const [isAuth , setIsAuth] = useState(false)
    const router = useRouter()
    const {user , logout , subInstance , contactInstance} = useContext(GlobalContext)
    const u = user.user
    // const [notificationList,setNotificationList]= useState([{type:"disconnect",channel:"Whatsapp",content:"Please connect again.",sender:"Disconnected"},{type:"disconnect",channel:"Whatsapp",content:"Please connect again.",sender:"Disconnected"}])
    const [notificationList,setNotificationList]= useState([])
    const [showNotificationList,setShowNotificationList]= useState([])
    const [notiSub , setNotiSub] = useState()
    const [unread , setUnread] = useState(0)
    const [openNoteList , setOpenNoteList] = useState(false)
    const [isManyNotificationShow , setIsManyNotificationShow] = useState(false)
    const handleCount = () =>{
        setUnread(0)
    }

    const handleOpen = e =>{
        e.preventDefault()
        setShowNotificationList([])
        setOpenNoteList(true)
        setUnread(0)
    }

    const sub = async ()=>{
        if(notiSub) notiSub.unsubscribe()
        const s =await API.graphql(graphqlOperation(eventListenr ,{action:"RECEIVED_MESSAGE"})).subscribe({
            next:async newData=>{
                console.log(newData)
                if(newData.value.data.eventListenr.action == "RECEIVED_MESSAGE"){
                    setUnread(unread=>unread+1)
                    if(openNoteList) setUnread(0)
                    const res = await contactInstance.getContactById(parseInt(newData.value.data.eventListenr.customer_id))
                    const data = {...newData.value.data.eventListenr , ...res}
                    console.log("data:",data)
                    setNotificationList(prev=>[data ,...prev ])
                    setShowNotificationList(prev=>[data, ...prev] )
                    console.log("received activity" ,notificationList)
                }
                // console.log(this.store)
            }
        })
        setNotiSub(s)
    }
    const toggleNoteList = e =>{
        e.preventDefault()
        setIsManyNotificationShow(false)
        setOpenNoteList(!openNoteList)
        if(openNoteList)setUnread(0)
    }
    const layout = (
        <div className={"layout"}><SideBar navItems={navItems}  notices={notificationList} openNoteList={openNoteList} toggleNoteList={toggleNoteList} unread={unread} handleCount={handleCount} setNotificationList={setNotificationList}/>
            <div className={"layout-main"}>
                {children}
            </div>
            <div className={"notification-container"}  style={{padding:showNotificationList.length>0?"auto":"1px"}}  >
                {/* eslint-disable-next-line react/jsx-key */}
                {unread<3&&!isManyNotificationShow&&showNotificationList.length>0?showNotificationList.map((li,i)=> <NotificationAlert  key={i} notification={li} toggleNoteList={toggleNoteList} setNotificationList={setShowNotificationList}/>):
                    isManyNotificationShow&&
                    <div className="msg_noti_popup" style={{display:"flex" }} onClick={handleOpen}>
                    <div className="popleft">
                        <div className="pop_matter">
                        </div>
                        <div className="pop_content">
                                {/*<div className="pop_half">*/}
                                {/*    <Avatar className={"text-center"}  src={ null} sx={{width:20 , height:20 ,fontSize:12,marginRight:"5px"}} alt="icon" />*/}
                                {/*</div>*/}
                            <div className="pop_half"> {` You have received ${unread} new message`}</div>
                        </div>
                    </div>
                </div>}

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


    return (
        isAuth ? layout : unAuth
    )
}
