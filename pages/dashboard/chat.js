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

export default function Chat() {
    const [isLoading, setIsLoading] = useState(true);
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)
   
    const [contacts, setContacts] = useState([]);
    const [tags, setTags] =useState([])
    const [open, setOpen] = useState(false);
    const [isFilterOpen , setIsFilterOpen] = useState(false)

    const handleClickAway = () => {
        setOpen(false);
    };


    const periodFilter = () =>{
        console.log("filter period : "+selectedPeriod)
        // dayState <<<timestamp for comparing range
    }
    const exportSubmit = () =>{
        console.log("export : ")

    }
    const [selectedPeriod ,setSelectedPeriod] =useState("")
    const [dayState,setDayState] = useState({from:"",to:""})

    const handleDayClick=(day) => {
      const range = DateUtils.addDayToRange(day, dayState);
      setDayState(range);
    } 
    const getTags = async ()=>{
        const data = await adminInstance.getAllTags()
        setTags(data)
        console.log(data,"tagsss")
        // setFilteredTags(data)

    }
    const fetchContacts = async () =>{
        const data = await contactInstance.getAllContacts()
        setContacts(data)
        // setFilteredData(data)
    }
    useEffect(async ()=>{
        await fetchContacts();
        await getTags();
    },[])
    const channelData = [
        // name:"WhastApp",value:"All",channelID:"All",id:0},
                {name:"WhastApp",value:"Whatsapp",channelID:"Whatsapp",id:1},
                {name:"WhatsApp Business",value:"WhatsappB",channelID:"WhatsappB",id:2},
                {name:"Messager",value:"Messager",channelID:"Messager",id:3},
                {name:"WeChat",value:"Wechat",channelID:"Wechat",id:4},];
    const [channels, setChannelData] = useState([] )
    // useEffect(()=>{
    //     setChannelData(channelData)
    // },[channelData ])



    useEffect(()=>{
        if(dayState.from==null||dayState.from==""){return setSelectedPeriod("Period")}
        else{
            setSelectedPeriod(dayState.from.toLocaleDateString()+" - ")
        }
        if(dayState.to==null||dayState.to==""){return }
        else{
            setSelectedPeriod(dayState.from.toLocaleDateString()+" - "+dayState.to.toLocaleDateString())}
    },[dayState])

    useEffect(() => {
        setTimeout(function() { //Start the timer
            setIsLoading(false);
        }.bind(this), 100)

    },[]);

    return (
        <div className="dashboard-layout">
            {isLoading?(<Loading state={"preloader"}/> ): (<Loading state={"preloaderFadeOut"}/>)}

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
                                                <DashBroadFilter click={()=>setIsFilterOpen(!isFilterOpen)} />
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
                    <BigChangingPercentageCard title={"WhatsApp Templated Message"} leftTitle={"Quote:"} leftTotal={"34"} leftPercentage={"- 25%"} rightTitle={"Sent"} rightTotal={"10"} rightPercentage={"+ 10%"} />

                    <div className={"card_holder"}>
                    {channelData.map((data)=>{
                            return  <LineChartCard  title={data.name} chart={false} img={true} d={data} channel={data.channelID} />       
                        })
                    }
                        </div>

                    {/* <AverageDailyCard/> */}
                </div>
            </div>
            <div className="chartGroup">
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart title={"All Contacts"} data={[25, 24, 32, 36, 32, 30, 33, 33, 20, 17, 19, 34]} yaxis={"Contacts"} total={"34"} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart title={"Active Contacts"} data={[12, 17, 19, 22, 24, 20, 18, 26, 20, 17, 15, 19]} yaxis={"Contacts"} total={"19"} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart title={"Total Messages Sent"} data={[23, 38, 30, 17, 26, 18, 34, 13, 19, 39, 22, 14]} yaxis={"Messages"} total={"14"} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart title={"Total Messages Received"} data={[17, 18, 17, 13, 40, 17, 36, 33, 25, 34, 36, 15]} yaxis={"Messages"} total={"15"} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart title={"All Contacts"} data={[40, 24, 37, 39, 21, 14, 19, 36, 27, 31, 28, 14]} yaxis={"Enquiries"} total={"14"} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart title={"Newly Added Contacts"} data={[21, 18, 17, 35, 38, 16, 40, 18, 12, 24, 30, 20]} yaxis={"Contacts"} total={"20"} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart title={"Average Response Time"} data={[16, 24, 23, 36, 19, 20, 25, 29, 29, 22, 34, 37]} yaxis={"Mintes"} total={"37"} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart title={"Most Communication Hours"} data={[28, 30, 17, 18, 36, 13, 23, 36, 34, 23, 15, 26]} yaxis={"Hours"} total={"26"} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    <div className="tableSet">
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Tags</span></div>
                            <div className={"session_content"}>
                            {tags.map((tag , indexc)=>{return <div >
                                <div>{tag.tag}</div>
                                <Pill key={tag.id} size="30px" color="vip">{tag.tag}</Pill>
                            </div>})}
                        </div>
                    </div>

                        {/*<div className="dashboardColumn" style={{width: "55%"}}><EnhancedTable3/></div>*/}
                    </div>
                </div>
            </div>
        </div>

    )
}