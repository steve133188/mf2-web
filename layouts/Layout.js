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
import {eventListener} from "../src/graphql/subscriptions";
import { observer} from "mobx-react";
import {useRootStore} from "../utils/provider/RootStoreProvider";



function Layout({children}) {

    const {authStore:{onLoad,init,is_loading,isAuth},contactsStore , chatListStore , chatroomStore , orgActionsStore , adminActionsStore , messageActionsStore} = useRootStore()
    const [notificationList,setNotificationList]= useState([])
    const [showNotificationList,setShowNotificationList]= useState([])
    const [isLoading,setIsLoading]= useState(true)
    const [notiSub , setNotiSub] = useState()
    const [unread , setUnread] = useState(0)
    const [openNoteList , setOpenNoteList] = useState(false)
    const [isManyNotificationShow , setIsManyNotificationShow] = useState(false)

    const router = useRouter()

    useEffect(async ()=>{
        if (localStorage.getItem("token")==null){
            console.log("please log in ")
            router.replace('/login' )
        }
        if(isAuth&&router.pathname.includes("login")) router.replace("/livechat")
        if(is_loading){
            await init()
        }

    },[isAuth])


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
        const s =await API.graphql(graphqlOperation(eventListener ,{user_id:user.user_id})).subscribe({
            next:async newData=>{
                console.log(newData)
                if(newData.value.data.eventListener.action == "RECEIVED_MESSAGE"){
                    setUnread(unread=>unread+1)
                    if(openNoteList) setUnread(0)
                    const res = await contactInstance.getContactById(parseInt(newData.value.data.eventListener.customer_id))
                    const data = {...newData.value.data.eventListener , ...res}
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

    return (
        isAuth ? layout : unAuth
    )
}
export default observer(Layout)
