import {LineChart1, MultipleLineChart} from "../../components/LineChart1";
import {LabelSelect2, SingleSelect2} from "../../components/Select";
import {EnhancedTable} from "../../components/Table";
import {EnhancedTable2} from "../../components/EnhancedTable2";
import {EnhancedTable3} from "../../components/EnhancedTable3";
import {AverageDailyCard, LineChartCard} from "../../components/Cards";
import * as React from "react";
import {CancelButton, NormalButton2} from "../../components/Button";
import {CheckboxNew} from "../../components/Checkbox";
import {Pill} from "../../components/Pill";

export default function Livechat() {
    const [open, setOpen] = React.useState(false);
    const handleClickAway = () => {
        setOpen(false);
    };
    const handleClickOut = () => {
        setOpen(true);
    };
    const lineChartCardCell = [
        {

        }
    ]

    return (
        <div className="dashboard-layout">
            <div className="navbarPurple">

                <div className="imageBtnGrp">
                    <img src="/dateDropdown.png" height="37px" width="264px"
                         style={{borderRadius: "10px", cursor: "pointer", marginRight: "20px"}} alt=""/>
                    <span onClick={handleClickOut} style={{cursor: "pointer"}}><img src="/grayFilter.svg"
                                                                                    alt=""/></span>

                </div>

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
                                <CheckboxNew src={"/allchannel.svg"}>All Channel
                                </CheckboxNew>
                                <CheckboxNew src={"/whatsappCheck.svg"} checked={"checked"}>WhatsApp
                                </CheckboxNew>
                                <CheckboxNew src={"/wbaCheck.svg"}>WhatsApp Business API
                                </CheckboxNew>
                                <CheckboxNew src={"/messageCheck.svg"}>Messager
                                </CheckboxNew>
                                <CheckboxNew src={"/wechatCheck.svg"}>WeChat
                                </CheckboxNew>
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
                            <LabelSelect2 placeholder={"Choose Agent"} select1={"Mary Foster"} select2={"Harry Swart"} select3={"Walter Jackson"} select4={"Denny Hackwin"}/>
                            <div className="agentGroup">
                                <Pill color="lightYellow" size="size30">MF</Pill>
                                <Pill color="lightBlue" size="size30">MF</Pill>
                            </div>
                        </div>

                    </div>
                </span>
            ) : null}
            <img src="/dataFa.png" alt="" width="436px" height="153px" style={{borderRadius: "10px"}}/>
            <div className="chartGroup">
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart1 title={"All Contacts"} data={[25, 24, 32, 36, 32, 30, 33, 33, 20, 17, 19, 34]} yaxis={"Contacts"} total={"34"} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart1 title={"Active Contacts"} data={[12, 17, 19, 22, 24, 20, 18, 26, 20, 17, 15, 19]} yaxis={"Contacts"} total={"19"} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart1 title={"Total Messages Sent"} data={[23, 38, 30, 17, 26, 18, 34, 13, 19, 39, 22, 14]} yaxis={"Messages"} total={"14"} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart1 title={"Total Messages Received"} data={[17, 18, 17, 13, 40, 17, 36, 33, 25, 34, 36, 15]} yaxis={"Messages"} total={"15"} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart1 title={"All Contacts"} data={[40, 24, 37, 39, 21, 14, 19, 36, 27, 31, 28, 14]} yaxis={"Enquiries"} total={"14"} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart1 title={"Newly Added Contacts"} data={[21, 18, 17, 35, 38, 16, 40, 18, 12, 24, 30, 20]} yaxis={"Contacts"} total={"20"} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><LineChart1 title={"Average Response Time"} data={[16, 24, 23, 36, 19, 20, 25, 29, 29, 22, 34, 37]} yaxis={"Mintes"} total={"37"} percentage={"+5%"} /></div>
                    <div className="dashboardColumn"><LineChart1 title={"Most Communication Hours"} data={[28, 30, 17, 18, 36, 13, 23, 36, 34, 23, 15, 26]} yaxis={"Hours"} total={"26"} percentage={"+5%"} /></div>
                </div>
                <div className="dashboardRow">
                    <div className="tableSet">
                        <div className="dashboardColumn" style={{width: "55%"}}><EnhancedTable3/></div>
                    </div>
                </div>
            </div>
        </div>

    )
}