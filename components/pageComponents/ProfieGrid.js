import {useContext, useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import {Pill} from "../Pill";
import {Tooltip} from "@mui/material";
import {AvatarGroup} from "@mui/lab";
import Link from 'next/link';
import { useRouter } from "next/router";
import { NoteButtonSVG } from "../../public/livechat/MF_LiveChat_Landing/chat_svg";
import Profile from "../profile";
import EditProfileForm from "./EditProfileForm";
import { GlobalContext } from "../../context/GlobalContext";
import {API, graphqlOperation} from "aws-amplify";
import {listNotesTables} from "../../src/graphql/queries";
import {createNotesTable} from "../../src/graphql/mutations";

export default function ProfileGrid({data}){
    // const notesData = ([{id:"dsafdsfd",wroteBy:"Lawrance",date:"10-12-2012",content:"Today is 20th December 2021. Chrismas's eva is coming in town. lalala. Come to visit us."},{id:"dsafds32",wroteBy:"Maric",date:"10-09-2021",content:"Nice to meet you."},])
    const [notes,setNotes] = useState([])
    const {contactInstance , user} = useContext(GlobalContext)

    const [writenote,setWritenote] = useState("")
    const [useContact , setUseContact] = useState()
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)
    const [assingedContacts, setAssingedContacts] = useState([])
    const router = useRouter()
    // useEffect(()=>{
    //     setNotes(notesData)
    //     console.log("user data",data)
    // },[])
    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) setUseContact(key);
        if(isEditProfileShow) await fetchContacts();
        setIsEditProfileShow(!isEditProfileShow)
    }

    const fetchNotes = async (data)=>{
        console.log(data)
        const res = API.graphql(graphqlOperation(listNotesTables ,{filter:{customer_id: {eq:data} }})).then(res=>{
            setNotes(prev=>res.data.listNotesTables.items)
        }).catch(err=>console.log(err))
        console.log("fetch notes" ,notes)
    }

    const dropNote = async (input)=>{
        const res = API.graphql(graphqlOperation(createNotesTable , {input:input})).then(res=>{
            setNotes(prev=>[...prev , res.data.createNotesTable])
            console.log("create Note success")
        }).catch(err=>console.log(err))
    }
    const fetchContacts = async () =>{
        const contactsdata = await contactInstance.getAllContacts()

        console.log(contactsdata,"contactssss")
        const assigned = contactsdata.filter(c=>c.agents.includes(data.username))
        console.log(assigned,"contactssss")

        setAssingedContacts(assigned)
        // setFilteredData(data)
    }
    const toggleChat = ()=>{
        const n = router.pathname
        return n.includes("/livechat")
    }
    const submitNote = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (writenote == ""){
            alert("Please enter the valid note")
            return
        }
        const input = {
            customer_id:  parseInt(data.customer_id.toString().slice(3)) ,
            message:writenote ,
            user_id :parseInt(user.user.user_id.toString().slice(3)),
            timestamp:  (Date.now()/1000).toString() ,
            signed_name:user.user.username} ;
        await dropNote(input)  ;
        setWritenote("")
    }
    const [log , setLog]  = useState([])
    useEffect(async ()=>{
        await fetchNotes(data.customer_id)
    //    fetch log by customer_id
    //    fetch assignee by customer_id
    //    fetch team by customer_id
    },[])
    return(<div className={"profile_grid"}>
        {isEditProfileShow?           ( <Profile handleClose={toggleEditProfile}><EditProfileForm data={useContact} toggle={toggleEditProfile}/></Profile>):null}
        <div className={"info_col grid_box"}>
            <span className={"dot"} onClick={(e)=>{e.stopPropagation();toggleEditProfile(data);}} >. . .</span>
            <div className={"ava_block"} style={{margin:"30px 0"}}>
                <Avatar className={"ava"} src={data.img_url} alt="profile pic"/>
                <span className={"title"}>{data.first_name + " " + data.last_name}</span>
                <Link href="/livechat" id={data.customer_id}><button className={"chat_btn"} onClick={toggleChat}>chat</button></Link>
            </div>
            <div className="info_box">

            <div className={"info_row"}>
                <span className={"info_label"}>CustomerID</span>
                <span className={"info_content"}>{data.customer_id}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Phone Number</span>
                <span className={"info_content"}>{`+${data.country_code} ${data.phone}`}</span>
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
                <span className={"info_content"}>{new Date(data.created_at*1000).toLocaleDateString('en-US')}</span>
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
                                    console.log(agent,"contact file agents")
                                    return(
                                        <Tooltip key={index} className={""} title={agent.username?agent.username:""} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning"}  style={{margin:"0 3px"}}sx={{width:35 , height:35 ,fontSize:18}} alt={agent}>{agent.username.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                    )
                                })}
                            {/*</AvatarGroup>*/}
                        </div>
                    </div>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Team</span></div>
                        <div className={"session_content"}>{data.team?data.team.org_name:"Not yet assigned."}</div>
                    </div>
                </div>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Channels</span></div>
                        <div className={"session_content"}>
                            { data.channels!=null && data.channels.map((chan , index)=>{console.log(chan,"chan1111");
                                return(<div className={'channel_row'} key={index}>
                                    <div className={"channel_row_lf"}>
                                            <div>
                                        <   img key={index} width="40px" height="40px"   style={{ margin:"15px 3px",textAlign:"center"}}   src={`/channel_SVG/${chan}.svg`} alt=""/>
                                            {data.chan}
</div>
                                            </div>

                                    <div style={{width:"80%",display:"flex", fontSize:"16px",alignItems:"center"}} >
                                        {`+${data.phone.toString().slice(0,3)} ${data.phone.toString().slice(3)}`}1
                                        </div>
                                </div>)
                            })}
                            {/*<div style={{width:"80%",display:"flex",justifyContent:"flex-start", fontSize:"16px",alignItems:"center"}}><img width="40px" height="40px"  style={{ margin:"15px 30px"}}  src={`/channel_SVG/whatsapp.svg`} alt=""/> {`+${data.customer_id.toString().slice(0,3)} ${data.customer_id.toString().slice(3)}`}</div>*/}
                        </div>
                    </div>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Tags</span></div>
                        <div className={"session_content"} style={{maxWidth:"25vw",display:"flex",flexWrap:"wrap"}}>
                            {data.tags.map((tag , index)=>{
                                return( <Pill key={index} color="lightBlue">{tag.tag_name}</Pill>)
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
                                                        <Tooltip key={note.timestamp} className={""} title={note.signed_name} placement="top-start">
                                                            <Avatar  className={"mf_bg_warning mf_color_warning tag "}  sx={{width:35 , height:35 ,fontSize:14,padding:"0rem"}} >{note.signed_name.substring(0,2).toUpperCase()}</Avatar>
                                                        </Tooltip>
                                                </div>
                                                <div className={"right"}>
                                                    <div className={"listitem name "}>
                                                        <div className={"left"}>{note.message}</div>
                                                        <div className={"right"}>{new Date(note.timestamp*1000).toLocaleDateString()}</div>
                                                        {/* <div className={"message"} style={{display:"flex"}}></div> */}
                                                    </div>
                                                </div>
                                            </div>
                                                <div className={"bottom_box"}>
                                            </div>
                                        </div>)
                            })}
                    </div>
                    <div className={"message_pad_write"}>
                        <input type="text" className={"write_note"} onChange={(e)=>setWritenote(e.target.value)} value={writenote} placeholder={"Start typing to log activities..."}></input>
                        <div className={"log_button"} onClick={async(e)=>{await submitNote(e)}}>
                        {/*<div className={"log_button"} onClick={()=>{setWritenote(notes.push({id:"dsafdsfd",wroteBy:"Lawrance",date:new Date().toDateString,content:writenote}))}}>*/}
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
