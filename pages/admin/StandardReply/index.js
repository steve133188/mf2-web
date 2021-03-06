import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import Image from 'next/image';
import Link from 'next/link';
import {ImportDropzone} from '../../../components/ImportContact.js'
import axios from "axios";
import SelectSession from "../../../components/SelectSession";
// import TableContainer from "@mui/material/TableContainer";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";
// import Avatar from "@mui/material/Avatar";
import {TableCell ,TableContainer ,Table ,TableBody ,TableRow ,Avatar, TableHead ,Pagination ,Tooltip} from "@mui/material";
import {Pill} from "../../../components/Pill";
import MF_Select from "../../../components/MF_Select";
// import TableHead from "@mui/material/TableHead";
// import Pagination from '@mui/material/Pagination';
// import { Tooltip } from '@mui/material';
import {AvatarGroup} from "@mui/lab";
import Mf_icon_dropdownform from "../../../components/common/mf_icon_dropdownform";
import Mf_icon_dropdown_select_btn from "../../../components/common/mf_dropdown_select";
import searchFilter from "../../../helpers/searchFilter";
import {getAllReply} from "../../../helpers/contactsHelper"
import {getAllStandardReply} from "../../../helpers/adminHelpers";
import {InnerSidebar} from "../../../components/InnerSidebar";
import * as React from "react";
import { DeleteSVG, EditSVG } from "../../../public/admin/adminSVG";
import DeletePad from "../../../components/DeletePannel";
import CreateReplyFolder from "../../../components/Admin/CreateReplyFolder";
import ReplyFolder from "../../../components/Admin/replyFolder";
import Profile from "../../../components/profile";
import EditReplyFolder from "../../../components/Admin/EditReplyFolder";
import Loading from "../../../components/Loading";
import {useRootStore} from "../../../utils/provider/RootStoreProvider";

