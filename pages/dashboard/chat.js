import {LineChart, MultipleLineChart} from "../../components/LineChart";
import {LabelSelect2, SingleSelect2} from "../../components/Select";
// import {EnhancedTable3} from "../../components/EnhancedTable3";
import {BigChangingPercentageCard, LineChartCard} from "../../components/Cards";
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

export default function Chat() {
    const [isLoading, setIsLoading] = useState(true);
    const {dashboardInstance,contactInstance , userInstance ,tagInstance ,orgInstance, user} = useContext(GlobalContext)

    const [filteredAgents , setFilteredAgents] = useState([])
    const [selectedAgents , setSelectedAgents] = useState([])
    const [filteredTags , setFilteredTags] = useState([])
    const [selectedTags , setSelectedTags] =useState([])
    const [contacts, setContacts] = useState([]);
    const [tags, setTags] =useState([])
    const [open, setOpen] = useState(false);
    const [isFilterOpen , setIsFilterOpen] = useState(false)
    const [tagColumn,setTagColumn] = useState(["Tags","Total",""])
    const [dash  , setDash ] = useState({all_contacts :[] , active_contacts:[] , total_msg_sent:[] ,
        total_msg_rev:[] , new_added_contacts:[] , avg_resp_time :[] ,communication_hours :[] , tags:[],
        ChannelContact: [{ChannelName: "", ChannelTotalContact: 0},
        {ChannelName: "", ChannelTotalContact: 0},{ChannelName: "", ChannelTotalContact: 0},
        {ChannelName: "", ChannelTotalContact: 0}]})

    const [selectedData,setselectedDate] =useState([])


    const handleClickAway = () => {
        setOpen(false);
    };


    const exportSubmit = () =>{
        console.log("export : ")

    }
    const periodFilter = () =>{
        console.log("filter period : "+selectedPeriod)
        // dayState <<<timestamp for comparing range
    }
    const [selectedPeriod ,setSelectedPeriod] =useState("")
    const [dayState,setDayState] = useState({from:"",to:""})

    const handleDayClick=(day) => {
      const range = DateUtils.addDayToRange(day, dayState);
      console.log(range,"day tiem range ")
      console.log(typeof(range.from),"day tiem range ")
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
        const totallist  = [3,2,3,4,1,5,8]

        setTags(data.map((e,index)=>{return {...e,total:[totallist[index]]}}))
        console.log(data,"tagsss")
        setFilteredTags(data.map((e,index)=>{return {...e,total:[totallist[index]]}}))

    }
    const fetchContacts = async () =>{
        const data = await contactInstance.getAllContacts()

        console.log(data,"contactssss")
        setContacts(data)

    }
    const renderTags=() => {
        return selectedTags!=-1&&selectedTags.map((tag)=>{
            return<Pill key={tag.tag_id} color="vip">{tag.tag_name}</Pill>
        })
    }
    const changeTags=()=>{
        if(selectedTags.length==0) return setTags(filteredTags)
        setTags(filteredTags.filter(tag=>{return selectedTags.some(el=>parseInt(tag.tag_id)==el)}));
        // setSelectedTags([])
    }

    // const toggleSelectAgents = e => {
    //     const { checked ,id} = e.target;
    //     setSelectedAgents([...selectedAgents, id]);
    //     if (!checked) {
    //         setSelectedAgents(selectedAgents.filter(item => item !== id));
    //     }
    //     // props.agents(e)
    //     console.log(selectedAgents ,"slescted")
    // };
    function tagSearchFilter(keyword , data ,callback ){
        if(keyword.includes(":")){
            // console.log("trigger regex search")
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
        const data = await dashboardInstance.getLiveChatDefaultData(start ,end)
        return data

    }

    useEffect(async ()=>{
        if (isLoading ) {
            let data = await fetchDefault();
            setDash(data)
            setIsLoading(!isLoading)
        }
        await getTags();
        await fetchContacts();
        console.log("dashboard = ",dash)

    },[dash])

    useEffect(()=>{
        const tagsTotal = []
        tags.map(e=>contacts.map(c=>{ 
           
            const values=c.tags.map(t=>{
                if(t.tag_name == e.tag_name ){
                    // const data ={e.tag_name:+=1}
                    console.log("1")
                return tagsTotal.push()
            }
            })}))
        console.log(tagsTotal,"tags total volume")
    },[contacts])


    const channelData = [
        // name:"WhastApp",value:"All",channelID:"All",id:0},
                {name:"WhastApp",value:"Whatsapp",channelID:"Whatsapp",id:1, number : dash.ChannelContact[0].ChannelTotalContact},
                {name:"WhatsApp Business api",value:"WABA",channelID:"WhatsappB",id:2, number : dash.ChannelContact[1].ChannelTotalContact},
                {name:"Messager",value:"Messager",channelID:"Messager",id:3, number : dash.ChannelContact[2].ChannelTotalContact},
                {name:"WeChat",value:"Wechat",channelID:"Wechat",id:4, number : dash.ChannelContact[3].ChannelTotalContact}];
    const [channels, setChannelData] = useState([] )
    // useEffect(()=>{
    //     setChannelData(channelData)
    // },[channelData ])
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

    useEffect(()=>{
        let isMounted = true;
        return () => { isMounted = false };
    },[])
    // tags.map(item=>{ const data = []
    //                 data.push(item)
    //                 data.push
    // })
    return (
        <div className="dashboard-layout">
            {isLoading?(<Loading state={"preloader"}/> ): (<Loading state={"preloader preloaderFadeOut"}/>)}

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
                                                    <DashBroadFilter click={()=>setIsFilterOpen(!isFilterOpen)} auth={1} />
                                        </div>

                                    </div>
                            </div>


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
                    <BigChangingPercentageCard title={"WhatsApp Templated Message"} leftTitle={"Quote:"} leftTotal={"0"} leftPercentage={"0%"} rightTitle={"Sent"} rightTotal={"0"} rightPercentage={"0%"} />


                    <div className={"card_holder1"}>
                    <div style={{margin:"6px 20px auto"}}>Channels</div>
                        <div className={"card_holder"}>
                        {channelData.map((data2,index)=>{
                            return  <LineChartCard key={index} title={data2.name} chart={false} img={true} d={data2} data = {[data2.number]} channel={data2.value} />
                        })
                        }
                        </div>
                    </div>

                    {/* <AverageDailyCard/> */}
                </div>
            </div>
            <div className="chartGroup" >
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart title={"All Contacts"} data={dash.all_contacts} x_cate={dash.yaxis}   xname={"Date"} yaxis={"Contacts"} total={dash.all_contacts.slice(-1)} percentage={""} /></div>
                    <div className="dashboardColumn"><LineChart title={"Active Contacts"} data={dash.active_contacts}  x_cate={dash.yaxis} xname={"Date"} yaxis={"Contacts"} total={dash.active_contacts.reduce((partial_sum, a) => partial_sum + a, 0)} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart title={"Total Messages Sent"} data={dash.total_msg_sent}  x_cate={dash.yaxis} xname={"Date"} yaxis={"Messages"} total={dash.total_msg_sent.reduce((partial_sum, a) => partial_sum + a, 0)} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart title={"Total Messages Received"} data={dash.total_msg_rev} x_cate={dash.yaxis}  xname={"Date"} yaxis={"Messages"} total={dash.total_msg_rev.reduce((partial_sum, a) => partial_sum + a, 0)} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    {/*<div className="dashboardColumn"><LineChart title={"All Contacts"} data={[40, 24, 37, 39, 21, 14, 19, 36, 27, 31, 28, 14]}  x_cate={[]} yaxis={"Enquiries"} total={"14"} percentage={"+5%"} /></div>*/}
                    <div className="dashboardColumn"><LineChart title={"Newly Added Contacts"} data={dash.new_added_contacts}  x_cate={dash.yaxis} xname={"Date"} yaxis={"Contacts"} total={dash.new_added_contacts.reduce((partial_sum, a) => partial_sum + a, 0)} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart title={"Average Response Time"} data={dash.avg_resp_time} x_cate={dash.yaxis}  xname={"Date"} yaxis={"Minus"} total={"0"} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    {/*<div className="dashboardColumn"><LineChart title={"Average Response Time"} data={[16, 24, 23, 36, 19, 20, 25, 29, 29, 22, 34, 37]} x_cate={[]}  yaxis={"Mintes"} total={"37"} percentage={"+5%"} /></div>*/}
                    <div className="dashboardColumn"><LineChart title={"Most Communication Hours"} data={dash.communication_hours} x_cate={[2,4,6,8,10,12,14,16,18,20,22,24]}  xname={"Hours"} yaxis={"Msg Sent"} total={dash.communication_hours.reduce((partial_sum, a) => partial_sum + a, 0)} percentage={"+5%"} /></div>
                    <div className="dashboardColumn">
                        <div className="tableSet">
                            <div className={"half_session block_session"}>
                                <div className={"top_row"}>


                    <div style={{borderWidth:"1px",borderStyle:"solid",width:"100px",padding:"3px .1px",borderRadius:"10px" ,height:"45px",marginRight:"25%"}}>
                        <MF_Select top_head={`Tags : ${tags.length}`} submit={changeTags} head={"Tags"} handleChange={(e)=>{ tagSearchFilter(e.target.value , tags,(new_data)=>{
                            setFilteredTags(new_data)
                        })}} ><div>

                            {filteredTags.map((tag,index)=>{
                                // console.log(tag)
                                return(<li key={index}><Pill size="30px"color="vip">{tag.tag_name}</Pill>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" value={tag.tag_id} id={tag.tag_id} name="checkbox" checked={selectedTags.includes(tag.tag_id)} onClick={toggleSelectTags} onChange={()=>{}} />
                                        </label> </div></li>)
                            })}
                        </div>
                        </MF_Select>


                    </div>


                                </div>
                                {/* <div style={{width:"400px",overflow:"scroll",height:"50px"}}>

                                </div> */}

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

                                                        {tagColumn.map((col,index)=>{
                                                            return (  <TableCell style={{fontWeight:"bold",fontSize:"14px"}} key={index}>{col}</TableCell>)
                                                        })}
                                                        {selectedAgents&&selectedAgents.map((col,index)=>{
                                                            return (  <TableCell style={{fontWeight:"bold",fontSize:"14px"}} key={index}>{col}</TableCell>)
                                                        })}

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

                            {/*<div className="dashboardColumn" style={{width: "55%"}}><EnhancedTable3/></div>*/}
                        </div>
                    </div>

                </div>
                </div>
                <div className="dashboardRow">

            </div>
        </div>

    )
}



