import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import Link from 'next/link';
import {ImportDropzone} from '../../components/ImportContact.js'
import styles from "../../styles/Contacts.module.css";
import SelectSession from "../../components/SelectSession";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Pill} from "../../components/Pill";
import MF_Select from "../../components/MF_Select";
import TableHead from "@mui/material/TableHead";
import Pagination from '@mui/material/Pagination';
import Profile from "../../components/profile";
import ProfileGrid from "../../components/pageComponents/ProfieGrid";
import EditProfileForm from "../../components/pageComponents/EditProfileForm";
import { Tooltip } from '@mui/material';
import {AvatarGroup} from "@mui/lab";
import Mf_icon_dropdown_select_btn from "../../components/common/mf_dropdown_select";
import searchContactsFilter from "../../helpers/searchContactsFilter";
import * as React from "react";
import Loading from "../../components/Loading";
import CancelConfirmation from "../../components/CancelConfirmation"
import DeletePad from "../../components/DeletePannel";
import {CSVLink, CSVDownload} from 'react-csv';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {renderAgentAVA} from "../../components/common/AgentAVA";
import {renderTags} from "../../components/common/RenderTags";
import {renderChannelsIcon} from "../../components/common/RenderChannelsIcon";
import {useRootStore} from "../../utils/provider/RootStoreProvider";

// import {getAllContacts} from "../../helpers/contactsHelper"

