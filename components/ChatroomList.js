import { Tooltip } from "@mui/material";
import { NoStarSVG, StarSVG } from "../public/livechat/MF_LiveChat_Landing/chat_svg";
import { useState } from "react";
import {Skeleton ,Avatar , Badge} from "@mui/material";




    export default function ChatroomList({chatroom,togglePin,selectedChat,chose, ...props}){
        const [isLoading, SetIsLoading] = useState(false);

        async function toggleChatPin (e){
            // SetIsLoading(true);
            e.preventDefault()
            e.stopPropagation()
            let ispin_input={
                room_id:chatroom.room_id,
                user_id:chatroom.user_id,
                is_pin:!chatroom.is_pin
            }
            console.log(chatroom.name)
            await togglePin(ispin_input)
        }

        return(
            <div className={"chatroom_li "+(chose&&chose.room_id==chatroom.room_id&&chose.user_id == chatroom.user_id?"activeRoom":"")} onClick={props.onClick}>
                <div className={"starred"}  onClick={toggleChatPin} > {isLoading?(<Skeleton/>):(chatroom.is_pin?<StarSVG/> : <NoStarSVG/>)}</div>
                <div className={"chatroom_icon"}>
                {isLoading?(<Skeleton variant="circle" width={40} height={40} />):
                    (<Tooltip key={chatroom.name} className={""} title={chatroom.name} placement="top-start">
                            <Avatar className={"text-center"}  src={ chatroom.avatar?? null} sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} alt="icon" />
                        {/* <Avatar className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} >{chatroom.name.substring(1,3).toUpperCase()}</Avatar> */}
                </Tooltip>)
                }


                </div>
                <div className={"chatroom_name_ss"}>

                    {/*<div style={{display:"flex",height:"50%"}}>*/}
                    {/*{isLoading?( <h1 style={{width:"100%"}}> <Skeleton/> </h1> ):(*/}
                    {/*    <div style={{display:"flex",whiteSpace:"nowrap",maxHeight:"100%",justifyContent:"flex-start",gap:4,width:"fit-content"}}>*/}
                    {/*    {chatroom.name??`+${chatroom.phone.slice(0,3)} ${chatroom.phone.slice(3)}`}*/}
                    {/*</div>)}*/}
                    {/* <img key={"id"} width="32px" height="32px" src={`/channel_SVG/${chatroom.channel}.svg`}  hidden={false}  alt=""/> */}

                    <div className={"name_row"} style={{display:"flex",height:"50%",justifyContent:"flex-start"}}>
                        {isLoading?( <h1 style={{width:"100%"}}> <Skeleton/> </h1> ):(
                        <div style={{display:"flex",whiteSpace:"nowrap",maxHeight:"100%",justifyContent:"flex-start",gap:4,width:"fit-content"}}>
                            {chatroom.name??`+${chatroom.country_code} ${chatroom.phone}`}
                        </div>)}

                        <img src={`/channel_SVG/${chatroom.channel}.svg`} alt="Channel icon" width={20} height={20}  />
                    </div>
                    <div style={{display:"flex",height:"50%",opacity:0}}>    {`+${chatroom.country_code} ${chatroom.phone}`}  </div>




                    {/* <div className={""}>Team {chatroom.team}</div> */}
                    {/*{chatroom.unreadCount!=0 &&<div className={"chatroom_badge"}>{chatroom.unreadCount}</div>}*/}
                </div>
                <div style={{width:"50%",display:"flex",justifyContent:"flex-end",alignItems:"flex-end"}}>
                    {selectedChat.name != chatroom.name && <Avatar className={" mf_color_white text-cente"}
                                                                   sx={{
                                                                       width: 23,
                                                                       height: 23,
                                                                       fontSize: 13,
                                                                       color: "#D0E9FF",
                                                                       backgroundColor: "#2198fa",
                                                                       marginRight: "20px",
                                                                       opacity: chatroom.unread == 0 ? 0 : chatroom.unread == null ? 0 : 1
                                                                   }}>{chatroom.unread}</Avatar>}
                    </div>
                {/*<div className={"chatroom_time"}>{chatroom.last_msg_time}</div>*/}
                {/*<div className={"pin"}></div>*/}
            </div>
        )
    }
