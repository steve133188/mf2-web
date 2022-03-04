import { useEffect, useState} from "react";
import SelectSession from "../../components/SelectSession";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import Pagination from '@mui/material/Pagination';
import searchFilter from "../../helpers/searchFilter";
import {InnerSidebar} from "../../components/InnerSidebar";
import * as React from "react";
import CreateRole from "../../components/Admin/CreateRole";
import EditRole from "../../components/Admin/EditRole";
import MF_Modal from "../../components/MF_Modal";
import { DeleteSVG, EditSVG } from "../../public/admin/adminSVG";
import Loading from "../../components/Loading";
import {useRootStore} from "../../utils/provider/RootStoreProvider";

export default function Role() {
    const [isLoading, setIsLoading] = useState(true);

    const [roles, setRoles] = useState([]);
    const { authStore:{isAuth}, orgActionsStore} = useRootStore()

    const [currentPage , setCurrentPage] = useState(1)
    const [filteredData , setFilteredData] = useState([])
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentContacts = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);

    const [filter , setFilter] = useState({agent:[] , team:[] , channel:[] , tag:[] })
    const [isCreate , setIsCreate] = useState(false)
    const [isEdit , setIsEdit] = useState(false)
    const [isDelete , setIsDelete] = useState(false)
    const [selectedContacts , setSelectedContacts] = useState([])
    const [selectAll, setSelectAll] = useState(false);
    const [isSelectRow, setIsSelectRow] = useState( false);

    let result = currentContacts.map(d=>d.id)

    const fetchRoles = async () =>{
        await orgActionsStore.getAllRoles()
        setRoles(orgActionsStore.roles)
        setFilteredData(orgActionsStore.roles)
    }
    useEffect(    async () => {
        if(isAuth)await fetchRoles()
        if(isLoading){
            setTimeout(function() { //Start the timer
                setIsLoading(false);
            }.bind(this), 100)
        }
    },[]);

    const toggleSelect = e => {
        const { checked ,id} = e.target;
        setSelectedContacts([...selectedContacts, id]);
        if (!checked) {
            setSelectedContacts(selectedContacts.filter(item => item !== id));
        }
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedContacts(currentContacts.map(c => c.id));
        if (selectAll) {
            setSelectedContacts([]);
        }
    };
    const toggleSelectRow = ()=>{
        setIsSelectRow(!isSelectRow)
    }
    const toggleCreate = ()=>{
        setIsCreate(!isCreate)
    }
    const toggleEdit = (name)=>{
        setIsEdit(!isEdit)
        setEditRole(name)
    }
    const toggleDelete = (name)=>{
        setIsDelete(!isDelete)
        setDeleteRole(name)
    }
    const [editRolename,setEditRole] = useState("")
    const [deleteRolename,setDeleteRole] = useState()
    const submitDelete = async () =>{
        await deleteRole(deleteRolename);

        setIsDelete(!isDelete)
    }
    const deleteRole = async (id)=>{
        await orgActionsStore.deleteRole(id)
        await fetchRoles()
    }
    const default_cols = ['Role' , 'No. of User' ,' ']


    return (
        <div className={"admin_layout"}>
            {isLoading?(<Loading state={"preloader"}/> ): (<Loading state={"preloader preloaderFadeOut"}/>)}
            <InnerSidebar/>
            <CreateRole show={isCreate} reload={fetchRoles} toggle={toggleCreate}/>
            {/* <EditRole show={isCreate} reload={fetchRoles} toggle={toggleCreate}/> */}
            <EditRole show={isEdit} reload={fetchRoles} toggle={toggleEdit} role={editRolename}/>

        <MF_Modal show={isDelete} toggle={toggleDelete}>
            <div className={"modal_form"} style={{minHeight:"130px",height:"130px"}}>
                <div className={"modal_title"} style={{textAlign:"center"}}>
                    <span>Delete agent role?</span>
                </div>
                <div className={"btn_row"}>
                    <button onClick={submitDelete }>Confirm</button>
                    <button className={"cancel_btn"} onClick={toggleDelete}>Cancel</button>
                </div>
            </div>
        </MF_Modal>

            <div className="rightContent">
            <div className={"search_session"}>
                <div className="search">
                    <div className="mf_icon_input_block  mf_search_input">
                        <div className={"mf_inside_icon mf_search_icon "} > </div>
                        <input
                            className={"mf_input mf_bg_light_grey"}
                            type="search"
                            name={"keyword"}
                            onChange={(e)=> {
                                searchFilter(e.target.value , roles,(new_data)=>{
                                    setFilteredData(new_data)
                                    setCurrentPage(1)
                                })
                            }}
                            placeholder={"Search"}
                        />
                    </div>
                </div>
                <div className={"btn_group"}>
                    <button onClick={toggleCreate}>+ New Role</button>
                </div>
            </div>
            <SelectSession
                btn={isSelectRow?(<div className={"select_session_btn_group"}>
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
                                        <input type="checkbox" name="checkbox" checked={result.every(el=>selectedContacts.includes(el))} onClick={toggleSelectAll} />
                                    </label> : null}
                                </div>
                            </TableCell>
                            {default_cols.map((col,index)=>{
                                return ( <TableCell  style={{fontWeight:"bold",fontSize:"14px"}} key={index}>{col}</TableCell>)
                            })}

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.length!=0 && currentContacts.map((data ,index) => {
                            return( <TableRow
                                    key={index}
                                    hover
                                    role="checkbox"
                                    name={index}
                                    checked={selectedContacts.includes(data.role_id)}
                                    onClick={isSelectRow?toggleSelect:null}
                                >
                                    <TableCell style={{
                                        width: "30px",
                                        textAlign: "center",
                                        borderBottom: "1px #e0e0e0 solid"
                                    }}>
                                        <div className="newCheckboxContainer">
                                            {isSelectRow ? <label className="newCheckboxLabel">
                                                <input type="checkbox" id={data.role_id} name="checkbox" checked={selectedContacts.includes(data.role_id)} onClick={isSelectRow?toggleSelect:null} />
                                            </label> : null}

                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span >{data.role_name}</span>
                                    </TableCell>

                                    <TableCell align="left">
                                        <span >{data.total}</span>

                                    </TableCell>


                                    <TableCell align="right">
                                       <span className={"right_icon_btn"} onClick={()=>toggleEdit(data)}><EditSVG /></span>
                                       <span className={"right_icon_btn"} onClick={()=>toggleDelete(data.role_id)}><DeleteSVG /></span>
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
