import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import Link from 'next/link';
import {ImportDropzone} from '../../components/ImportContact.js'
import axios from "axios";
import styles from "../../styles/Contacts.module.css";
import SelectSession from "../../components/SelectSession";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {Box, Grid, TableCell} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Pill} from "../../components/Pill";
import MF_Select from "../../components/MF_Select";
import TableHead from "@mui/material/TableHead";
import Pagination from '@mui/material/Pagination';
import Profile from "../../components/profile";
import ProfileGrid from "../../components/pageComponents/ProfieGrid";
import EditProfileForm from "../../components/pageComponents/EditProfileForm";
import { Tooltip } from '@mui/material';
import {AvatarGroup, CalendarPicker} from "@mui/lab";
import Mf_icon_dropdownform from "../../components/mf_icon_dropdownform";
import Mf_icon_dropdown_select_btn from "../../components/mf_dropdown_select";
import searchFilter from "../../helpers/searchFilter";
import * as React from "react";
import { EditPenSVG } from "../../public/broadcast/broadcastSVG";
import { flexbox } from "@mui/system";
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import EditBroadcast from "../../components/pageComponents/EditBroadcast";
import BroadcastDatails from "../../components/pageComponents/BroadcastDetails";
// import {getAllContacts} from "../../helpers/contactsHelper"

