import {useContext} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import ChatroomRow from "./ChatroomRow";
import OnLoad from "./OnLoad";

export default function ChatroomList(props){

    const {selectedChat , updateSelectedChatroom } = useContext(GlobalContext)

    const { show  , chats} =props


    const selected = (id) =>{
        return id === selectedChat.room_id
    }

    const handleSelectClick = (e, data) =>{
        e.preventDefault() ;
        e.stopPropagation();
        updateSelectedChatroom(data)
    }

    const renderChatroomList=()=>{

            return (chats.map((chat ,index)=>{
                return <ChatroomRow
                    key={index}
                    chat={chat}
                    selected={selected}
                    onClick={handleSelectClick}
                />

            })
)
    }

    return(<>
            {show&&<ul  className={"chatlist_ss_list"} style={{display:show?"":("none")}}>
                {renderChatroomList()}
            </ul>}
    </>

    )
}
