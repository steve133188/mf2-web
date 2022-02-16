import ChatroomRow from "./ChatroomRow";
import {inject, observer} from "mobx-react";
import {Collapse , Zoom} from '@mui/material';
import { TransitionGroup } from 'react-transition-group';

function ChatroomList(props){

    const { show  , chatListStore:{selectChat , selectedChat ,showChatList , isLoading},chatroomStore:{clear ,getMessage}} =props

    const selected = (id) =>{
        return id === selectedChat.room_id
    }
    const handleScroll = e =>{
        const {scrollTop } = e.target
        if(scrollTop==0){
            setChatroomScroll(chatroomRef.current.scrollHeight)
            renderMore()
            let position = chatroomRef.current.scrollHeight - chatrommSroll
            chatroomRef.current.scrollTop = position


            // setTimeout(()=>{
            // },1500)

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
            {show&&<ul  className={"chatlist_ss_list"} style={{display:show?"":("none")}}>
                <TransitionGroup>
                    {renderChatroomList()}
                </TransitionGroup>
            </ul>}
        </>
    )
}
export default inject("chatListStore" , "chatroomStore")(observer(ChatroomList))