export default function Broadcast() {
    const [broadcasts, setBroadcastList] = useState([]);
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)
    const [filteredData , setFilteredData] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    const [filter , setFilter] = useState({period:"",status:"" })

    const [useContact , setUseContact] = useState()
    const [isProfileShow , setIsProfileShow] = useState(false)
    const [isEditBroadcastsShow , setIsEditBroadcastsShow] = useState(false)

    const [currentPage , setCurrentPage] = useState(1)
    const [selectedBroadcasts , setSelectedBroadcasts] = useState([])
    const [isShowDropzone, setIsShowDropzone] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [users ,setUsers] =useState([])
    const [status ,setStatus] =useState([])
    const [period ,setPeriod] =useState([])
    
    const [selectedUsers ,setSelectedUsers] =useState([])
    const [selectedStatus ,setSelectedStatus] =useState("")
    const [selectedPeriod ,setSelectedPeriod] =useState("")


    const [filteredUsers ,setFilteredUsers] =useState([])
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentContacts = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);



    let result = currentContacts.map(d=>d.id)
    const advanceFilter =()=>{
        setFilter({status:selectedStatus, period:[]})
        console.log("filter",filter)
        const statusFiltered = broadcasts.filter(data=>{
            if(selectedStatus.length==0){
                return data
            }
            return selectedStatus.includes(data.status)
        })
        console.log("status:",statusFiltered)

        const periodFiltered = statusFiltered.filter(data=>{
            if(selectedPeriod.trim() ==""){
                return data
            }
            return data.period==periodFiltered
        })
        console.log("teamFiltered:",periodFiltered)
        setFilteredData([...periodFiltered])
        console.log("filteredData:",filteredData)
    }

    const renderUsers = ()=>{
        return<AvatarGroup className={"AvatarGroup"} xs={{flexFlow:"row",justifyContent:"flex-start"}} max={5} spacing={"1"} >
            {selectedUsers.map((agent, index) => {
                return (
                    <Tooltip key={index} className={""} title={agent} placement="top-start">
                        <Avatar className={"mf_bg_warning mf_color_warning text-center"} sx={{
                            width: 25,
                            height: 25,
                            fontSize: 14
                        }}>{agent.substring(0, 2).toUpperCase()}</Avatar>
                    </Tooltip>
                )
            })}
        </AvatarGroup>
    }
    const getUsers = async ()=>{
        const data = await userInstance.getAllUser()
        setUsers(data)
        setFilteredUsers(data)
    }
    const getStatus = async ()=>{
        const data = [{name:"completed",id:1},{name:"sending",id:2},{name:"pending",id:3}]
        setStatus(data)
    }
    const fetchBroadcastList = async () =>{
        const data = await contactInstance.getAllContacts()
        setBroadcastList(BData)
        setFilteredData(BData)
    }
    const handelStatus = (e)=>{
        setSelectedStatus(e.target.id);
    }
    const [filterDay,setFilterDay] = useState("")
    useEffect(()=>{advanceFilter();},[selectedStatus])
    useEffect(()=>{advanceFilter();},[filterDay])

    useEffect(    async () => {
        if(user.token!=null) {
            await fetchBroadcastList()

            await getUsers()
            await getStatus()
        }
        setSelectedUsers([])
        setSelectedBroadcasts([])
    },[]);

    const toggleSelect = e => {
        const { checked ,id} = e.target;
        setSelectedBroadcasts([...selectedBroadcasts, id]);
        if (!checked) {
            setSelectedBroadcasts(selectedBroadcasts.filter(item => item !== id));
        }
        console.log(selectedBroadcasts)
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedBroadcasts(currentContacts.map(c => c.id));
        if (selectAll) {
            setSelectedBroadcasts([]);
        }
        console.log(selectedBroadcasts)
    };

    const toggleSelectUsers = e => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, id]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }
        console.log(selectedUsers)
    };
    function userSearchFilter(keyword , data ,callback ){
        if(keyword.includes(":")){
            console.log("trigger regex search")
        }
        const newData = data.filter(d=> {
            if(keyword.trim() == ""){
                return data
            }
            return d.username.toLowerCase().includes(keyword)
        })
        callback(newData)
    }

    const toggleProfile = (key) =>{
        if(!isProfileShow) setUseContact(key)
        setIsProfileShow(!isProfileShow)
    }
    const toggleEditBroadcasts =async (key) =>{
        if(!isEditBroadcastsShow) setUseContact(key);
        if(isEditBroadcastsShow) await fetchContacts();
        setIsEditBroadcastsShow(!isEditBroadcastsShow)
    }
    const removeContact = async (id)=>{
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/id"
        const deleteItems = {data:[id]}
        const res =await axios.delete(url ,{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        data: deleteItems})
        if (res.status == 200) {
            await fetchContacts()
            setSelectedBroadcasts([])
        }
        // setSelectedTags([])
    }
    const removeManyContact = async ()=>{
        let items =[]
        if(selectedBroadcasts!=-1){
            selectedBroadcasts.forEach((c)=>{
                items.push(c)
            })
        }
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/id"
        const deleteItems = {data:items}
        console.log("remove contact id",deleteItems)
        const res =await axios.delete(url ,{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            data:deleteItems})
        if (res.status == 200) {
            await fetchContacts()
            setSelectedBroadcasts([])
        }
    }
    const default_cols = [ 'Name' ,'Period','Delivered','Recipient','Failed','Creadted Date','Status','Active','editPanel']
    const [isSelectRow, setSelectRow] = useState( false);

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }
    function toggleDropzone() {
        setIsShowDropzone(!isShowDropzone);
    }

    const [dayState,setDayState] = useState({from:"",to:""})

          const handleDayClick=(day) => {
            const range = DateUtils.addDayToRange(day, dayState);
            setDayState(range);
            // setSelectedPeriod(day);
            console.log('day:'+ day.toLocaleDateString())

          }

          const [startDay,setStartDay] =useState("")
          const [endDay,setEndDay] =useState("")

          useEffect(()=>{
              if(dayState.from==""){return}
              else{
                  setStartDay(dayState.from.toLocaleDateString())
              }
              if(dayState.to==""){return}
              else{
              setEndDay(dayState.to.toLocaleDateString())}

              setSelectedPeriod(startDay+"-"+endDay)

          },[dayState])






    const tagSVG = (<svg xmlns="http://www.w3.org/2000/svg"  width="18" height="18" viewBox="0 0 25 25">
            <defs>
                <clipPath id="clip-path">
                    <rect id="Background" width="18" height="18" fill="none"/>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#2198fa"
             cursor="pointer"
             className="bi bi-upload" viewBox="0 0 16 16">
            <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path
                d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
        </svg>
    )

    const deleteSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f46a6b"
             cursor="pointer"
             className="bi bi-trash" viewBox="0 0 16 16"
             onClick={null}>
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    )

    const    BData = [
        {id:"b38545203",name:"Broadcast 1",period:{start:"01-09-2021",end:"30-09-2021"},delivered:"100%",recipient:12,failed:9,creadtedDate:"30-08-2010",status:"pending",active:true},
        {id:"c385df203",name:"Broadcast 2",period:{start:"05-09-2021",end:"30-09-2021"},delivered:"80%",recipient:132,failed:45,creadtedDate:"30-08-2010",status:"sending",active:true},
        {id:"c385df203",name:"Broadcast 33",period:{start:"15-07-2021",end:"30-08-2021"},delivered:"78%",recipient:1222,failed:35,creadtedDate:"30-06-2010",status:"completed",active:true},
    ]



    return (
        <div className={styles.layout}>
            {isProfileShow?           ( <Profile handleClose={toggleProfile} classname={"broadcast_datails_box"}><BroadcastDatails data={useContact}/></Profile>):null}
            {isEditBroadcastsShow?           ( <Profile handleClose={toggleEditBroadcasts}><EditBroadcast data={useContact} toggle={toggleEditBroadcasts}/></Profile>):null}
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
                            name={"keyword"}
                            onChange={(e)=> {
                                searchFilter(e.target.value , broadcasts,(new_data)=>{
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
                    {/* <button onClick={toggleDropzone} className={"mf_bg_light_blue mf_color_blue"}>Import</button> */}
                    <Link href="/broadcast/newBroadcast.js"><button>+ New Broadcast</button></Link>
                </div>
            </div>
            {/* drag and drop end*/}
            <SelectSession
                btn={isSelectRow?(<div className={"select_session_btn_group"}>
                    {/* <div className={"select_session_btn"}><Mf_icon_dropdownform svg={tagSVG}></Mf_icon_dropdownform></div>
                    <div className={"select_session_btn"}><div svg={editSVG}>{editSVG} </div></div> */}
                    <div className={"select_session_btn"}><div svg={deleteSVG} onClick={removeManyContact}>{deleteSVG}</div> </div>
                </div>):null}
            >

                <MF_Select head={"Period"} top_head={selectedPeriod==""?"Period":selectedPeriod}  submit={advanceFilter}  customeDropdown={"calender"}>
                    <div className="calender" style={{width:"280px",height:"280px",position:"relative"}}>
                    <div style={{position:"absolute"}}>
                        <DayPicker
                            className="Selectable"
                            //   numberOfMonths={this.props.numberOfMonths}
                            selectedDays={[dayState.from,{ from:dayState.from, to:dayState.to }]}
                            modifiers={{ start: dayState.from, end: dayState.to }}
                            onDayClick={(day)=>handleDayClick(day)}
                            />
                                <Helmet>
                                <style>{`
                                        .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                                            background-color: #f0f8ff !important;
                                            color: #4a90e2;
                                        }
                                        .Selectable .DayPicker-Day {
                                            border-radius: 0 !important;
                                        }
                                        .Selectable .DayPicker-Day--start {
                                            border-top-left-radius: 50% !important;
                                            border-bottom-left-radius: 50% !important;
                                        }
                                        .Selectable .DayPicker-Day--end {
                                            border-top-right-radius: 50% !important;
                                            border-bottom-right-radius: 50% !important;
                                        }
                                        `}</style>
                                </Helmet>
                            </div>
                    </div>

                    {/* {status.map((team)=>{
                        return(<li id={team.name} key={team.id} onClick={(e)=>{setSelectedStatus(e.target.id);advanceFilter()}}> {team.name}</li>)
                    })} */}
                </MF_Select>
                <MF_Select head={"Status"} top_head={selectedStatus==""?"Status":selectedStatus}  submit={advanceFilter}  customeDropdown={true}>
                    <li onClick={()=> {
                        setSelectedStatus("");
                        advanceFilter()
                    }}>All</li>
                    {status.map((team)=>{
                        return(<li id={team.name} key={team.id} onClick={(e)=>{ handelStatus(e)}}> {team.name}</li>)
                    })}
                </MF_Select>

                {/*<MF_Select head={"Channel"}  >*/}
                {/*    /!*    waiting to fetch the channels*!/*/}
                {/*</MF_Select>*/}
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
                                        <input type="checkbox" name="checkbox" checked={result.every(el=>selectedBroadcasts.includes(el))} onClick={toggleSelectAll} />
                                    </label> : null}
                                </div>
                            </TableCell>
                            {default_cols.map((col,index)=>{
                                return ( <TableCell key={index}>{col}</TableCell>)
                            })}
                            <TableCell>
                                <div className="newCheckboxContainer">

                                </div>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.length!=0 && currentContacts.map((data ,index) => {
                            return( <TableRow
                                    key={index}
                                    hover
                                    role="checkbox"
                                    name={index}
                                    checked={selectedBroadcasts.includes(data.id)}
                                    onClick={isSelectRow?toggleSelect:(e)=>{toggleProfile(data)}}
                                >
                                    <TableCell style={{
                                        width: "30px",
                                        textAlign: "center",
                                        borderBottom: "1px #e0e0e0 solid"
                                    }}>
                                        <div className="newCheckboxContainer">
                                            {isSelectRow ? <label className="newCheckboxLabel">
                                                <input type="checkbox" id={data.id} name="checkbox" checked={selectedBroadcasts.includes(data.id)} onClick={isSelectRow?toggleSelect:null} />
                                            </label> : null}

                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <div className={"name_td"} style={{display: "flex", alignItems: "center"}}>
                                            {/* <Avatar alt={data.name} sx={{width:30 , height:30}} src={data.img_url||""}/> */}
                                            <span >{data.name}</span>
                                            {/* style={{marginLeft: "11px"}} */}
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <div className={"period_table"} >

                                            <span >{data.period.start}</span>
                                            <span >-</span>
                                            <span >{data.period.end}</span>

                                        </div>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span >{(((data.recipient-data.failed)/data.recipient)*100).toFixed(2)}%</span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span >{data.recipient}</span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span >{data.failed}</span>
                                    </TableCell>
                                    <TableCell align="left">
                                        <span >{data.creadtedDate}</span>
                                    </TableCell>

                                    {/* <TableCell align="left">
                                        { data.channels!=null && data.channels.map((chan , index)=>{
                                            return(<img key={index} width="24px" height="24px" src={`./${chan}Channel.svg`} alt=""/>)
                                        })}
                                    </TableCell> */}

                                    <TableCell align="left">
                                        <div className="tagsGroup">
                                        <Pill key={index} color={data.status=="completed"?"lightBlue":(data.status=="sending"?"red":"yellow")}>{data.status}</Pill>
                                        {/* <span >{data.status}</span> */}
                                            {/* {data((tag , index)=>{
                                                return( <Pill key={index} color="lightBlue">{tag}</Pill>)
                                            })} */}
                                        </div>
                                    </TableCell>


                                            <TableCell align="left">
                                                <Pill color="teamA">{data.team_id!=""?data.team:"not Assign"}</Pill>
                                            </TableCell>
                                    <TableCell >

                                        {/* <Mf_icon_dropdown_select_btn
                                        btn={(<span className={styles.edit_span}
                                        >
                                            ...
                                        </span>)}
                                        >
                                            <li onClick={(e)=>{e.stopPropagation();toggleEditBroadcasts(data);}}> Edit </li>
                                            <li onClick={(e)=>{e.stopPropagation();removeContact(data.id);}}> Delete </li>
                                        </Mf_icon_dropdown_select_btn> */}
                                        <div className="broadcast_edit_btn"style={{display:"flex",justifyContent:"space-around"}} > 
                                        <div onClick={(e)=>{e.stopPropagation();toggleEditBroadcasts(data);}}><EditPenSVG size={16}/></div>
                                        <div className={"select_session_btn"}><div svg={deleteSVG} onClick={(e)=>{e.stopPropagation();removeContact(data.id);}}>{deleteSVG}</div> </div>
                                        </div>

                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination count={Math.ceil(filteredData.length/10)} page={currentPage} onChange={(e,value)=>{setCurrentPage(value)}}/>

        </div>


    )
}
