import {AverageDailyCard, ChangingPercentageCard, LineChartCard} from "../../components/Cards";
import {MultipleBarChart, MultipleLineChart} from "../../components/LineChart";
import {useContext, useEffect, useState} from "react";
import {CancelButton, NormalButton2} from "../../components/Button";
import {LabelSelect2} from "../../components/Select";
import {Pill} from "../../components/Pill";
// import DashboardFilter from "../../components/Dashboard/agents/XXXXDashboardFilter";
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
import Loading from "../../components/Loading";

export default function Agents() {
    const [isLoading, setIsLoading] = useState(true);
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
    const [show,setShow] =useState(false)
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


    const default_cols = ["Name","Role","Status",
    // ,"All Contacts","Newly Added Contacts",
    "Average Daily Onlie Time","Assigned Contacts","Active Contacts","Delivered Contacts",
    "Unhandeled Contacts","Total Messages Sent","Average Response Time","Average First Response Time",""];

    const rolename =["user_name",
    "user_role_name",
    "user_status",
    // "all_contacts",
    // "new_added_contacts",
    "avgDailyOnline",
    "assigned_contacts",
    "active_contacts",
    "delivered_contacts",
    "unhandled_contact",
    "msg_sent",
    "avg_resp_time",
    "first_resp_time",
]

    const [handelList,setHandelList] = useState([])
    const [deilverList,setDeliverList] = useState([])
    const [unhandelList,setUnhandelList] = useState([])
    const [agentsList,setAgentsList] = useState([])




    const tempData=[
        ["Marry Tse","DM",'Connected',35,15,10,3,2,27,5,7],
        ["Wiva Wei","Maneger",'Connected',50,10,7,1,2,8,7,7],
        ["Sabrina","Maneger",'Connected',56,10,5,5,0,5,15,20],
        ["Steve Chak",'Agent','Connected',40,7,7,0,0,14,3.5,2],
        ["Philip Tam",'Agent','Connected',55,5,5,0,0,9,3,4],
        ["Alex",'Agent','Connected',60,6,4,0,2,6,8.6,15],
        ["Jason Fung",'Agent','Connected',42,8,3,3,2,9,7,7],
        ["Ben Cheng",'Agent','Disconnected',0,0,0,0,0,0,0,0],
        // ["Golden",'Agent','Disconnected',0,0,0,0,0,0,0,0],
        // ["Amy",'Agent','Disconnected',0,0,0,0,0,0,0,0],

    ]

    const AverDailyOnlineTime = tempData.map(a=>a[3]).reduce((org,cur)=>{
        return org+cur
    })

    
    const AssignedContacts= tempData.map(a=>a[4]).reduce((org,cur)=>{
        return org+cur
    })
    const ActiveContacts= tempData.map(a=>a[5]).reduce((org,cur)=>{
        return org+cur
    })
    const DeliveredContact= tempData.map(a=>a[6]).reduce((org,cur)=>{
        return org+cur
    })
    const UnhandeledContact= tempData.map(a=>a[7]).reduce((org,cur)=>{
        return org+cur
    })
    // const TotalMessagesReceived= tempData.map(a=>a[8]).reduce((org,cur)=>{
    //     return org+cur
    // })
    const TotalMessagesSent= tempData.map(a=>a[8]).reduce((org,cur)=>{
        return org+cur
    })
    const AverageResponseTime= tempData.map(a=>a[9]).reduce((org,cur)=>{
        return org+cur
    })
    const AverageFirstResponse= tempData.map(a=>a[10]).reduce((org,cur)=>{
        return org+cur
    })


    useEffect(()=>{
        setFilteredData(tempData)
    },[])

    useEffect(()=>{
        setHandelList(filteredData.map(h=>h[5]),"handeled")
        setDeliverList(filteredData.map(d=>d[6]))
        setUnhandelList(filteredData.map(u=>u[7]),"unhandeled")
        setAgentsList(filteredData.map(n=>n[0]),"unhandeled")
    console.log(agentsList,"agadsfads");

    },[filteredData])

    const filterHandel =()=>{

        // setFilteredData(tempData)
        const data = tempData.filter(f=>{return  (selectedAgents.filter(el=>{return el == f[0]})==f[0])})
        console.log(data,"after data")
        setFilteredData(data)
    }
    useEffect(()=>{

        selectedAgents.length>0? filterHandel():selectedAgents.length=0? setFilteredData(tempData):""
        
    },[selectedAgents])

    const clear = ()=>{
        setSelectedAgents([])
    }



    const fetchDefault = async ()=>{
        let end = new window.Date().getTime() / 1000
        let start = end - 3600 * 24 * 7
        console.log(start,end,"default")
        const data = await dashboardInstance.getAgentDefaultData(start ,end)
        return data
    }
    useEffect(async()=>{
        let data = await fetchDefault();
        setDash(data)
        
        if(isLoading){
            setTimeout(function() { //Start the timer
                setIsLoading(false);
            }.bind(this), 100)
        }
    },[])
    useEffect(async ()=>{
        if (dash.agents_no.length == 0) {
            let data = await fetchDefault();
            console.log(data,"let me see")
            setDash(data)
            const ado=[35,50,56,40,55,60,42]
            const list  = data.Agent.map((e,index)=>{return {...e,avgDailyOnline:ado[index]}})
            // setFilteredData(list)
        } else {
            const dataIN = Date.parse(dayState.from)/1000
            const dataEND = Date.parse(dayState.to)/1000
            console.log("date form fetch dashbroad data",dataIN,dataEND)
            const data = await dashboardInstance.getAgentRangeData(dataIN,dataEND)
            console.log("fetch data by range",data)
            // setDash(data)

            // setFilteredData(dash.Agent)
        }
        console.log("dashboard = ",dash)
        console.log("dashboard dayState = ",dayState)

    },[dayState.to])


    useEffect(async()=>{
        console.log(dash,"determin time ")
        setShow(!show)
    },[filteredData])

    const periodFilter = () =>{
        console.log("filter period : "+selectedPeriod)
        // dayState <<<timestamp for comparing range
    }

    const handleDayClick=(day) => {
        const range = DateUtils.addDayToRange(day, dayState);
        console.log(range)
        console.log(Date.parse(range.from)/1000,"try")
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
        setFilteredData(tempData)

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
            {isLoading?(<Loading state={"preloader"}/> ): (<Loading state={"preloader preloaderFadeOut"}/>)}

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
                                                <DashBroadFilter cancelClick={dashClear} confirm={()=>setIsFilterOpen(!isFilterOpen)} change={namePush} agents={ toggleSelectAgents} auth={2} channels={toggleSelectChannels } teams={toggleSelectTeams} />
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
                    <LineChartCard chart={true} img={false} title={"Agents"} data={[tempData.length]}/>
                    <LineChartCard chart={true} img={false} title={"Connected"} data={[tempData.filter(e=>{return e[2]=="Connected"}).length]}/>
                    <LineChartCard chart={true} img={false} title={"Disconnected"} data={[tempData.filter(e=>e[2]=="Disconnected").length]}/>
                    <LineChartCard chart={true} img={false} title={"All Contacts"} data={[15]}/>
                    <LineChartCard chart={true} img={false} title={"Newly Added Contacts"} data={[7]}/>
                    <AverageDailyCard data = {[AverDailyOnlineTime*60]}/>
                    {/* <LineChartCard chart={true} img={false} title={"Agents"} data={dash.agents_no}/>
                    <LineChartCard chart={true} img={false} title={"Connected"} data={dash.connected}/>
                    <LineChartCard chart={true} img={false} title={"Disconnected"} data={dash.disconnected}/>
                    <LineChartCard chart={true} img={false} title={"All Contacts"} data={dash.all_contacts}/>
                    <LineChartCard chart={true} img={false} title={"Newly Added Contacts"} data={dash.new_added_contacts}/>
                    <AverageDailyCard data = {dash.avg_resp_time[1] * dash.total_msg_sent[1]}/> */}
                </div>
                <div className="lineCardGroup2">
                    <ChangingPercentageCard title={"Total Assigned Contacts"} data2={AssignedContacts} data1={[5]}/>
                    <ChangingPercentageCard title={"Active Contacts"} data2={ActiveContacts} data1={[5]}/>
                    <ChangingPercentageCard title={"Delivered Contacts"} data2={DeliveredContact} data1={[5]}/>
                    <ChangingPercentageCard title={"Unhandled Contacts"} data2={UnhandeledContact} data1={[5]}/>
                    <ChangingPercentageCard title={"Total Messages Received"} data2={[70]} data1={[5]}/>
                    <ChangingPercentageCard title={"Total Messages Sent"} data2={TotalMessagesSent} data1={[5]}/>
                    <ChangingPercentageCard title={"Average Response Time"} data2={AverageResponseTime} data1={[5]}/>
                    <ChangingPercentageCard title={"Average First Response Time"} data1={AverageFirstResponse} data2={38} />
                </div>
            </div>
            <div className="chartGroup">
                <div className="dashboardRow" style={{maxWidth:"1500px",width:"70w",display:"flex",justifyContent:"center",minHeight:"400px",margin:"0 auto"}}  >
                    <div className="dashboardBarColumn" >
                        <MultipleBarChart title={"Agents"} yaxis={"Contacts"} h={"750px"}
                                                                        active={handelList}
                                                                        unhandled={unhandelList}
                                                                        delivered={deilverList}
                                                                        agents={agentsList}
                                                                        min1={12} min2={12} min3={12} show={show}/></div>
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
                                                <span >{data[0]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[1]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[2]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[3]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[4]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[5]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[6]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[7]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[8]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[9]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[10]}</span></TableCell>
                                            {/* <TableCell align="left">
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
                                                <span >{data[rolename[10]]}</span></TableCell> */}
                                            {/* <TableCell align="left">
                                                <span >{data[rolename[11]]}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{data[rolename[12]]}</span></TableCell>
                                            <TableCell align="left"></TableCell> */}

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
