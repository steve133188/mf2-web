import CreateReplyFolder from "../../../components/Admin/CreateReplyFolder"
import DeletePad from "../../../components/DeletePannel"
import {useContext, useEffect, useRef, useState} from "react";
import SelectSession from "../../../components/SelectSession";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TableHead from "@mui/material/TableHead";
import Pagination from '@mui/material/Pagination';
import { Tooltip } from '@mui/material';
import searchFilter from "../../../helpers/searchFilter";
import { DeleteSVG, EditSVG } from "../../../public/admin/adminSVG";




export default function ReplyFolder({data}) {

    const [filteredData , setFilteredData] = useState([])
    const [currentPage , setCurrentPage] = useState(1)
    const [selectedReply , setSelectedReply] = useState([])
    const [selectAll, setSelectAll] = useState(false);
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentReply = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    const [isSelectRow, setIsSelectRow] = useState( false);

    const [isDelete , setIsDelete] = useState(false)
    const [isCreate , setIsCreate] = useState(false)
    let result = currentReply.map(d=>d.id)

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
        console.log(selectedReply,"select ed con")
    };
    const toggleSelectRow = ()=>{
        setIsSelectRow(!isSelectRow)
        setSelectedReply([]);
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
    useEffect(()=>{
        setFilteredData(data.content)
    },[])
  
    const default_cols = ['Message Content' ,""]
    return(
        <div className={"admin_layout"}>

            <div className="rightContent">
                    {/* <CreateReplyFolder  show={isCreate} reload={"fetchStandardReply"} toggle={toggleCreate} filteredAgents={filteredAgents} selectedAgents={selectedAgents} toggleSelectAgents={toggleSelectAgents}  />
                    <DeletePad show={isDelete} reload={"fetchStandardReply"} toggle={toggleDelete } submit={"removeManyContact"} data={selectedReply} title={"Folders"}/> */}
                    <div className={"search_session"}>
                        <div className="search">
                            <div className="mf_icon_input_block  mf_search_input">
                                <div className={"mf_inside_icon mf_search_icon "} > </div>
                                <input
                                    className={"mf_input mf_bg_light_grey"}
                                    type="search"
                                    name={"keyword"}
                                    onChange={(e)=> {
                                        searchFilter(e.target.value , filteredData,(new_data)=>{
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
                            <button onClick={toggleCreate }>+ New Templete</button>
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
                            {filteredData.length!=0 && currentReply.map((data ,index) => {
                                return( <TableRow
                                        key={index}
                                        hover 
                                        role="checkbox"
                                        name={index}
                                        checked={selectedReply.includes(data.id)}
                                        // onClick={isSelectRow?toggleSelect:(e)=>{toggleProfile(data)}}
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
                                            <span key={"name"+index}>{data.body}</span>
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