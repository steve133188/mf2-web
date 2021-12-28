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
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)
    const [users, setUsers] = useState([]);
    const [root_org, set_root_org] = useState([]);
    const [org, set_org] = useState([]);
    const [filteredData , setFilteredData] = useState([])

    const [curr_org , set_curr_org] = useState({})
    const [useUser , setUseUser] = useState()
    const [isProfileShow , setIsProfileShow] = useState(false)
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)

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
    const [editName,setEditNameActive] = useState(false)
    const [editedName,setEditedName] = useState("")
    const nameEditConfirm=(e)=>{

        if(editedName){
            // fetch change name
            console.log(editedName)
            setEditedName("")
        }
        setEditNameActive(!editName)
    }
    //filtered Data
    let result = currentContacts.map(d=>d.phone)
    const fetchUsers = async()=>{
        const data = await userInstance.getAllUser()
        setUsers(data)
        setFilteredData(data)
    }
    const fetchTeamUsers = async (id)=>{
        const data = await userInstance.getUsersByTeamId(id)
        console.log("team users:",data)
        setUsers(data)
        setFilteredData(data)
    }
    const fetchRootORG = async () =>{
        const data = await orgInstance.getAllORG()
        console.log(data,"org data")
        set_root_org(data)
    }
    useEffect(    async () => {
        if(user.token)
        {
            await fetchRootORG()
            await fetchUsers()
        }

    },[]);
    useEffect(    async () => {
        if(user.token&&!curr_org.name){
            await fetchUsers()
        }else{
            console.log("currentContacts",currentContacts)
            console.log("curr_org",curr_org)
            await fetchTeamUsers(curr_org.id)
        }
    },[curr_org]);

    const toggleSelect = e => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, id]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }
        // console.log(selectedUsers)
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedUsers(currentContacts.map(c => c.phone));
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
                console.log("no input")
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
    const delete_org = async (id)=>{
        console.log(id)
        const res = await orgInstance.deleteOrgById(id)
        console.log(`deleted ${id} ${res}`)
        await fetchRootORG()

    }
    const [isDelete , setIsDelete] = useState(false)
    const submitDelete = async() =>{
        await delete_org(deleteOrg.id);
        setIsDelete(!isDelete)
    }

    const default_cols = [ 'Name' ,'Role', 'Email','Phone' ,'No. of Assigned Contacts']
    const [isSelectRow, setSelectRow] = useState( false);

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }
    // console.log(filteredData,"fjilterded Data")
    const displayTeam=(name)=>{
        set_curr_org(name)
        console.log(name,"show   team name")
    }
    return (
        <div className="organization-layout">
            <ORGSidebar orgData={root_org} selection={curr_org} setSelection={displayTeam}/>
            <div className="rightContent">
                {isProfileShow?(<Profile handleClose={toggleProfile}><UserProfileGrid data={useUser}/></Profile>):null}
                {/*toggle Modal Start */}

                <CreateDivisionForm show={isCreateDivisionShow} toggle={toggleNewDivision} reload={fetchRootORG}/>
                <CreateTeamForm show={isCreateTeamShow} toggle={toggleNewTeam} data={root_org}/>
                <AddAgentForm show={isAddAgentShow} toggle={toggleAddAgent}/>
                <SwitchAgentForm show={isMoveAgentShow} toggle={toggleMoveAgent} selectedUsers={selectedUsers} />
                <DeleteDivisionForm show={isDelete} toggle={toggleDelete}  reload={fetchRootORG}/>
                {/* <MF_Modal show={isDelete} toggle={toggleDelete}>
                    <div className={"modal_form"}>
                        <div className={"modal_title"} style={{textAlign:"center",margin:"20px"}}>

                            <span >Delete ORG</span>
                        </div>
                        <div className="inputField">
                            <span>Team</span>
                            <Select
                                sx={style}
                                value={root_org}
                                onChange={handleSelectDelete}
                                label={"Select Division"}
                                input={<BootstrapInput />}
                            >
                                <MenuItem sx={{padding:"1px"}} value={null}>Null</MenuItem>
                                {root_org.map((d)=>{
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
                              <button  onClick={toggleDelete} className={"mf_bg_light_blue mf_color_delete"}> Delete</button>
                            <button onClick={toggleSelectRow} className={"mf_bg_light_blue mf_color_blue"}> Select </button></>
                        ) : (
                            <>
                                <button  onClick={()=>toggleDelete(selectedUsers)} className={"mf_bg_light_blue mf_color_delete"}> Delete</button>
                                <button  onClick={toggleMoveAgent} className={"mf_bg_light_blue mf_color_blue"}> Move</button>
                            <button  onClick={toggleSelectRow} className={"mf_bg_light_grey mf_color_text"}> Cancel</button>
                                </>

                        )}
                        <button onClick={toggleNewTeam}>+ New Team</button>
                        <button onClick={toggleNewDivision}>+ New Division</button>
                    </SearchSession>
                    <SelectSession >
                    {/* btn={(<button style={{marginLeft: "auto"}} onClick={toggleAddAgent}>+ New Agent</button>)} */}
                        <div className={"team_label"}>
                            {editName?<input type="text" className="nameEdit" onChange={e=>setEditedName(e.target.value)} placeholder={`edit... ${curr_org.name}`}></input>:(curr_org.name || "All")} {"(" +currentContacts.length+")"}
                        </div>
                        <div onClick={nameEditConfirm} >

                        <EditPenSVG size={18} />
                        </div>
                    </SelectSession>
                <TableContainer sx={{minWidth: 750 , minHeight: "60vh" }} className={"table_container"} >
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
                            {filteredData.length!=0 && currentContacts.map((data ,index) => {
                                return( <TableRow 
                                        key={index}
                                        hover
                                        role="checkbox"
                                        // tabIndex={-1}
                                        name={index}
                                        checked={selectedUsers.includes(data.username)}
                                        onClick={isSelectRow?toggleSelect:(e)=>{toggleProfile(data)}}
                                    >
                                        <TableCell style={{
                                            width: "30px",
                                            textAlign: "center",
                                            borderBottom: "1px #e0e0e0 solid"
                                        }}>
                                            <div className="newCheckboxContainer">
                                                {isSelectRow ? <label className="newCheckboxLabel">
                                                    <input type="checkbox" id={data.username} name="checkbox" checked={selectedUsers.includes(data.username)} onClick={isSelectRow?toggleSelect:null} />
                                                </label> : null}
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" style={{padding: ".9rem 1rem"}} >
                                            <span >{data.username}</span>
                                        </TableCell>
                                        <TableCell align="left" style={{padding: ".9rem 1rem"}}>
                                            {data.role}
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