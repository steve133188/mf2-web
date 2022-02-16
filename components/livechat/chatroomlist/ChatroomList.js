import ChatroomRow from "./ChatroomRow";
import {inject, observer} from "mobx-react";
import {Collapse , Zoom} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

function ChatroomList(props){

    const { show  , chatListStore:{selectChat , selectedChat ,showChatList , isLoading},chatroomStore:{clear ,getMessage}} =props

    const selected = (id) =>{
        return id === selectedChat.room_id
    }

    const handleSelectClick = async (e, data) =>{
        e.preventDefault() ;
        e.stopPropagation();
        selectChat(data)
        clear()
        await getMessage(data.room_id)
    }

    const renderChatroomList=()=>{
        return (showChatList.map((chat ,index)=>(
                <Collapse key={index} in={!isLoading} style={{ transitionDelay: '3000ms'  }}>
                    <ChatroomRow
                        key={index}
                        chat={chat}
                        selected={selected}
                        onClick={handleSelectClick}
                    />
                </Collapse>)
            )
        )
    }

    return(<>
            {show&&<ul  className={"chatlist_ss_list"} style={{display:show?"":("none")}}>
                <TransitionGroup>
                    {renderChatroomList()}
                </TransitionGroup>
            </ul>}
        </>
    )
}
export default inject("chatListStore" , "chatroomStore")(observer(ChatroomList))
