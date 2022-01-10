import Avatar from "@mui/material/Avatar";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";

export default function NotificationAlert({notification ,notificationList ,setNotificationList }){
    const {contactInstance} = useContext(GlobalContext)
    const autoDeleteTime=5000
    const [contact , setContact] =useState({})
    useEffect(() => {
        const interval = setInterval(() => {
                setNotificationList(prevState => prevState.filter(li =>li !=notification))
        }, autoDeleteTime);
        return () => {
            clearInterval(interval);
        }
    }, []);
    useEffect(async ()=>{
        const cus = await contactInstance.getContactById(parseInt(notification.customer_id))
        setContact(cus)
    },[])
    return(
        <div className="msg_noti_popup" style={{display:"flex" }}>
            <div className="popleft">
                <div className="pop_matter">

                    {notification.type=="disconnect"?<img src={`/channel_SVG/disconnect.svg`} style={{borderRadius:0}} />:""}
                    {/*{notification.type=="MESSAGE"?<img src={`/channel_SVG/${notification.channel}.svg`}  style={{width:"40px",height:"40px"}} />:""}*/}
                    {notification.type=="MESSAGE"?<img src={`/channel_SVG/Whatsapp.svg`}  style={{width:"40px",height:"40px"}} />:""}
                </div>
                <div className="pop_content">
                    {notification.type=="disconnect"?
                        <div className="pop_half">
                            <img src={`/channel_SVG/${notification.channel}.svg`} style={{width:20 , height:20 ,fontSize:12,margin:"0 5px 0 0"}}/>Disconnected
                        </div>

                        :""}
                    {notification.type=="MESSAGE"?
                        <div className="pop_half">
                            <Avatar className={"text-center"}  src={ null} sx={{width:20 , height:20 ,fontSize:12,marginRight:"5px"}} alt="icon" />
                            {`${ contact.customer_name }`}
                        </div>
                        :""}
                    <div className="pop_half"> {notification.content??"New message coming"}</div>
                </div>
            </div>

        </div>
    )
}
