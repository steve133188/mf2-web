import { Tooltip } from "@mui/material";
import { NoStarSVG, StarSVG } from "../public/livechat/MF_LiveChat_Landing/chat_svg";

import Avatar from "@mui/material/Avatar";
import {width} from "@mui/system";




export default function ChatroomList({chatroom , ...props}){



    return(
        <div className={"chatroom_li "} onClick={props.onClick}>
            <div className={"starred"}   > {chatroom.is_pin?<StarSVG /> : <NoStarSVG/>}</div>
            <div className={"chatroom_icon"}>
            <Tooltip key={chatroom.name} className={""} title={chatroom.name} placement="top-start">
                      <Avatar className={"text-center"}  src={ null} sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} alt="icon" />
                    {/* <Avatar className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} >{chatroom.name.substring(1,3).toUpperCase()}</Avatar> */}
                </Tooltip>
            </div>
            <div className={"chatroom_name_ss"}>
                <div style={{display:"flex",gap:4}}>{chatroom.name??chatroom.phone} <img src={`/channel_SVG/${chatroom.channel}.svg`} alt="Channel icon" width={20} height={20}  /></div>
                {/* <div className={""}>Team {chatroom.team}</div> */}
                {/*{chatroom.unreadCount!=0 &&<div className={"chatroom_badge"}>{chatroom.unreadCount}</div>}*/}
            </div>
            {/*<div className={"chatroom_time"}>{chatroom.last_msg_time}</div>*/}
            {/*<div className={"pin"}></div>*/}
        </div>
    )
}