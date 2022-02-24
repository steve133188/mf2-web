
import { useContext, useEffect, useState } from "react";
import { NoteButtonSVG } from "../../../public/livechat/MF_LiveChat_Landing/chat_svg";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Pill } from "../../Pill";
import Mf_circle_btn from "../../common/mf_circle_btn";
import { GlobalContext } from "../../../context/GlobalContext";
import {API, graphqlOperation} from "aws-amplify";
import {listNotesTables} from "../../../src/graphql/queries";
import {createNotesTable} from "../../../src/graphql/mutations";
import {useRootStore} from "../../../utils/provider/RootStoreProvider";


export default function ContantDetail(props ) {

    const {selectedChat, tab,tags,users , contact} = props

    const {tagStore , authStore , usersActionsStore , contactsStore:{targetContact}} = useRootStore()

    const [notes, setNotes] = useState([])
    const [writenote, setWritenote] = useState("")
    const [disable, setDisable] = useState(false)
    const [start, setStart] = useState(false)
    const [selectedTags, setSelectedTags] = useState([])
    const [filteredTags, setFilteredTags] = useState([])
    const [showTags, setShowTags] = useState([])
    const [showUsers, setShowUsers] = useState([])

    const [selectedUsers, setSelectedUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [unread, setUnread] = useState(false)


    useEffect(()=>{
        let vals = users.filter(t=>selectedUsers.includes(t.user_id.toString()))
        setShowUsers(vals)

    },[selectedUsers])

    useEffect(()=>{
        let vals = tags.filter(t=>selectedTags.includes(t.tag_id.toString()))
        setShowTags(vals)

    },[selectedTags])

    const onLoad = () =>{
        setFilteredTags([...tags])
        setFilteredUsers([...users])
        let tagList = targetContact.tags.map(tag => tag.tag_id.toString())
        let userList = targetContact.agents.map(agent => agent.user_id.toString())
        setSelectedTags(tagList)
        setSelectedUsers(userList)
    }

    useEffect(async () => {
        if (authStore.isAuth) {
            onLoad()
        }
    }, []);

    const toggleSelectTags = async e => {
        let newValue

        const {  id } = e.target;

        if(selectedTags.includes(id)){
            newValue = selectedTags.filter(t=>t!==id)
            setSelectedTags(newValue);
            return
        }
        newValue = [...selectedTags, id]
        setSelectedTags(newValue);
    };
    const toggleSelectUsers = async e => {

        let newValue

        const {  id } = e.target;

        if(selectedUsers.includes(id)){
            newValue = selectedUsers.filter(t=>t!==id)
            setSelectedUsers(newValue);
            return
        }
        newValue = [...selectedUsers, id]
        setSelectedUsers(newValue);

    };

    const fetchNotes = async (data)=>{
        await API.graphql(graphqlOperation(listNotesTables ,{filter:{customer_id: {eq:data} } , limit:1000})).then(res=>{
            setNotes(prev=>res.data.listNotesTables.items)
        }).catch(err=>console.log(err))
    }

    const dropNote = async (input)=>{
        const res = API.graphql(graphqlOperation(createNotesTable , {input:input})).then(res=>{
            setNotes(prev=>[...prev , res.data.createNotesTable])
        }).catch(err=>console.log(err))
    }

    const renderTags = ()=>{
        let vals = tags.filter(t=>selectedTags.includes(t.tag_id.toString()))
        return showTags.map((val , index)=><Pill key={index} color="vip">{val.tag_name}</Pill>)
    }

    const renderUsers = ()=>{

        if(showUsers.length > 0) return showUsers.map((val , index)=> (
            <Tooltip  style={{ pointerEvents: "null" }} key={index} title={val.username} placement="top-start">
                <Avatar className={"mf_bg_warning mf_color_warning text-center"} sx={{ width: 25, height: 25, fontSize: 14 }} >{val.username.substring(0, 2).toUpperCase()}</Avatar>
            </Tooltip>
        ))

    }

    const isContainTags = e => {

        return selectedTags.includes(e.target.tag_id)

    }
    const isContainUser = e=> {

        return selectedUsers.includes(e.target.tag_id)

    }

    const submitNote = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const input = {
            customer_id:  data.customer_id ,
            message:writenote ,
            user_id :user.user.user_id,
            timestamp:  (Date.now()/1000).toString() ,
            signed_name:user.user.username} ;
        await dropNote(input)  ;
        setWritenote("")
    }

    return (<>
        <div className={"infoBox"} style={props.tab == "info" ? { display: "block" } : { display: "none" }} >
            <div className="contactInfo">
                <div className={"keyList"} >
                    <div className={"keys"} >Phone Number</div>
                    <div className={"keys"} >Email</div>
                    <div className={"keys"} >Birthday</div>
                    <div className={"keys"} >Address</div>
                    <div className={"keys"} >Country</div>
                    <div className={"keys"} >Created Date</div>
                </div>
                <div className={"valueList"} style={{}}>
                    <div className={"values"}>{targetContact.phone}</div>
                    <div className={"values"}>{targetContact.email}</div>
                    <div className={"values"}>{targetContact.birthday}</div>
                    <div className={"values"}>{targetContact.address}</div>
                    <div className={"values"}>{targetContact.country}</div>
                    <div className={"values"}>{new Date(targetContact.created_at*1000).toLocaleDateString('en-US')}</div>
                </div>
            </div>
            <div style={{ width: "110%", height: "1px", backgroundColor: "#d3d3d3", marginBottom: ".5rem", marginLeft: "-10px" }}></div>
            <div className={"assignedInfo"}>

                <div>Assignee</div>

                <div className={"tagsGroup"} style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>



                    <Mf_circle_btn isDisable={disable}  handleChange={(e) => {
                            const new_data = users.filter(i => i.username.toLowerCase().includes(e.target.value.toLowerCase()))
                            setFilteredUsers(new_data)
                    }} >

                        {filteredUsers && filteredUsers.map((user,index) => {
                            return (<li key={user.username}>
                                <div style={{ display: "flex", gap: 10 }}>
                                    <Tooltip key={user.username+index} className={""} title={user.username} placement="top-start">
                                        <Avatar className={"mf_bg_warning mf_color_warning text-center"} sx={{ width: 25, height: 25, fontSize: 14 }} >{user.username.substring(0, 2).toUpperCase()}</Avatar>
                                    </Tooltip>
                                    <div className={"name"}>{user.username}</div>
                                </div>
                                <div className="newCheckboxContainer">

                                    <label className="newCheckboxLabel"> <input type="checkbox" value={user.user_id} id={user.user_id} name="checkbox"  checked={selectedUsers.includes(user.user_id.toString())} onChange={toggleSelectUsers} />
                                    </label>
                                </div>
                            </li>)
                        })}
                    </Mf_circle_btn>
                    {/* <AvatarGroup className={"AvatarGroup"} sx={{ display: 'flex', flexDirection: 'row-reverse', width: "fit-content", margin: "10px 0" }} spacing={-5} > */}
                    <div className={"avaGroupInstead"} >
                        {/*{selectedUsers && selectedUsers.map((agent, index) => {*/}

                        {/*    return (*/}
                        {/*        <Tooltip onClick={null} style={{ pointerEvents: "null" }} key={index} title={agent.username} placement="top-start">*/}
                        {/*            <Avatar className={"mf_bg_warning mf_color_warning text-center"} sx={{ width: 25, height: 25, fontSize: 14 }} >{agent.username.substring(0, 2).toUpperCase()}</Avatar>*/}
                        {/*        </Tooltip>*/}
                        {/*    )*/}
                        {/*})}*/}
                        {users&&selectedUsers.length !=0 &&renderUsers()}
                        </div>
                    {/* </AvatarGroup> */}
                </div>

                <div className="tagssss">Tags</div>
                <div className={"tagsGroup"} style={{ display: "flex", maxWidth: "230px", height: "8vw", marginTop:"18px"}} >

                        <Mf_circle_btn isDisable={disable} switchs={() => { setUnread(!unread) }} handleChange={(e) => {
                           console.log(tags,"alltags")
                        //    const new_data = alltags.filter(i => i.tag_name.toLowerCase().includes(e.target.value.toLowerCase()))
                        //    setFilteredTags(new_data)
                        }}>

                            {filteredTags.map((tag, index) => {

                                return (<li key={index+index}>
                                    <Pill onClick={null} key={tag.tag_id+index} color="vip">{tag.tag_name}</Pill>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" value={tag.tag_name}  id={tag.tag_id} name="checkbox" checked={selectedTags.includes(tag.tag_id.toString())}  onChange={toggleSelectTags} />
                                        </label>
                                    </div>
                                </li>)
                            })}

                        </Mf_circle_btn>


                    <div style={{paddingTop:"3px"}} >
                        {/*{selectedTags.length != -1 && selectedTags.map(tag => alltags*/}
                        {/*    .find(t=>t.tag_id.toString() == tag)).map((tag, index) => {*/}
                        {/*    return <Pill key={index} color="vip">{tag.tag_name}</Pill>*/}
                        {/*})}*/}
                        {tags&&selectedTags.length!==0&& renderTags()}
                    </div>
                </div>


            </div>
        </div>

        <div className={'noteBox'} style={tab == "note" ? { display: "block" } : { display: "none" }}>
            <div className={"notesVolumn"}>Note : {notes.length}</div>
            <div className={"write_pad"}>
                <input type="text" value={writenote} className={"write_note"} onChange={(e) => setWritenote(e.target.value)} placeholder={"Write a note..."}>
                </input>

                {/*<div onClick={() => { setWritenote(notes.push({ cid: user.user.phone, wroteBy: user.user.username, "date": new Date().toISOString().slice(0, 10), content: writenote })), setWritenote("") }}>*/}
                <div onClick={submitNote}>
                    <NoteButtonSVG />

                </div>

                {/* eslint-disable-next-line react/no-unescaped-entities */}
            </div>
            <div style={{ maxHeight: "50vh", overflowY: "auto", minWidth: "230px" }}>
                {notes.map((note) => {
                    return (
                        <div key={note.note_id}>
                            <div className={"message_pad"}>
                                <div className={"left nameTag"}>
                                    <Tooltip key={note.note_id+"key"} className={""} title={note.signed_name} placement="top-start">
                                        <Avatar className={"mf_bg_warning mf_color_warning tag "} sx={{ width: 50, height: 50, fontSize: 20, padding: "0rem" }} >{note.signed_name.slice(0,2).toUpperCase()}</Avatar>
                                    </Tooltip>
                                </div>


                                <div className={"right"}>
                                    <div className={"listitem name "}>
                                        <div className={"left"}>{note.signed_name}</div>
                                        {/* <div className={"left"}>{props.name}</div> */}
                                        <div className={"right"}>{ new Date(parseInt(note.timestamp)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </div>

                            </div>


                            <div className={"message_box"}>
                                <div className={"message"} style={tab == "note" ? { display: "flex" } : { display: "none" }}>{note.message}</div>
                            </div>


                        </div>)
                })}
            </div>
        </div>
    </>

    )
}
