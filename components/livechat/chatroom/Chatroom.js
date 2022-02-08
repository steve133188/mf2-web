import ChatroomHead from "./ChatroomHead";
import MsgRow from "../ChatMessage/MsgRow";
import ChatroomFooter from "./ChatroomFooter";


export default function Chatroom({selectedChat , lastMsgFromClient ,msg ,isRobotOn=false , handleRobot , refresh ,confirmForward , confirmReply}){



    return(
        <div className={"chatroom"}>
            {selectedChat.room_id?<>
        <ChatroomHead
            selectedChat={selectedChat}
            lastMsgFromClient={lastMsgFromClient}
            hasMsg
            isRobotOn={isRobotOn}
            handleRobot={handleRobot}
            refresh={refresh}
            />
            <div className={"chatroom_records"}>
                {msg.map((r , i)=>{
                    return (
                        <MsgRow msg={r} key={i} confirmForward={confirmForward} confirmReply={confirmReply} />
                    )
                })}
            </div>
            <ChatroomFooter
                selectedChat
            />
            </> : <div className={"center_text"}> Select a conversation </div>}
        </div>
        )

}
