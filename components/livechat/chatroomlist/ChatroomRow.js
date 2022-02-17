import {useState} from "react";
import {Avatar, Skeleton, Tooltip} from "@mui/material";

export default function ChatroomRow(props){

    const {
        chat,
        onClick,
        selected
    } = props


    // async function toggleChatPin (e){
    //     e.preventDefault()
    //     e.stopPropagation()
    //     let ispin_input={
    //         room_id:chatroom.room_id,
    //         user_id:chatroom.user_id,
    //         is_pin:!chatroom.is_pin
    //     }
    //     await togglePin(ispin_input)
    // }

    return(
        <div className={"chatroom_li "+(selected(chat.room_id)?"activeRoom":"")} onClick={(e)=>onClick(e,chat)}>
            {/*<div className={"starred"}  onClick={toggleChatPin} > {isLoading?(<Skeleton/>):(chatroom.is_pin?<StarSVG/> : <NoStarSVG/>)}</div>*/}
            <div className={"chatroom_icon"}>

                   <Tooltip key={chat.name} className={""} title={chat.name} placement="top-start">
                        <Avatar className={"text-center"}  src={ chat.avatar?? null} sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} alt="icon" />
                        {/* <Avatar className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} >{chatroom.name.substring(1,3).toUpperCase()}</Avatar> */}
                    </Tooltip>

            </div>
            <div className={"chatroom_name_ss"}>

                <div className={"name_row"} style={{display:"flex",height:"50%",justifyContent:"flex-start"}}>

                        <div className={"name_box"}>
                            {chat.name??`+${chat.country_code} ${chat.phone}`}
                        </div>

                    <img src={`/channel_SVG/${chat.channel}.svg`} alt="Channel icon" width={20} height={20}  />
                </div>
                {/*<div style={{display:"flex",height:"50%",opacity:0}}>    {`+${chat.country_code} ${chat.phone}`}  </div>*/}

                {/* <div className={""}>Team {chatroom.team}</div> */}
                {/*{chatroom.unreadCount!=0 &&<div className={"chatroom_badge"}>{chatroom.unreadCount}</div>}*/}
            </div>
            <div className={"chatroom_li_right"}>
                <div className={"date"}>{new Date(parseInt(chat.last_msg_time)).toLocaleDateString()}</div>
                <div className={'unread'}>
                    {!selected(chat.room_id) && <Avatar className={"mf_color_white text-center "}
                                                        sx={{
                                                            width: 18,
                                                            height: 18,
                                                            fontSize: 10,
                                                            color: "#D0E9FF",
                                                            backgroundColor: "#2198fa",
                                                            opacity: chat.unread == 0 ? 0 : chat.unread == null ? 0 : 1
                                                        }}>{chat.unread}</Avatar>}
                </div>

            </div>
            {/*<div className={"chatroom_time"}>{chatroom.last_msg_time}</div>*/}
            {/*<div className={"pin"}></div>*/}
        </div>
    )
}
