import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import Link from 'next/link';
import {ImportDropzone} from '../../components/ImportContact.js'
import axios from "axios";
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
import { Tooltip } from '@mui/material';
import {AvatarGroup} from "@mui/lab";
import Mf_icon_dropdownform from "../../components/mf_icon_dropdownform";
import Mf_icon_dropdown_select_btn from "../../components/mf_dropdown_select";
import searchTagFilter from "../../helpers/searchTagFilter";
import {getAllContacts} from "../../helpers/contactsHelper"
import {getAllTags} from "../../helpers/adminHelpers";
import {InnerSidebar} from "../../components/InnerSidebar";
import * as React from "react";
import MF_Modal from "../../components/MF_Modal";
import { DeleteSVG, EditSVG } from "../../public/admin/adminSVG";
import CreateTag from "../../components/Admin/CreateTag";
import EditTag from "../../components/Admin/EditTag";
import DeleteTag from "../../components/Admin/DeleteTag";

export default function Tags() {

    const [tags, setTags] = useState([]);
    const {tagInstance , user} = useContext(GlobalContext)

    const [filteredData , setFilteredData] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    const [filter , setFilter] = useState({agent:[] , team:[] , channel:[] , tag:[] })

    const [currentPage , setCurrentPage] = useState(1)
    const [selectedContacts , setSelectedContacts] = useState([])
    const [selectAll, setSelectAll] = useState(false);
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentContacts = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    const [isSelectRow, setIsSelectRow] = useState( false);
    const [isCreate , setIsCreate] = useState(false)
    const [isDelete , setIsDelete] = useState(false)
    const [isEdit , setIsEdit] = useState(false)
    const [selectedTag,setSelectedTag] =useState("")

    let result = currentContacts.map(d=>d.id)

    const fetchTags = async () =>{
        const data = await tagInstance.getAllTags()
        console.log("getAllTags()",data)
        setTags(data)
        setFilteredData(data)
    }
    useEffect(    async () => {
        if(user.token)await fetchTags()
    },[]);

    const toggleSelect = e => {
        const { checked ,id} = e.target;
        setSelectedContacts([...selectedContacts, id]);
        if (!checked) {
            setSelectedContacts(selectedContacts.filter(item => item !== id));
        }
        console.log(selectedContacts)
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedContacts(currentContacts.map(c => c.id));
        if (selectAll) {
            setSelectedContacts([]);
        }
        console.log(selectedContacts)
    };
    const toggleSelectRow = ()=>{
        setIsSelectRow(!isSelectRow)
        setSelectedContacts([])
    }

    const toggleCreate = ()=>{
        setIsCreate(!isCreate)
    }
    const toggleEdit = (data)=>{
        setIsEdit(!isEdit)
        setSelectedTag(data)
        console.log(selectedTag,"tagtagtag")
    }
    const toggleDelete = (data)=>{
        setIsDelete(!isDelete)
        setDeleteTag(data)
    }
    const [deleteTagname,setDeleteTag] = useState([])


    const default_cols = ['Tag' , 'Created' ,'Last Updated ',""]


    return (
        <div className={"admin_layout"}>
            <InnerSidebar/>
            <CreateTag show={isCreate} reload={fetchTags} toggle={toggleCreate}/>
            <EditTag show={isEdit} reload={fetchTags} toggle={toggleEdit} tag={selectedTag}/>
            <DeleteTag show={isDelete} reload={fetchTags} toggle={toggleDelete} tags={deleteTagname}/>
            {/* <MF_Modal show={false} toggle={"toggleDelete"}>

            </MF_Modal> */}
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
                                    searchTagFilter(e.target.value.toLowerCase() , tags,(new_data)=>{
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
                            <button  onClick={()=>toggleDelete(selectedContacts)} className={"mf_bg_light_blue mf_color_delete"}> Delete</button></>
                        )}
                        <button onClick={toggleCreate}>+ New Tag</button>
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
                                        checked={selectedContacts.includes(data.tag_id)}
                                        onClick={isSelectRow?toggleSelect:null}
                                    >
                                        <TableCell style={{
                                            width: "30px",
                                            textAlign: "center",
                                            borderBottom: "1px #e0e0e0 solid"
                                        }}>
                                            <div className="newCheckboxContainer">
                                                {isSelectRow ? <label className="newCheckboxLabel">
                                                    <input type="checkbox" id={data.tag_id} name="checkbox" checked={selectedContacts.includes(data.tag_id)} onClick={isSelectRow?toggleSelect:null} />
                                                </label> : null}

                                            </div>
                                        </TableCell>
                                        <TableCell align="left" sx={{width:"50%"}}>
                                            <span >{data.tag_name}</span>
                                        </TableCell>

                                        <TableCell align="left" sx={{width:"15%"}}>
                                            <span >{(new Date(data.create_at*1000)).toLocaleDateString('en-US')}</span>

                                        </TableCell>
                                        <TableCell align="left" sx={{width:"15%"}}>
                                            <span >{(new Date(data.update_at*1000)).toLocaleDateString('en-US')}</span>

                                        </TableCell>


                                        <TableCell align="right">
                                            <span className={"right_icon_btn"} onClick={()=>toggleEdit(data)}><EditSVG/></span>
                                            <span className={"right_icon_btn"} onClick={()=>toggleDelete([data.tag_id])}><DeleteSVG/></span>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Pagination count={Math.ceil(filteredData.length/10)} value={currentPage} page={currentPage} onChange={(e,value)=>{setCurrentPage(value)}}/>

            </div>

        </div>
    )
}