export default function Contacts() {
    const [isLoading, setIsLoading] = useState(true);

    // const {contactInstance , userInstance ,tagInstance ,orgInstance, user ,userAuth} = useContext(GlobalContext)
    const {contactsStore:{contacts ,init ,deleteContact, getAll},authStore:{user,auth ,isAuth, token} , tagStore,usersActionsStore , orgActionsStore} = useRootStore()
    const [filteredData , setFilteredData] = useState([])

    const [filter , setFilter] = useState({agent:[] , team:"" , channel:[] , tag:[] })

    const [useContact , setUseContact] = useState()
    const [isProfileShow , setIsProfileShow] = useState(false)
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)

    const [currentPage , setCurrentPage] = useState(1)
    const [selectedContacts , setSelectedContacts] = useState([])
    const [isShowDropzone, setIsShowDropzone] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [users ,setUsers] =useState([])
    const [tags ,setTags] =useState([])
    const [teams ,setTeams] =useState([])
    const [selectedTags ,setSelectedTags] =useState([])
    const [addedTags ,setAddedTags] =useState([])
    const [selectedUsers ,setSelectedUsers] =useState([])
    const [selectedTeams ,setSelectedTeams] =useState([])
    const [selectedChannel ,setSelectedChannel] =useState([])
    const [filteredTags ,setFilteredTags] =useState([])
    const [filteredUsers ,setFilteredUsers] =useState([])
    const [filteredChannel ,setFilteredChannel] =useState([])
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;

    let currentContacts= filteredData.slice(indexOfFirstTodo, indexOfLastTodo)

    const result =()=>{return currentContacts.map(d=>d.customer_id)}
    const [isDelete , setIsDelete] = useState(false)
    const [isDeleteMany , setIsDeleteMany] = useState(false)

    const advanceFilter =()=>{

        setFilter({team:selectedTeams, agent:[...selectedUsers] ,channel: [...selectedChannel] , tag:[...selectedTags]})

        const agentFiltered = contacts.filter(data=>{
            if(selectedUsers.length==0){
                return data
            }
            return data.agents_id.some(el=>selectedUsers.includes(el.toString()))
        })

        const tagFiltered = agentFiltered.filter(data=>{
           if(selectedTags.length==0){
               return data
           }
           if (data.tags_id && data.tags_id.length > 0){
               return data.tags_id.some(el=>selectedTags.includes(el.toString()))
           }
        }
        )


        const channelFiltered = tagFiltered.filter(data=>{
            if(selectedChannel.length ==0){
                return data
            }
            return selectedChannel.some(el=>data.channels?data.channels.includes(el):false)
        })

        const teamFiltered = channelFiltered.filter(data=>{
            if(selectedTeams.length ==0){
                return data
            }
            if(selectedTeams[0].id==0) return data.agents_id.length==0
            return data.team_id == selectedTeams[0].id
        })

        setFilteredData([...teamFiltered])
    }

    const channels = [
        // name:"WhastApp",value:"All",channelID:"All",id:0},
                {name:"WhastApp",value:"Whatsapp",channelID:"Whatsapp",id:1},
                {name:"WhatsApp Business",value:"WABA",channelID:"WhatsappB",id:2},
                {name:"Messager",value:"Messager",channelID:"Messager",id:3},
                {name:"WeChat",value:"Wechat",channelID:"Wechat",id:4},];

    const renderUsers = ()=>{

        return<AvatarGroup className={"AvatarGroup"} xs={{flexFlow:"row",justifyContent:"flex-start"}} max={5} spacing={"1"} >
            {selectedUsers.map((agent, index) => {
                const user = users.find(u=>{
                    return u.user_id.toString() === agent
                })
                return (
                    <Tooltip key={index} className={""} title={user.username} placement="top-start">
                        <Avatar className={"mf_bg_warning mf_color_warning text-center 123"} sx={{
                            width: 22,
                            height: 22,
                            fontSize: 14
                        }}>{user.username.substring(0, 2).toUpperCase()}</Avatar>
                    </Tooltip>
                )
            })}
        </AvatarGroup>
    }
    const renderSelectedTags=() => {

        return selectedTags!=-1&&selectedTags.map((tag)=>{

            const selected = tags.find(t=>t.tag_id.toString() === tag)

            return<Pill key={tag} color="vip">{selected.tag_name}</Pill>
        })
    }

    const renderChannels=() => {
        return selectedChannel!=-1&&selectedChannel.map((channel , index)=>{
            return<div key={index}><img style={{width:'18px',margin:'3px'}}src={`/channel_SVG/${channel}.svg`} /></div>
        })
    }
    const getTags = async ()=>{
        await tagStore.getTags()
        setTags(tagStore.tags)
        setFilteredTags(tagStore.tags)

    }
    const getUsers = async ()=>{
        await usersActionsStore.getAll()

        setUsers(usersActionsStore.users)
        setFilteredUsers(usersActionsStore.users)
    }
    const getTeams = async ()=>{
        await orgActionsStore.getOrgTeams()

        setTeams(orgActionsStore.teams)
    }

    const getChannels = async ()=>{
        // const data = await orgInstance.getOrgTeams()
        setFilteredChannel(channels)
    }


    useEffect(async () => {
        if(isAuth) {
            await getAll()
            await getTags()
            await getUsers()
            await getTeams()
            await getChannels()
            // await getChannels ()
            // await fetchContacts()
        }
        setFilteredData([...contacts])
        setSelectedUsers([])
        setSelectedContacts([])
        if(isLoading){
            setTimeout(function() { //Start the timer
                setIsLoading(false);
            }.bind(this), 100)
        }
    },[isAuth]);

    const toggleSelect = e => {
        const { checked ,id} = e.target;

        setSelectedContacts(selectedContacts=>[...selectedContacts, id]);
        if (!checked) {
            setSelectedContacts(selectedContacts=>selectedContacts.filter(item => item !== id));
        }

    };
    const toggleSelectChannel = e => {
        const { checked ,id} = e.target;
        setSelectedChannel([...selectedChannel, id]);
        if (!checked) {
            setSelectedChannel(selectedChannel.filter(item => item !== id));
        }

    };
    const toggleSelectAll = e => {
        const currContactsId = currentContacts.map(c => c.customer_id.toString())
        const all = currContactsId.every(el=>selectedContacts.includes(el))
        console.log("all " , all)
        if (all) {
            selectedContacts.filter(se=>!currContactsId.includes(se))
            return
        }
        setSelectedContacts([...selectedContacts , ...currContactsId]);


    };
    const toggleSelectTags = e => {
        const { checked ,id} = e.target;
        if (!checked) {
            setSelectedTags(selectedTags.filter(item => item !== id));
            return
        }
        setSelectedTags([...selectedTags, id]);

    };
    const toggleAddTags = e => {
        const { checked ,id} = e.target;
        setAddedTags([...addedTags, id]);
        if (!checked) {
            setAddedTags(addedTags.filter(item => item !== id));
        }

    };
    const toggleSelectUsers = e => {
        const { checked ,id} = e.target;

        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
            return
        }
        setSelectedUsers([...selectedUsers, id]);

    };
    const toggleSelectTeams = e => {

        const { checked ,id} = e.target;

        if(selectedTeams.includes(id)){
            setSelectedTeams(selectedTeams.filter(item => item !== id));
            return
        }
        setSelectedTeams(prev=>[...selectedTeams, id]);
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
        }
        const newData = data.filter(d=> {
            if(keyword.trim() == ""){
                return data
            }
            // console.log(d, "trigger regex search")
            return d.tag_name.toLowerCase().includes(keyword)
        })
        callback(newData)
    }
    const toggleProfile = (key) =>{
        if(!isProfileShow) setUseContact(key)
        setIsProfileShow(!isProfileShow)
    }
    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) setUseContact(key);
        if(isEditProfileShow) await getAll();
        setIsEditProfileShow(!isEditProfileShow)
    }
    const toggleDelete = (id)=>{
        setIsDelete(!isDelete)
        setDeleteID(id)
    }
    const toggleDeleteMany =()=>{
        setIsDeleteMany(!isDeleteMany)
    }
    const removeContact = async (id)=>{
        await deleteContact(id)
        // const res =await contactInstance.deleteContact (id)
        setDeleteID("")
        await getAll()
        let newValue = filteredData.filter(contact => contact.customer_id!==id)
        setFilteredData(newValue)

    }

    const removeManyContact = async ()=>{

        // const res =await contactInstance.deleteContacts(selectedContacts)
        setSelectedContacts([])

        // await fetchContacts()

    }
    const default_cols = [ "Customer ID" ,"ECMID" ,'Name' , 'Channels','Tags' ,'Assignee']
    const [isSelectRow, setSelectRow] = useState( false);

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }
    function toggleDropzone() {
        setIsShowDropzone(!isShowDropzone);
    }
    const clearFilter=async()=>{
        setSelectedTeams([]);setSelectedTags([]);setSelectedChannel([]);advanceFilter();
        setFilteredData(contacts);
        setSelectedUsers([])
        setSelectedContacts([])

    }
    useEffect(()=>{
        advanceFilter()
    },[selectedTeams , selectedUsers, selectedChannel , selectedTags])

    const editSVG =(
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#2198fa"
             cursor="pointer"
             className="bi bi-upload" viewBox="0 0 16 16">
            <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path
                d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
        </svg>
    )

    const deleteSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f46a6b"
             cursor="pointer"
             className="bi bi-trash" viewBox="0 0 16 16"
             onClick={null}>
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    )

    const toggleSelectAllChannels = (e) => {
        const { checked ,id} = e.target;
        setSelectedChannel(["all","Whatsapp","WABA","Wechat","Messager"]);
        if (!checked) {
            setSelectedChannel([]);
        }
    };
    // useEffect(() => {
    //     NotificationManager.info('Info message');
    // },[]);
    // confirmation
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [deleteID, setDeleteID] = useState()


    return (
        <div className={styles.layout}  style={{maxWidth:"2200px"}}>
            {isLoading?(<Loading state={"preloader"}/> ): (<Loading state={"preloader preloaderFadeOut"}/>)}

                    {/* <NotificationContainer/> */}

            {/*{isOpenConfirmation?(<CancelConfirmation  onClose={closeConfitmation} onConfirm={removeContact} data={deleteID}/>):null}*/}
            {isProfileShow?           ( <Profile handleClose={async ()=>{toggleProfile(); await getAll()}}><ProfileGrid data={useContact} agants={users} tags={tags} agents={users} tesms={teams} toggle={toggleEditProfile}/></Profile>):null}
            {isEditProfileShow?           ( <Profile handleClose={toggleEditProfile}><EditProfileForm data={useContact} agants={users} tags={tags} agents={users} tesms={teams} toggle={toggleEditProfile}/></Profile>):null}
            <span style={{display: isShowDropzone ? "block" : "none"}}>
                {/*DND Import Data start */}
                <ImportDropzone title={"Import Contacts"} onClose={toggleDropzone} accept={".csv,.xlsx,.xls"} isShowDropzone={isShowDropzone} setIsShowDropzone={setIsShowDropzone}/>
                {/*DND Import Data end */}
            </span>
             <DeletePad show={isDeleteMany} reload={getAll} toggle={toggleDeleteMany } submit={removeManyContact} data={selectedContacts} title={"Contacts"}/>
             <DeletePad show={isDelete} reload={getAll} toggle={toggleDelete } deleteId={deleteID} submit={removeContact}  title={"Contacts"}/>
            <div className={"search_session"}>
                <div className="search">
                    <div className="mf_icon_input_block  mf_search_input">
                        <div className={"mf_inside_icon mf_search_icon "} > </div>
                        <input
                            className={"mf_input mf_bg_light_grey"}
                            type="search"
                            name={"keyword"}
                            onChange={(e)=> {
                                searchContactsFilter(e.target.value , contacts,(new_data)=>{
                                    setFilteredData(new_data)
                                    setCurrentPage(1)
                                })
                            }}
                            placeholder={"Search Name"}
                        />
                    </div>
                </div>
                <div className={"btn_group"}>
                    {!isSelectRow ? (
                        <button onClick={toggleSelectRow} className={"mf_bg_light_blue mf_color_blue"}> Select </button>
                    ) : (
                        <button  onClick={toggleSelectRow} className={"mf_bg_light_grey mf_color_text"}> Cancel</button>
                    )}
                    <button onClick={toggleDropzone} className={"mf_bg_light_blue mf_color_blue"}>Import</button>
                    <Link href="/contacts/addcontact"><button>+ New Contact</button></Link>
                </div>
            </div>
            {/* drag and drop end*/}
            <SelectSession
                btn={isSelectRow?(<div className={"select_session_btn_group"}>
                    <div className={"select_session_btn"}>

                        </div>
                 <div className={"select_session_btn"}>
                        {/* <button onClick={()=>{console.log(contacts.filter(d => selectedContacts.includes(d.customer_id.toString())).map(d => d.agents=d.agents.user_name))}}>click me</button> */}
                        <CSVLink data={contacts.filter(d => selectedContacts.includes(d.customer_id.toString()))} filename={"contact.csv"} >{editSVG}</CSVLink>
                    </div>
                    <div className={"select_session_btn"}><div svg={deleteSVG} onClick={toggleDeleteMany}>{deleteSVG}</div> </div>
                </div>):null}
            >
            <div className="top_bar">

                <div className="top_bar_left" >
                   <MF_Select top_head={selectedUsers.length!=0? renderUsers():"Agents"} head={"Agents"} submit={advanceFilter}handleChange={(e)=>{userSearchFilter(e.target.value , users,(new_data)=>{
                        setFilteredUsers(new_data)
                    })}}>
                        <div>Agents

                            {/* <DivisionDropDown data={division} division={"divisionSelect"} team={toggleSelectTeams} agents={toggleSelectUsers} clear={ ()=>{}} isclear={()=>{}} /> */}
                        </div>

                        {filteredUsers&&filteredUsers.map((user , index)=>{
                            return(<li key={index}>
                                <div style={{display:"flex" ,gap:10}}>
                                    <Tooltip key={user.username} className={""} title={"a"} placement="top-start">
                                        <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:23 , height:23 ,fontSize:12}} >{user.username.substring(0,2).toUpperCase()}</Avatar>
                                    </Tooltip>
                                    <div className={"name"}>{user.username}</div>
                                </div>
                                <div className="newCheckboxContainer">
                                    <label className="newCheckboxLabel"> <input type="checkbox" value={user.user_id} id={user.user_id} name="checkbox" checked={selectedUsers.includes(user.user_id.toString())} onClick={toggleSelectUsers} onChange={()=>{}}/>
                                    </label>
                                </div>
                            </li>)
                        })}
                    </MF_Select>
                        <MF_Select head={"Teams"} top_head={selectedTeams.length ==0?"Teams":selectedTeams[0].name }  submit={advanceFilter}  customeDropdown={"oneChoice"}>
                        <li onClick={()=> {

                        setSelectedTeams([]);
                        advanceFilter()
                    }}
                        style={{cursor:"pointer",width:"200px",liststyle:" inside"}}
                        >All</li>
                        <li id={"noassign"}  key={"na"} onClick={(e)=>{setSelectedTeams([{name:"No Assigned",id:0}]) }} style={{cursor:"pointer",liststyle:" inside"}}> No Assigned</li>
                    {teams.map((team , index)=>{
                        return(<li id={team.org_id}  key={index} style={{cursor:"pointer",liststyle:" inside"}} onClick={(e)=>{console.log("teams check",team);setSelectedTeams([{name:team.name,id:team.org_id}]) }}> {team.name}</li>)
                    })}
                        </MF_Select>
                        <MF_Select top_head={selectedChannel.length!=0? renderChannels() :"Channels"} submit={advanceFilter} head={"Channels"} >
                        <li key={"all"}> <div style={{display:"flex",alignItems:"center" }}>
                        <img key={"all"} width={18} height={18} src={`/channel_SVG/All.svg`}  alt="" style={{maring:"0 3px"}}/>
                        All Channels
                        </div>
                        <div className="newCheckboxContainer">
                        <label className="newCheckboxLabel">
                        <input type="checkbox" key={"all"}  id={"all"} value={"all"} name="checkbox" checked={selectedChannel.includes("all")} onClick={toggleSelectAllChannels} onChange={()=>{}} />
                        </label>
                        </div>
                        </li>
                    {filteredChannel.map((tag , index)=>{
                        return(<li key={index}><div>  <img key={"id"} width="20px" height="20px" src={`/channel_SVG/${tag.channelID}.svg`}  alt=""/>
                    {tag.name}</div>
                        <div className="newCheckboxContainer">
                        <label className="newCheckboxLabel">
                        <input type="checkbox" id={tag.value} value={tag.value} name="checkbox" checked={selectedChannel.includes(tag.value)} onClick={toggleSelectChannel}  onChange={()=>{}}/>
                        </label> </div></li>)
                    })}
                        </MF_Select>
                        <MF_Select top_head={selectedTags.length!=0? renderSelectedTags():"Tags"} submit={advanceFilter} head={"Tags"} handleChange={(e)=>{ tagSearchFilter(e.target.value , tags,(new_data)=>{
                        setFilteredTags(new_data)
                    })}} >
                    {filteredTags.map((tag , index)=>{
                        return(<li key={index}><Pill size="30px"  color="vip">{tag.tag_name}</Pill>
                        <div className="newCheckboxContainer">
                        <label className="newCheckboxLabel">
                        <input type="checkbox" id={tag.tag_id} value={tag.tag_id} name="checkbox" checked={selectedTags.includes(tag.tag_id.toString())} onClick={toggleSelectTags} onChange={()=>{}} />
                        </label> </div></li>)
                    })}
                        </MF_Select>



                    <button onClick={clearFilter} className={"mf_bg_light_blue mf_color_blue"} style={{margin:"0 1rem",padding:"0",minWidth:"8rem",maxWidth:"102rem",maxHeight:"50px"}}> Clear Filter </button>
                </div>
                    <div className="top_bar_right">
                        <div style={{ selfAlign:"right" }}> Total Contacts : {filteredData.length} </div>
                    </div>
                </div>

            </SelectSession>
            <TableContainer
                sx={{minWidth: 750 , minHeight:"500px",maxHeight:"900px",height:"40vh"}}
                className={"table_container"}
            >
                <Table
                    sx={{minWidth: 750,maxWidth:1900 }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    stickyHeader={true}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <div className="newCheckboxContainer">
                                    {isSelectRow ? <label className="newCheckboxLabel">
                                        <input type="checkbox" value={"all"} name="checkbox" checked={contacts&&result().every(el=>selectedContacts.includes(el.toString()))} onClick={toggleSelectAll}  onChange={()=>{}} />
                                    </label> : null}
                                </div>
                            </TableCell>

                            {default_cols.map((col,index)=>{
                                return ( <TableCell key={index}>{col}</TableCell>)
                            })}
                            <TableCell>
                                <div className="newCheckboxContainer">

                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.length!=0 && currentContacts.map((data ,index) => {
                            return( <TableRow
                                    key={index}
                                    hover
                                    role="checkbox"
                                    name={index}
                                    // checked={selectedContacts.includes(data.customer_id)}
                                    onClick={isSelectRow?null:(e)=>{toggleProfile(data)}}
                                >
                                    <TableCell style={{
                                        width: "30px",
                                        textAlign: "center",
                                        borderBottom: "1px #e0e0e0 solid"
                                    }}>
                                        <div className="newCheckboxContainer">
                                            {isSelectRow ? <label className="newCheckboxLabel">
                                                <input type="checkbox" value={index} id={data.customer_id} name="checkbox" checked={selectedContacts.includes(data.customer_id.toString())} onClick={isSelectRow?toggleSelect:null}  onChange={()=>{}} />
                                            </label> : null}

                                        </div>
                                    </TableCell>
                                    <TableCell align="left" sx={{width:"8%"}}>
                                        <span >{data.customer_id&&data.customer_id}</span>
                                    </TableCell>
                                    <TableCell align="left" sx={{width:"8%"}}>
                                        <span >{data.ECMID || "-"}</span>
                                    </TableCell>
                                    <TableCell align="left" sx={{width:"14%"}}>
                                        <div className={"name_td"} style={{display: "flex", alignItems: "center"}}>
                                            <Avatar alt={data.username} sx={{width:27 , height:27}} src={data.img_url||""}/>
                                            <span style={{marginLeft: "11px"}}>{data.customer_name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        {renderChannelsIcon(data.channels)}
                                    </TableCell>

                                    <TableCell align="left">
                                        <div className="tagsGroup">
                                            {renderTags(data.tags_id , tags)}
                                        </div>
                                    </TableCell>


                                    <TableCell sx={{width:"165px",overflow:"hidden",textOverflow:"ellipsis"}} >
                                        {/* <AvatarGroup className={"AvatarGroup"} sx={{flexDirection:"row",width:"20px" , height:"20px"}} max={5} spacing={1} > */}
                                            <div className={"avaGroupInstead"} >
                                                {users&&data.agents_id&& renderAgentAVA(data.agents_id , users)}
                                            </div>
                                        {/* </AvatarGroup> */}
                                    </TableCell>
                                    <TableCell  >
                                        <Mf_icon_dropdown_select_btn
                                        btn={(<span className={styles.edit_span}
                                        >
                                            . . .
                                        </span>)}
                                        >
                                            <li onClick={(e)=>{e.stopPropagation();toggleEditProfile(data);}}> Edit </li>
                                            {/*<li onClick={(e)=>{e.stopPropagation();removeContact(data.id);}}> Delete </li>*/}
                                            <li onClick={(e)=>{e.stopPropagation();toggleDelete(data.customer_id);}}> Delete </li>
                                        </Mf_icon_dropdown_select_btn>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination count={Math.ceil(filteredData.length/10)} page={currentPage} onChange={(e,value)=>{setCurrentPage(value)}}/>

        </div>


    )
}
