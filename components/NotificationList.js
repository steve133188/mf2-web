import {Avatar} from "./Icon";
import SideBar from "../layouts/SideBar";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../context/GlobalContext";

export default function NotificationList({notification , ...props}){
    const {contactInstance} = useContext(GlobalContext)
    const [customer , setCustomer ] = useState({})
//when click the notification, set unreadCount to 0
    useEffect(async ()=>{

       const res = await contactInstance.getContactById(85200000000+notification.room_id)
        setCustomer(res)

    },[])

    return(

        <div className="notify_box_li" onClick={props.onClick}>
            <div className={"notify_icon"}>
                 <Avatar src={notification.avatar} alt={"notification.notify_from"} />
                {/*{notification.type=="disconnect"?<img style={{borderRadius:0}} src={`/channel_SVG/${notification.type}.svg`} />:<img src={`/channel_SVG/${notification.type}.svg`}/>}*/}

            </div>

            <div className="notification_content">
                <div className="notification_title">
                <img src={`/channel_SVG/${notification.channel}.svg`}/> <b className="notification_from">{notification.sender}</b>
                    {/* {notification.type} */}
                </div>
                <div className="notification_detail"> { `received message by ${customer.customer_name}`} </div>
                {/* <div className="notification_time"> {notification.receive_time} </div> */}
            </div>
            {/* <div className="notification_content">
                <div className="notification_title">
                    <b className="notification_from">{notification.notify_from}</b> {notification.notify_reason}
                </div>
                <div className="notification_detail"> {notification.notify_content} </div>
                <div className="notification_time"> {notification.receive_time} </div>
            </div> */}
            {notification.unreadCount!=0 &&<div className={"notify_box_unread_dot"}></div>}

        </div>


    )
}
