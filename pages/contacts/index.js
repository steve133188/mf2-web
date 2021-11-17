import {Search3} from "../../components/Input";
import {useContext, useEffect, useRef, useState} from "react";
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
    const searchRef = useRef(null)
    const [contacts, setContacts] = useState([]);
    const {  get_contacts} = useContext(GlobalContext)
    const [filteredData , setFilteredData] = useState([])
    const [filter , setFilter] = useState({agent:[] , team:[] , channel:[] , tag:[] })
    const [page , setPage] = useState(0)
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



    const handleFilterChange = (search)=>{

        if(search.includes(":")){
            console.log("trigger regex search")
        }
        console.log("search filter :",search)
        const newData = contacts.filter(contact=> {
            if(search.trim() == ""){
                return contacts
            }
            return contact.first_name.includes(search) || contact.last_name.includes(search)
        })
        console.log("newdata " , newData)
        // const newData = filterFunc()
        setFilteredData([...newData])
    }


    const filterFunc = ()=>{
    //    loop the the filters conditions
        let newData = contacts;
        Object.keys(filter).map((key) => {
            if(filter[key].length > 0){
                if(Array.isArray(filter[key])){
                    newData = contacts.filter(contact  => {
                        let temp_contact = contact;
                        filter[key].map(value => {
                            switch (key) {
                                case 'agent':
                                    if(temp_contact.agent.includes(value)){
                                        temp_contact = contact;
                                    } else temp_contact = {};
                                    break;
                                case 'team':
                                    if(temp_contact.team == value){
                                        temp_contact = contact;
                                    } else temp_contact = {};
                                    break;
                                case 'channel':
                                    if(temp_contact.channel.includes(value)){
                                        temp_contact = contact;
                                    } else temp_contact = {};
                                    break;
                                case 'tag':
                                    if(temp_contact.tag.includes(value)){
                                        temp_contact = contact;
                                    } else temp_contact = {};
                                    break;
                            }
                        })
                        if(Object.keys(temp_contact).length > 0){
                            return temp_contact
                        }
                    })
                }
            }
        })
        return newData;
    }
    const default_cols = ['customer_id' , 'name' ,'team', 'channels','tags' ,'assignee']
    const [isSelectRow, setSelectRow] = useState( false);

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }
    function toggleDropzone() {
        setIsShowDropzone(!isShowDropzone);
    }
    const tagSVG = (<svg xmlns="http://www.w3.org/2000/svg"  width="25" height="25" viewBox="0 0 25 25">
            <defs>
                <clipPath id="clip-path">
                    <rect id="Background" width="25" height="25" fill="none"/>
                </clipPath>
            </defs>
            <g id="trash-alt">
                <g id="Group_5689" data-name="Group 5689" transform="translate(9.749 -2.748) rotate(45)">
                    <path id="Path_34498" data-name="Path 34498" d="M18.87,0H10.783A2.7,2.7,0,0,0,8.876.788L.789,8.876a2.7,2.7,0,0,0,0,3.811l8.087,8.087a2.7,2.7,0,0,0,3.811,0l8.087-8.087a2.7,2.7,0,0,0,.792-1.9V2.7A2.7,2.7,0,0,0,18.87,0Zm0,10.783L10.783,18.87,2.7,10.783,10.783,2.7H18.87Z" transform="translate(0 0)" fill="#f1b44c"/>
                </g>
            </g>
        </svg>
    )

    const editSVG =(
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#2198fa"
             cursor="pointer"
             className="bi bi-upload" viewBox="0 0 16 16">
            <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path
                d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
        </svg>
    )

    const deleteSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#f46a6b"
             cursor="pointer"
             className="bi bi-trash" viewBox="0 0 16 16"
             onClick={null}>
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    )
    return (
        <div className={styles.layout}>
            <span style={{display: isShowDropzone ? "block" : "none"}}>
                {/*DND Import Data start */}
                <ImportDropzone onClose={toggleDropzone} accept={"image/*"} isShowDropzone={isShowDropzone} setIsShowDropzone={setIsShowDropzone}/>
                {/*DND Import Data end */}
            </span>
            <div className={"search_session"}>
                <div className="search">
                    <div className="mf_icon_input_block  mf_search_input">
                        <div className={"mf_inside_icon mf_search_icon "} > </div>
                        <input
                            className={"mf_input mf_bg_light_grey"}
                            type="search"
                            // defaultValue={filterWord}
                            name={"keyword"}
                            ref={searchRef}
                            onChange={(e)=> {
                                handleFilterChange(e.target.value)
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
                    <button onClick={toggleDropzone} className={"mf_bg_light_blue mf_color_blue"}>Import</button>
                    <Link href="/contacts/addcontact"><button>+ New Contact</button></Link>
                </div>
            </div>
                    {/* drag and drop end*/}
            <SelectSession
                btn={isSelectRow?(<div className={"select_session_btn_group"}>
                    <div className={"select_session_btn"}>{tagSVG}</div>
                    <div className={"select_session_btn"}>{editSVG}</div>
                    <div className={"select_session_btn"}>{deleteSVG}</div>
                </div>):null}
            >
                <MF_Select head={"Agent"}>

                </MF_Select>
                <MF_Select head={"Team"} >
                </MF_Select>
                <MF_Select head={"Tags"}  >

                </MF_Select>
                <MF_Select head={"Channel"}  >
                </MF_Select>


            </SelectSession>
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
                                                   {/*<Link href={`/contacts/${encodeURIComponent(data.id)}`} passHref>*/}
                                                   {/*<Link href={{pathname:"/contact" , query:{id:data.id}}} passHref>*/}
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
                                                        <span style={{marginLeft: "11px"}}>{data.first_name + "." +data.last_name}</span>
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

                                                   {/*</Link>*/}
                                            </TableRow>
                                           )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                <div>{page + 1}</div>
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
