import ChatroomRow from "./ChatroomRow";
import {inject, observer} from "mobx-react";
import {Collapse , Zoom} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

function ChatroomList(props){

    const { show  , chatListStore:{selectChat , selectedChat ,showChatList , isLoading , renderMore},chatroomStore:{clear ,getMessage}} =props

    const selected = (id) =>{
        return id === selectedChat.room_id
    }
    const handleScroll = e =>{
        const {scrollTop ,scrollHeight ,clientHeight} = e.target
        if(scrollHeight-scrollTop ===clientHeight){
            renderMore()
        }
    }
    const handleSelectClick = async (e, data) =>{
        e.preventDefault() ;
        e.stopPropagation();
        clear()
        selectChat(data)
        await getMessage(data.room_id)
    }

    const renderChatroomList=()=>{
        return (showChatList.map((chat ,index)=>(
                <Collapse key={index} mountOnEnter={true} >
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
            {show&&<ul  className={"chatlist_ss_list"} style={{display:show?"":("none")}} onScroll={handleScroll}>
                <TransitionGroup>
                    {renderChatroomList()}
                </TransitionGroup>
            </ul>}
        </>
    )
}
export default inject("chatListStore" , "chatroomStore")(observer(ChatroomList))
