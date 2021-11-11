import {Search3} from "../../components/Input";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Checkbox} from "../../components/Checkbox"
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {GlobalContext} from "../../context/GlobalContext";
import Link from 'next/link';
import {ImportDropzone} from '../../components/ImportContact.js'
import axios from "axios";
import styles from "../../styles/Contacts.module.css";
import SearchSession from "../../components/SearchSession";
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

export default function Contacts() {
    const router = useRouter()
    const [contacts, setContacts] = useState([]);
    const {  get_contacts} = useContext(GlobalContext)
    const [filteredData , setFilteredData] = useState([])
    const [filter , setFilter] = useState({agent:[] , team:[] , channel:[] , tag:[] , keyword:''})
    const [selected , setSelected] = useState([])
    const [isShowDropzone, setIsShowDropzone] = useState(false);
    //filtered Data
    useEffect(    () => {
        const fetchContacts = async () =>{
            const data = await get_contacts()

            setContacts(data)
            setFilteredData(data)
        }
        fetchContacts()
        console.log(filteredData)
    },[]);

    const handleFilterChange = (e)=>{
        if(e.target.value.includes(":")){
            console.log("trigger regex search")
        }
        setFilter({ ...filter,keyword: e.target.value})
        console.log("search filter :",filter)
        const newData = contacts.filter(contact=> {
            return contact.name.includes(filter.keyword)
        })
        console.log("newdata " , newData)
    }

    const filterFunc = ()=>{
    //    loop the the filters conditions
    }
    const default_cols = ['customer_id' , 'name' ,'team', 'channels','tags' ,'assignee']
    const [isSelectRow, setSelectRow] = useState( false);

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }
    function toggleDropzone() {
        setIsShowDropzone(!isShowDropzone);
    }
    return (
        <div className={styles.layout}>
            <span style={{display: isShowDropzone ? "block" : "none"}}>
                {/*DND Import Data start */}
                <ImportDropzone onClose={toggleDropzone} accept={"image/*"} isShowDropzone={isShowDropzone} setIsShowDropzone={setIsShowDropzone}/>
                {/*DND Import Data end */}
            </span>

            <SearchSession
                placeholder={"Search"}
                handleChange={handleFilterChange}
                value={filter.keyword}
            >
                {!isSelectRow ? (
                    <button onClick={toggleSelectRow} className={"mf_bg_light_blue mf_color_blue"}> Select </button>
                ) : (
                    <button  onClick={toggleSelectRow} className={"mf_bg_light_grey mf_color_text"}> Cancel</button>
                )}
                <button onClick={toggleDropzone} className={"mf_bg_light_blue mf_color_blue"}>Import</button>
                <Link href="/contacts/addcontact"><button>+ New Contact</button></Link>
            </SearchSession>
                    {/* drag and drop end*/}
            <SelectSession>
                <MF_Select
                    head={"Agent"}
                >

                </MF_Select>
                <MF_Select
                    head={"Team"}
                >
                </MF_Select>
                <MF_Select
                    head={"Tags"}
                >

                </MF_Select>
                <MF_Select
                    head={"Channel"}
                >
                </MF_Select>
            </SelectSession>
                    {/*<div className={"mf_bg_light_grey "+styles.row }>*/}
                    {/*    <div className={styles.select_group}>*/}
                    {/*        <div className="multipleSelectPlaceholder">*/}
                                {/*<FormControl sx={{m: 0, width: 171, mt: 1}}>*/}

                                {/*    <Select sx={{*/}
                                {/*        height: 28,*/}
                                {/*        marginBottom: 0.3,*/}
                                {/*        marginRight: 3,*/}
                                {/*        borderRadius: 2,*/}
                                {/*        background: "white"*/}
                                {/*    }}*/}
                                {/*            multiple*/}
                                {/*            displayEmpty*/}
                                {/*            value={personName}*/}
                                {/*            onChange={handleChange}*/}
                                {/*            input={<OutlinedInput/>}*/}
                                {/*            renderValue={(selected) => {*/}
                                {/*                if (selected.length === 0) {*/}
                                {/*                    return <span>Agnet</span>;*/}
                                {/*                }*/}
                                {/*                return selected.join('');*/}
                                {/*            }}*/}
                                {/*            MenuProps={MenuProps}*/}
                                {/*            inputProps={{'aria-label': 'Without label'}}*/}
                                {/*    >*/}
                                {/*        <MenuItem disabled value="">*/}
                                {/*            <span>Agent</span>*/}
                                {/*        </MenuItem>*/}

                                {/*        <MenuItem*/}
                                {/*            value={"Mary Foster"}*/}
                                {/*        >*/}
                                {/*            {"Mary Foster"}*/}
                                {/*        </MenuItem>*/}
                                {/*    </Select>*/}

                                {/*</FormControl>*/}
                                {/*<MSelect2/>*/}
                                {/*<MSelect3/>*/}
                                {/*<MSelect4/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="tagsButtonGroup">*/}
                        {/*    <div className="addPopperContainer">*/}
                        {/*        <ClickAwayListener onClickAway={handleClickAwayAddPopper}>*/}
                        {/*            <div >*/}
                        {/*                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"*/}
                        {/*                     fill="currentColor"*/}
                        {/*                     className="bi bi-tag" viewBox="0 0 16 16" onClick={handleClickAddPopper}>*/}
                        {/*                    <path*/}
                        {/*                        d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z"/>*/}
                        {/*                    <path*/}
                        {/*                        d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z"/>*/}
                        {/*                </svg>*/}
                        {/*                {openAddPopper ? (*/}
                        {/*                    <div>*/}
                        {/*                        <div className="addTagHeader">*/}
                        {/*                            <span>Add Tag</span>*/}
                        {/*                            <button>Confirm</button>*/}
                        {/*                        </div>*/}
                        {/*                        <Search3 type="search">Search</Search3>*/}
                        {/*                        <div className="checkboxGrp">*/}
                        {/*                            <label className="checkboxContainer">*/}
                        {/*                                    <span className="pillContainer">*/}
                        {/*                                        <span className="pill vip">VIP</span>*/}
                        {/*                                    </span>*/}
                        {/*                                <Checkbox/>*/}
                        {/*                            </label>*/}
                        {/*                            <label className="checkboxContainer">*/}
                        {/*                                    <span className="pillContainer">*/}
                        {/*                                        <span className="pill newCustomer">New Customer</span>*/}
                        {/*                                    </span>*/}
                        {/*                                <Checkbox/>*/}
                        {/*                            </label>*/}
                        {/*                            <label className="checkboxContainer">*/}
                        {/*                                    <span className="pillContainer">*/}
                        {/*                                        <span className="pill promotions">Promotions</span>*/}
                        {/*                                    </span>*/}
                        {/*                                <Checkbox/>*/}
                        {/*                            </label>*/}
                        {/*                            <label className="checkboxContainer">*/}
                        {/*                                    <span className="pillContainer">*/}
                        {/*                                        <span className="pill vvip">VVIP</span>*/}
                        {/*                                    </span>*/}
                        {/*                                <Checkbox/>*/}
                        {/*                            </label>*/}
                        {/*                        </div>*/}

                        {/*                    </div>*/}
                        {/*                ) : null}*/}
                        {/*            </div>*/}
                        {/*        </ClickAwayListener>*/}
                        {/*    </div>*/}
                    {/*        <div>*/}
                    {/*            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#2198fa"*/}
                    {/*                 cursor="pointer"*/}
                    {/*                 className="bi bi-upload" viewBox="0 0 16 16">*/}
                    {/*                <path*/}
                    {/*                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>*/}
                    {/*                <path*/}
                    {/*                    d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>*/}
                    {/*            </svg>*/}
                    {/*        </div>*/}
                    {/*        <div className="deletePopperContainer">*/}
                    {/*            <ClickAwayListener onClickAway={handleClickAwayDeletePopper}>*/}
                    {/*                <div>*/}

                    {/*                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#f46a6b"*/}
                    {/*                         cursor="pointer"*/}
                    {/*                         className="bi bi-trash" viewBox="0 0 16 16"*/}
                    {/*                         onClick={handleClickDeletePopper}>*/}
                    {/*                        <path*/}
                    {/*                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>*/}
                    {/*                        <path fillRule="evenodd"*/}
                    {/*                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>*/}
                    {/*                    </svg>*/}
                    {/*                    {openDeletePopper ? (*/}
                    {/*                        <div>*/}
                    {/*                            Delete 2 contacts? <br/>*/}
                    {/*                            All conversation history will also be erased.*/}
                    {/*                            <div className="controlButtonGroup">*/}
                    {/*                                <button>Delete</button>*/}
                    {/*                                <span*/}
                    {/*                                    onClick={handleClickDeletePopper}><button></button></span>*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    ) : null}*/}
                    {/*                </div>*/}
                    {/*            </ClickAwayListener>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/**/}

                            <TableContainer>
                                <Table
                                    sx={{minWidth: 750}}
                                    aria-labelledby="tableTitle"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <div className="newCheckboxContainer">
                                                {isSelectRow ? <label className="newCheckboxLabel">
                                                    <input type="checkbox" name="checkbox"/>
                                                </label> : null}
                                                </div>
                                            </TableCell>
                                        {default_cols.map((col,index)=>{
                                           return ( <TableCell key={index}>{col}</TableCell>)
                                        })}
                                        </TableRow>
                                        </TableHead>
                                    <TableBody>
                                        {filteredData.length!=0 && filteredData.map((data ) => {
                                           return( <TableRow
                                                key={data.id}
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                            >
                                                   {/*<Link href={`/contacts/${d.id}`}>*/}
                                                <TableCell style={{
                                                    width: "30px",
                                                    textAlign: "center",
                                                    borderBottom: "1px #e0e0e0 solid"
                                                }}>
                                                    <div className="newCheckboxContainer">
                                                        {isSelectRow ? <label className="newCheckboxLabel">
                                                            <input type="checkbox" name="checkbox"/>
                                                        </label> : null}

                                                    </div>
                                                </TableCell>
                                               <TableCell align="left">
                                                   <span >{data.id}</span>
                                               </TableCell>
                                                <TableCell align="left">
                                                    <div className={"name_td"} style={{display: "flex", alignItems: "center"}}>
                                                        <Avatar alt="Remy Sharp"  src={data.img_url||""}/>
                                                        <span style={{marginLeft: "11px"}}>{data.name}</span>
                                                    </div>
                                                </TableCell>


                                                <TableCell align="left">
                                                    <Pill color="teamA">{data.team}</Pill>
                                                </TableCell>

                                                <TableCell align="left">
                                                    { data.channels!=null && data.channels.map((chan , index)=>{
                                                        return(<img key={index} width="24px" height="24px" src={`./${chan}Channel.svg`} alt=""/>)
                                                    })}
                                                </TableCell>

                                                <TableCell align="left">
                                                    <div className="tagsGroup">
                                                        {data.tags.map((tag , index)=>{
                                                            return( <Pill key={index} color="lightBlue">{tag}</Pill>)
                                                        })}

                                                    </div>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <div className="assigneeGroup">
                                                        {data.agents!=null &&data.agents.map((agent , index)=>{
                                                            return(
                                                                <Pill key={index} color="lightYellow" size="roundedPill size30">{agent}</Pill>
                                                            )
                                                        })}
                                                    </div>
                                                </TableCell>
                                                   {/*</Link>*/}
                                            </TableRow>
                                           )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                </div>


    )
}
// Contacts.getInitialProps = async ()=>{
//     const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/"
//     let token ;
//     if (process.browser) {
//         token = localStorage.getItem("token");
//         console.log(token)
//     }
//     const res =  await axios.get(url , {
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         },
//     })
//     return {contacts:res.data.data}
// }
//
