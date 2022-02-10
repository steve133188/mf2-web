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
    const [barChart ,setBarChart] =useState();
    const [selectedTeams ,setSelectedTeams] =useState([]);
    const [selectedAgents , setSelectedAgents] = useState([])
    const [users , setUsers] = useState([])
    const [contacts , setContacts] = useState([])
    const [isFilterOpen , setIsFilterOpen] = useState(false);
    const [selectedPeriod ,setSelectedPeriod] =useState("");
    const [dayState,setDayState] = useState({from:"",to:""});
    const [filteredData , setFilteredData] = useState()
    // pagination
    const [currentPage , setCurrentPage] = useState(1)
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentContacts = users.slice(indexOfFirstTodo, indexOfLastTodo);
    //
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

    const default_cols = ["Name","Role","Team","All Contacts","Active Contacts","Delivered Contacts","Unhandeled Contacts","Total Messages Recv","Total Messages Sent","Average Response Time","Average First Response Time",""];


    //  fetch Data functions Start************************************************************************************************************************

    const getUsers = async ()=>{
        const data = await userInstance.getAllUser()
        setUsers(data)
    }

    const getContacts = async () =>{
        const data = await contactInstance.getAllContacts()
        setContacts(data)
    }

    const fetchDefault = async ()=>{

        const data = await dashboardInstance.getLiveChatDefaultData()
        setDash(data)

        console.log("data : " , data.teams)

        const bar = sortBarChart(data.teams)

        setBarChart(bar)
    }

    //  fetch Data functions End************************************************************************************************************************

    //  Sort Data functions Start************************************************************************************************************************


    const sortBarChart = (data) =>{

        console.log("input: " , data)

        let output = {data:[] , cate:[]} ,
            active_contacts = {name:"Active Contacts" , data : []} ,
            unhandle_contacts = {name:"Unhandle Contacts" , data :[]} ,
            delivered_contacts = {name:"Delivered Contacts" , data : []} ;

        //add x cat and sort active_contact first
        for (let d in data.active_contact){

            if(d == "MatrixSense"||d === "None") continue

            output.cate.push(d)

            active_contacts.data.push(data.active_contact[d])

        }

        for (let d in data.unhandled_contact){

            if(d == "MatrixSense"||d === "None") continue

            unhandle_contacts.data.push(data.unhandled_contact[d])

        }

        for (let d in data.delivered_contact){

            if(d == "MatrixSense"||d === "None") continue

            delivered_contacts.data.push(data.delivered_contact[d])

        }

        output.data.push(active_contacts,unhandle_contacts,delivered_contacts)

        console.log(
         "output : " ,output
        )


        return output

    }

    const sortData = (data)=>{

        if(!data || data == undefined) return []

        const keys = Object.keys(data) , res = [] , all = []

        for(let d in data){

            if (data[d].length===1){

                if(all[0] ==undefined) all[0] = 0
                all[0]  += data[d][0]

            }else{

                for(let i =0; i< data[d].length ; i++){

                    if(all[i] ==undefined) all[i] = 0
                    all[i]  += data[d][i]

                }
            }
        }

        res.push({"name":"All" , data:all})

        for(let i = 0 ; i <keys.length ; i++){

            res.push({
                "name":keys[i],
                "data":data[keys[i]]
            })

        }

        return res

    }

    const sortAgents = (data , user , attr)=>{

        if(!data) return[]

        const keyname = user.user_id.toString()

        return data[attr][keyname]

    }

    const renderTeams=() => {

        return selectedTeams!=-1&&selectedTeams.map((tag)=>{

            return<Pill key={tag} color="primary">{tag}</Pill>

        })

    }

    //  Sort Data functions End************************************************************************************************************************

    const initDate = ()=>{
        let s = new Date() , e = new Date()

        s.setDate(s.getDate()-1)

        e.setDate(e.getDate()-7)

        setDayState({from:s,to:e })

    }

    const handleDayClick=(day) => {
        const range = DateUtils.addDayToRange(day, dayState);
        setDayState(range);
        console.log("date = " , range)
    }

    const Define = {
       "Total Assigned Contacts": "Number of contacts assigned to agent(s).",
       "Active Contacts": "Number of contacts with successful conversation. ",
       "Delivered Contacts": "Number of contacts that agents have responded to.",
       "Unhandled Contacts": "Number of contacts that are pending or not yet contacted by agents.",
       "Total Messages Received": "Total number of messages received from contacts.",
       "Total Messages Sent": "Total number of messages sent from agents.",
       "Average Response Time": "Average time of agents responding to contacts.",
       "Average First Response Time": "Average time of agents sending the first response to contacts.",
    }

    const submitDate =async ()=>{
        let s = Date.parse(dayState.from)/1000 , e = Date.parse(dayState.to)/1000
        console.log("day state from : " ,s )
        console.log("day state to :" ,e)
        setIsLoading(true)
        const data = await dashboardInstance.getAgentRangeData(s,e)

        console.log("get dashboard data : " , data)

        setDash(data)

        const bar = sortBarChart(data.teams)

        setBarChart(bar)

        setIsLoading(false)
    }


    useEffect(async()=>{

        if(isLoading){

            initDate()
            await getUsers()
            await getContacts()
            await fetchDefault()
            setIsLoading(false)

        }

    },[])

    return (
        <div className="dashboard-layout">
            <div className="navbarPurple">
            {isLoading?(<Loading state={"preloader"}/> ): (<Loading state={"preloader preloaderFadeOut"}/>)}

                <div className={"left"}>
                    <MF_Select head={"Period"} top_head={selectedPeriod==""?"Period":selectedPeriod} submit={submitDate}   customeDropdown={"calender"}>

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
                                                {/*<DashBroadFilter  confirm={()=>setIsFilterOpen(!isFilterOpen)} change={namePush} agents={ toggleSelectAgents} auth={2} channels={toggleSelectChannels } team={toggleSelectTeams} />*/}
                                    </div>
                                </div>
                            </div>

                        {/*{renderAgents()}{renderTeams()}*/}
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
                    </div> */}
                </div>

            </div>
            <div className="lineCardGroupSet">
                {(selectedAgents.length>0||selectedTeams.length>0)?"":<div className="lineCardGroup1">
                    <LineChartCard chart={true} img={false} title={"Agents"} data={{data:users.length}}/>
                    {/*<LineChartCard chart={true} img={false} title={"Connected"} data={[filteredData.filter(e=>{return e[2]=="Connected"}).length]}/>*/}
                    {/*<LineChartCard chart={true} img={false} title={"Disconnected"} data={[filteredData.filter(e=>e[2]=="Disconnected").length]}/>*/}
                    <LineChartCard chart={true} img={false} title={"All Contacts"} data={{data:(contacts?contacts.length:0)}}/>
                    <LineChartCard chart={true} img={false} title={"Newly Added Contacts"} data={sortData(dash.new_added_contacts)[0]}/>
                    {/*<AverageDailyCard data={null}/>*/}
                    {/* <LineChartCard chart={true} img={false} title={"Agents"} data={dash.agents_no}/>
                    <LineChartCard chart={true} img={false} title={"Connected"} data={dash.connected}/>
                    <LineChartCard chart={true} img={false} title={"Disconnected"} data={dash.disconnected}/>
                    <LineChartCard chart={true} img={false} title={"All Contacts"} data={dash.all_contacts}/>
                    <LineChartCard chart={true} img={false} title={"Newly Added Contacts"} data={dash.new_added_contacts}/>
                    <AverageDailyCard data = {dash.avg_resp_time[1] * dash.total_msg_sent[1]}/> */}
                </div>}
                <div className="lineCardGroup2">
                    <ChangingPercentageCard title={"Total Assigned Contacts"} data={sortData(dash.assigned_contacts)[0]} definData={Define} />
                    <ChangingPercentageCard title={"Active Contacts"} data={sortData(dash.active_contacts)[0]}  definData={Define} />
                    <ChangingPercentageCard title={"Delivered Contacts"} data={sortData(dash.delivered_contacts)[0]} definData={Define} />
                    <ChangingPercentageCard title={"Unhandled Contacts"} data={sortData(dash.unhandled_contacts)[0]}  definData={Define} />
                    <ChangingPercentageCard title={"Total Messages Received"} data={sortData(dash.total_msg_recv)[0]}  definData={Define} />
                    <ChangingPercentageCard title={"Total Messages Sent"} data={sortData(dash.total_msg_sent)[0]}  definData={Define} />
                    <ChangingPercentageCard title={"Average Response Time"} data={sortData(dash.avg_resp_time)[0]}  definData={Define} />
                    <ChangingPercentageCard title={"Average First Response Time"} data={sortData(dash.avg_first_time)[0]}   definData={Define} />
                </div>
            </div>
            <div className="chartGroup">
                <div className="dashboardRow" style={{maxWidth:"1500px",width:"70w",display:"flex",justifyContent:"center",minHeight:"400px",margin:"0 auto"}}  >
                    <div className="dashboardBarColumn" >
                        {barChart &&
                        <MultipleBarChart
                            title={"Branch"}
                            yaxis={"Contacts"}
                            h={"750px"}
                            show={show}
                            chartData={barChart.data}
                            x_cat={barChart.cate}

                        />}
                    </div>
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
                                {/*{filteredData.length!=0 && currentContacts.map((data ,index) => {*/}
                                {users.length!=0 && currentContacts.map((data ,index) => {
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
                                                <span >{data.username}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{sortAgents(dash.agents , data ,"role")}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{sortAgents(dash.agents , data ,"team")}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{sortAgents(dash.agents , data ,"assigned_contact")+sortAgents(dash.agents , data ,"delivered_contact")+sortAgents(dash.agents , data ,"unhandled_contact")}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{sortAgents(dash.agents , data ,"assigned_contact")}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{sortAgents(dash.agents , data ,"delivered_contact")}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{sortAgents(dash.agents , data ,"unhandled_contact")}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{sortAgents(dash.agents , data ,"message_recv")}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{sortAgents(dash.agents , data ,"message_sent")}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{sortAgents(dash.agents , data ,"avg_response_time")}</span></TableCell>
                                            <TableCell align="left">
                                                <span >{sortAgents(dash.agents , data ,"first_response_time")}</span></TableCell>
                                            {/*<TableCell align="left">*/}
                                            {/*    <span >{sortAgents(dash.agents , data ,"all_contacts")}</span></TableCell>*/}
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

                    <Pagination count={Math.ceil(users.length/10)} page={currentPage} onChange={(e,value)=>{setCurrentPage(value)}}/>

                </div>
            </div>

        </div>

    )
}
