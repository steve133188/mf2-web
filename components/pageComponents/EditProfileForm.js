import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {MF_Input} from "../Input";
import Link from "next/link";
import * as React from "react";
import {Pill} from "../Pill";
import {AvatarGroup} from "@mui/lab";
import {Tooltip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {IconButton} from "../Button";
import AddIcon from "@mui/icons-material/Add";
import {GlobalContext} from "../../context/GlobalContext";
import Mf_circle_btn from "../mf_circle_btn";

export default function EditProfileForm({data , toggle}){

    const [editContact , setEditContact] = useState(data)
    const [users ,setUsers] =useState([])
    const [tags ,setTags] =useState([])
    const [selectedTags ,setSelectedTags] =useState([])
    const [selectedUsers ,setSelectedUsers] =useState([])
    const [filteredTags ,setFilteredTags] =useState([])
    const [filteredUsers ,setFilteredUsers] =useState([])
    const {userInstance ,tagInstance,contactInstance, user} = useContext(GlobalContext)


    const getTags = async ()=>{
        const data = await tagInstance.getAllTags()
        setTags(data)
        setFilteredTags(data)

    }
    const getUsers = async ()=>{
        const data = await userInstance.getAllUser()
        console.log(data,"User fetch")
        setUsers(data)
        setFilteredUsers(data)
    }

    useEffect(async ()=>{
        if(user.token){
            await getTags()
            await getUsers()
            if(editContact.agents)setSelectedUsers(editContact.agents)
            if(editContact.tags)setSelectedTags(editContact.tags)
        }
        console.log(data,"contact bring in")

    },[])
    const toggleSelectTags = (e , data)  => {
        const { checked ,id} = e.target;
        console.log(id)
        setSelectedTags(selectedTags=>[...selectedTags, data]);
        if (!checked) {
            setSelectedTags(selectedTags.filter(item => {console.log(item,"select");return item.tag_id !== parseInt(id)}));
        }
        console.log(selectedTags)
    };
    const toggleSelectUsers = (e , data)  => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, data]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item.user_id !== data.user_id));
        }
        console.log(selectedUsers)
    };
    function userSearchFilter(keyword , data ,callback ){
        if(keyword.includes(":")){
            console.log("trigger regex search")
        }
        const newData = data.filter(d=> {
            if(keyword.trim() == ""){
                return data
            }
            return d.username.toLowerCase().includes(keyword)
        })
        callback(newData)
    }
    function tagSearchFilter(keyword , data ,callback ){
        if(keyword.includes(":")){
            console.log("trigger regex search")
        }
        const newData = data.filter(d=> {
            if(keyword.trim() == ""){
                return data
            }
            return d.tag.toLowerCase().includes(keyword)
        })
        callback(newData)
    }
    const isContainTags = (id) => {
        if (selectedTags != null) {
            return selectedTags.some(selectedtag => selectedtag.tag_id === id.tag_id)
        } else return false
    }
    const isContainUser = (id) => {

        if (selectedUsers) {
            return selectedUsers.some(selecteduser => selecteduser.user_id == id.user_id)
        }
        else { return false }
    }

    function handleChange(evt) {
        const value = evt.target.value;
        setEditContact({
            ...editContact,
            [evt.target.name]: value,
            ["name"]:editContact.first_name+editContact.last_name
        });
    }
    async function handleSubmit (e){
        // e.preventDefault()
    console.log(editContact)
        const name =` ${editContact.first_name} ${editContact.last_name}`
        const data = {...editContact,name , tags:selectedTags , agents:selectedUsers}
        console.log(data,"edit data")
        const res = await contactInstance.updateContact (data)
            console.log(res)

    }
    function cancel(e){
        e.preventDefault()
        toggle()
        // router.back()
    }
    return (
        <div className={"addContactSession"} style={{backgroundColor:'white'}}>
            <div className="addContactSession_info_ss addContactSession_ss">
                <div className={"addContactSession_info_ss "}>
                    <div className="ss_row addContactSession_title">
                        Edit Contact
                    </div>
                    <div className={"ss_row"}>
                        <MF_Input title="First Name*" name={"first_name"} value={editContact.first_name} onChange={handleChange}/>
                        <MF_Input title="Last Name*" name={"last_name"} value={editContact.last_name} onChange={handleChange}/>

                    </div>
                    <div className={"ss_row"}>
                        <MF_Input title="Phone*" name={"phone"} value={editContact.phone} placeholder={"e.g. 852XXXXXXXX"} onChange={handleChange}/>
                        <MF_Input title="Email" name={"email"} value={editContact.email} onChange={handleChange}/>
                    </div>
                    <div className={"ss_row"}>
                        <MF_Input title="Birthday" type={"date"} name={"birthday"} value={editContact.birthday} onChange={handleChange} placeholder={"dd/mm/yyyy"}/>
                        <MF_Input title="Gender" name={"gender"} value={editContact.gender} onChange={handleChange} placeholder={"M or F"}/>

                    </div>
                    <span className="longInput"><MF_Input title="Address" name={"address"} value={editContact.address} onChange={handleChange}/></span>
                    <MF_Input title="Country" name={"country"} value={editContact.country} onChange={handleChange} />
                </div>

                <div className={"ss_row submit_row"}>
                    <button onClick={handleSubmit}>Save</button>
                    <Link href="/contacts"><button className={"mf_bg_light_grey mf_color_text"} onClick={cancel}>Cancel</button></Link>
                </div>
            </div>

            <div className={"addContactSession_ss  addContactSession_tags_ss"}>
                <div className={"addTagsGroup"}>
                    <div className={"addContactSession_title"}>Tags & Assignee</div>
                    <p>Tags</p>
                    <div className={"tagsGroup"} style={{width:"100%",height:"30px"}}>
                        {selectedTags!=-1&&selectedTags.map((tag)=>{
                            return<Pill key={tag.tag_id} color="vip">{tag.tag_name}</Pill>
                        })}

                    </div>
                        <Mf_circle_btn handleChange={(e)=>{ tagSearchFilter(e.target.value , tags,(new_data)=>{
                            setFilteredTags(new_data)
                        })}}>
                            {filteredTags.map((tag,index)=>{
                                return(<li key={tag.tag_id+index}><Pill key={tag.tag_id} color="vip">{tag.tag_name}</Pill>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" id={tag.tag_id} name="checkbox" checked={isContainTags(tag)} onClick={(e)=>toggleSelectTags(e , tag)} onChange={()=>{}}/>
                                        </label> </div></li>)
                            })}
                        </Mf_circle_btn>
                </div>
                <div className={"addTagsGroup"}>
                    <p>Assignee</p>
                    <div className={"tagsGroup"}>
                        {/* <AvatarGroup className={"AvatarGroup"} xs={{flexFlow:"row",justifyContent:"flex-start"}}  spacing={1} > */}
                           <div className={"avaGroupInstead"}>

                            {selectedUsers!=-1 &&selectedUsers.map((agent , index)=>{
                                return(
                                    <Avatar key={index} className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{agent.username&&agent.username.substring(0,2).toUpperCase()}</Avatar>
                                    )
                                })}

                                </div>
                        {/* </AvatarGroup> */}

                        <Mf_circle_btn handleChange={(e)=>{ userSearchFilter(e.target.value , users,(new_data)=>{
                            setFilteredUsers(new_data)
                        })}} >
                            {filteredUsers&&filteredUsers.map((user)=>{
                                return(<li key={user.user_id}>
                                    <div style={{display:"flex" ,gap:10}}>
                                        <Tooltip key={user.username} className={""} title={user.username} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{user.username.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                        <div className={"name"}>{user.username}</div>
                                    </div>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel"> <input type="checkbox" id={user.user_id} name="checkbox" checked={isContainUser(user)} onClick={(e)=>toggleSelectUsers(e, user)} onChange={()=>{}} />
                                        </label>
                                    </div>
                                </li>)
                            })}
                        </Mf_circle_btn>
                    </div>
                </div>
            </div>

        </div>
    )
}
