import { Tooltip } from "@mui/material";
import { NoStarSVG, StarSVG } from "../public/livechat/MF_LiveChat_Landing/chat_svg";
import Avatar from "@mui/material/Avatar";
import {width} from "@mui/system";
import { useState } from "react";
import {Skeleton} from "@mui/material";



    export default function ChatroomList({chatroom,togglePin, refresh, ...props}){
        const [isLoading, SetIsLoading] = useState(false);
        let ispin_input={
            room_id:chatroom.room_id,
            user_id:chatroom.user_id,
            is_pin:chatroom.is_pin
        }
        async function toggleChatPin (e){
            SetIsLoading(true);
            //e.preventDefault()
            e.stopPropagation()
            let ispin_input={
                room_id:chatroom.room_id,
                user_id:chatroom.user_id,
                is_pin:!chatroom.is_pin
            }
            await togglePin(ispin_input)
            console.log(ispin_input)
            setTimeout(async() => {
                await refresh();
                SetIsLoading(false);
            }, 300);
        }

        return(
            <div className={"chatroom_li "} onClick={props.onClick}>
                <div className={"starred"}  onClick={toggleChatPin} > {isLoading?(<Skeleton/>):(chatroom.is_pin?<StarSVG/> : <NoStarSVG/>)}</div>
                <div className={"chatroom_icon"}>
                {isLoading?(<Skeleton variant="circle" width={40} height={40} />):
                (<Tooltip key={chatroom.name} className={""} title={chatroom.name} placement="top-start">
                <Avatar className={"text-center"}  src={ null} sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} alt="icon" />
              {/* <Avatar className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} >{chatroom.name.substring(1,3).toUpperCase()}</Avatar> */}
          </Tooltip>)
                }
                
                 
                </div>
                <div className={"chatroom_name_ss"}>
                    {isLoading?( <h1 style={{width:"100%"}}> <Skeleton/> </h1> ):(
                    <div style={{display:"flex",gap:4}}> 
                        {chatroom.name??`+${chatroom.phone.slice(0,3)} ${chatroom.phone.slice(3)}`} 
                        <img src={`/channel_SVG/${chatroom.channel}.svg`} alt="Channel icon" width={20} height={20}  />
                    </div>)}
                    
                    
                    
                    {/* <div className={""}>Team {chatroom.team}</div> */}
                    {/*{chatroom.unreadCount!=0 &&<div className={"chatroom_badge"}>{chatroom.unreadCount}</div>}*/}
                </div>
                {/*<div className={"chatroom_time"}>{chatroom.last_msg_time}</div>*/}
                {/*<div className={"pin"}></div>*/}
            </div>
        )
    }