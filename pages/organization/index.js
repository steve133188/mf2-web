import {ORGSidebar} from "../../components/InnerSidebar";
import {useState, useEffect, useRef, useContext} from "react";
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
// import {getAllUser, getUsersByTeamId} from "../../helpers/usersHelpers";
// import {getAllRootORG, getOrgTeams} from "../../helpers/orgHelpers";
import Profile from "../../components/profile";
import ProfileGrid from "../../components/pageComponents/ProfieGrid";
import UserProfileGrid from "../../components/pageComponents/UserProfile";
import SwitchAgentForm from "../../components/organisation/SwitchAgentForm";

export default function Organization() {

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
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentContacts = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    //filtered Data
    let result = currentContacts.map(d=>d.phone)
    const fetchUsers = async()=>{
        // const data = await getAllUser()
        // setUsers(data)
        // setFilteredData(data)
    }
    const fetchTeamUsers = async (id)=>{
        // const data = await getUsersByTeamId(id)
        // console.log("team users:",data)
        // setUsers(data)
        // setFilteredData(data)
    }
    const fetchRootORG = async () =>{
        // const data = await getOrgTeams()
        // set_root_org(data)
    }
    useEffect(    async () => {
        await fetchRootORG()
        await fetchUsers()
    },[]);
    useEffect(    async () => {
        if(!curr_org.name){
            await fetchUsers()
        }else{
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
        console.log(selectedUsers)
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedUsers(currentContacts.map(c => c.phone));
        if (selectAll) {
            setSelectedUsers([]);
        }
    };

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

    const default_cols = [ 'Name' ,'Role', 'Email','Phone' ,'No. of Assigned Contacts']
    const [isSelectRow, setSelectRow] = useState( false);

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }
    console.log(filteredData)

    return (
        <div className="organization-layout">
            <ORGSidebar orgData={root_org} selection={curr_org} setSelection={set_curr_org}/>
            <div className="rightContent">
                {isProfileShow?           ( <Profile handleClose={toggleProfile}><UserProfileGrid data={useUser}/></Profile>):null}

                {/*toggle Modal Start */}
                <CreateDivisionForm show={isCreateDivisionShow} toggle={toggleNewDivision}/>
                <CreateTeamForm show={isCreateTeamShow} toggle={toggleNewTeam}/>
                <AddAgentForm show={isAddAgentShow} toggle={toggleAddAgent}/>
                <SwitchAgentForm show={isMoveAgentShow} toggle={toggleMoveAgent} selectedUsers={selectedUsers}/>
                    {/*toggle Modal End*/}
                    <SearchSession
                        placeholder={"Search"}
                        handleChange={(e)=> {
                            handleFilterChange(e.target.value)
                        }}
                    >
                        {!isSelectRow ? (
                            <button onClick={toggleSelectRow} className={"mf_bg_light_blue mf_color_blue"}> Select </button>
                        ) : (
                            <><button  onClick={toggleSelectRow} className={"mf_bg_light_grey mf_color_text"}> Cancel</button>
                                <button  onClick={toggleMoveAgent} className={"mf_bg_light_blue mf_color_blue"}> Move</button></>

                        )}
                        <button onClick={toggleNewTeam}>+ New Team</button>
                        <button onClick={toggleNewDivision}>+ New Division</button>
                    </SearchSession>
                    <SelectSession btn={(<button style={{marginLeft: "auto"}} onClick={toggleAddAgent}>+ New Agent</button>)}>
                        <div className={"team_label"}>
                            {curr_org.name || "All"}
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
                                        checked={selectedUsers.includes(data.id)}
                                        onClick={isSelectRow?toggleSelect:(e)=>{toggleProfile(data)}}
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