export default function StandardReply() {
    const [isLoading, setIsLoading] = useState(true);

    // const {orgInstance, userInstance , user,replyInstance} = useContext(GlobalContext)
    const {orgActionsStore, usersActionsStore , authStore:{isAuth},mediaActionsStore} = useRootStore()
    const [standardReply, setStandardReply] = useState([]);
    const [filteredData , setFilteredData] = useState([])
    const [useFolder,setUseFolder] = useState("")
    const [agents ,setAgents] =useState([]);
    const [filteredAgents ,setFilteredAgents] =useState([]);;
    const [selectedAgents ,setSelectedAgents] =useState([])
    const [teams ,setTeams] =useState([]);
    const [filteredTeams ,setFilteredTeams] =useState([]);;
    const [selectedTeams ,setSelectedTeams] =useState([])

    const [isProfileShow , setIsProfileShow] = useState(false)
    const [filter , setFilter] = useState({agent:[] , team:[] , channel:[] , tag:[] })

    const [currentPage , setCurrentPage] = useState(1)
    const [selectedReply , setSelectedReply] = useState([])
    const [selectAll, setSelectAll] = useState(false);
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentReply = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    const [isSelectRow, setIsSelectRow] = useState( false);

    const [isDelete , setIsDelete] = useState(false)
    const [isCreate , setIsCreate] = useState(false)
    const [isEdit , setIsEdit] = useState(false)
    const [editData,setEditData] = useState({})
    let result = currentReply.map(d=>d.id)


    const fetchStandardReply = async () =>{
        const data = await mediaActionsStore.getStandardReplyAll()
        console.log("getAllStandardReply",data)
        setStandardReply(data)
        setFilteredData(data)

    }
    const getAgents = async ()=>{
        await usersActionsStore.getAllUser()
        setAgents(usersActionsStore.users)
        setFilteredAgents(usersActionsStore.users)
    }
    const getTeams = async ()=>{
        await orgActionsStore.getOrgTeams()
        setTeams(orgActionsStore.teams)
        setFilteredTeams(orgActionsStore.teams)
    }
    const toggleSelect = e => {
        const { checked ,id} = e.target;
        setSelectedReply([...selectedReply, id]);
        if (!checked) {
            setSelectedReply(selectedReply.filter(item => item !== id));
        }
        console.log(selectedReply)
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedReply(currentReply.map(c => c.id));
        if (selectAll) {
            setSelectedReply([]);
        }

    };
    const toggleSelectRow = ()=>{
        setIsSelectRow(!isSelectRow)
        setSelectedReply([]);
    }
    const toggleCreate = ()=>{
        setIsCreate(!isCreate)
        setSelectedTeams([])
    }
    const toggleEdit = (data)=>{
        setEditData(data)
        setIsEdit(!isEdit)
        setSelectedTeams([])
        // setSelectedTag({id,tag})

    }
    const toggleCancel=()=>{
        setIsDelete(!isDelete)
        setSelectedReply([]);
    }
    const toggleDelete = (data)=>{

        data&&setSelectedReply(data)
        setIsDelete(!isDelete)
        setDeleteTag(data)
    }
    const [deleteTagname,setDeleteTag] = useState("")
    const submitDelete = async() =>{
        setIsDelete(!isDelete)

        selectedReply.map(async e=> {
            await mediaActionsStore.deleteReplyByID(selectedReply)
        })
        setSelectedReply([]);
        await fetchStandardReply();
    }

    const toggleSelectAgents = (e) =>{
         const { checked ,id} = e.target;
    setSelectedAgents([...selectedAgents, id]);
    if (!checked) {
        setSelectedAgents(selectedAgents.filter(item => item !== id));
    }

    }
    const toggleSelectTeams = (e) =>{
         const { checked ,id} = e.target;
    setSelectedTeams([...selectedTeams, id]);
    if (!checked) {
        setSelectedTeams(selectedTeams.filter(item => item !== id));
    }

    }
    const toggleProfile = (key) =>{
        if(!isProfileShow) setUseFolder(key)
        setIsProfileShow(!isProfileShow)
    }

    useEffect(    async () => {
        if(isAuth) {
            await getTeams ();
            await fetchStandardReply();
            }

    },[]);


    const default_cols = ['Folder' , 'Channel' ,'Team',"No. of Replies",""]


    return (
        <div className={"admin_layout"}>
            <InnerSidebar />
            <div className="rightContent">
                {isProfileShow?   ( <Profile handleClose={toggleProfile}><ReplyFolder data={useFolder} reload={fetchStandardReply }/></Profile>):null}

                <CreateReplyFolder  show={isCreate} reload={fetchStandardReply} toggle={toggleCreate} filteredTeams={filteredTeams} selectedTeams={selectedTeams} toggleSelectTeams={toggleSelectTeams}  />
                <EditReplyFolder show={isEdit} toggle={toggleEdit} data={editData} filteredTeams={filteredTeams} selectedTeams={selectedTeams} toggleSelectTeams={toggleSelectTeams} reload={fetchStandardReply}  />
                <DeletePad show={isDelete} reload={fetchStandardReply} toggle={toggleCancel } submit={submitDelete} data={selectedReply} title={"Folders"}/>
                <div className={"search_session"}>
                    <div className="search">
                        <div className="mf_icon_input_block  mf_search_input">
                            <div className={"mf_inside_icon mf_search_icon "} > </div>
                            <input
                                className={"mf_input mf_bg_light_grey"}
                                type="search"
                                name={"keyword"}
                                onChange={(e)=> {
                                    searchFilter(e.target.value , standardReply,(new_data)=>{
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
                            <><button  onClick={toggleSelectRow} className={"mf_bg_light_grey mf_color_text"}> Cancel</button>
                            <button  onClick={()=>toggleDelete(selectedReply)} className={"mf_bg_light_blue mf_color_delete"}> Delete</button></>
                        )}
                        <button onClick={toggleCreate }>+ New Folder</button>
                    </div>
                </div>
                <SelectSession
                    btn={isSelectRow?(<div className={"select_session_btn_group"}>
                        {/*<div className={"select_session_btn"}><div svg={deleteSVG} onClick={}>{deleteSVG}</div> </div>*/}
                    </div>):null}
                >
                </SelectSession>
                <TableContainer
                    sx={{minWidth: 750 , minHeight:"60vh"}}
                    className={"table_container"}
                >
                    <Table
                        sx={{minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        stickyHeader={true}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <div className="newCheckboxContainer">
                                        {isSelectRow ? <label className="newCheckboxLabel">
                                            <input type="checkbox" name="checkbox" checked={result.every(el=>selectedReply.includes(el))} onClick={toggleSelectAll} />
                                        </label> : null}
                                    </div>
                                </TableCell>
                                {default_cols.map((col,index)=>{
                                    return ( <TableCell  style={{fontWeight:"bold",fontSize:"14px"}} key={index}>{col}</TableCell>)
                                })}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData&&filteredData.length!=0 && currentReply.map((data ,index) => {
                                return( <TableRow
                                        key={index}
                                        hover
                                        role="checkbox"
                                        name={index}
                                        checked={selectedReply.includes(data.id)}
                                        onClick={isSelectRow?toggleSelect:(e)=>{toggleProfile(data)}}
                                    >
                                        <TableCell style={{
                                            width: "30px",
                                            textAlign: "center",
                                            borderBottom: "1px #e0e0e0 solid"
                                        }}>
                                            <div className="newCheckboxContainer">
                                                {isSelectRow ? <label className="newCheckboxLabel">
                                                    <input type="checkbox" id={data.id} name="checkbox" checked={selectedReply.includes(data.id)} onClick={isSelectRow?toggleSelect:null} />
                                                </label> : null}

                                            </div>
                                        </TableCell>
                                        <TableCell align="left" sx={{width:"15%"}}>
                                            <span key={"name"+index}>{data.name}</span>
                                        </TableCell>

                                        <TableCell align="left" sx={{width:"15%"}}>
                                        {data.channels?data.channels.map((item, index)=>{;
                                            return <span key={index} ><Image src={`/channel_SVG/${item}.svg`} alt="Channel icon" width={22} height={22}  />
                                            </span>}):""}

                                        </TableCell>
                                        <TableCell align="left" sx={{width:"35%"}}>
                                            {data.variables.map(e=>
                                            <span key={"team"+index} >{e} , </span>
                                            )
}
                                        </TableCell>
                                        <TableCell align="left" sx={{width:"15%"}}>
                                            <span key={"no"+index} >{data.body.length}</span>

                                        </TableCell>

                                        {/* <TableCell key={"agents"+index} align="left" sx={{width:"30%",}}>
                                            <span style={{display:"flex"}}>
                                        {data.assignee? (
                                            data.assignee.map((item)=>{console.log(item);
                                            return <Tooltip key={item} className={""} title={item} placement="top-start">
                                                                <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14,margin:"0 5px"}} >{item.substring(0,2).toUpperCase()}</Avatar>
                                                             </Tooltip> }))
                                                             :
                                                             <Tooltip key={"no"} className={""} title={"no Assignee"} placement="top-start">
                                                                <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14,margin:"0 5px"}} >x</Avatar>
                                                             </Tooltip>
                                                             } </span>
                                        </TableCell> */}

                                        <TableCell key={"button"+index} align="right" >
                                            <span className={"right_icon_btn"} onClick={(e)=>{e.stopPropagation();toggleEdit(data)}} ><EditSVG/></span>
                                            {/* <span className={"right_icon_btn"} onClick={(e)=>{console.log(data,"raw data");e.stopPropagation();toggleDelete(data)}} ><DeleteSVG/></span> */}
                                       </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination count={Math.ceil(filteredData.length/10)} page={currentPage} onChange={(e,value)=>{setCurrentPage(value)}}/>

            </div>

        </div>
    )
}
