import {Avatar} from "@mui/material";
import SideBar from "../layouts/SideBar";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../context/GlobalContext";
import {API, graphqlOperation} from "aws-amplify";
import {listChatrooms} from "../src/graphql/queries";
import {useRouter} from "next/router";

export default function NotificationList({notification , ...props}){
    const router = useRouter()
    const {contactInstance , setSelectedChat } = useContext(GlobalContext)
    const [customer , setCustomer ] = useState({})
//when click the notification, set unreadCount to 0
    useEffect(async ()=>{

       const res = await contactInstance.getContactById(parseInt(notification.customer_id))
        setCustomer(res)

    },[])
    const handleSelectChat = async ()=>{
        const chat = await API.graphql(graphqlOperation(listChatrooms , {filter:{customer_id:{eq:notification.customer_id}} , limit:1000}))
            .then(res=>{
                console.log("res:",res)
                return res.data.listChatrooms.items[0]
            }).catch(err=>{
                alert(err)
            })
        setSelectedChat(prev=>chat)
        if(router.pathname!=='/livechat')router.push("/livechat")
    }
    return(

        <div className="notify_box_li" onClick={handleSelectChat}>
            <div className={"notify_icon"}>
                 <Avatar src={""} alt={"notification.notify_from"} style={{marginLeft:"1rem"}} />
                {/*{notification.type=="disconnect"?<img style={{borderRadius:0}} src={`/channel_SVG/${notification.type}.svg`} />:<img src={`/channel_SVG/${notification.type}.svg`}/>}*/}
            </div>

            <div className="notification_content">
                <div className="notification_title">
                <img src={`/channel_SVG/${"WABA"}.svg`}/> <b className="notification_from">{customer.customer_name}</b>
                    {/* {notification.type} */}
                </div>
                <div className="notification_detail"> { ` ${customer.customer_name} send you a new message `} </div>
                {/* <div className="notification_time"> {notification.receive_time} </div> */}
            </div>
            {/* <div className="notification_content">
                <div className="notification_title">
                    <b className="notification_from">{notification.notify_from}</b> {notification.notify_reason}
                </div>
                <div className="notification_detail"> {notification.notify_content} </div>
                <div className="notification_time"> {notification.receive_time} </div>
            </div> */}
            {/*{notification.unreadCount!=0 &&<div className={"notify_box_unread_dot"}></div>}*/}

        </div>


    )
}
