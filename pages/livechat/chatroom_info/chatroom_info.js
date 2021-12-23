import { useState } from "react"
import ContantDetail from "./contantDetail";
import Avatar from "@mui/material/Avatar";
import {EditPenButtonSVG} from "../../../public/livechat/MF_LiveChat_Landing/chat_svg"


export default function ChatroomInfo ({data}){

    const [tabActive,setTabAcive] = useState("info")

    return (
    <div className={"chatroom_info"}>
        <div className={"contact_card"}>
            <div className={"profile_pic"}><Avatar  alt={data.name} src={data.img_url} sx={{ width: 100, height: 100 }}/></div>
            <div className={"contact_detail"}>
                <div className={"contact_detail_name"}>{data.name}</div>
                <div className={"contact_detail_channel"}>{data.phone}</div>
                {/* <div className={"contact_detail_team"}> Team</div> */}
            </div>
            
            <div className={"config"}> ... </div>
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