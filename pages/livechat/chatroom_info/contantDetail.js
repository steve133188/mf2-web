
import { useContext, useEffect,useState } from "react";
import { AvatarGroup, ListItem } from "@mui/material";
import { display, flexbox } from "@mui/system";
import { NoteButtonSVG } from "../../../public/livechat/MF_LiveChat_Landing/chat_svg";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Pill } from "../../../components/Pill";
import Mf_circle_btn from "../../../components/mf_circle_btn";
import { GlobalContext } from "../../../context/GlobalContext";


export default function ContantDetail({data , ...props}){
    
const List=[{
phoneNumber:"+852 97650348",
email:"helloWl@email.com",
birthday:" none ",
address:" hk ",
country:"Hong Kong",
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
const notesData = ([{id:"dsafdsfd",wroteBy:"Lawrance",date:"10-12-2012",content:"Today is 20th December 2021. Chrismas's eva is coming in town. lalala. Come to visit us."},{id:"dsafds32",wroteBy:"Maric",date:"10-09-2021",content:"Nice to meet you."},])
const [notes,setNotes] = useState([])
const [writenote,setWritenote] = useState("")

const [users ,setUsers] =useState([])
const [tags ,setTags] =useState([])
const [selectedTags ,setSelectedTags] =useState([])
const [filteredTags ,setFilteredTags] =useState([])
const [selectedUsers ,setSelectedUsers] =useState([])
const [filteredUsers ,setFilteredUsers] =useState([])
const [contact, setContact] = useState([]);

const { userInstance ,adminInstance,contactInstance ,orgInstance, user} = useContext(GlobalContext);

const getTags = async ()=>{
    const data = await adminInstance.getAllTags()
    // setTags(data)
    setFilteredTags(data)

}
const getUsers = async ()=>{
    const data = await userInstance.getAllUser()
    // setUsers(data)
    console.log(data,"useruser")
    setFilteredUsers(data)
} 
const fetchContacts = async (cid) =>{
    const data = await contactInstance.getContactById(cid)
    setContact(data)
    console.log(data,"cid")
    setSelectedTags(data.tags)
    setSelectedUsers(data.agents)
    console.log(data.tags)

}
useEffect(    async () => {
    if(user.token!=null) {
        console.log(data,"agfdsasdf")
        await getTags()
        await getUsers()
    }
},[]);
useEffect(async()=>{
    await fetchContacts(data.customer_id)
},[data])

const toggleSelectTags = e => {
    const { checked ,id} = e.target;
    setSelectedTags([...selectedTags, id]);
    if (!checked) {
        setSelectedTags(selectedTags.filter(item => item !== id));
    }
    console.log(selectedTags)
};  
const toggleSelectUsers = e => {
    const { checked ,id} = e.target;
    setSelectedUsers([...selectedUsers, id]);
    if (!checked) {
        setSelectedUsers(selectedUsers.filter(item => item !== id));
    }
    console.log(selectedUsers)
};

useEffect(()=>{
    setFilteredTags(List[1].tags)
    setNotes(notesData)
    setList(List)
    console.log("data")
    console.log(data)
},[])


        return(<>
            <div className={"infoBox"} style={props.tab=="info"?{display:"block"}:{display:"none"}} >
                <div className="contactInfo">
                    <div className={"keyList"} >
                        <div className={"keys"} style={{}}>Phone Number</div>
                        <div className={"keys"} style={{}}>Email</div>
                        <div className={"keys"} style={{}}>Birthday</div>
                        <div className={"keys"} style={{}}>Address</div>
                        <div className={"keys"} style={{}}>Country</div>
                        <div className={"keys"} style={{}}>Created Date</div>

                        {/*{Object.keys(data).map((item=>(*/}
                        {/*    <>               */}
                        {/*    <div className={"keys"} style={{}}>{item}</div>*/}
                        {/*    </>*/}
                        {/*)))}*/}
                    </div>
                    <div className={"valueList"}  style={{}}>

                            <div className={"values"}>{contact.phone}</div>
                            <div className={"values"}>{contact.email}</div>
                            <div className={"values"}>{contact.birthday}</div>
                            <div className={"values"}>{contact.address}</div>
                            <div className={"values"}>{contact.country}</div>
                            <div className={"values"}>{contact.created_at}</div>

                    </div>
                </div>
                    <div style={{width: "110%",height:"1px",backgroundColor:"#d3d3d3",marginBottom:"1rem",marginLeft:"-10px"}}></div>
                <div className={"assignedInfo"}>

                    {/* Assignee
                        <div className={"assigneeBox"}>
                            {List[1].agents.map((agent)=>{ 
                                            return( <Tooltip key={agent} className={"assigne_item"} title={agent} placement="top-start" >
                                                        <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14}} >
                                                            {agent.substring(0,2).toUpperCase()}</Avatar>
                                                    </Tooltip>)})}
                        </div>+
                    Tags
                        <div className={"filter_box_tag"}  >
                            <div className={"channelList"}>
                                <div className={"filter_title"}></div>
                                    {List[1].tags.map((tag)=>{
                                    return(<li className={"channelListitem"} key={tag.id}><Pill key={tag.id} size="30px" color="vip">{tag}</Pill>
                                    </li>)
                                })}
                            </div>
                        </div> */}
                    <div>Assignee</div>
                <div className={""}>
                    <div className={"tagsGroup"} style={{margin:"10px 0"}}>
                        <AvatarGroup className={"AvatarGroup"} xs={{flexFlow:"row",justifyContent:"flex-start",width:"fit-content",margin:"10px 0"}}  spacing={"-5"} >
                            {selectedUsers &&selectedUsers.map((agent , index)=>{
                                return(
                                    <Tooltip key={index} className={""} title={agent} placement="top-start">
                                        <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{agent.substring(0,2).toUpperCase()}</Avatar>

                                    </Tooltip>
                                )
                            })}

                        <Mf_circle_btn handleChange={(e)=>{ userSearchFilter(e.target.value , users,(new_data)=>{
                            setFilteredUsers(new_data)

                        })}} >
                            {filteredUsers&&filteredUsers.map((user)=>{
                                return(<li key={user.username}>
                                    <div style={{display:"flex" ,gap:10}}>
                                        <Tooltip key={user.username} className={""} title={user.username} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{user.username.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                        <div className={"name"}>{user.username}</div>
                                    </div>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel"> <input type="checkbox" id={user.username} name="checkbox" checked={selectedUsers.includes(user.username)} onClick={toggleSelectUsers} />
                                        </label>
                                    </div>
                                </li>)
                            })}
                        </Mf_circle_btn>
                        </AvatarGroup>
                    </div>
                </div>
                    <div>Tags</div>
                <div className={""}>
                    <div className={"tagsGroup"} style={{maxWidth:"230px",height:"auto"}} >
                        <div style={{margin:"10px 5px 0 0 "}}>
                        <Mf_circle_btn handleChange={(e)=>{ tagSearchFilter(e.target.value , tags,(new_data)=>{
                            setFilteredTags(new_data)
                        })}}>
                            {filteredTags.map((tag)=>{
                                return(<li key={tag.id}><Pill key={tag.id} color="vip">{tag.tag}</Pill>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" id={tag.tag} name="checkbox" checked={selectedTags.includes(tag.tag)} onClick={toggleSelectTags} />
                                        </label> </div></li>)
                            })}
                        </Mf_circle_btn>
                        </div>
                            {selectedTags!=-1&&selectedTags.map((tag)=>{
                                return<Pill key={tag} color="vip">{tag}</Pill>
                            })}

                    </div>
                </div>
               

                </div>
            </div>

            <div className={'noteBox'} style={props.tab=="note"?{display:"block"}:{display:"none"}}>
                <div className={"notesVolumn"}>Note : {notes.length}</div>
                <div className={"write_pad"}>    
                            <input type="text" className={"write_note"} onChange={(e)=>setWritenote(e.target.value)} placeholder={"Write a note..."}>
                            </input>

                            <div onClick={()=>{setWritenote(notes.push({cid:"dsafdsfd",wroteBy:"Lawrance",date:new Date().toDateString,content:writenote}))}}>
                                <NoteButtonSVG />

                            </div>

                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                </div>
                <div className={""} style={{maxHeight:"50vh",overflowY:"scroll"}}>
                    {notes.map((note)=>{
                        return (
                            <div key={note.id}>
                                <div className={"message_pad"}>
                                    <div className={"left nameTag"}>
                                        <Tooltip key={note.id} className={""} title={data.wroteBy} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning tag "}  sx={{width:50 , height:50 ,fontSize:20,padding:"0rem"}} >{note.wroteBy.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                    </div>


                                    <div className={"right"}>
                                        <div className={"listitem name "}>
                                            <div className={"left"}>{note.wroteBy}</div>
                                            {/* <div className={"left"}>{props.name}</div> */}
                                            <div className={"right"}>{note.date}</div>
                                        </div>
                                    </div>

                                </div>

                                
                                    <div className={"message_box"}>
                                        <div className={"message"} style={props.tab=="note"?{display:"flex"}:{display:"none"}}>{note.content}</div>
                                    </div>
                                

                            </div>)
                                })}
                </div>
            </div>
        </>

    )
}