import {AverageDailyCard, BigChangingPercentageCard, LineChartCard} from "../../components/Cards";
import {CancelButton, NormalButton2} from "../../components/Button";
import {Checkbox} from "../../components/Checkbox";
import {Pill} from "../../components/Pill";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import MF_Select from "../../components/MF_Select";
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import DashBroadFilter from "../../components/broadcast/dashbroad_filter";
import Loading from "../../components/Loading";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell, TableHead} from "@mui/material";

import searchFilter from "../../helpers/searchFilter";
import dashboardFetcher from "../../helpers/dashboardHelpers";
import {LineChart} from "../../components/LineChart";

export default function Chat() {
    const [isLoading, setIsLoading] = useState(true);
    const {dashboardInstance,contactInstance , userInstance ,tagInstance ,orgInstance, user} = useContext(GlobalContext)
    const [filteredAgents , setFilteredAgents] = useState([])
    const [selectedAgents , setSelectedAgents] = useState([])
    const [filteredTags , setFilteredTags] = useState([])
    const [selectedTags , setSelectedTags] =useState([])
    const [contacts, setContacts] = useState([]);
    const [tags, setTags] =useState([])
    const [isFilterOpen , setIsFilterOpen] = useState(false)
    const [dash  , setDash ] = useState({})
    const [activeContacts ,setActiveContacts] =useState()
    const [agents , setAgents] =useState()
    const [allContacts , setAllContacts] =useState()
    const [assignedContacts , setAssignedContacts] =useState()
    const [AvgFirstTime , setAvgFirstTime] =useState()
    const [AvgRestTime  , setAvgRestTime] =useState()
    const [deliveredContacts , setDeliveredContacts] =useState()
    const [newAddedContacts , setNewAddedContacts] =useState()
    const [tags_data , setTags_data] =useState()
    const [totalMessageReceived , setTotalMessageReceived] =useState()
    const [totalMessageSent, setTotalMessageSent] =useState()
    const [unHandleContacts , setUnHandleContacts] =useState()

    const [dayState,setDayState] = useState({from:"",to:""})

    const dataProcess = (data)=>{
    //    construct the data
        const {active_contacts ,
            agents ,
            all_contacts ,
            assigned_contacts,
            avg_first_time,
            avg_rest_time,
            communication_hours,
            delivered_contacts,
            new_added_contacts,
            tags,
            total_msg_recv,
            total_msg_sent,
            unhandled_contacts
        } = data
    //   calculate the data

    //    set States


    }

    const sortData = (data)=>{
        if(!data) return [{"name":"no data" , "data":[0]}]
        const keys = Object.keys(data)
        console.log("keys : " , keys)
        const res = [];
        const all = []
        for(let d in data){
            if (data[d].length==1){
                if(all[0] ==undefined) all[0] = 0
                all[0]  += data[d][0]
            }else{
                for(let i =0; i< data[d].length ; i++){
                    if(all[i] ==undefined) all[i] = 0
                    all[i]  += data[d][i]
                }
            }
            console.log(data[d])

        }
        console.log("all data : " , all)
        res.push({"name":"All" , data:all})
        for(let i = 0 ; i <keys.length ; i++){
            res.push({
                "name":keys[i],
                "data":data[keys[i]]
            })
        }
        console.log("render data : " , res)
        return res
    }

    const handleDayClick=(day) => {
      const range = DateUtils.addDayToRange(day, dayState);
      setDayState(range);
    }
    const toggleSelectTags = e => {
        const { checked ,id} = e.target;
        console.log( checked,id)
        setSelectedTags([...selectedTags, parseInt( id)]);
        if (!checked) {
            setSelectedTags(selectedTags.filter(item => item !== parseInt(id)));
        }
        console.log(selectedTags)
    };
    const getTags = async ()=>{
        const data = await tagInstance.getAllTags()
        const totallist  = [3,2,3,4,1,5,8,7]
        setTags(data.map((e,index)=>{return {...e,total:[totallist[index]]}}))
        setFilteredTags(data.map((e,index)=>{return {...e,total:[totallist[index]]}}))
    }
    const fetchContacts = async () =>{
        const data = await contactInstance.getAllContacts()
        setContacts(data)
    }

    function tagSearchFilter(keyword , data ,callback ){
        if(keyword.includes(":")){
            console.log("trigger regex search")
        }
        const newData = data.filter(d=> {
            if(keyword.trim() == ""){
                return data
            }
            return d.tag_name.toLowerCase().includes(keyword)
        })
        callback(newData)
    }
    const fetchDefault = async ()=>{
        let end = new window.Date().getTime() / 1000
        let start = end - 3600 * 24*7
        const data = await dashboardInstance.getLiveChatDefaultData()
        setDash(prevState => data)
        console.log("fetch data : " , data.new_added_contacts , data.avg_resp_time , data.communication_hours)
    }

    const renderChannelsContacts = (data)=>{

        let allData = []
        const messager = {
            name:"Facebook Messager",
            data:0,
            channel:"Messager"
        }

        const wechat = {
            name:"WeChat",
            data:0,
            channel:"WeChat"
        }
        console.log("render data cards : ",data )
        for (let d in data){
            console.log("looped card data :",data[d])
            console.log("d== ", d)
            const newData = {
                name:d,
                channel:d,
                data:data[d][data[d].length -1]
            }
            console.log("New data === " , newData)
            allData.push(newData)
        }

        allData.push(messager , wechat)

        return( allData.map((data , index)=>{
                return <LineChartCard key={index} title={data.name} chart={false} img={true} data={data} channel={data.channel}/>
        })
    )
    }

    useEffect(async ()=>{
        if (isLoading ) {
            await fetchDefault()
            await getTags();
            await fetchContacts();
            setIsLoading(false)
        }

        console.log("dashboard = ",dash)

    },[])

    return isLoading?(<Loading state={"preloader"}/>):(
                <div className={"dashboard-layout"}>
            <div className="navbarPurple">
                <div className={"left"}>
                    <MF_Select head={"Period"} top_head={"Period"} customeDropdown={"calender"}>

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
                                                    <DashBroadFilter cancelClick={()=>setIsFilterOpen(!isFilterOpen)} confirm={()=>setIsFilterOpen(!isFilterOpen)} auth={1} />
                                        </div>

                                    </div>
                            </div>


                            </div>
                <div className={"right"}>
                    {/* <div style={{position:"relative"}}>*/}
                    {/*    <div >*/}
                    {/*        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#2198fa"*/}
                    {/*            className="bi bi-upload" viewBox="0 0 16 16" style={{cursor: "pointer"}}>*/}
                    {/*            <path*/}
                    {/*                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>*/}
                    {/*            <path*/}
                    {/*                d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>*/}
                    {/*        </svg>*/}
                    {/*    </div>*/}

                    {/*    <MF_Select head={"Export"}   customeDropdown={"topRight"}>*/}
                    {/*    <div className={"channelListitem"} style={{width:"400px"}}>*/}
                    {/*        <div className={"left"}>*/}
                    {/*        <img className={"serachSVG"} src={`livechat/MF_LiveChat_Landing/Search_Bar/MF_LiveChat_Filter/Whatsapp.svg`} />*/}
                    {/*        <div style={{margin:"0 5px"}}> whatsapp</div>*/}
                    {/*        </div>*/}
                    {/*        <div className={"right"}>*/}

                    {/*        <div className="newCheckboxContainer right">*/}
                    {/*                        <label className="newCheckboxLabel">*/}
                    {/*                        <input type="checkbox"*/}
                    {/*                                id={12}*/}
                    {/*                                name="checkbox"*/}
                    {/*                                checked={false}*/}
                    {/*                                // onClick={props.onclick}*/}
                    {/*                                />*/}
                    {/*                        </label>*/}
                    {/*                    </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    </MF_Select>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className="lineCardGroupSet">

                <div className="lineCardGroup1">
                    <BigChangingPercentageCard title={"WhatsApp Templated Message"} leftTitle={"Quote:"} leftTotal={"0"} leftPercentage={"0%"} rightTitle={"Sent"} rightTotal={"0"} rightPercentage={"0%"} />


                    <div className={"card_holder1"}>
                    <div style={{margin:"6px 20px auto"}}>Channels</div>
                        <div className={"card_holder"}>

                            {dash.all_contacts&&renderChannelsContacts(dash.all_contacts)}
                        {/*{channelData.map((data2,index)=>{*/}
                        {/*    return  <LineChartCard key={index} title={data2.name} chart={false} img={true} d={data2} data = {[data2.number]} channel={data2.value} />*/}
                        {/*})*/}
                        {/*}*/}
                        </div>
                    </div>

                     {/*<AverageDailyCard/>*/}
                </div>
            </div>
            <div className="chartGroup" >
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart title={"All Contacts"} definition={""} series={sortData(dash.all_contacts)} x_cate={""}   xname={"Date"} yaxis={"Contacts"} total={dash.all_contacts.Whatsapp[dash.all_contacts.Whatsapp.length-1]} percentage={""} /></div>
                    <div className="dashboardColumn"><LineChart title={"Active Contacts"} definition={"Number of contacts with successful conversation."} series={sortData(dash.active_contacts)}  x_cate={dash.yaxis} xname={"Date"} yaxis={"Contacts"} total={sortData(dash.active_contacts)[0].data[sortData(dash.active_contacts)[0].data.length-1]} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart title={"Total Messages Sent"} definition={"Total number of messages received from contacts."} series={sortData(dash.total_msg_sent)}  x_cate={dash.yaxis} xname={"Date"} yaxis={"Messages"} total={sortData(dash.total_msg_sent)[0].data[sortData(dash.total_msg_sent)[0].data.length-1]} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart title={"Total Messages Received"} definition={"Total number of messages received from contacts."} series={sortData(dash.total_msg_recv)} x_cate={dash.yaxis}  xname={"Date"} yaxis={"Messages"} total={sortData(dash.total_msg_recv)[0].data[sortData(dash.total_msg_recv)[0].data.length-1]} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    {/*<div className="dashboardColumn"><LineChart title={"All Contacts"} data={[40, 24, 37, 39, 21, 14, 19, 36, 27, 31, 28, 14]}  x_cate={[]} yaxis={"Enquiries"} total={"14"} percentage={"+5%"} /></div>*/}
                    <div className="dashboardColumn"><LineChart title={"Newly Added Contacts"} definition={"Number of contacts that are manually created, or by import, or by new channel integration."} series={sortData(dash.new_added_contacts)} x_cate={dash.yaxis}  xname={"Date"} yaxis={"Contacts"} total={sortData(dash.new_added_contacts)[0].data[sortData(dash.new_added_contacts).length-1]} /></div>
                    <div className="dashboardColumn"><LineChart title={"Average Response Time"} definition={"Average time of agents responding to contacts."} series={sortData(dash.avg_resp_time)} x_cate={dash.yaxis}  xname={"Date"} yaxis={"Minus"} total={sortData(dash.avg_resp_time)[0].data[sortData(dash.avg_resp_time)[0].data.length-1]} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    {/*<div className="dashboardColumn"><LineChart title={"Average Response Time"} data={[16, 24, 23, 36, 19, 20, 25, 29, 29, 22, 34, 37]} x_cate={[]}  yaxis={"Mintes"} total={"37"} percentage={"+5%"} /></div>*/}
                    <div className="dashboardColumn"><LineChart title={"Most Communication Hours"} definition={"Most active time that agents and contacts communicated within 24 hours."} series={sortData(dash.communication_hours)}   xname={"Hours"} yaxis={"Msg Sent"} total={0} percentage={"+5%"} /></div>
                    <div className="dashboardColumn">
                        <div className="tableSet">
                            <div className={"half_session block_session"}>
                                <div className={"top_row"} style={{justifyContent:"flex-start"}}>


                                <div style={{borderWidth:"1px",borderStyle:"solid",width:"100px",padding:"3px .1px",borderRadius:"10px" ,height:"45px",marginRight:"5%"}}>
                                    <MF_Select top_head={`Tags : ${tags.length}`}  head={"Tags"} handleChange={(e)=>{ tagSearchFilter(e.target.value , tags,(new_data)=>{
                                        setFilteredTags(new_data)
                                    })}} >
                                        <div>

                                        {filteredTags.map((tag,index)=>{
                                            return(<li key={index}><Pill size="30px"color="vip">{tag.tag_name}</Pill>

                                                <div className="newCheckboxContainer">
                                                    <label className="newCheckboxLabel">
                                                        <input type="checkbox" value={tag.tag_id} id={tag.tag_id} name="checkbox" checked={selectedTags.includes(tag.tag_id)} onClick={toggleSelectTags} onChange={()=>{}} />
                                                    </label> </div></li>)
                                        })}
                                    </div>
                                    </MF_Select>

                                </div>
                                    <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center" }} >
                                        <p style={{color: "#495057", fontSize: "16px", fontWeight: "600",width:"fit-content", margin:"10px 15px 15px 0px"}}> </p>
                                        <div className={"chart_info"} > ?
                                        <p  className={"chart_info_details"}  > Number of tags created and assigned to contacts.</p>
                                        </div>
                                    </div>


                                </div>
                                <div className={"session_content"}>
                                    <div className={"session_content_tag"}>

                                        <TableContainer
                                            sx={{minWidth: 450 ,}}
                                            className={"table_container"}
                                        >
                                            <Table
                                                sx={{minWidth: 450 }}
                                                aria-labelledby="tableTitle"
                                                size={'medium'}
                                                stickyHeader={true}
                                            >
                                                <TableHead>
                                                    <TableRow>

                                                        {/*{tagColumn.map((col,index)=>{*/}
                                                        {/*    return (  <TableCell style={{fontWeight:"bold",fontSize:"14px"}} key={index}>{col}</TableCell>)*/}
                                                        {/*})}*/}
                                                        {/*{selectedAgents&&selectedAgents.map((col,index)=>{*/}
                                                        {/*    return (  <TableCell style={{fontWeight:"bold",fontSize:"14px"}} key={index}>{col}</TableCell>)*/}
                                                        {/*})}*/}

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {tags.map((item,index)=>{
                                                        return( <TableRow
                                                                key={index}
                                                                hover
                                                                // role="checkbox"
                                                                name={item.tag_name}
                                                                // checked={selectedUsers.includes(data.phone)}

                                                            >
                                                                <TableCell style={{width: "35%",}}>

                                                                    <Pill key={item.tag_id} size="30px" color="vip">{item.tag_name}</Pill>
                                                                </TableCell>
                                                                <TableCell align="left" style={{width: "50%",}}>
                                                                    <span >{item.total}</span>
                                                                </TableCell>
                                                                <TableCell align="left" style={{width: "50%",}}>

                                                                </TableCell>

                                                                {/* {selectedData&&selectedData.map(item=>{return  <
                                                                    TableCell align="left" style={{width: "auto",}}>
                                                                    {item.tag_name}
                                                                </TableCell>})}

                                                                <TableCell align="left" style={{width: "auto",}}>

                                                                </TableCell> */}
                                                                {/*<TableCell align="right">*/}
                                                                {/*    <span className={"right_icon_btn"}>{editSVG}</span>*/}
                                                                {/*    <span className={"right_icon_btn"}>{deleteSVG}</span>*/}
                                                                {/*</TableCell>*/}
                                                            </TableRow>
                                                        ) })}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                </div>
                <div className="dashboardRow">

            </div>
        </div>)



}



