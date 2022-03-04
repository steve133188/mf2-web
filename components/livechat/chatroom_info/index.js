import { useContext, useEffect, useState } from "react"
import ContactDetail from "./contantDetail";
import Avatar from "@mui/material/Avatar";
import {EditPenButtonSVG} from "../../../public/livechat/MF_LiveChat_Landing/chat_svg"
import Profile from "../../profile";
import EditProfileForm from "../../pageComponents/EditProfileForm";
import { GlobalContext } from "../../../context/GlobalContext";
import {inject ,observer} from "mobx-react";
import {useRootStore} from "../../../utils/provider/RootStoreProvider";


function ChatroomInfo (props){

    const {handleEdit ,tags , users} = props
    const { chatListStore:{selectedChat} , contactsStore} = useRootStore()
     const [tabActive,setTabActive] = useState("info")
    const [useContact , setUseContact] = useState()
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)

    const toggleEditProfile = (key) =>{
        if(!isEditProfileShow) ;
        if(isEditProfileShow) ;
        setIsEditProfileShow(!isEditProfileShow)
    }
    const fetchContact = async (cid) =>{
        await contactsStore.getById(cid)
        setUseContact(contactsStore.targetContact)
    }

    useEffect(async()=>{
        if(selectedChat.customer_id){
            await fetchContact(selectedChat.customer_id)
        }
    },[selectedChat])

    return (
    <div className={"chatroom_info"}>
        {/*{data.room_id? */}
            <div style={{display:(selectedChat.room_id?"block":"none")}}>
            <div className={"editContact_chatroom"}>
                <div className={"editContact_chatroom"}>

                    {isEditProfileShow?  (<Profile handleClose={toggleEditProfile}><EditProfileForm data={useContact} toggle={toggleEditProfile}/></Profile>):null}
                </div>

            </div>
            <div className={"contact_card"}>
                <div className={"profile_pic"}><Avatar  alt={selectedChat.name} src={selectedChat.avatar} sx={{ width: 80, height: 80 }}/></div>
                <div className={"contact_detail"}>
                    <div className={"contact_detail_name"}>{selectedChat.name}</div>
                    <div className={"contact_detail_channel"}>
                        {selectedChat.channel?(<img src={`/channel_SVG/${selectedChat.channel}.svg`} style={{width:"20px",margin:"0 "}}></img>):""}
                        {selectedChat.phone?<div> {selectedChat.phone}</div>:""}
                    </div>
                    {/* <div className={"contact_detail_team"}> Team</div> */}
                </div>
                <div ><p className={"config"} onClick={handleEdit} style={{font:"normal normal bold 16px/22px Manrope" , marginLeft:"5px",width:"21px",alignSelf:"start",padding:0 }} > . . .</p> </div>
                {/* <div className={"config"} onClick={handelEditContact} style={{font:"normal normal bold 16px/22px Manrope"}}> . . . </div> */}
            </div>

            <div className={"tabs_field"}>
                <div className={"tabs_row"}>

                    <div className={"tab " + (tabActive == "info"?"active":"") } onClick={()=>{setTabActive("info")}}>Info</div>
                    <div className={"tab "+ (tabActive == "note"?"active":"")} onClick={()=>{setTabActive("note")}}>Note</div>
                </div>
                <div className={"contact_content"} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>

                    {useContact&&<ContactDetail  selectedChat={selectedChat} tab={tabActive} tags={tags}
                                    users={users}/>}
                </div>
            </div>
        </div>
            {/*// :null }*/}

    </div>
    )
}


export default observer(ChatroomInfo)
