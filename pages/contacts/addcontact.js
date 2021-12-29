import {MF_Input,MF_Required_Input} from "../../components/Input";
import {Pill} from "../../components/Pill";
import * as React from "react";
import {CancelButton, IconButton, NormalButton2} from "../../components/Button";
import Link from "next/link"
import {useRouter} from "next/router";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {GlobalContext} from "../../context/GlobalContext";
import {AvatarGroup} from "@mui/lab";
import {Tooltip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AddIcon from '@mui/icons-material/Add';
import Mf_icon_dropdown_select_btn from "../../components/mf_dropdown_select";
import styles from "../../styles/Contacts.module.css";
import searchFilter from "../../helpers/searchFilter";
import MF_Select from "../../components/MF_Select";
import Mf_circle_btn from "../../components/mf_circle_btn";

export default function AddContact() {
    const [newContact , setNewContact] = useState({
        first_name:"",
        last_name:"",
        name:"",
        phone:"",
        email:"",
        birthday:"",
        gender:"",
        address:"",
        country:"",
        tags:[],
        Assignee:[]
    })
    const [users ,setUsers] =useState([])
    const [tags ,setTags] =useState([])
    const [selectedTags ,setSelectedTags] =useState([])
    const [selectedUsers ,setSelectedUsers] =useState([])
    const [filteredTags ,setFilteredTags] =useState([])
    const [filteredUsers ,setFilteredUsers] =useState([])
    const {userInstance ,adminInstance, user} = useContext(GlobalContext)

    const router = useRouter()

    const getTags = async ()=>{
        const data = await adminInstance.getAllTags()
        setTags(data)
        setFilteredTags(data)

    }
    const getUsers = async ()=>{
        const data = await userInstance.getAllUser()
        setUsers(data)
        setFilteredUsers(data)
    }

    useEffect(async ()=>{
        if(user.token){
            getTags()
            getUsers()
        }
    },[])
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
    function handleChange(evt) {
        const value = evt.target.value;
        setNewContact({
            ...newContact,
            [evt.target.name]: value,
            ["name"]:newContact.first_name+newContact.last_name
        });
        console.log(newContact)
    }
    async function handleSubmit (e){
        e.preventDefault()
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers"
        const name =` ${newContact.first_name} ${newContact.last_name}`
        const res = await axios.post(url , {...newContact,name , tags:selectedTags , agents:selectedUsers} ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })
        console.log(res)
        router.back()
    }
    function cancel(e){
        e.preventDefault()
        router.back()
    }
    return (
            <div className={"addContactSession"}>
            <div className="addContactSession_info_ss addContactSession_ss">
                {/* new form */}
                <form onSubmit={handleSubmit}  >

                

                <div className={"addContactSession_info_ss"}> 
                        <div className="ss_row addContactSession_title">

                            New Contact
                        </div>
                        <div className={"ss_row"}>
                            
                            <MF_Required_Input title="First Name*" name={"first_name"} value={newContact.first_name} onChange={handleChange} />
                            <MF_Required_Input title="Last Name*" name={"last_name"} value={newContact.last_name} onChange={handleChange}/>

                        </div>
                    <div className={"ss_row"}>
                        <MF_Required_Input title="Phone*" name={"phone"} value={newContact.phone} placeholder={"e.g. 852XXXXXXXX"} pattern={"^852[0-9]{8}$"} onChange={handleChange}/>
                        <MF_Input title="Email" name={"email"} value={newContact.email} pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"} onChange={handleChange}/>
                    </div>
                    <div className={"ss_row"}>
                        <MF_Input title="Birthday" type={"date"} name={"birthday"} value={newContact.birthday} onChange={handleChange} placeholder={"dd/mm/yyyy"}/>
                        <MF_Input title="Gender" name={"gender"} value={newContact.gender} onChange={handleChange} placeholder={"M or F"}/>
                    </div>
                        <span className="longInput"><MF_Input title="Address" name={"address"} value={newContact.address} onChange={handleChange}/></span>
                        <MF_Input title="Country" name={"country"} value={newContact.country} onChange={handleChange} />

                    </div>
                    <div className={"ss_row submit_row"}>
                        <button type="submit" value="Submit">+ New Contact</button>
                        <Link href="/contacts"><button className={"mf_bg_light_grey mf_color_text"} onClick={cancel}>Cancel</button></Link>
                    </div>
                </form>
            </div>

                <div className={"addContactSession_ss  addContactSession_tags_ss"}>
                            <div className={"addContactSession_title"}>Tags & Assignee</div>
                        <div className={"tagsGroup"} style={{marginBottom:"30px"}} >
                            <p>Tags</p>
                            <div className={"tagsGroup"}  style={{width:"100%",height:"30px"}} >
                                {selectedTags!=-1&&selectedTags.map((tag)=>{
                                    return<Pill key={tag} color="vip">{tag}</Pill>
                                })}
                                    </div>
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
                        <div className={"tagsGroup"}>
                            <p>Assignee</p>
                            <div className={"tagsGroup"}>
                                <AvatarGroup className={"AvatarGroup"} xs={{flexFlow:"row",justifyContent:"flex-start"}}  spacing={1} >
                                    {selectedUsers!=-1 &&selectedUsers.map((agent , index)=>{
                                        return(
                                            <Tooltip key={index} className={""} title={agent} placement="top-start">
                                                <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{agent.substring(0,2).toUpperCase()}</Avatar>
                                            </Tooltip>
                                        )
                                    })}

                                </AvatarGroup>

                                <Mf_circle_btn handleChange={(e)=>{ userSearchFilter(e.target.value , users,(new_data)=>{
                                    setFilteredUsers(new_data)
                                })}} >
                                    {filteredUsers.map((user)=>{
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
                            </div>
                        </div>
                </div>

            </div>
    )
}