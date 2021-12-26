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


export default function Agents() {
    const [open, setOpen] = useState(false);
    
    
    const [isFilterOpen , setIsFilterOpen] = useState(false);
    const [selectedPeriod ,setSelectedPeriod] =useState("");
    const [dayState,setDayState] = useState({from:"",to:""});
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
    };
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
                    <LineChartCard chart={true} img={false} title={"Agents"} />
                    <LineChartCard chart={true} img={false} title={"Online"} />
                    <LineChartCard chart={true} img={false} title={"Offline"} />
                    <AverageDailyCard/>
                </div>
                <div className="lineCardGroup2">
                    <ChangingPercentageCard title={"Total Assigned Contacts"} total={34} changing={"- 25%"} />
                    <ChangingPercentageCard title={"Active Contacts"} total={30} changing={"+ 8%"} />
                    <ChangingPercentageCard title={"Delivered Contacts"} total={28} changing={"+ 8%"} />
                    <ChangingPercentageCard title={"Unhandled Contacts"} total={28} changing={"+ 8%"} />
                    <ChangingPercentageCard title={"Total Messages Sent"} total={28} changing={"- 8%"} />
                </div>
            </div>
            <div className="chartGroup">
                <div className="dashboardRow">
                    <div className="dashboardBarColumn"><MultipleBarChart title={"Months"} yaxis={"Contacts"} h={"700px"}
                                                                        active={[12, 17, 19, 22, 24, 20, 18, 26, 20, 17, 15, 19]}
                                                                        unhandled={[5, 12, 14, 4, 12, 6, 7, 12, 16, 3, 5, 7]}
                                                                        delivered={[7, 5, 5, 18, 12, 14, 11, 14, 4, 14, 10, 12]}
                                                                        agents={['harry','john','harry','john','harry','john','harry','john','harry','john','harry','john',00]}
                                                                        min1={"12"} min2={12} min3={12}/></div>
                </div>
                
                <div className="dashboardRow">

                </div>
            </div>

        </div>

    )
}