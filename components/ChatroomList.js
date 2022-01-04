import { Tooltip } from "@mui/material";
import { NoStarSVG, StarSVG } from "../public/livechat/MF_LiveChat_Landing/chat_svg";
import Avatar from "@mui/material/Avatar";
import {flexbox, width} from "@mui/system";
import { useState } from "react";
import {Skeleton} from "@mui/material";



    export default function ChatroomList({chatroom,togglePin, refresh,chose, ...props}){
        const [isLoading, SetIsLoading] = useState(false);
        let ispin_input={
            room_id:chatroom.room_id,
            user_id:chatroom.user_id,
            is_pin:chatroom.is_pin
        }
        async function toggleChatPin (e){
            // SetIsLoading(true);
            e.preventDefault()
            e.stopPropagation()
            let ispin_input={
                room_id:chatroom.room_id,
                user_id:chatroom.user_id,
                is_pin:!chatroom.is_pin
            }
            await togglePin(ispin_input)

            // setTimeout(() => {
            //     refresh();
            //     SetIsLoading(false);
            // }, 300);
        }
        console.log(chose,"chose chatroom")

        return(
            <div className={"chatroom_li "+(chose.room_id==chatroom.room_id?"activeRoom":"")} onClick={props.onClick}>
                <div className={"starred"}  onClick={toggleChatPin} > {isLoading?(<Skeleton/>):(chatroom.is_pin?<StarSVG/> : <NoStarSVG/>)}</div>
                <div className={"chatroom_icon"}>
                {isLoading?(<Skeleton variant="circle" width={40} height={40} />):
                    (<Tooltip key={chatroom.name} className={""} title={chatroom.name} placement="top-start">
                            <Avatar className={"text-center"}  src={ chatroom.Avatar?? null} sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} alt="icon" />
                        {/* <Avatar className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} >{chatroom.name.substring(1,3).toUpperCase()}</Avatar> */}
                </Tooltip>)
                }


                </div>
                <div className={"chatroom_name_ss"}>
                    <div className={"name_row"} style={{display:"flex",height:"50%",justifyContent:"flex-start"}}> 
                        {isLoading?( <h1 style={{width:"100%"}}> <Skeleton/> </h1> ):(
                        <div style={{display:"flex",whiteSpace:"nowrap",maxHeight:"100%",justifyContent:"flex-start",gap:4,width:"fit-content"}}> 
                            {chatroom.name??`+${chatroom.phone.slice(0,3)} ${chatroom.phone.slice(3)}`} 
                        </div>)}
                        <img src={`/channel_SVG/${chatroom.channel}.svg`} alt="Channel icon" width={20} height={20}  />
                    </div>
                    <div style={{display:"flex",height:"50%",opacity:0}}>    {`+${chatroom.phone.slice(0,3)} ${chatroom.phone.slice(3)}`}  </div>
                   
                    
                    
                    
                    {/* <div className={""}>Team {chatroom.team}</div> */}
                    {/*{chatroom.unreadCount!=0 &&<div className={"chatroom_badge"}>{chatroom.unreadCount}</div>}*/}
                </div>
                <div style={{width:"50%",display:"flex",justifyContent:"flex-end",alignItems:"flex-end"}}>
                     <Avatar  className={"mf_bg_primary mf_color_white text-cente"} sx={{width:23 , height:23 ,fontSize:13,marginRight:"2px",display:chatroom.unread==0?"none":"block"}} >{chatroom.unread.toString()}</Avatar>
                    </div> 
                {/*<div className={"chatroom_time"}>{chatroom.last_msg_time}</div>*/}
                {/*<div className={"pin"}></div>*/}
            </div>
        )
    }
