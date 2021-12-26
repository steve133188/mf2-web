import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import Image from 'next/image';
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
import searchFilter from "../../helpers/searchFilter";
import {getAllContacts} from "../../helpers/contactsHelper"
import {getAllStandardReply} from "../../helpers/adminHelpers";
import {InnerSidebar} from "../../components/InnerSidebar";
import * as React from "react";
import { DeleteSVG, EditSVG } from "../../public/admin/adminSVG";
import DeletePad from "../../components/DeletePannel";
import CreateReplyFolder from "../../components/Admin/CreateReplyFolder";

export default function StandardReply() {

    const {adminInstance, userInstance , user} = useContext(GlobalContext)
    const [standardReply, setStandardReply] = useState([]);
    const [filteredData , setFilteredData] = useState([])
    const [agents ,setAgents] =useState([]);
    const [selectedAgents ,setSelectedAgents] =useState([])
    const [filteredAgents ,setFilteredAgents] =useState([]);;

    const [isLoading, setIsLoading] = useState(false);
    const [filter , setFilter] = useState({agent:[] , team:[] , channel:[] , tag:[] })

    const [currentPage , setCurrentPage] = useState(1)
    const [selectedContacts , setSelectedContacts] = useState([])
    const [selectAll, setSelectAll] = useState(false);
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentContacts = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    const [isSelectRow, setIsSelectRow] = useState( false);

    const [isDelete , setIsDelete] = useState(false)
    const [isCreate , setIsCreate] = useState(false)
    let result = currentContacts.map(d=>d.id)
    
    useEffect(    async () => {
        if(user.token) {
            await fetchStandardReply();
             await getAgents ();
            }
           
    },[]);
    const fetchStandardReply = async () =>{
        const data = await adminInstance.getAllStandardReply()
        console.log("getAllStandardReply",data)
        setStandardReply(data)
        setFilteredData(data)
    }
    const getAgents = async ()=>{
        const data = await userInstance.getAllUser()
        console.log("AAAA")
        console.log(data)
        setAgents(data)
        setFilteredAgents(data)
    }
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
        console.log(selectedContacts,"select ed con")
    };
    const toggleSelectRow = ()=>{
        setIsSelectRow(!isSelectRow)
        setSelectedContacts([]);
    }
    const toggleCreate = ()=>{
        setIsCreate(!isCreate)
    }
    const toggleEdit = (id,tag)=>{
        setIsEdit(!isEdit)
        // setSelectedTag({id,tag})
        console.log(selectedTag,"tagtagtag")
    }
    const toggleDelete = (name)=>{
        setIsDelete(!isDelete)
        setDeleteTag(name)
    }
    const [deleteTagname,setDeleteTag] = useState("")
    // const deleteReplys= async (id)=>{
    //     // const res = await adminInstance.deleteTag(id)
    //     console.log(res)
    //     await fetchStandardReply()
    // }
    const toggleSelectAgents = (e) =>{
         const { checked ,id} = e.target;
    setSelectedAgents([...selectedAgents, id]);
    if (!checked) {
        setSelectedAgents(selectedAgents.filter(item => item !== id));
    }
    console.log(selectedAgents,"selectedAgents")
    }

    const submitDelete = () =>{
        deleteReplys(deleteTagname);

        setIsDelete(!isDelete)
    }



    const default_cols = ['Folder' , 'Channel' ,'Team','Assignee',""]


    return (
        <div className={"admin_layout"}>
            <InnerSidebar />
            <div className="rightContent">
                <CreateReplyFolder  show={isCreate}  toggle={toggleCreate} filteredAgents={filteredAgents} selectedAgents={selectedAgents} toggleSelectAgents={toggleSelectAgents}  />
                {/* <DeletePad show={isDelete} reload={fetchStandardReply} toggle={toggleDelete } submit={"removeManyContact"} data={selectedReplys} title={"Folders"}/> */}
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
                            <button  onClick={()=>toggleDelete(selectedContacts)} className={"mf_bg_light_blue mf_color_delete"}> Delete</button></>
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
                                            <input type="checkbox" name="checkbox" checked={result.every(el=>selectedContacts.includes(el))} onClick={toggleSelectAll} />
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
                                        name={index}
                                        checked={selectedContacts.includes(data.id)}
                                        onClick={isSelectRow?toggleSelect:null}
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
                                        <TableCell align="left" sx={{width:"15%"}}>
                                            <span key={"name"+index}>{data.name}</span>
                                        </TableCell>

                                        <TableCell align="left" sx={{width:"15%"}}>
                                        {data.channel?data.channel.map((item, index)=>{;
                                            return <span key={index} ><Image src={`/channel_SVG/${item}.svg`} alt="Channel icon" width={22} height={22}  /> 
                                            </span>}):""}

                                        </TableCell>
                                        <TableCell align="left" sx={{width:"15%"}}>
                                            <span key={"team"+index} >{data.team}</span>

                                        </TableCell>

                                        <TableCell key={"agents"+index} align="left" sx={{width:"30%",}}>
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
                                        </TableCell>

                                        <TableCell key={"button"+index} align="right">
                                            <span className={"right_icon_btn"} onClick={()=>toggleEdit(data.id,data.name)}><EditSVG/></span>
                                            <span className={"right_icon_btn"} onClick={()=>toggleDelete(data.id)}><DeleteSVG/></span>
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
