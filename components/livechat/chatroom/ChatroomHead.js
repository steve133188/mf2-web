import Avatar from "@mui/material/Avatar";
import CountDownTimer from "../../CountDownTimer";
import {RefreshBTN, ResearchBTN} from "../../../public/livechat/MF_LiveChat_Landing/chat_svg";
import RobotSwitch from "../RobotSwitch";


export default function ChatroomHead({...props}){
    const {selectedChat , lastMsgFromClient ,hasMsg ,isRobotOn=true , handleRobot , refresh} = props


    return (
        <div className={"chatroom_top"}>
            <div className={"chatroom_top_info"}>
                <Avatar src={ null} alt="icon" />
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <div className={"chatroom_name"} style={{fontSize:"18px"}}>{selectedChat.name}
                        <div className={"chatroom_channel"}>{selectedChat.channel?<img src={`/channel_SVG/${selectedChat.channel}.svg`} />:""}</div>
                    </div>
                    {selectedChat.channel=="WABA"&&lastMsgFromClient!==""&&hasMsg? <div className="chatroom_name"><CountDownTimer dayString={lastMsgFromClient} timeCount={selectedChat.channel=="WABA"}/></div>:"" }
                </div>
            </div>
            <div className={"chatroom_top_btn_gp"}>
                {/* TODO Search button */}
                {/*<div className={"chatroom_top_btn chatroom_top_btn_research " +( chatSearch?"research_active":"")} >*/}
                    {/*<ResearchBTN onclick={searchBy}/>*/}
                    {/* <ResearchBTN onclick={()=>{setSearch(!chatSearch)}}/> */}
                    {/*<div className={"search_bar"} style={{display:chatSearch?"flex":"none"}}>*/}
                        {/* <input type="text" className={"search_area"} onChange={(e)=>setChatBoxSearch(e.target.value)} placeholder={"Search"}></input> */}
                        {/*<input type="text" className={"search_area"} onChange={search} placeholder={"Search"}></input>*/}
                        {/*<div className={"search_icon"}></div>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/* TODO Search button */}
                <div className={"chatroom_top_btn chatroom_top_btn_refresh"} onClick={refresh}><RefreshBTN/></div>
                <div className={"chatroom_top_btn chatbot_switch"}>
                    <RobotSwitch isOn={isRobotOn} handleToggle={handleRobot} onColor="#2198FA" />
                </div>
            </div>
        </div>
    )
}
