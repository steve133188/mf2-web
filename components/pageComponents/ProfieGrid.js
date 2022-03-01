import {useContext, useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import {Pill} from "../Pill";
import {Tooltip} from "@mui/material";
import {AvatarGroup} from "@mui/lab";
import Link from 'next/link';
import { useRouter } from "next/router";
import Mf_circle_btn from "../common/mf_circle_btn";
import { NoteButtonSVG } from "../../public/livechat/MF_LiveChat_Landing/chat_svg";
import Profile from "../profile";
import EditProfileForm from "./EditProfileForm";
import { GlobalContext } from "../../context/GlobalContext";
import {API, graphqlOperation} from "aws-amplify";
import {listChatrooms, listNotesTables} from "../../src/graphql/queries";
import {createNotesTable} from "../../src/graphql/mutations";
import {renderTags} from "../common/RenderTags";
import {renderAgentAVA} from "../common/AgentAVA";
import {renderChannelsIcon} from "../common/RenderChannelsIcon";
import {useRootStore} from "../../utils/provider/RootStoreProvider";

export default function ProfileGrid({data,toggle , ...props}){
    const {tagStore , contactsStore , chatListStore} = useRootStore()

    const [notes,setNotes] = useState([])
    const [disable, setDisable] = useState(false)
    const [unread, setUnread] = useState(false)
    const [writenote,setWritenote] = useState("")
    const [useContact , setUseContact] = useState(data)
    const [selectedTags, setSelectedTags] = useState([])
    const [filteredTags, setFilteredTags] = useState([])
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)
    const [assingedContacts, setAssingedContacts] = useState([])
    const router = useRouter()

    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) setUseContact(key);
        if(isEditProfileShow) await fetchContacts();
        setIsEditProfileShow(!isEditProfileShow)
    }

    const updateContact = async (newSelectTags)=>{
        const data = {...useContact , tags_id: newSelectTags}
        await contactsStore.update(data)
        await fetchContacts()
    }

    const fetchNotes = async (data)=>{
        const res = API.graphql(graphqlOperation(listNotesTables ,{filter:{customer_id: {eq:data} }})).then(res=>{
            setNotes(prev=>res.data.listNotesTables.items)
        }).catch(err=>console.log(err))
    }

    const dropNote = async (input)=>{
        const res = API.graphql(graphqlOperation(createNotesTable , {input:input})).then(res=>{
            setNotes(prev=>[...prev , res.data.createNotesTable])
            console.log("create Note success")
        }).catch(err=>console.log(err))
    }
    const fetchContacts = async () =>{
        await contactsStore.getAll()
        const assigned = contactsStore.contacts.filter(c=>c.agents_id&&c.agents_id.length>0)
        setAssingedContacts(assigned)
    }
    const getTags = async ()=>{
        await tagStore.getTags()
        setFilteredTags(tagStore.tags)

    }
    const isContainTags = (id) => {
        if (selectedTags && selectedTags.length>0) {
            return selectedTags.some(selectedtag => selectedtag.toString() === id.toString())
        } else return false
    }
    const toggleSelectTags = async e => {
        const {  id } = e.target;
        console.log("selectedTags " ,selectedTags)
        let newSelectTags
        if (selectedTags.includes(parseInt(id))) {
            newSelectTags= selectedTags.filter(item =>  parseInt(item) !== parseInt(id) )
            console.log("newSelectTags : " , newSelectTags)
            setSelectedTags(newSelectTags );
        }else{
            newSelectTags= [...selectedTags , parseInt(id)]
            setSelectedTags(prev=>newSelectTags);
        }
        await updateContact(newSelectTags)
    };
    const fetchAfterModify= async(cid)=>{
        const data = await contactsStore.getContactById(cid)
        setUseContact(data)
        const { tags} = data
        setSelectedTags(tags)
        // setSelectedUsers(agents)
    }
    const toggleChat =async ()=>{
        if(data.channels&&data.channels.length>0){
            const chat = await API.graphql(graphqlOperation(listChatrooms , {filter:{customer_id:{eq:data.customer_id}} , limit:1000}))
                .then(res=>{
                    console.log("res:",res)
                    return res.data.listChatrooms.items[0]
                }).catch(err=>{
                    alert(err)
                })
            chatListStore.selectChat(chat)
            const n = router.pathname
            return n.includes("/livechat")
        }else{
            alert("The contact have not any channel added")
        }

    }
    const submitNote = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (writenote == ""){
            alert("Please enter the valid note")
            return
        }
        const input = {
            customer_id:  data.customer_id,
            message:writenote ,
            user_id :user.user.user_id,
            timestamp:  (Date.now()/1000).toString() ,
            signed_name:user.user.username} ;
        await dropNote(input)  ;
        setWritenote("")
    }

    useEffect(async ()=>{
        if(data.tags_id) setSelectedTags([...data.tags_id])
        await fetchNotes(data.customer_id)
        await getTags()
        setDisable((data.customer_id == null))
    },[])


    return(<div className={"profile_grid"}>
        {isEditProfileShow&&useContact?           ( <Profile handleClose={(e)=>{e.preventDefault();toggleEditProfile()}}><EditProfileForm data={useContact} toggle={toggle}/></Profile>):null}
        <div className={"info_col grid_box"}>
            <button className={"dot "} onClick={(e)=>{e.stopPropagation();toggleEditProfile(data);}} style={{margin:"10px 5px 0 0"}} > Edit</button>
            <div className={"ava_block"} style={{margin:"30px 0"}}>
                {/*<Avatar className={"ava"} src={data.img_url} alt="profile pic"/>*/}
                <Avatar className={"ava"} src={""} alt="profile pic"/>
                <span className={"title"}>{useContact.customer_name}</span>
                <Link href="/livechat" id={useContact.customer_id}><button className={"chat_btn"} onClick={toggleChat}>chat</button></Link>
            </div>
            <div className="info_box">

            <div className={"info_row"}>
                <span className={"info_label"}>CustomerID</span>
                <span className={"info_content"}>{useContact.customer_id}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Phone Number</span>
                <span className={"info_content"}>{`+${useContact.country_code} ${useContact.phone}`}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Email</span>
                <span className={"info_content"}>{useContact.email ||"-"}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Birthday</span>
                <span className={"info_content"}>{useContact.birthday||"-"}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Gender</span>
                <span className={"info_content"}>{useContact.gender||"-"}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Address</span>
                <span className={"info_content"}>{useContact.address||"-"}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Created Date</span>
                <span className={"info_content"}>{useContact.created_at!==0?new Date(useContact.created_at/1000).toLocaleDateString('en-US'):"-"}</span>
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
                                {useContact.agents_id&& renderAgentAVA(useContact.agents_id , props.agents)}
                        </div>
                    </div>
                </div>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Channels</span></div>
                        <div className={"session_content"}>
                            { useContact.channels&& renderChannelsIcon(useContact.channels)}
                        </div>
                    </div>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Tags</span></div>
                        <div className={"tagsGroup"} style={{ display: "flex", maxWidth: "98%", height: "8vw", marginTop:"18px"}} >
                                    <Mf_circle_btn isDisable={disable} switchs={() => { setUnread(!unread) }} handleChange={(e) => {
                                       const new_data = props.tags.filter(i => i.tag_name.toLowerCase().includes(e.target.value.toLowerCase()))
                                       setFilteredTags(new_data)
                                    }}>

                                        {filteredTags.map((tag , index)=>{
                                            return (<li key={index+index}>
                                                <Pill onClick={null} key={tag.tag_id+index} color="vip">{tag.tag_name}</Pill>
                                                <div className="newCheckboxContainer">
                                                    <label className="newCheckboxLabel">
                                                        <input type="checkbox" value={tag.tag_name}  id={tag.tag_id} name="checkbox" checked={isContainTags(tag.tag_id)} onClick={toggleSelectTags} onChange={(e) => { }} />
                                                    </label>
                                                </div>
                                            </li>)
                                        })}

                                    </Mf_circle_btn>


                                    <div style={{paddingTop:"3px", width:"100%"}} >
                                        {props.tags&&renderTags(data.tags_id, props.tags)}

                                    </div>
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
                            Log
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
