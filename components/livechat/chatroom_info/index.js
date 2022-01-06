import { useContext, useEffect, useState } from "react"
import ContantDetail from "./contantDetail";
import Avatar from "@mui/material/Avatar";
import {EditPenButtonSVG} from "../../../public/livechat/MF_LiveChat_Landing/chat_svg"
import Profile from "../../profile";
import EditProfileForm from "../../pageComponents/EditProfileForm";
import { GlobalContext } from "../../../context/GlobalContext";


export default function ChatroomInfo ({data}){

    const [start,setStart]= useState(false)
    const {contactInstance } = useContext(GlobalContext)
     const [tabActive,setTabAcive] = useState("info")
    const [useContact , setUseContact] = useState(data)
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)
    const handelEditContact = ()=>{

        if(data.name.length>0){
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
        // console.log("etchContacts chatroomINfo",data)
        setUseContact(data)
        return data
        // setFilteredData(data)
    }
    // useEffect(()=>{
    //     console.log("chat info info info ",typeof(data.phone))
    // },[data])
    useEffect(async()=>{
        if(!start){return setStart(true)}
        // console.log("ChatroomInf",data)

        const res = await fetchContacts(data.customer_id)
        // console.log("chatroomINfo",res)
        return
    },[data])

    return (
    <div className={"chatroom_info"}>
        {data.room_id&& <>
            <div className={"editContact_chatroom"}>
                <div className={"editContact_chatroom"}>

                    {isEditProfileShow?  (<Profile handleClose={toggleEditProfile}><EditProfileForm data={useContact} toggle={toggleEditProfile}/></Profile>):null}
                </div>

            </div>
            <div className={"contact_card"}>
                <div className={"profile_pic"}><Avatar  alt={data.name} src={data.img_url} sx={{ width: 80, height: 80 }}/></div>
                <div className={"contact_detail"}>
                    <div className={"contact_detail_name"}>{data.name}</div>
                    <div className={"contact_detail_channel"}>
                        {data.channel?(<img src={`/channel_SVG/${data.channel}.svg`} style={{width:"20px",margin:"0 "}}></img>):""}
                        {data.phone?<div>+{data.phone.substring(0,3)} {data.phone.substring(3)}</div>:""}
                    </div>
                    {/* <div className={"contact_detail_team"}> Team</div> */}
                </div>

                {/* <div className={"config"} onClick={handelEditContact}> ... </div> */}
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
        </> }

    </div>
    )
}
