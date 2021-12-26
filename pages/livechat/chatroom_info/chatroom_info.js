import { useContext, useEffect, useState } from "react"
import ContantDetail from "./contantDetail";
import Avatar from "@mui/material/Avatar";
import {EditPenButtonSVG} from "../../../public/livechat/MF_LiveChat_Landing/chat_svg"
import Profile from "../../../components/profile";
import EditProfileForm from "../../../components/pageComponents/EditProfileForm";
import { GlobalContext } from "../../../context/GlobalContext";


export default function ChatroomInfo ({data}){


    const {contactInstance } = useContext(GlobalContext)   
     const [tabActive,setTabAcive] = useState("info")
    const [useContact , setUseContact] = useState(data)
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)
    const handelEditContact = ()=>{

        if(data.name.length>0){
            console.log("haloha")
            setIsEditProfileShow(!isEditProfileShow)
            toggleEditProfile(data)
        }
    }
    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) ;
        if(isEditProfileShow) ;
        setIsEditProfileShow(!isEditProfileShow)
    }
    const fetchContacts = async (cid) =>{
        const data = await contactInstance.getContactById(cid)
        console.log("etchContacts chatroomINfo",data)
        setUseContact(data)
        // setFilteredData(data)
    }
    useEffect(async()=>{
        console.log("chatroomINfo",data)
        // await fetchContacts(data.customer_id)
    },[data])
    return (
    <div className={"chatroom_info"}>
        <div className={"editContact_chatroom"}>
        <div className={"editContact_chatroom"}>

        {isEditProfileShow?  ( <Profile handleClose={toggleEditProfile}><EditProfileForm data={useContact} toggle={toggleEditProfile}/></Profile>):null}
        </div>
            
        </div>
        <div className={"contact_card"}>
            <div className={"profile_pic"}><Avatar  alt={data.name} src={data.img_url} sx={{ width: 100, height: 100 }}/></div>
            <div className={"contact_detail"}>
                <div className={"contact_detail_name"}>{data.name}</div>
                <div className={"contact_detail_channel"}>{data.phone}</div>
                {/* <div className={"contact_detail_team"}> Team</div> */}
            </div>
            
            <div className={"config"} onClick={handelEditContact}> ... </div>
        </div>

        <div className={"tabs_field"}>
            <div className={"tabs_row"}>
           
                <div className={"tab " + (tabActive == "info"?"active":"") } onClick={()=>{setTabAcive("info")}}>Info</div>
                <div className={"tab "+ (tabActive == "note"?"active":"")} onClick={()=>{setTabAcive("note")}}>Note</div>
            </div>
            <div className={"contact_content"} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>

                <ContantDetail data={data} tab={tabActive} />
            </div>
        </div>
    </div>
    )
}