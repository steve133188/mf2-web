import {useContext, useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import {Pill} from "../Pill";
import {Tooltip} from "@mui/material";
import {AvatarGroup} from "@mui/lab";
import { NoteButtonSVG } from "../../public/livechat/MF_LiveChat_Landing/chat_svg";
import Profile from "../profile";
import EditProfileForm from "./EditProfileForm";
import { GlobalContext } from "../../context/GlobalContext";

export default function ProfileGrid({data}){
    const notesData = ([{id:"dsafdsfd",wroteBy:"Lawrance",date:"10-12-2012",content:"Today is 20th December 2021. Chrismas's eva is coming in town. lalala. Come to visit us."},{id:"dsafds32",wroteBy:"Maric",date:"10-09-2021",content:"Nice to meet you."},])
    const [notes,setNotes] = useState([])
    const {contactInstance } = useContext(GlobalContext)
   
    const [writenote,setWritenote] = useState("")
    const [useContact , setUseContact] = useState()
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)
    const [assingedContacts, setAssingedContacts] = useState([])
    useEffect(()=>{

        setNotes(notesData)

        console.log("data")
        console.log(data)
    },[])
    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) setUseContact(key);
        if(isEditProfileShow) await fetchContacts();
        setIsEditProfileShow(!isEditProfileShow)
    }
    const fetchContacts = async () =>{
        const contactsdata = await contactInstance.getAllContacts()

        console.log(contactsdata,"contactssss")
        const assigned = contactsdata.filter(c=>c.agents.includes(data.username))
        console.log(assigned,"contactssss")

        setAssingedContacts(assigned)
        // setFilteredData(data)
    }
    const [log , setLog]  = useState([])
    useEffect(()=>{
    //    fetch log by customer_id
    //    fetch assignee by customer_id
    //    fetch team by customer_id
    },[])
    return(<div className={"profile_grid"}>
        {isEditProfileShow?           ( <Profile handleClose={toggleEditProfile}><EditProfileForm data={useContact} toggle={toggleEditProfile}/></Profile>):null}
        <div className={"info_col grid_box"}>
            <span className={"dot"} onClick={(e)=>{e.stopPropagation();toggleEditProfile(data);}} >...</span>
            <div className={"ava_block"} style={{margin:"30px 0"}}>
                <Avatar className={"ava"} src={data.img_url} alt="profile pic"/>
                <span className={"title"}>{data.name}</span>
                <button className={"chat_btn"}>chat</button>
            </div>
            <div className="info_box">
                
            <div className={"info_row"}>
                <span className={"info_label"}>CustomerID</span>
                <span className={"info_content"}>{data.id}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Phone Number</span>
                <span className={"info_content"}>{data.phone}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Email</span>
                <span className={"info_content"}>{data.email}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Birthday</span>
                <span className={"info_content"}>{data.birthday}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Gender</span>
                <span className={"info_content"}>{data.gender}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Address</span>
                <span className={"info_content"}>{data.address}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Created Date</span>
                <span className={"info_content"}>{data.created_at}</span>
            </div>
            {/* <div className={"info_row"}>
                <span className={"info_label"}>Contact Owner</span>
                <span className={"info_content"}>{data.user}</span>
            </div> */}
            </div>
        </div>
        <div className={"main_col"}>
            <div className={"two_block half_session"}>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Assignee</span></div>
                        <div className={"session_content"}>
                            {/*<AvatarGroup className={"AvatarGroup"} xs={{flexDirection:"row"}} max={10} spacing={"1"} align="left">*/}
                                {data.agents!=null &&data.agents.map((agent , index)=>{
                                    return(
                                        <Tooltip key={index} className={""} title={agent} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning"}  style={{margin:"0 3px"}}sx={{width:35 , height:35 ,fontSize:18}} alt={agent}>{agent.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                    )
                                })}
                            {/*</AvatarGroup>*/}
                        </div>
                    </div>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Team</span></div>
                        <div className={"session_content"}>{data.team?data.team:"Not yet assigned."}</div>
                    </div>
                </div>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Channels</span></div>
                        <div className={"session_content"}>
                            { data.channels!=null && data.channels.map((chan , index)=>{
                                return(<img key={index} width="24px" height="24px" src={`./${chan}Channel.svg`} alt=""/>)
                            })}
                        </div>
                    </div>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Tags</span></div>
                        <div className={"session_content"}>
                            {data.tags.map((tag , index)=>{
                                return( <Pill key={index} color="lightBlue">{tag}</Pill>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={"log_input half_session grid_box"}>
                <div className={"block_session"} style={{justifyContent: 'space-between'}}>
                    <div className={"top_row"}><span className={"title"}>Activity Log</span></div>
            
                    <div className={'activity_log_box'}>
                        {/* <div className={"notesVolumn"}>Note : {notes.length}</div> */}
                            {notes.map((note , index)=>{
                                return (<div key={index} className={"log_items"}>
                                            <div className={"message_pad"}>
                                                <div className={"left nameTag"}>
                                                                {/* <Avatar  className={"mf_bg_warning mf_color_warning tag "}  sx={{width:50 , height:50 ,fontSize:20}} /> */}
                                                        <Tooltip key={note.id} className={""} title={data.wroteBy} placement="top-start">
                                                            <Avatar  className={"mf_bg_warning mf_color_warning tag "}  sx={{width:35 , height:35 ,fontSize:14,padding:"0rem"}} >{note.wroteBy.substring(0,2).toUpperCase()}</Avatar>
                                                        </Tooltip>
                                                </div>
                                                <div className={"right"}>
                                                    <div className={"listitem name "}>
                                                        <div className={"left"}>{note.content}</div>
                                                        <div className={"right"}>{note.date}</div>
                                                        {/* <div className={"message"} style={{display:"flex"}}></div> */}
                                                    </div>
                                                </div>
                                            </div>
                                                <div className={"bottom_box"}>
                                            </div>
                                        </div>)
                            })} 
                    </div>
                    <div className={"message_pad"}>    
                        <input type="text" className={"write_note"} onChange={(e)=>setWritenote(e.target.value)} placeholder={"Start typing to log activities..."}></input>
                        <div className={"log_button"} onClick={()=>{setWritenote(notes.push({id:"dsafdsfd",wroteBy:"Lawrance",date:new Date().toDateString,content:writenote}))}}>
                            Log
                        </div>
                            {/* <NoteButtonSVG /> */}
                    </div>
                    {/* <ul>{log!=-1&& log.map((l , i )=>{
                        return <li key={i}> {l} </li>
                    })}</ul> */}
                </div>
            </div>
        </div>
    </div>)
}