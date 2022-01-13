import Avatar from "@mui/material/Avatar";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import {API, graphqlOperation} from "aws-amplify";
import {getChatroom, listChatrooms} from "../../src/graphql/queries";
import {useRouter} from "next/router";

export default function NotificationAlert({notification ,notificationList ,setNotificationList }){
    const {contactInstance , setSelectedChat} = useContext(GlobalContext)
    const router = useRouter()
    const autoDeleteTime=5000
    const [contact , setContact] =useState({})
    useEffect(() => {
        const interval = setInterval(() => {
                // setNotificationList(prevState => prevState.filter(li =>li !=notification))
                setNotificationList(prevState => prevState.filter(li =>li.timestamp !=notification.timestamp))
                // if(notificationList.length==1) setNotificationList([])
        }, autoDeleteTime);
        return () => {
            clearInterval(interval);
        }
    }, [notificationList]);
    useEffect(async ()=>{
        const cus = await contactInstance.getContactById(parseInt(notification.customer_id))
        setContact(cus)
    },[])

    const handleSelectChat = async ()=>{
        console.log("notification data:", notification)
        const chat = await API.graphql(graphqlOperation(getChatroom , {room_id:notification.customer_id.toString() , channel:notification.payload}))
            .then(res=>{
                console.log("res:",res)
                return res.data.getChatroom

            }).catch(err=>{
                alert(err)
            })
        setSelectedChat(prev=>chat)
        setNotificationList(prevState => prevState.filter(li =>li.timestamp !=notification.timestamp))
        if(router.pathname!="/livechat")router.push("/livechat")
    }
    return(

        <div className="msg_noti_popup" style={{display:"flex" }} onClick={handleSelectChat}>
            <div className="popleft">
                <div className="pop_matter">

                    {notification.type=="disconnect"?<img src={`/channel_SVG/disconnect.svg`} style={{borderRadius:0}} />:""}
                    {/*{notification.type=="MESSAGE"?<img src={`/channel_SVG/${notification.channel}.svg`}  style={{width:"40px",height:"40px"}} />:""}*/}
                    {notification.type=="MESSAGE"?<img src={`/channel_SVG/WABA.svg`}  style={{width:"40px",height:"40px"}} />:""}
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
                            {`${ contact&&contact.customer_name }`}
                        </div>
                        :""}
                    <div className="pop_half"> {notification.content?? ` ${contact.customer_name} send you a new message `}</div>
                </div>
            </div>

        </div>
    )
}
