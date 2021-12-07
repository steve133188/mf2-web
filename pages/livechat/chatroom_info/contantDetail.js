import { ListItem } from "@mui/material";
import { display, flexbox } from "@mui/system";
import { NoteButtonSVG } from "../../../public/livechat/MF_LiveChat_Landing/chat_svg";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function ContantDetail(props){
    
const List=[{
phoneNumber:"+852 97650348",
email:"email",
birthday:" none ",
address:" hk ",
Country:"Hong Kong",
createdDate:"1 May,2021",
lastOnline:"September 25, 2021 08:40AM",
lastContactFromYou:"September 30, 2021 11:40PM",
},
{
    name:"2",
    last_msg_time:"03:45PM",
    team:"B",
    unreadCount:1,
    is_pin:false,
    channel:"whatsapp",
    profile_pic_url:"https://imgv3.fotor.com/images/side/Fotor-powerful-photo-enhancement-tools.jpg",
},]

        return(<>
            <div className={"infoBox"} style={props.tab=="info"?{display:"block"}:{display:"none"}} >
                <div className={"keyList"} >
                    {Object.keys(List[0]).map((item=>(
                        <>               
                        <div className={"keys"} style={{}}>{item}</div>
                        </>
                    )))}
                </div>
                <div className={"valueList"}  style={{}}>
                    {Object.values(List[0]).map((item=>(
                        <>               
                        <div className={"values"}>{item}</div>
                        </>
                    )))}
                </div>
            </div>

            <div className={'noteBox'} style={props.tab=="note"?{display:"block"}:{display:"none"}}>
                <div className={"write_pad"}>
                            <input type="text" className={"write_note"}  placeholder={"Write a note..."}>
                            </input>
                                <NoteButtonSVG/>

                </div>
                        <div className={"message_pad"}>
                            <div className={"left nameTag"}>
                            <Tooltip key={props.name} className={""} title={props.name} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning tag "}  sx={{width:50 , height:50 ,fontSize:16}} >{props.name.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                            </div>
                            <div className={"right"}>
                                <div className={"listitem name "}>
                                    <div className={"left"}>{props.name}</div>
                                    <div className={"right"}>time</div>
                                </div>
                            </div>
                        </div>
                <div className={"message_box"}>

                    <div className={"message"} style={props.tab=="note"?{display:"flex"}:{display:"none"}}>Today is 20th December 2021. Chrismas's eva is coming in town. lalala. Come to visit us.</div>
                </div>
            </div>


        </>

    )
}