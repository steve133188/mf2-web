import { useState } from "react"
import ContantDetail from "./contantDetail";
import Avatar from "@mui/material/Avatar";

export default function ChatroomInfo (props){

    const [tabActive,setTabAcive] = useState("info")

    return (
        <div className={"chatroom_info"}>
        <div className={"contact_card"}>
            <div className={"profile_pic"}><Avatar src={props.data[0].profile_pic_url} alt="" sx={{ width: 100, height: 100 }}/></div>
            <div className={"contact_detail"}>
                <div className={"contact_detail_name"}>{props.data[0].name}</div>
                <div className={"contact_detail_channel"}>+852 1833833</div>
                <div className={"contact_detail_team"}> Team{props.data[0].team}</div>
            </div>
            <div className={"config"}> ... </div>
        </div>

        <div className={"tabs_field"}>
            <div className={"tabs_row"}>
           
                <div className={"tab " + (tabActive == "info"?"active":"") } onClick={()=>{setTabAcive("info")}}>info</div>
                <div className={"tab "+ (tabActive == "note"?"active":"")} onClick={()=>{setTabAcive("note")}}>note</div>
            </div>
            <div className={"contact_content"} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                content
                <ContantDetail tab={tabActive}/>
            </div>
        </div>
    </div>
    )
}