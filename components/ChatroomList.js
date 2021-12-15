import { NoStarSVG, StarSVG } from "../public/livechat/MF_LiveChat_Landing/chat_svg";
import {Avatar} from "./Icon";




export default function ChatroomList({chatroom , ...props}){



    return(
        <div className={"chatroom_li "} onClick={props.onClick}>
            <div className={"starred"} > {chatroom.is_pin?<StarSVG /> : <NoStarSVG/>}</div>
            <div className={"chatroom_icon"}>
                <Avatar src={chatroom.avatar||null} alt={chatroom.name} />
            </div>
            <div className={"chatroom_name_ss"}>
                <div>{chatroom.name}</div>
                <div className={"team"}>Team {chatroom.team}</div>
                {chatroom.unreadCount!=0 &&<div className={"chatroom_badge"}>{chatroom.unreadCount}</div>}
            </div>
            {/*<div className={"chatroom_time"}>{chatroom.last_msg_time}</div>*/}
            {/*<div className={"pin"}></div>*/}
        </div>
    )
}