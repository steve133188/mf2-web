
import { useContext, useEffect,useState } from "react";
import { AvatarGroup, ListItem } from "@mui/material";
import { display, flexbox } from "@mui/system";
import { NoteButtonSVG } from "../../../public/livechat/MF_LiveChat_Landing/chat_svg";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Pill } from "../../Pill";
import Mf_circle_btn from "../../mf_circle_btn";
import { GlobalContext } from "../../../context/GlobalContext";


export default function ContantDetail({data , ...props}){
    
const notesData = ([{id:"dsafdsfd",wroteBy:"Lawrance",date:"2012-12-10",content:"Today is 20th December 2021. Chrismas's eva is coming in town. lalala. Come to visit us."},{id:"dsafds32",wroteBy:"Maric",date:"2021-10-09",content:"Nice to meet you."},])
const [notes,setNotes] = useState([])
const [writenote,setWritenote] = useState("")

const [start,setStart]= useState(false)
const [users ,setUsers] =useState([])
const [tags ,setTags] =useState([])
const [selectedTags ,setSelectedTags] =useState([])
const [filteredTags ,setFilteredTags] =useState([])
const [selectedUsers ,setSelectedUsers] =useState([])
const [filteredUsers ,setFilteredUsers] =useState([])
const [contact, setContact] = useState([]);
const [unread,setUnread] = useState(false)
const [unassigned,setUnAssigned] = useState(false)
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
const fetchContact = async (cid) =>{
    const data = await contactInstance.getContactById(cid)
    setContact(data)
    console.log(data,"cid")
    setSelectedTags(data.tags)
    setSelectedUsers(data.agents)
    console.log(data.tags)

}
useEffect(    async () => {
    if(user.token!=null) {
        await getTags()
        await getUsers()
        console.log(user,'useruser123123')
    }
},[]);
useEffect(async()=>{

    if(!start){return setStart(true)}
   if(data&&user.token){ await fetchContact(data.customer_id);}
//    console.log(data,"details~~~")
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
useEffect(async()=>{
    
if(unassigned){

    const data =  {...contact,agents:selectedUsers}
    const res = await contactInstance.updateContact (data)
    console.log(res)  
    setUnAssigned(!unassigned)  
}   

},[unassigned])

useEffect(async()=>{
    if(unread){

        const data = {...contact,tags:selectedTags}
        console.log(data)
        const res= await contactInstance.updateContact (data)
        setUnread(!unread)
    }

    },[unread])


useEffect(()=>{
    setNotes(notesData)

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
                    <div style={{width: "110%",height:"1px",backgroundColor:"#d3d3d3",marginBottom:".5rem",marginLeft:"-10px"}}></div>
                <div className={"assignedInfo"}>

                    <div>Assignee</div>

                    <div className={"tagsGroup"} style={{margin:"10px 0",display:"flex",alignItems:"center"}}>
                        <Mf_circle_btn switchs={()=>{setUnAssigned(!unassigned)}} handleChange={(e)=>{ userSearchFilter(e.target.value , users,(new_data)=>{
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
                                        <label className="newCheckboxLabel"> <input type="checkbox" id={user.username} name="checkbox" onClick={toggleSelectUsers} checked={selectedUsers.includes(user.username)} onChange={()=>{}} />
                                        </label>
                                    </div>
                                </li>)
                            })}
                        </Mf_circle_btn>
                        <AvatarGroup className={"AvatarGroup"} sx={{ display: 'flex',flexDirection: 'row-reverse' ,width:"fit-content",margin:"10px 0"}}  spacing={-5} >
                            {selectedUsers &&selectedUsers.map((agent , index)=>{
                                return(
                                    <Tooltip key={index} className={""} title={agent} placement="top-start">
                                        <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{agent.substring(0,2).toUpperCase()}</Avatar>

                                    </Tooltip>
                                )
                            })}
                        </AvatarGroup>
                    </div>

                    <div>Tags</div>
                <div className={""}>
                    <div className={"tagsGroup"} style={{display:"flex",maxWidth:"230px",height:"8vw",}} >
                        <div style={{margin:"10px 5px 0 0 "}}>

                        <Mf_circle_btn  switchs={()=>{setUnread(!unread)}} handleChange={(e)=>{ tagSearchFilter(e.target.value , tags,(new_data)=>{
                            setFilteredTags(new_data) 
                        })}}>

                            {filteredTags.map((tag)=>{
                                return(<li key={tag.id}><Pill key={tag.id} color="vip">{tag.tag}</Pill>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" id={tag.tag} name="checkbox" checked={selectedTags.includes(tag.tag)} onClick={toggleSelectTags} onChange={()=>{}} />
                                        </label> </div></li>)
                            })}

                        </Mf_circle_btn>

                        </div>
                            <div style={{display:"flex",flexWrap:"wrap",width:"250px",height:"120px",overflow:"auto"}}>
                                    {selectedTags!=-1&&selectedTags.map((tag)=>{
                                        return<Pill key={tag} color="vip">{tag}</Pill>
                                    })}

                            </div>
                    </div>
                </div>
               

                </div>
            </div>

            <div className={'noteBox'} style={props.tab=="note"?{display:"block"}:{display:"none"}}>
                <div className={"notesVolumn"}>Note : {notes.length}</div>
                <div className={"write_pad"}>    
                            <input type="text" className={"write_note"} value={writenote} onChange={(e)=>setWritenote(e.target.value)} placeholder={"Write a note..."}>
                            </input>

                            <div onClick={()=>{setWritenote(notes.push({cid:user.user.phone,wroteBy:user.user.username,"date":new Date().toISOString().slice(0, 10),content:writenote})),setWritenote("")}}>
                                <NoteButtonSVG />

                            </div>

                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                </div>
                <div className={""} style={{maxHeight:"50vh",overflowY:"scroll",minWidth:"230px"}}>
                    {notes.map((note)=>{
                        return (
                            <div key={note.id}>
                                <div className={"message_pad"}>
                                    <div className={"left nameTag"}>
                                        <Tooltip key={note.id} className={""} title={note.wroteBy} placement="top-start">
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