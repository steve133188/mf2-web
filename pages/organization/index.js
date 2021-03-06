import {ORGSidebar} from "../../components/InnerSidebar";
import React, {useState, useEffect, useRef, useContext} from "react";
import SearchSession from "../../components/SearchSession";
import SelectSession from "../../components/SelectSession";
import Pagination from "@mui/material/Pagination";
import {GlobalContext} from "../../context/GlobalContext";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TableCell, Tooltip, Zoom} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import CreateDivisionForm from "../../components/organisation/CreateDivisionForm";
import DeleteDivisionForm from "../../components/organisation/DeleteOrg";
import CreateTeamForm from "../../components/organisation/CreateTeamForm";
import AddAgentForm from "../../components/organisation/AddAgentForm";
import Profile from "../../components/profile";
import UserProfileGrid from "../../components/pageComponents/UserProfile";
import SwitchAgentForm from "../../components/organisation/SwitchAgentForm";
import MF_Modal from "../../components/MF_Modal";
import {EditPenSVG} from "../../public/broadcast/broadcastSVG";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Loading from "../../components/Loading";
import {useRootStore} from "../../utils/provider/RootStoreProvider";

const BootstrapInput = styled(InputBase)(({ theme }) => ({

    '& .MuiInputBase-input': {
        borderRadius: "10px",
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #E5E7EC',
        fontSize: 15,
        padding: '5px 26px 5px 10px',
        height:"2rem",
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: 'none',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));
const style ={
    background:" #FFFFFF",
    // border: "1px solid #E5E7EC",
    padding:"2px",
    margin:"2px",
    borderRadius: "10px",
    opacity: 1,
    width:"100%",
    height:"2rem"
}

export default function Organization() {
    // const { userInstance  ,roleInstance,orgInstance, user} = useContext(GlobalContext)
    const { usersActionsStore  ,orgActionsStore, authStore:{isAuth}} = useRootStore()
    const [users, setUsers] = useState([]);
    const [org, set_org] = useState([]);
    const [teams, setTeams] = useState([]);
    const [filteredData , setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [curr_org , set_curr_org] = useState({})
    const [useUser , setUseUser] = useState()
    const [isProfileShow , setIsProfileShow] = useState(false)
    const [roles , setRoles] = useState(false)

    const [isCreateDivisionShow , setIsCreateDivisionShow] = useState(false)
    const [isCreateTeamShow , setIsCreateTeamShow] = useState(false)
    const [isAddAgentShow , setIsAddAgentShow] = useState(false)
    const [isMoveAgentShow , setIsMoveAgentShow] = useState(false)

    const [currentPage , setCurrentPage] = useState(1)
    const [selectedUsers , setSelectedUsers] = useState([])
    const [selectAll, setSelectAll] = useState(false);
    const [deleteOrg, setDeleteOrg] = useState({});
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentContacts = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    const [isEditNameActive,setisEditNameActive] = useState(false)
    const [editedName,setEditedName] = useState("")

    const handleEditName=(e)=>{

        if(editedName){
            // fetch change name

            setEditedName("")
        }
        setisEditNameActive(!isEditNameActive)
    }

    //filtered Data
    let result = currentContacts.map(d=>d.phone)
    const fetchUsers = async()=>{
        await usersActionsStore.getAll()
        setUsers(usersActionsStore.users)
        setFilteredData(usersActionsStore.users)
    }
    const fetchNoTeamUsers = async()=>{
        await usersActionsStore.getAll()
        usersActionsStore.users.filter(d=>d.team_id==0)
        setUsers(usersActionsStore.users)
        setFilteredData(usersActionsStore.users)

    }
    const getRoles = async()=>{
        await orgActionsStore.getAllRoles()
        setRoles(orgActionsStore.roles)
    }
    const getAllTeams = async ()=>{
        await orgActionsStore.getOrgTeams()
        setTeams(orgActionsStore.teams)
    }

    const fetchTeamUsers = async (id)=>{
        await usersActionsStore.getByTeamId(id)
        setUsers(usersActionsStore.users)
        setFilteredData(usersActionsStore.users)
    }
    const fetchRootORG = async () =>{
        await orgActionsStore.getAllORG()
        set_org(orgActionsStore.orgs)
    }
    useEffect(    async () => {
        set_curr_org({})
        if(isAuth)
        {
            await getAllTeams()
            await getRoles()
            await fetchRootORG()
            await fetchUsers()
        }
        if(isLoading){
            setTimeout(function() { //Start the timer
                setIsLoading(false);
            }.bind(this), 100)
        }


    },[]);
    useEffect(    async () => {

        if(isAuth&&!curr_org.name){
            await fetchUsers()
        }else if(isAuth&&curr_org.name=="Not Assigned"){
            await fetchNoTeamUsers()
        }else{
            curr_org.org_id&& await fetchTeamUsers(curr_org.org_id)
        }
    },[curr_org]);


    const toggleSelect = e => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, id]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedUsers([])
        //toString() is needed for comparison
        setSelectedUsers(prev=>currentContacts.map(c => c.phone.toString()));
        if (selectAll) {
            setSelectedUsers([]);
        }
    };
    const handleSelectDelete =e=>{
        setDeleteOrg(e.target.value)
    }
    const handleFilterChange = (search)=>{
        if(search.includes(":")){
            console.log("trigger regex search")
        }
        const newData = users.filter(u=> {
            if(search.trim() == ""){

                return users
            }
            return u.username.toLowerCase().includes(search)
        })
        setFilteredData([...newData])
        setCurrentPage(1)
    }

    const toggleProfile = (key) =>{
        if(!isProfileShow) setUseUser(key)

        setIsProfileShow(!isProfileShow)
    }
    const toggleNewTeam = async () =>{
        if(isCreateTeamShow) await fetchRootORG()
        setIsCreateTeamShow(!isCreateTeamShow)
    }
    const toggleNewDivision = () =>{
        setIsCreateDivisionShow(!isCreateDivisionShow)
    }
    const toggleAddAgent = () =>{
        setIsAddAgentShow(!isAddAgentShow)
    }
    const toggleMoveAgent = () =>{
        setIsMoveAgentShow(!isMoveAgentShow)
    }
    const toggleDelete = ()=>{
        setIsDelete(!isDelete)
    }
    const renderTeam = (tid , teams)=>{
        if(tid==0 ||!tid) return "-"
        const team =teams.find(t=>t.org_id== tid)
        if(team)return team.name
        if(team==0)return "-"
    }

    const renderRole = (rid , roles)=>{
        if(!rid|| rid==0) return "-"
        const role =roles.find(r=>r.role_id== rid)

        if(role) return role.role_name
    }

    const delete_org = async (id)=>{
        const res = await orgInstance.deleteOrgById(id)
        await fetchRootORG()

    }
    const [isDelete , setIsDelete] = useState(false)
    const submitDelete = async() =>{
        await delete_org(deleteOrg.org_id);
        setIsDelete(!isDelete)
    }

    const default_cols = [ 'Name' ,'Team','Role', 'Email','Phone' ,'No. of Assigned Contacts']
    const [isSelectRow, setSelectRow] = useState( false);

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }
    // console.log(filteredData,"fjilterded Data")
    const displayTeam=(name)=>{
        set_curr_org(name)
        setisEditNameActive(false)
        console.log("name="+name)
    }
    const handleChangeName=e=>{
        setEditedName(e.target.value)

    }
    const comfirmTeamNameEdit = async()=>{
        await orgActionsStore.updateOrgName(curr_org.org_id,editedName)
        setisEditNameActive(false)
        window.location.reload(false);
    }
    return (
        <div className="organization-layout">
            {isLoading?(<Loading state={"preloader"}/> ): (<Loading state={"preloader preloaderFadeOut"}/>)}
            <ORGSidebar orgData={org} selection={curr_org} setSelection={displayTeam}/>
            <div className="rightContent">
                {isProfileShow?(<Profile handleClose={toggleProfile}><UserProfileGrid data={useUser} teams={teams} roles={roles}/></Profile>):null}
                {/*toggle Modal Start */}

                <CreateDivisionForm show={isCreateDivisionShow} toggle={toggleNewDivision} reload={fetchRootORG}/>
                <CreateTeamForm show={isCreateTeamShow} toggle={toggleNewTeam} data={org}/>
                <AddAgentForm show={isAddAgentShow} toggle={toggleAddAgent}/>
                <SwitchAgentForm show={isMoveAgentShow} toggle={toggleMoveAgent} selectedUsers={selectedUsers} reload={  async () => {  await fetchRootORG(),   await fetchUsers() }} clear={()=>{ setSelectedUsers([])}} />
                <DeleteDivisionForm show={isDelete} toggle={toggleDelete} org={org}  reload={fetchRootORG}/>
                {/* <MF_Modal show={isDelete} toggle={toggleDelete}>
                    <div className={"modal_form"}>
                        <div className={"modal_title"} style={{textAlign:"center",margin:"20px"}}>

                            <span >Delete ORG</span>
                        </div>
                        <div className="inputField">
                            <span>Team</span>
                            <Select
                                sx={style}
                                value={org}
                                onChange={handleSelectDelete}
                                label={"Select Division"}
                                input={<BootstrapInput />}
                            >
                                <MenuItem sx={{padding:"1px"}} value={null}>Null</MenuItem>
                                {org.map((d)=>{
                                    return (<MenuItem key={d.id} value={d}>{d.name}</MenuItem>)
                                })}
                            </Select>
                        </div>
                        <div className={"btn_row"} style={{textAlign:"center",margin:"20px"}}>
                            <button onClick={submitDelete }>Confirm</button>
                            <button className={"cancel_btn"} onClick={toggleDelete}>Cancel</button>
                        </div>
                    </div>
                </MF_Modal> */}
                {/*toggle Modal End*/}
                    <SearchSession
                        placeholder={"Search"}
                        handleChange={(e)=> {
                            handleFilterChange(e.target.value)
                        }}
                    >
                        {!isSelectRow ? (<>
                            <button onClick={toggleSelectRow} className={"mf_bg_light_blue mf_color_blue"}> Select </button>
                              <button  onClick={toggleDelete} className={"mf_bg_light_blue mf_color_delete"}> Delete</button>
                              </>) : (
                            <>
                                {/* <button  onClick={()=>toggleDelete(selectedUsers)} className={"mf_bg_light_blue mf_color_delete"}> Delete</button> */}
                                <button  onClick={toggleMoveAgent} className={"mf_bg_light_blue mf_color_blue"}> Move</button>
                            <button  onClick={toggleSelectRow} className={"cancelButton mf_color_text"}> Cancel</button>
                                </>

                        )}
                        <button onClick={toggleNewTeam}>+ New Team</button>
                        <button onClick={toggleNewDivision}>+ New Division</button>
                    </SearchSession>
                    <SelectSession >
                    {/* btn={(<button style={{marginLeft: "auto"}} onClick={toggleAddAgent}>+ New Agent</button>)} */}
                        <div className={"team_label"}>
                            {isEditNameActive?(
                                <input type="text" className="nameEdit" onChange={handleChangeName} placeholder={`${curr_org.name}`}></input>
                            ):
                            (curr_org.name || "All")}
                            {"(" +filteredData.length+")"}
                        </div>
                        {isEditNameActive?(
                        <>
                            <button onClick={comfirmTeamNameEdit}>Confirm</button>
                            <button onClick={e=>setisEditNameActive(false)} className="mf_bg_light_grey mf_color_text">Cancel</button>
                        </>
                        )
                        :
                        (
                            <div onClick={handleEditName} style={curr_org.name&&curr_org.name!="Not Assigned"?null:{visibility:"hidden"}} >
                                <EditPenSVG size={18} />
                            </div>
                        )}




                    </SelectSession>
                <TableContainer sx={{minWidth: 750 , minHeight: "60vh",maxHeight:"1000px" }} className={"table_container"} >
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
                                            <input type="checkbox" name="checkbox" checked={result.every(el=>selectedUsers.includes(el.toString()))} onClick={toggleSelectAll} />
                                        </label> : null}
                                    </div>
                                </TableCell>
                                {default_cols.map((col,index)=>{
                                    return ( <TableCell style={{fontWeight:"bold",fontSize:"14px"}} key={index}>{col}</TableCell>)
                                })}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length!=0 && currentContacts.map((data ,index) => {
                                return( <TableRow
                                        key={index}
                                        hover
                                        role="checkbox"
                                        // tabIndex={-1}
                                        name={index}
                                        sx={{height:"56px"}}
                                        checked={selectedUsers.includes(data.phone)}
                                        onClick={isSelectRow?toggleSelect:(e)=>{toggleProfile(data)}}
                                    >
                                        <TableCell style={{
                                            width: "30px",
                                            textAlign: "center",
                                            borderBottom: "1px #e0e0e0 solid"
                                        }}>
                                            <div className="newCheckboxContainer">
                                                {isSelectRow ? <label className="newCheckboxLabel">
                                                    <input type="checkbox" id={data.phone} value={data.username} name="checkbox"
                                                        /*toString() is need. it can only compare to same type*/
                                                        checked={selectedUsers.includes(data.phone.toString())}
                                                        onClick={isSelectRow?toggleSelect:null} />
                                                </label>: null}
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" style={{padding: ".9rem 1rem"}} >
                                            <span >{data.username}</span>
                                        </TableCell>
                                        <TableCell align="left" style={{padding: ".9rem 1rem"}}>
                                            {data.team_id&&teams&&renderTeam(data.team_id , teams)}
                                        </TableCell>
                                        <TableCell align="left" style={{padding: ".9rem 1rem"}}>
                                            {data.role_id&&roles&&renderRole(data.role_id,roles)}
                                        </TableCell>
                                        <TableCell align="left" style={{padding: ".9rem 1rem"}}>
                                            {data.email}
                                        </TableCell>
                                        <TableCell align="left" style={{padding: ".9rem 1rem"}}>
                                            {data.phone}
                                        </TableCell>
                                        <TableCell align="left" style={{padding: ".9rem 1rem"}}>
                                            {data.leads!=0?data.leads : 0}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Pagination count={Math.ceil(filteredData.length/9)} page={currentPage} onChange={(e,value)=>{setCurrentPage(value)}}/>
            </div>
        </div>
    )
}
