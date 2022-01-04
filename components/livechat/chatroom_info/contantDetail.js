
import { useContext, useEffect, useState } from "react";
import { AvatarGroup, ListItem } from "@mui/material";
import { display, flexbox } from "@mui/system";
import { NoteButtonSVG } from "../../../public/livechat/MF_LiveChat_Landing/chat_svg";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Pill } from "../../Pill";
import Mf_circle_btn from "../../mf_circle_btn";
import { GlobalContext } from "../../../context/GlobalContext";
import {API, graphqlOperation} from "aws-amplify";
import {listNotesTables} from "../../../src/graphql/queries";
import {createNotesTable} from "../../../src/graphql/mutations";


export default function ContantDetail({ data, ...props }) {

    const notesData = ([{ id: "dsafdsfd", wroteBy: "Lawrance", date: "2012-12-10", content: "Today is 20th December 2021. Chrismas's eva is coming in town. lalala. Come to visit us." }, { id: "dsafds32", wroteBy: "Maric", date: "2021-10-09", content: "Nice to meet you." },])
    const [notes, setNotes] = useState([])
    const [writenote, setWritenote] = useState("")
    const [disable, setDisable] = useState(false)
    const [start, setStart] = useState(false)
    const [users, setUsers] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [filteredTags, setFilteredTags] = useState([])
    const [alltags, setAlltags] = useState([])

    const [selectedUsers, setSelectedUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [alluser, setAlluser] = useState([])
    const [contact, setContact] = useState([]);
    const [unread, setUnread] = useState(false)
    const [unassigned, setUnAssigned] = useState(false)
    const { userInstance, tagInstance, contactInstance, orgInstance, user } = useContext(GlobalContext);

    const getTags = async () => {
        const data = await tagInstance.getAllTags()
        setFilteredTags(data)
        setAlltags(data)
    }
    const getUsers = async () => {
        const data = await userInstance.getAllUser()
        setFilteredUsers(data)
        setAlluser(data)
    }
    const fetchContact = async (cid) => {
        const data = await contactInstance.getContactById(cid)
        setContact(data)
        const { tags, agents } = data
        setSelectedTags(tags)
        setSelectedUsers(agents)
    }
    useEffect(async () => {
        if (user.token != null) {
            await getTags()
            await getUsers()
        }
    }, []);
    useEffect(async () => {
        if (!start) { return setStart(true) }
        if (data && user.token) { await fetchContact(data.customer_id);await fetchNotes(parseInt(data.customer_id.slice(3)))
        }
        if (data.customer_id == null) setDisable(true)
        else
            setDisable(false)

    }, [data])

    const toggleSelectTags = async e => {
        const { checked, id } = e.target;
        console.log(typeof(id))
        const tag = await tagInstance.getTagById(parseInt(id))
        // get all selectedtags.tag_id
        console.log(tag,"tag tag")
        setSelectedTags([...selectedTags, tag]);
        // const uploadTags = {
        //     tag_id: tag.tag_id,
        //     tag_name: tag.tag_name,
        //     update_at: parseInt(tag.update_at),
        //     create_at: parseInt(tag.create_at)

        // }
        if (!checked) {
            setSelectedTags(selectedTags.filter(item =>  item.tag_id != parseInt(id) ));

            console.log(contact.customer_id, tag.tag_id)
            const res = await contactInstance.deleteCustomerTag(contact.customer_id, [tag.tag_id])
        }else{

            const res = await contactInstance.updateContactTags(contact.customer_id, [tag.tag_id])
            console.log(res)
        }
    };
    const toggleSelectUsers = async e => {

        const { checked, id } = e.target;

        const user = filteredUsers.find(t => t.user_id == id)
        setSelectedUsers([...selectedUsers, user]);

        if (!checked) {
            setSelectedUsers(selectedUsers.filter(u => { return u.user_id != id }));


            await contactInstance.deleteCustomerAgent(contact.customer_id, [user.user_id])

        }else{

            await contactInstance.updateContactAgent(contact.customer_id, [user.user_id])
        }
    };
    useEffect(async () => {

        if (unassigned) {

            const data = { ...contact, agents: selectedUsers }
            //const res = await contactInstance.updateContact(data)
            setUnAssigned(!unassigned)
        }

    }, [unassigned])

    useEffect(async () => {
        if (unread) {

            const data = { ...contact, tags: selectedTags }
            //const res = await contactInstance.updateContact(data)
            setUnread(!unread)
        }

    }, [unread])
    const fetchNotes = async (data)=>{
        console.log(data)
        const res = API.graphql(graphqlOperation(listNotesTables ,{filter:{customer_id: {eq:data} }})).then(res=>{
            setNotes(prev=>res.data.listNotesTables.items)
        }).catch(err=>console.log(err))
        console.log("fetch notes" ,res)
    }

    const dropNote = async (input)=>{
        const res = API.graphql(graphqlOperation(createNotesTable , {input:input})).then(res=>{
            setNotes(prev=>[...prev , res.data.createNotesTable])
            console.log("create Note success")
        }).catch(err=>console.log(err))
    }

    useEffect(async () => {
        if (data.customer_id == null) setDisable(true)

    }, [])

    const isContainTags = (id) => {
        if (selectedTags != null) {
            return selectedTags.some(selectedtag => selectedtag.tag_id === id)
        } else return false
    }
    const isContainUser = (id) => {

        if (selectedUsers) {
            return selectedUsers.some(selecteduser => selecteduser.user_id == id)
        }
        else { return false }
    }
    const submitNote = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const input = {
            customer_id:  parseInt(data.customer_id.slice(3)) ,
            message:writenote ,
            user_id :parseInt(user.user.user_id.toString().slice(3)),
            timestamp:  Date.now().toString() ,
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

                    {/*{Object.keys(data).map((item=>(*/}
                    {/*    <>               */}
                    {/*    <div className={"keys"} style={{}}>{item}</div>*/}
                    {/*    </>*/}
                    {/*)))}*/}
                </div>
                <div className={"valueList"} style={{}}>

                    <div className={"values"}>{contact.phone}</div>
                    <div className={"values"}>{contact.email}</div>
                    <div className={"values"}>{contact.birthday}</div>
                    <div className={"values"}>{contact.address}</div>
                    <div className={"values"}>{contact.country}</div>
                    <div className={"values"}>{contact.created_at}</div>

                </div>
            </div>
            <div style={{ width: "110%", height: "1px", backgroundColor: "#d3d3d3", marginBottom: ".5rem", marginLeft: "-10px" }}></div>
            <div className={"assignedInfo"}>

                <div>Assignee</div>

                <div className={"tagsGroup"} style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>



                    <Mf_circle_btn isDisable={disable} switchs={() => { setUnAssigned(!unassigned) }} handleChange={(e) => {

                            const new_data = alluser.filter(i => i.username.toLowerCase().includes(e.target.value.toLowerCase()))
                            setFilteredUsers(new_data)


                    }} >

                        {filteredUsers && filteredUsers.map((user) => {
                            return (<li key={user.username}>
                                <div style={{ display: "flex", gap: 10 }}>
                                    <Tooltip key={user.username} className={""} title={user.username} placement="top-start">
                                        <Avatar className={"mf_bg_warning mf_color_warning text-center"} sx={{ width: 25, height: 25, fontSize: 14 }} >{user.username.substring(0, 2).toUpperCase()}</Avatar>
                                    </Tooltip>
                                    <div className={"name"}>{user.username}</div>
                                </div>
                                <div className="newCheckboxContainer">

                                    <label className="newCheckboxLabel"> <input type="checkbox" value={user.user_id} id={user.user_id} name="checkbox" onClick={toggleSelectUsers} checked={isContainUser(user.user_id)} onChange={() => { }} />
                                    </label>
                                </div>
                            </li>)
                        })}
                    </Mf_circle_btn>
                    {/* <AvatarGroup className={"AvatarGroup"} sx={{ display: 'flex', flexDirection: 'row-reverse', width: "fit-content", margin: "10px 0" }} spacing={-5} > */}
                    <div className={"avaGroupInstead"} >
                        {selectedUsers && selectedUsers.map((agent, index) => {

                            return (
                                <Tooltip onClick={null} style={{ pointerEvents: "null" }} key={index} title={agent.username} placement="top-start">
                                    <Avatar className={"mf_bg_warning mf_color_warning text-center"} sx={{ width: 25, height: 25, fontSize: 14 }} >{agent.username.substring(0, 2).toUpperCase()}</Avatar>
                                </Tooltip>
                            )
                        })}
                        </div>
                    {/* </AvatarGroup> */}
                </div>

                <div className="tagssss">Tags</div>
                <div className={"tagsGroup"} style={{ display: "flex", maxWidth: "230px", height: "8vw", marginTop:"18px"}} >

                        <Mf_circle_btn isDisable={disable} switchs={() => { setUnread(!unread) }} handleChange={(e) => {
                           console.log(alltags,"alltags")
                        //    const new_data = alltags.filter(i => i.tag_name.toLowerCase().includes(e.target.value.toLowerCase()))
                        //    setFilteredTags(new_data)
                        }}>

                            {filteredTags.map((tag, index) => {

                                return (<li key={index}>
                                    <Pill onClick={null} key={index} color="vip">{tag.tag_name}</Pill>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" value={tag.tag_name}  id={tag.tag_id} name="checkbox" checked={isContainTags(tag.tag_id)} onClick={toggleSelectTags} onChange={() => { }} />
                                        </label>
                                    </div>
                                </li>)
                            })}

                        </Mf_circle_btn>


                    <div style={{paddingTop:"3px"}} >
                        {selectedTags != -1 && selectedTags.map((tag, index) => {
                            return <Pill key={index} color="vip">{tag.tag_name}</Pill>
                        })}

                    </div>
                </div>


            </div>
        </div>

        <div className={'noteBox'} style={props.tab == "note" ? { display: "block" } : { display: "none" }}>
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
                                    <Tooltip key={note.note_id} className={""} title={note.signed_name} placement="top-start">
                                        <Avatar className={"mf_bg_warning mf_color_warning tag "} sx={{ width: 50, height: 50, fontSize: 20, padding: "0rem" }} >{note.signed_name.slice(0,2).toUpperCase()}</Avatar>
                                    </Tooltip>
                                </div>


                                <div className={"right"}>
                                    <div className={"listitem name "}>
                                        <div className={"left"}>{note.signed_name}</div>
                                        {/* <div className={"left"}>{props.name}</div> */}
                                        <div className={"right"}>{ new Date(parseInt(note.timestamp)).toLocaleTimeString()}</div>
                                    </div>
                                </div>

                            </div>


                            <div className={"message_box"}>
                                <div className={"message"} style={props.tab == "note" ? { display: "flex" } : { display: "none" }}>{note.message}</div>
                            </div>


                        </div>)
                })}
            </div>
        </div>
    </>

    )
}
