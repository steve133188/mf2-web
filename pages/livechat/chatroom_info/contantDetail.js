import { ListItem } from "@mui/material";
import { display, flexbox } from "@mui/system";
import { NoteButtonSVG } from "../../../public/livechat/MF_LiveChat_Landing/chat_svg";

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
                        <div>
                            <input type="text" className={"write_note"}  placeholder={"Write a note..."}>
                            </input>
                                <NoteButtonSVG/>

                        </div>
            </div>


        </>

    )
}