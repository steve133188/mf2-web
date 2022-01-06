import {AverageDailyCard, ChangingPercentageCard, LineChartCard} from "../../components/Cards";
import {MultipleBarChart, MultipleLineChart} from "../../components/LineChart";
import {useContext, useEffect, useState} from "react";
import {CancelButton, NormalButton2} from "../../components/Button";
import {LabelSelect2} from "../../components/Select";
import {Pill} from "../../components/Pill";
import DashboardFilter from "../../components/Dashboard/agents/DashboardFilter";
import MF_Select from "../../components/MF_Select";
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DashBroadFilter from "../../components/broadcast/dashbroad_filter";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import Pagination from '@mui/material/Pagination';
import { DeleteSVG, EditSVG } from "../../public/admin/adminSVG";
import {GlobalContext} from "../../context/GlobalContext";

export default function Agents() {
    const [open, setOpen] = useState(false);
    const {dashboardInstance,contactInstance , userInstance ,tagInstance ,orgInstance, user} = useContext(GlobalContext)


    const [selectedChannels ,setSelectedChannels] =useState([]);
    const [selectedTeams ,setSelectedTeams] =useState([]);
    const [selectedAgents , setSelectedAgents] = useState([])
    const [isFilterOpen , setIsFilterOpen] = useState(false);
    const [selectedPeriod ,setSelectedPeriod] =useState("");
    const [dayState,setDayState] = useState({from:"",to:""});
    const [currentPage , setCurrentPage] = useState(1)
    const [filteredData , setFilteredData] = useState([])
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentContacts = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    const [displayNameTag, setDisplayNameTag] = useState([])
    const [dash  , setDash ] = useState({
        agents_no:[],
        connected :[], disconnected:[],
        all_contacts:[], new_added_contacts:[],
        total_assigned_contacts : [], total_active_contacts : [], total_delivered_contacts : [], total_unhandled_contact : [],
        total_msg_sent : [], total_msg_rev : [],
        avg_resp_time : [],avg_total_first_resp_time : [], longest_resp_time : [],
        chart : {unhandled :[], delivered :[], active :[], user_name :[], user_id :[], team_id :[]},
        data_collected : 0

    })


    let result = currentContacts.map(d=>d.id)


    const default_cols = ["Name","Role","Status","All Contacts","Newly Added Contacts",
    "Average Daily Onlie Time","Assigned Contacts","Active Contacts","Delivered Contacts",
    "Unhandeled Contacts","Total Messages Sent","Average Response Time","Average First Response Time",""];
   
    const rolename =["user_name",
    "user_role_name",
    "user_status",
    "all_contacts",
    "new_added_contacts",
    "avgDailyOnline",
    "assigned_contacts",
    "active_contacts",
    "delivered_contacts",
    "unhandled_contact",
    "msg_sent",
    "avg_resp_time",
    "first_resp_time",
]
    const fetchDefault = async ()=>{
        let end = new window.Date().getTime() / 1000
        let start = end - 3600 * 48
        const data = await dashboardInstance.getAgentDefaultData(start ,end)
        return data

    }

    useEffect(async ()=>{
        if (dash.agents_no.length == 0) {
            let data = await fetchDefault();
            setDash(data)
        } else {
            setFilteredData(dash.Agent)
        }
        console.log("dashboard = ",dash)

    },[dash])


    const periodFilter = () =>{
        console.log("filter period : "+selectedPeriod)
        // dayState <<<timestamp for comparing range
    }
    
    const handleDayClick=(day) => {
        const range = DateUtils.addDayToRange(day, dayState);
        setDayState(range);
    } 
    const handleClickAway = () => {
        setOpen(false);
    };
    const handleClickOut = () => {
        setOpen(true);
    }; const toggleSelectAgents = e => {
        const { checked ,id} = e.target;
        setSelectedAgents([...selectedAgents, id]);
        if (!checked) {
            setSelectedAgents(selectedAgents.filter(item => item !== id));
        }
        // props.agents(e)
        console.log(selectedAgents ,"slescted")
    
    }; const toggleSelectChannels = e => {
        const { checked ,id} = e.target;
        setSelectedChannels([...selectedChannels, id]);
        if (!checked) {
            setSelectedChannels(selectedChannels.filter(item => item !== id));
        }
        // props.agents(e)
        console.log(selectedChannels ,"slescted")
    
    }; const toggleSelectTeams = e => {
        const { checked ,id} = e.target;
        setSelectedTeams([...selectedTeams, id]);
        if (!checked) {
            setSelectedTeams(selectedTeams.filter(item => item !== id));
        }
        // props.agents(e)
        console.log(selectedTeams ,"slescted")
    };
    const renderAgents=() => {
        
        return selectedAgents!=-1&&selectedAgents.map((tag)=>{
            return<Pill key={tag} color="lightPurple">{tag}</Pill>
        })
    }
    const namePush = (nameList)=>{
        setDisplayNameTag(nameList)
        console.log(nameList,"from filter")
    }
    const dashClear = () =>{
        setIsFilterOpen(!isFilterOpen)
        setSelectedAgents([])
        setSelectedChannels([])
        setSelectedTeams([])

    }
    useEffect(()=>{

        let isMounted = true;
        if(dayState.from==null||dayState.from==""){return setSelectedPeriod("Period")}
        else{
            setSelectedPeriod(dayState.from.toLocaleDateString()+" - ")
        }
        if(dayState.to==null||dayState.to==""){return }
        else{
            setSelectedPeriod(dayState.from.toLocaleDateString()+" - "+dayState.to.toLocaleDateString())}

            return () => { isMounted = false };
    },[dayState])

    return (
        <div className="dashboard-layout">
            <div className="navbarPurple">

                <div className={"left"}>
                    <MF_Select head={"Period"} top_head={selectedPeriod==""?"Period":selectedPeriod} submit={periodFilter}   customeDropdown={"calender"}>

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
                            <div className={"filter_box "+(isFilterOpen?"active":"")}>
                                 <div className={"filter_icon"}  onClick={()=>setIsFilterOpen(!isFilterOpen)}></div>
                                     <div className={"filter_panel"} style={{display:isFilterOpen?"flex":"none"}}>

                                    <div className={"chatlist_filter_box"} >
                                                <DashBroadFilter click={dashClear } change={namePush} agents={ toggleSelectAgents} auth={2} channels={toggleSelectChannels } teams={toggleSelectTeams} />
                                    </div>
                                </div>
                            </div>
                            
                        {renderAgents()}
                </div>    
                <div className={"right"}>
                    {/* <div style={{position:"relative"}}>
                        <div >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#2198fa"
                                className="bi bi-upload" viewBox="0 0 16 16" style={{cursor: "pointer"}}>
                                <path
                                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path
                                    d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>
                        </div>

                        <MF_Select head={"Export"}  submit={exportSubmit}  customeDropdown={"topRight"}>
                        <div className={"channelListitem"} style={{width:"400px"}}>
                            <div className={"left"}>
                            <img className={"serachSVG"} src={`livechat/MF_LiveChat_Landing/Search_Bar/MF_LiveChat_Filter/Whatsapp.svg`} />
                            <div style={{margin:"0 5px"}}> whatsapp</div>
                            </div>
                            <div className={"right"}>

                            <div className="newCheckboxContainer right">
                                            <label className="newCheckboxLabel"> 
                                            <input type="checkbox" 
                                                    id={12} 
                                                    name="checkbox" 
                                                    checked={false} 
                                                    // onClick={props.onclick} 
                                                    />
                                            </label>
                                        </div>
                            </div>
                        </div>
                        </MF_Select>
                    </div> */}
                </div>

            </div>
            <div className="lineCardGroupSet">
                <div className="lineCardGroup1">
                    <LineChartCard chart={true} img={false} title={"Agents"} data = {dash.agents_no}/>
                    <LineChartCard chart={true} img={false} title={"Connected"} data = {dash.connected}/>
                    <LineChartCard chart={true} img={false} title={"Disconnected"} data = {dash.disconnected}/>
                    <LineChartCard chart={true} img={false} title={"All Contacts"} data = {dash.all_contacts}/>
                    <LineChartCard chart={true} img={false} title={"Newly Added Contacts"} data = {dash.new_added_contacts}/>
                    <AverageDailyCard data = {dash.avg_resp_time[1] * dash.total_msg_sent[1]}/>
                </div>
                <div className="lineCardGroup2">
                    <ChangingPercentageCard title={"Total Assigned Contacts"} data1={dash.total_assigned_contacts[0]} data2={dash.total_assigned_contacts[1]}/>
                    <ChangingPercentageCard title={"Active Contacts"} data1={dash.total_active_contacts[0]} data2={dash.total_active_contacts[1]} />
                    <ChangingPercentageCard title={"Delivered Contacts"} data1={dash.total_delivered_contacts[0]} data2={dash.total_delivered_contacts[1]} />
                    <ChangingPercentageCard title={"Unhandled Contacts"} data1={dash.total_unhandled_contact[0]} data2={dash.total_unhandled_contact[1]} />
                    <ChangingPercentageCard title={"Total Messages Received"} data1={dash.total_msg_rev[0]} data2={dash.total_msg_rev[1]} />
                    <ChangingPercentageCard title={"Total Messages Sent"} data1={dash.total_msg_sent[0]} data2={dash.total_msg_sent[1]} />
                    <ChangingPercentageCard title={"Average Response Time"} data1={dash.avg_resp_time[0]} data2={dash.avg_resp_time[1]} />
                    <ChangingPercentageCard title={"Average First Response Time"} data1={dash.avg_total_first_resp_time[0]} data2={dash.avg_total_first_resp_time[1]} />
                </div>
            </div>
            <div className="chartGroup">
                <div className="dashboardRow">
                    <div className="dashboardBarColumn"><MultipleBarChart title={"Months"} yaxis={"Contacts"} h={"650px"}
                                                                        active={dash.chart.active}
                                                                        unhandled={dash.chart.unhandled}
                                                                        delivered={dash.chart.delivered}
                                                                        agents={dash.chart.user_name}
                                                                        min1={"12"} min2={12} min3={12}/></div>
                </div>
                
                <div className="dashboardRow" style={{display:"flex",flexDirection:"column"}}>
                        <TableContainer
                        sx={{minWidth: "800px" , minHeight:"250px"}}
                        className={"table_container"}
                        >
                        <Table
                            sx={{minWidth: "800px" }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            stickyHeader={true}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>

                                    </TableCell>
                                    {default_cols.map((col,index)=>{
                                        return (  <TableCell style={{fontWeight:"bold",fontSize:"14px"}} key={index}>{col}</TableCell>)
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
                                            // checked={selectedContacts.includes(data.id)}
                                            // onClick={isSelectRow?toggleSelect:null}
                                        >
                                            <TableCell style={{
                                                width: "30px",
                                                textAlign: "center",
                                                borderBottom: "1px #e0e0e0 solid"
                                            }}>
                                               
                                            </TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[0]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[1]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[2]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[3]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[4]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[5]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[6]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[7]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[8]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[9]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[10]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[11]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[12]]}</span></TableCell>
                                            <TableCell align="left"></TableCell>

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination count={Math.ceil(filteredData.length/10)} page={currentPage} onChange={(e,value)=>{setCurrentPage(value)}}/>

                </div>
            </div>

        </div>

    )
}