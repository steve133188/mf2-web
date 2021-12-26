import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import Link from 'next/link';
import {ImportDropzone} from '../../components/ImportContact.js'
import axios from "axios";
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
import Mf_icon_dropdownform from "../../components/mf_icon_dropdownform";
import Mf_icon_dropdown_select_btn from "../../components/mf_dropdown_select";
import searchFilter from "../../helpers/searchFilter";
import * as React from "react";
import { width } from "@mui/system";
import Mf_circle_btn from "../../components/mf_circle_btn";
import Loading from "../../components/Loading";
import CancelConfirmation from "../../components/CancelConfirmation"
import DeletePad from "../../components/DeletePannel";
// import {getAllContacts} from "../../helpers/contactsHelper"

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)
    const [filteredData , setFilteredData] = useState([])

    const [isLoading, setIsLoading] = useState(true);
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
    const currentContacts = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    let result = currentContacts.map(d=>d.id)
    
    const [isDelete , setIsDelete] = useState(false)
    const [isCreate , setIsCreate] = useState(false)
    const [deleteRolename,setDeleteRole] = useState("")
    
    
    const advanceFilter =()=>{
        setFilter({team:selectedTeams, agent:[...selectedUsers] ,channel: [...selectedChannel] , tag:[...selectedTags]})
        console.log("filter",filter)
        const agentFiltered = contacts.filter(data=>{
            if(selectedUsers.length==0){
                return data
            }
            return data.agents.some(el=>selectedUsers.includes(el))
        })
        console.log("agent:",agentFiltered)
        const tagFiltered = agentFiltered.filter(data=>{
            if(selectedTags.length ==0){
                return data
            }
            return data.tags.some(el=>selectedTags.includes(el))
        })
        console.log(selectedTags)
        console.log("tagFiltered:",tagFiltered)

        const channelFiltered = tagFiltered.filter(data=>{
            if(selectedChannel.length ==0){
                return data
            }
            return data.channels.some(el=>selectedChannel.includes(el))
        })
        console.log("channelFiltered:",channelFiltered)

        const teamFiltered = tagFiltered.filter(data=>{
            if(selectedTeams.trim() ==""){
                return data
            }
            return data.team==selectedTeams
        })
        console.log("teamFiltered:",teamFiltered)
        setFilteredData([...teamFiltered])

    }
    const channels = [
        // name:"WhastApp",value:"All",channelID:"All",id:0},
                {name:"WhastApp",value:"Whatsapp",channelID:"Whatsapp",id:1},
                {name:"WhatsApp Business",value:"WhatsappB",channelID:"WhatsappB",id:2},
                {name:"Messager",value:"Messager",channelID:"Messager",id:3},
                {name:"WeChat",value:"Wechat",channelID:"Wechat",id:4},];
    const renderUsers = ()=>{
        return<AvatarGroup className={"AvatarGroup"} xs={{flexFlow:"row",justifyContent:"flex-start"}} max={5} spacing={"1"} >
            {selectedUsers.map((agent, index) => {
                return (
                    <Tooltip key={index} className={""} title={agent} placement="top-start">
                        <Avatar className={"mf_bg_warning mf_color_warning text-center"} sx={{
                            width: 25,
                            height: 25,
                            fontSize: 14
                        }}>{agent.substring(0, 2).toUpperCase()}</Avatar>
                    </Tooltip>
                )
            })}
        </AvatarGroup>
    }
    const renderTags=() => {
        return selectedTags!=-1&&selectedTags.map((tag)=>{
            return<Pill key={tag} color="vip">{tag}</Pill>
        })
    }
    const renderChannels=() => {
        return selectedChannel!=-1&&selectedChannel.map((channel , index)=>{
            return<div key={index}><img style={{width:'18px',margin:'3px'}}src={`/channel_SVG/${channel}.svg`} /></div>
        })
    }
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
    const getTeams = async ()=>{
        const data = await orgInstance.getOrgTeams()
        setTeams(data)
    }
    const getChannels = async ()=>{
        // const data = await orgInstance.getOrgTeams()
        setFilteredChannel(channels)
    }
    const fetchContacts = async () =>{
        const data = await contactInstance.getAllContacts()
        setContacts(data)
        setFilteredData(data)
    }
    useEffect(    
        
        async () => {
        if(user.token!=null) {
            await fetchContacts()
            await getTags()
            await getUsers()
            await getTeams()
            getChannels ()
        }
        setSelectedUsers([])
        setSelectedContacts([])
    },[]);

    const toggleSelect = e => {
        const { checked ,id} = e.target;
        setSelectedContacts([...selectedContacts, id]);
        if (!checked) {
            setSelectedContacts(selectedContacts.filter(item => item !== id));
        }
        console.log(selectedContacts)
    };
    const toggleSelectChannel = e => {
        const { checked ,id} = e.target;
        setSelectedChannel([...selectedChannel, id]);
        if (!checked) {
            setSelectedChannel(selectedChannel.filter(item => item !== id));
        }
        console.log(selectedChannel)
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedContacts(currentContacts.map(c => c.id));
        if (selectAll) {
            setSelectedContacts([]);
        }
        console.log(selectedContacts)
    };
    const toggleSelectTags = e => {
        const { checked ,id} = e.target;
        setSelectedTags([...selectedTags, id]);
        if (!checked) {
            setSelectedTags(selectedTags.filter(item => item !== id));
        }
        console.log(selectedTags)
    };
    const toggleAddTags = e => {
        const { checked ,id} = e.target;
        setAddedTags([...addedTags, id]);
        if (!checked) {
            setAddedTags(addedTags.filter(item => item !== id));
        }
        console.log(addedTags)
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
    const toggleProfile = (key) =>{
        if(!isProfileShow) setUseContact(key)
        setIsProfileShow(!isProfileShow)
    }
    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) setUseContact(key);
        if(isEditProfileShow) await fetchContacts();
        setIsEditProfileShow(!isEditProfileShow)
    }
    const toggleDelete = (name)=>{
        setIsDelete(!isDelete)
        setDeleteRole(name)
    }

    const removeContact = async (id)=>{
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/id"
        const deleteItems = {data:[id]}
        const res =await axios.delete(url ,{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        data: deleteItems})
        if (res.status == 200) {
            await fetchContacts()
            setSelectedContacts([])
        }
        setSelectedTags([])
    }
    const addManyTags = async ()=>{
        // let items =[]
        // if(addedTags!=-1){
        //     addedTags.forEach((c)=>{
        //         items.push(c)
        //     })
        // }
        // const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/id"
        // const addItems = {data:items}
        // console.log("remove contact id",addedTagsItems)
        // const res =await axios.update(url ,{ headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem("token")}`
        //     },
        //     data:addItems})
        // if (res.status == 200) {
        //     await fetchContacts()
        //     setSelectedContacts([])
        // }
    }
    const removeManyContact = async ()=>{
        let items =[]
        if(selectedContacts!=-1){
            selectedContacts.forEach((c)=>{
                items.push(c)
            })
        }
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/id"
        const deleteItems = {data:items}
        console.log("remove contact id",deleteItems)
        const res =await axios.delete(url ,{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            data:deleteItems})
        if (res.status == 200) {
            await fetchContacts()
            setSelectedContacts([])
        }
    }
    const default_cols = [ 'Name' ,'Team', 'Channels','Tags' ,'Assignee']
    const [isSelectRow, setSelectRow] = useState( false);

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }
    function toggleDropzone() {
        setIsShowDropzone(!isShowDropzone);
    }

    useEffect(()=>{
        console.log(currentContacts)
    },[filteredData])

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


    useEffect(() => {
        setTimeout(function() { //Start the timer
            setIsLoading(false)
        }.bind(this), 100)

    },[]);
    // confirmation
    const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
    const [deleteID, setDeleteID] = useState()
    const openConfirmation = (id) => {
        setDeleteID(id);
        setIsOpenConfirmation(true)
    };
    const closeConfitmation = () => {
        setIsOpenConfirmation(false)
    };

    return (
        <div className={styles.layout}  style={{maxWidth:"2200px"}}>
            {isOpenConfirmation?(<CancelConfirmation  onClose={closeConfitmation} onConfirm={removeContact} data={deleteID}/>):null}
            {isProfileShow?           ( <Profile handleClose={toggleProfile}><ProfileGrid data={useContact}/></Profile>):null}
            {isEditProfileShow?           ( <Profile handleClose={toggleEditProfile}><EditProfileForm data={useContact} toggle={toggleEditProfile}/></Profile>):null}
            <span style={{display: isShowDropzone ? "block" : "none"}}>
                {/*DND Import Data start */}
                <ImportDropzone onClose={toggleDropzone} accept={"image/*"} isShowDropzone={isShowDropzone} setIsShowDropzone={setIsShowDropzone}/>
                {/*DND Import Data end */}
            </span>
            {isLoading?(<Loading state={"preloader"}/> ): (<Loading state={"preloaderFadeOut"}/>)}
             <DeletePad show={isDelete} reload={fetchContacts} toggle={toggleDelete } submit={removeManyContact} data={selectedContacts} title={"Contacts"}/>
            <div className={"search_session"}>
                <div className="search">
                    <div className="mf_icon_input_block  mf_search_input">
                        <div className={"mf_inside_icon mf_search_icon "} > </div>
                        <input
                            className={"mf_input mf_bg_light_grey"}
                            type="search"
                            name={"keyword"}
                            onChange={(e)=> {
                                searchFilter(e.target.value , contacts,(new_data)=>{
                                    setFilteredData(new_data)
                                    setCurrentPage(1)
                                })
                            }}
                            placeholder={"Search"}
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
                        {/* <Mf_icon_dropdownform svg={tagSVG}>
                       
                        </Mf_icon_dropdownform> */} 
                        <Mf_circle_btn svg={"tagSVG"} style={'top:"0px",'} handleChange={(e)=>{ tagSearchFilter(e.target.value , tags,(new_data)=>{
                            setFilteredTags(new_data)
                        })}}>
                                        {filteredTags.map((tag)=>{
                                            return(<li key={tag.id}><Pill key={tag.id} color="vip">{tag.tag}</Pill>
                                                <div className="newCheckboxContainer">
                                                    <label className="newCheckboxLabel">
                                                        <input type="checkbox" id={tag.tag} name="checkbox" checked={addedTags.includes(tag.tag)} onClick={toggleAddTags} />
                                                    </label> </div></li>)
                                        })}
                                    </Mf_circle_btn>

                        
                    {/* <div className={"tagsGroup"} >
                                {selectedTags!=-1&&selectedTags.map((tag)=>{
                                    return<Pill key={tag} color="vip">{tag}</Pill>
                                })}
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

                            </div> */}
                        </div>








                    <div className={"select_session_btn"}><div svg={editSVG}>{editSVG} </div></div>
                    <div className={"select_session_btn"}><div svg={deleteSVG} onClick={toggleDelete}>{deleteSVG}</div> </div>
                </div>):null}
            >
                <MF_Select top_head={selectedUsers.length!=0? renderUsers():"Agent"} head={"Agent"} submit={advanceFilter}handleChange={(e)=>{userSearchFilter(e.target.value , users,(new_data)=>{
                    setFilteredUsers(new_data)
                })}}>
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
                </MF_Select>
                <MF_Select head={"Team"} top_head={selectedTeams==""?"Team":selectedTeams}  submit={advanceFilter}  customeDropdown={true}>
                    <li onClick={()=> {
                        setSelectedTeams("");
                        advanceFilter()
                    }}>All</li>
                    {teams.map((team)=>{
                        return(<li id={team.name} key={team.id} onClick={(e)=>{setSelectedTeams(e.target.id);advanceFilter()}}> {team.name}</li>)
                    })}
                </MF_Select>
                <MF_Select top_head={selectedChannel.length!=0? renderChannels() :"Channels"} submit={advanceFilter} head={"Channels"} >
                    {filteredChannel.map((tag)=>{
                        return(<li key={tag.id}><div>  <img key={"id"} width="20px" height="20px" src={`/channel_SVG/${tag.channelID}.svg`}  alt=""/>
                        {tag.name}</div>
                            <div className="newCheckboxContainer">
                                <label className="newCheckboxLabel">
                                    <input type="checkbox" id={tag.value} name="checkbox" checked={selectedChannel.includes(tag.value)} onClick={toggleSelectChannel} />
                                </label> </div></li>)
                    })}
                </MF_Select>
                <MF_Select top_head={selectedTags.length!=0? renderTags():"Tags"} submit={advanceFilter} head={"Tags"} handleChange={(e)=>{ tagSearchFilter(e.target.value , users,(new_data)=>{
                    setFilteredTags(new_data)
                })}} >
                    {filteredTags.map((tag)=>{
                        return(<li key={tag.id}><Pill size="30px" key={tag.id} color="vip">{tag.tag}</Pill>
                            <div className="newCheckboxContainer">
                                <label className="newCheckboxLabel">
                                    <input type="checkbox" id={tag.tag} name="checkbox" checked={selectedTags.includes(tag.tag)} onClick={toggleSelectTags} />
                                </label> </div></li>)
                    })}
                </MF_Select>
                {/*<MF_Select head={"Channel"}  >*/}
                {/*    /!*    waiting to fetch the channels*!/*/}
                {/*</MF_Select>*/}
            </SelectSession>    
            <TableContainer
                sx={{minWidth: 750 , minHeight:"60vh"}}
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
                                        <input type="checkbox" name="checkbox" checked={result.every(el=>selectedContacts.includes(el))} onClick={toggleSelectAll} />
                                    </label> : null} 
                                </div>
                            </TableCell>
                            <TableCell align="left" style={{width:"200px"}}>
                                        <span >Customer ID</span>
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
                                    checked={selectedContacts.includes(data.id)}
                                    onClick={isSelectRow?toggleSelect:(e)=>{toggleProfile(data)}}
                                >
                                    <TableCell style={{
                                        width: "30px",
                                        textAlign: "center",
                                        borderBottom: "1px #e0e0e0 solid"
                                    }}>
                                        <div className="newCheckboxContainer">
                                            {isSelectRow ? <label className="newCheckboxLabel">
                                                <input type="checkbox" id={data.id} name="checkbox" checked={selectedContacts.includes(data.id)} onClick={isSelectRow?toggleSelect:null} />
                                            </label> : null}

                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span >{data.id}</span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <div className={"name_td"} style={{display: "flex", alignItems: "center"}}>
                                            <Avatar alt={data.name} sx={{width:30 , height:30}} src={data.img_url||""}/>
                                            <span style={{marginLeft: "11px"}}>{data.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <div>{data.team_id!=""?data.team:"not Assign"}</div>
                                        {/* <Pill color="teamA"></Pill> */}
                                    </TableCell>

                                    <TableCell align="left">
                                        { data.channels!=null && data.channels.map((chan , index)=>{
                                            // return(<img key={index} width="24px" height="24px" src={`./${chan}Channel.svg`} alt=""/>)
                                            return(<img key={index} width="24px" height="24px" src={`/channel_SVG/Whatsapp.svg`} alt=""/>)
                                        })}
                                        {
                                        data.channels == null?  (<div style={{paddingLeft:20}}><img key={index} width="24px" height="24px" src={`/channel_SVG/Whatsapp.svg`} alt=""/></div>):""
                                     }
                                    </TableCell>

                                    <TableCell align="left">
                                        <div className="tagsGroup">
                                            {data.tags.map((tag , index)=>{
                                                return( <Pill key={index}  color="lightBlue">{tag}</Pill>)
                                            })}
                                        </div>
                                    </TableCell>

                                    <TableCell sx={{width:"165px",overflow:"hidden",textOverflow:"ellipsis"}} >
                                        <AvatarGroup className={"AvatarGroup"} xs={{flexDirection:"row",width:30 , height:30}} max={5} spacing={1} >
                                            {data.agents!=null &&data.agents.map((agent , index)=>{
                                                return(
                                                    <Tooltip key={index} className={""} title={agent} placement="top-start">
                                                    <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:30 , height:30 ,fontSize:14}} alt={agent}>{agent.substring(0,2).toUpperCase()}</Avatar>
                                                    </Tooltip>
                                                )
                                            })}
                                        </AvatarGroup>
                                    </TableCell>
                                    <TableCell  >
                                        <Mf_icon_dropdown_select_btn
                                        btn={(<span className={styles.edit_span}
                                        >
                                            ...
                                        </span>)}
                                        >
                                            <li onClick={(e)=>{e.stopPropagation();toggleEditProfile(data);}}> Edit </li>
                                            {/*<li onClick={(e)=>{e.stopPropagation();removeContact(data.id);}}> Delete </li>*/}
                                            <li onClick={(e)=>{e.stopPropagation();openConfirmation(data.id);}}> Delete </li>
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
