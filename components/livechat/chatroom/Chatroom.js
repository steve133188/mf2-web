import ChatroomHead from "./ChatroomHead";
import MsgRow from "../ChatMessage/MsgRow";
import ChatroomFooter from "./ChatroomFooter";
import {useEffect, useRef, useState} from "react";
import { inject, observer } from 'mobx-react'
import {TransitionGroup} from "react-transition-group";
import {Collapse} from "@mui/material";

function Chatroom({lastMsgFromClient ,msg ,isRobotOn=false , handleRobot , refresh ,fetchingMsg , fetchingContact ,stickers,...props}){

    const {chatListStore:{selectedChat} , chatroomStore:{showMessage  ,renderMore}} = props

    const {sendMessage} = props

    const messagesEndRef = useRef()
    const chatroomRef = useRef()
    const [disabled, setDisabled] = useState(true);
    const [chatrommSroll, setChatroomScroll] = useState(true);
    const scrollToBottom = () => {messagesEndRef.current&&messagesEndRef.current.scrollIntoView()}



    useEffect( ()=>{
        // chatroomRef.current.scrollTop = chatroomRef.current.scrollHeight
        if(selectedChat){
            const {  channel} = selectedChat
            switch(channel) {

                case "WABA":
                    if(checkMsgDisabled())setDisabled(true)

                    break
                default:
                    setDisabled(false)
            }
        }
    },[selectedChat])
    useEffect(()=>{
        if(messagesEndRef.current){
            setTimeout(()=>{
                scrollToBottom()
            },1000)
        }

        }
        ,[selectedChat])

    const handleScroll = e =>{
        const {scrollTop } = e.target
        if(scrollTop==0){
            setChatroomScroll(chatroomRef.current.scrollHeight)
            renderMore()
            let position = chatroomRef.current.scrollHeight - chatrommSroll
            chatroomRef.current.scrollTop = position
        }
    }

    const checkMsgDisabled = () => {
        const end = new Date.now()
        const start = parseInt(lastMsgFromClient)
        if(start - end >86400) return false
        return true
    }

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
                <div className={"chatroom_records"} ref={chatroomRef} onScroll={handleScroll} >
                    <TransitionGroup>
                        {showMessage.map((r , i)=>{
                            return (
                                <Collapse key={i} mountOnEnter={true}>
                                    <MsgRow msg={r}   />
                                </Collapse>
                            )
                        })}
                    </TransitionGroup>
                    <div ref={messagesEndRef} />
                </div>
                <ChatroomFooter
                    selectedChat
                    disabled={disabled}
                    stickers={stickers}
                    sendMessage={sendMessage}
                />
            </> : <div className={"center_text"}> Select a conversation </div>}
        </div>
    )
}

export default inject("chatListStore" , "chatroomStore")(observer(Chatroom))
