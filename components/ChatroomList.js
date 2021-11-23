import {Avatar} from "./Icon";


export default function ChatroomList({chatroom , ...props}){


    return(
        <div className={"chatroom_li "} onClick={props.onClick}>
            <div className={"chatroom_icon"}>
                {chatroom.unreadCount!=0 &&<div className={"chatroom_badge"}>{chatroom.unreadCount}</div>}
                <Avatar src={chatroom.profile_pic_url} alt={chatroom.name} />
            </div>
            <div className={"chatroom_name_ss"}>
                <div>{chatroom.name}</div>
                <div className={"team"}>{chatroom.team}</div>
            </div>
            {/*<div className={"chatroom_time"}>{chatroom.last_msg_time}</div>*/}
            {/*<div className={"pin"}></div>*/}
        </div>
    )
}