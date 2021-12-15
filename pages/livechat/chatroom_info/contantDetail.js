
import { useContext, useEffect,useState } from "react";
import { ListItem } from "@mui/material";
import { display, flexbox } from "@mui/system";
import { NoteButtonSVG } from "../../../public/livechat/MF_LiveChat_Landing/chat_svg";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Pill } from "../../../components/Pill";

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
address: "hk",
agents:  ['testing', 'steve', 'mstest', 'sbna', 'testin1'],
birthday: "12-12-1999",
channels: null,
country: "Hong Kong",
created_at: "2021-11-11T16:51:49.41Z",
email: "JOhn_David@ms.com",
first_name: "sa",
gender: "",
group: "",
id: "c66kk9buhcig008da830",
last_name: "brina",
name: " sa brina",
organization: "",
phone: "85269358633",
tags: ['New Customer',"VIP"],
0: "New Customer",
length: 1,
team_id: "",
updated_at: "2021-12-06T10:21:07.931Z",
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
const [outputList,setList] = useState([List[1].phone,List[1].email,List[1].birthday,List[1].address,List[1].country,List[1].createdDate,List[1].updated_at,List[1].updated_at])





const [selectedTags ,setSelectedTags] =useState([])
const [filteredTags ,setFilteredTags] =useState([])
// const { userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext);
const toggleSelectTags = e => {
    const { checked ,id} = e.target;
    setSelectedTags([...selectedTags, id]);
    if (!checked) {
        setSelectedTags(selectedTags.filter(item => item !== id));
    }
    console.log(selectedTags)
};  

useEffect(()=>{
    setFilteredTags(List[1].tags)
    // console.log(List[1].agents)
},[])


        return(<>
            <div className={"infoBox"} style={props.tab=="info"?{display:"block"}:{display:"none"}} >
                <div className="contactInfo">
                    <div className={"keyList"} >
                        {Object.keys(List[0]).map((item=>(
                            <>               
                            <div className={"keys"} style={{}}>{item}</div>
                            </>
                        )))}
                    </div>
                    <div className={"valueList"}  style={{}}>
                        {outputList.map((item=>(
                            <>               
                            <div className={"values"}>{item}</div>
                            </>
                        )))}
                    
                    </div>
                </div>
                <div className={"assignedInfo"}>

                    Assignee
                    <div className={"assigneeBox"}>
                        {List[1].agents.map((agent)=>{ 
                                        return( <Tooltip key={agent} className={"assigne_item"} title={agent} placement="top-start" >
                                                <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14}} >
                                                    {agent.substring(0,2).toUpperCase()}</Avatar>
                                            </Tooltip>)})}
                    
                        
                    </div>
                    Tags
                        <div className={"filter_box_tag"}  >
                            <div className={"channelList"}>
                                <div className={"filter_title"}></div>
                            

                                    {List[1].tags.map((tag)=>{
                                    return(<li className={"channelListitem"}  key={tag.id}><Pill key={tag.id} size="30px" color="vip">{tag}</Pill>
                                        {/* <div className={"tag"} style={{display:"flex" ,gap:10}}>

                                        </div> */}

                                            </li>)
                                })}

                            </div>
                        </div>

                </div>
            </div>

            <div className={'noteBox'} style={props.tab=="note"?{display:"block"}:{display:"none"}}>
                <div className={"notesVolumn"}>Note : 1</div>
                <div className={"write_pad"}>    
                            <input type="text" className={"write_note"}  placeholder={"Write a note..."}>
                            </input>
                                <NoteButtonSVG />

                </div>
                        <div className={"message_pad"}>
                            <div className={"left nameTag"}>
                            <Tooltip key={props.name} className={""} title={props.name} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning tag "}  sx={{width:50 , height:50 ,fontSize:20}} >{props.name.substring(0,2).toUpperCase()}</Avatar>
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