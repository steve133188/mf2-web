import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import Link from 'next/link';
import {ImportDropzone} from '../../../components/ImportContact.js'
import axios from "axios";
import styles from "../../../styles/Contacts.module.css";
import SelectSession from "../../../components/SelectSession";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Pill} from "../../../components/Pill";
import MF_Select from "../../../components/MF_Select";
import TableHead from "@mui/material/TableHead";
import Pagination from '@mui/material/Pagination';
import Profile from "../../../components/profile";
import ProfileGrid from "../../../components/pageComponents/ProfieGrid";
import EditProfileForm from "../../../components/pageComponents/EditProfileForm";
import { Tooltip } from '@mui/material';
import {AvatarGroup} from "@mui/lab";
import Mf_icon_dropdownform from "../../../components/mf_icon_dropdownform";
import Mf_icon_dropdown_select_btn from "../../../components/mf_dropdown_select";
import searchUsernameFilter from "../../../helpers/searchUsernameFilter";
import {InnerSidebar} from "../../../components/InnerSidebar";
import * as React from "react";
import EditAgent from "./editAgent";
import { DeleteSVG, EditSVG } from "../../../public/admin/adminSVG";
import MF_Modal from "../../../components/MF_Modal";

export default function Index() {

    const {adminInstance , userInstance, orgInstance,user} = useContext(GlobalContext)
    const [selectedUsers , setSelectedUsers] = useState([])

    const searchRef = useRef(null)
    const [roles, setRoles] = useState([]);
    const [filteredData , setFilteredData] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    const [filter , setFilter] = useState("")

    const [users, setUsers] = useState([]);
    const [isProfileShow , setIsProfileShow] = useState(false)
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)
    const [isDelete , setIsDelete] = useState(false)

    const [currentPage , setCurrentPage] = useState(1)
    const [selectAll, setSelectAll] = useState(false);
    const [selectedTeam ,setSelectedTeam] =useState({})
    const [teams ,setTeams] =useState([])
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentUsers = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    const [isSelectRow, setIsSelectRow] = useState( false);

    let result = currentUsers.map(d=>d.phone)
    const fetchTeamUsers = async (id)=>{
        const data = await userInstance.getUsersByTeamId(id)
        setUsers(data)
        setFilteredData(data)
    }

    const fetchUsers = async () =>{
        const data = await userInstance.getAllUser()
        console.log("fetchUsers",data)
        setRoles(data)
        setFilteredData(data)
    }
    const getTeams = async ()=>{
        const data = await orgInstance.getOrgTeams()
        setTeams(data)
    }
    useEffect(    async () => {
        if(user.token!=null){
            if(!selectedTeam.name){
                await fetchUsers()
            }else{
                console.log("selectedTeam",selectedTeam)
                await fetchTeamUsers(selectedTeam.id)
            }
            await getTeams()
        }
    },[selectedTeam]);
    const toggleSelect = e => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, id]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedUsers(currentUsers.map(c => c.phone));
        if (selectAll) {
            setSelectedUsers([]);
        }
    };
    const toggleSelectRow = ()=>{
        setIsSelectRow(!isSelectRow)
    }
    const toggleEdit = (agent)=>{
        console.log(agent,"toggle")
        agent?setSelectedUsers([agent]):null
        if (selectedUsers.length!=1){
            return
        }
        console.log(selectedUsers,"0000")
        toggleEditProfile(selectedUsers[0])

    }
    const [deleteRolename,setDeleteRole] = useState("")
    const toggleDelete = (name)=>{
        setIsDelete(!isDelete)
        setDeleteRole(name)
    }

    const submitDelete = () =>{
        deleteRole(deleteRolename);
        setIsDelete(!isDelete)
    }
    const deleteRole = async (id)=>{
        const res = await userInstance.deleteUserByName(id)
        console.log(res)
        await fetchUsers()
    }
    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) 
        // setUseUser(key);
        if(isEditProfileShow) await fetchUsers();
        setIsEditProfileShow(!isEditProfileShow)
    }



    const default_cols = ['Name','Role','Email' , "Phone" , "No. Of Leads",""]


    return (
        <div className={"admin_layout"}>
            <InnerSidebar/>
            <div className="rightContent">  
                {/*{isProfileShow?           ( <Profile handleClose={toggleProfile}><ProfileGrid data={useContact}/></Profile>):null}*/}
                <div></div>
                {isEditProfileShow?           ( <Profile handleClose={toggleEditProfile}><EditAgent data={selectedUsers[0]} toggle={toggleEditProfile}/></Profile>):null}
                <MF_Modal show={isDelete} toggle={toggleDelete}>
                    <div className={"modal_form"}>
                        <div className={"modal_title"} style={{textAlign:"center"}}>
                            <span>Delete agent role?</span>
                        </div> 
                        <div className={"btn_row"}>
                            <button onClick={submitDelete }>Confirm</button>
                            <button className={"cancel_btn"} onClick={toggleDelete}>Cancel</button>
                        </div>
                    </div>
                </MF_Modal>
                <div className={"search_session"}>
                    <div className="search">
                        <div className="mf_icon_input_block  mf_search_input">
                            <div className={"mf_inside_icon mf_search_icon "} > </div>
                            <input
                                className={"mf_input mf_bg_light_grey"}
                                type="search"
                                name={"keyword"}
                                ref={searchRef}
                                onChange={(e)=> {
                                    searchUsernameFilter(e.target.value , roles,(new_data)=>{
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
                        <Link href={"/admin/Agent/addagent"}><button>+ New User</button></Link>
                    </div>
                </div>
                {/* drag and drop end*/}
                <SelectSession
                    btn={isSelectRow?(<div className={"select_session_btn_group"}>
                        <div className={"select_session_btn"}><div  onClick={toggleEdit}><EditSVG/> </div></div>
                        <div className={"select_session_btn"}><div ><DeleteSVG/></div> </div>
                    </div>):null}
                >

                    <MF_Select head={"Team"} top_head={selectedTeam=={}?"Team":selectedTeam.name}
                               // submit={advanceFilter}
                               customeDropdown={true}>
                        <li onClick={async ()=> {
                            setSelectedTeam({});
                            await fetchUsers()
                        }}>All</li>
                        {teams.map((team)=>{
                            return(<li id={team.name} key={team.id} onClick={ (e)=>{setSelectedTeam(team);}}> {team.name}</li>)
                        })}
                    </MF_Select>
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
                                            <input type="checkbox" name="checkbox" checked={result.every(el=>selectedUsers.includes(el))} onClick={toggleSelectAll} />
                                        </label> : null}
                                    </div>
                                </TableCell>
                                {default_cols.map((col,index)=>{
                                    return ( <TableCell key={index}>{col}</TableCell>)
                                })}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length!=0 && currentUsers.map((data ,index) => {
                                return( <TableRow
                                        key={index}
                                        hover
                                        role="checkbox"
                                        name={index}
                                        checked={selectedUsers.includes(data.phone)}
                                        // onClick={isSelectRow?toggleSelect:(e)=>{toggleProfile(data)}}
                                    >
                                        <TableCell style={{
                                            width: "30px",
                                            textAlign: "center",
                                            borderBottom: "1px #e0e0e0 solid"
                                        }}>
                                            <div className="newCheckboxContainer">
                                                {isSelectRow ? <label className="newCheckboxLabel">
                                                    <input type="checkbox" id={data.phone} name="checkbox" checked={selectedUsers.includes(data.phone)} onClick={isSelectRow?toggleSelect:null} />
                                                </label> : null}

                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <span >{data.username}</span>
                                        </TableCell>
                                        <TableCell align="left">
                                            {data.role}
                                        </TableCell>
                                        <TableCell align="left">
                                            {data.email}
                                        </TableCell>
                                        <TableCell align="left">
                                            {data.phone}
                                        </TableCell>
                                        <TableCell align="left">
                                            {data.leads!=0?data.leads : 0}
                                        </TableCell>


                                        <TableCell align="right">
                                       <span className={"right_icon_btn"} onClick={()=>toggleEdit(data.phone)}><EditSVG /></span>
                                       <span className={"right_icon_btn"} onClick={()=>toggleDelete(data.username)}><DeleteSVG /></span>
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
