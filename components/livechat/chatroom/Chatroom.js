import ChatroomHead from "./ChatroomHead";
import MsgRow from "../ChatMessage/MsgRow";
import ChatroomFooter from "./ChatroomFooter";
import {useEffect, useRef} from "react";


export default function Chatroom({selectedChat , lastMsgFromClient ,msg ,isRobotOn=false , handleRobot , refresh ,confirmForward , confirmReply}){
    const messagesEndRef = useRef()
    const scrollToBottom = () => {messagesEndRef.current&&messagesEndRef.current.scrollIntoView({behavior: "smooth", block: "end"})}
    useEffect(()=>{
        if(messagesEndRef.current){
            setTimeout(()=>{
                scrollToBottom()
            },500)
        }

        }
        ,[msg])


    return(
        <div className={"chatroom"} >
            {selectedChat.room_id?<>
        <ChatroomHead
            selectedChat={selectedChat}
            lastMsgFromClient={lastMsgFromClient}
            hasMsg
            isRobotOn={isRobotOn}
            handleRobot={handleRobot}
            refresh={refresh}
            />
            <div className={"chatroom_records"} >
                {msg.map((r , i)=>{
                    return (
                        <MsgRow msg={r} key={i} confirmForward={confirmForward} confirmReply={confirmReply} />
                    )
                })}
                <div ref={messagesEndRef}></div>
            </div>
            <ChatroomFooter
                selectedChat
            />
            </> : <div className={"center_text"}> Select a conversation </div>}
        </div>
        )

}
