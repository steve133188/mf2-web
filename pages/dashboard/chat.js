import {LineChart, MultipleLineChart} from "../../components/LineChart";
import {LabelSelect2, SingleSelect2} from "../../components/Select";
// import {EnhancedTable3} from "../../components/EnhancedTable3";
import {BigChangingPercentageCard} from "../../components/Cards";
import * as React from "react";
import {CancelButton, NormalButton2} from "../../components/Button";
import {Checkbox} from "../../components/Checkbox";
import {Pill} from "../../components/Pill";
import {useContext, useEffect, useState} from "react";

import MF_Select from "../../components/MF_Select";
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

export default function Chat() {
    const [open, setOpen] = React.useState(false);
    const handleClickAway = () => {
        setOpen(false);
    };

    const [selectedPeriod ,setSelectedPeriod] =useState("")
    const [dayState,setDayState] = useState({from:"",to:""})

    const handleDayClick=(day) => {
      const range = DateUtils.addDayToRange(day, dayState);
      setDayState(range);
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
    },[dayState])
    useEffect(()=>{
        setSelectedPeriod(startDay+"-"+endDay)
    },[startDay])
    useEffect(()=>{
        setSelectedPeriod(startDay+"-"+endDay)
    },[endDay])


    return (
        <div className="dashboard-layout">
            <div className="navbarPurple">

                <MF_Select head={"Period"} top_head={selectedPeriod==""?"Period":selectedPeriod}    customeDropdown={"calender"}>

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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#2198fa"
                     className="bi bi-upload" viewBox="0 0 16 16" style={{cursor: "pointer"}}>
                    <path
                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path
                        d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
            </div>
            {open ? (
                <span className={"dashboardFilter"}>
                    <div className="filterArea">
                        <div className="checkboxGroup1">
                            <h1>Filter</h1>
                            <div className="buttonGrp">
                                <NormalButton2>Confirm</NormalButton2>
                                <span className="cancelBtn" onClick={handleClickAway}><CancelButton></CancelButton></span>
                            </div>
                        </div>
                        <div className="checkboxGroup2">
                            <p>Channel</p>
                            <div className="checkboxGrp">
                                <Checkbox src={"/allchannel.svg"}>All Channel
                                </Checkbox>
                                <Checkbox src={"/whatsappCheck.svg"} checked={"checked"}>WhatsApp
                                </Checkbox>
                                <Checkbox src={"/wbaCheck.svg"}>WhatsApp Business API
                                </Checkbox>
                                <Checkbox src={"/messageCheck.svg"}>Messager
                                </Checkbox>
                                <Checkbox src={"/wechatCheck.svg"}>WeChat
                                </Checkbox>
                            </div>
                        </div>
                        <div className="agentFilter">
                            <p>Organization</p>
                            <LabelSelect2 placeholder={"Choose Organization"} select1={"Division 1"} select2={"Division 2"} select3={"Division 3"} select4={"Division 4"}/>
                        </div>
                        <div className="agentFilter">
                            <p>Team</p>
                            <LabelSelect2 placeholder={"Choose Team"} select1={"Division 1"} select2={"Division 2"} select3={"Division 3"} select4={"Division 4"}/>
                        </div>
                        <div className="agentFilter">
                            <p>Agent</p>
                            <LabelSelect2 placeholder={"Choose Index"} select1={"Mary Foster"} select2={"Harry Swart"} select3={"Walter Jackson"} select4={"Denny Hackwin"}/>
                            <div className="agentGroup">
                                <Pill color="lightYellow" size="size30">MF</Pill>
                                <Pill color="lightBlue" size="size30">MF</Pill>
                            </div>
                        </div>

                    </div>
                </span>
            ) : null}
            <BigChangingPercentageCard title={"WhatsApp Templated Message"} leftTitle={"Quote:"} leftTotal={"34"} leftPercentage={"- 25%"} rightTitle={"Sent"} rightTotal={"10"} rightPercentage={"+ 10%"} />
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
                        {/*<div className="dashboardColumn" style={{width: "55%"}}><EnhancedTable3/></div>*/}
                    </div>
                </div>
            </div>
        </div>

    )
}