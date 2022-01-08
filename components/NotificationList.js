import {Avatar} from "./Icon";
import SideBar from "../layouts/SideBar";

export default function NotificationList({notification , ...props}){

//when click the notification, set unreadCount to 0

    return(

        <div className="notify_box_li" onClick={props.onClick}>
            <div className={"notify_icon"}>
                {/* <Avatar src={"notification.profile_pic_url"} alt={"notification.notify_from"} /> */}
                {notification.type=="disconnect"?<img style={{borderRadius:0}} src={`/channel_SVG/${notification.type}.svg`} />:<img src={`/channel_SVG/${notification.type}.svg`}/>}
                
            </div>

            <div className="notification_content">
                <div className="notification_title">
                <img src={`/channel_SVG/${notification.channel}.svg`}/> <b className="notification_from">{notification.sender}</b> 
                    {/* {notification.type} */}
                </div>
                <div className="notification_detail"> {notification.content} </div>
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