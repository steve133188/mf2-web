import { useContext, useEffect, useState } from "react"
import ContantDetail from "./contantDetail";
import Avatar from "@mui/material/Avatar";
import {EditPenButtonSVG} from "../../../public/livechat/MF_LiveChat_Landing/chat_svg"
import Profile from "../../profile";
import EditProfileForm from "../../pageComponents/EditProfileForm";
import { GlobalContext } from "../../../context/GlobalContext";


export default function ChatroomInfo ({data,...props}){

    const [start,setStart]= useState(false)
    const {contactInstance } = useContext(GlobalContext)
     const [tabActive,setTabAcive] = useState("info")
    const [useContact , setUseContact] = useState({})
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)
    const handelEditContact = async ()=>{
        if(data.name){
            setIsEditProfileShow(!isEditProfileShow)
            await toggleEditProfile(data)
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
        setUseContact(prev=>data)
        // return data
        // setFilteredData(data)
    }
    // useEffect(()=>{
    //     console.log("chat info info info ",typeof(data.phone))
    // },[data])

    useEffect(async()=>{
        console.log(data,"chatroom contact")
        if(data.customer_id){
            await fetchContacts(data.customer_id)
        }

        // if(!start){return setStart(true)}
        // console.log("ChatroomInf",data)

        // console.log("chatroomINfo",res)
    },[])

    return (
    <div className={"chatroom_info"}>
        {/*{data.room_id? */}
            <div style={{display:(data.room_id?"block":"none")}}>
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
                        {data.phone?<div> {data.phone}</div>:""}
                    </div>
                    {/* <div className={"contact_detail_team"}> Team</div> */}
                </div>
                <div ><p className={"config"} onClick={props.click} style={{font:"normal normal bold 16px/22px Manrope" , marginLeft:"5px",width:"21px",alignSelf:"start",padding:0 }} > . . .</p> </div>
                {/* <div className={"config"} onClick={handelEditContact} style={{font:"normal normal bold 16px/22px Manrope"}}> . . . </div> */}
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
            {/*// :null }*/}

    </div>
    )
}
