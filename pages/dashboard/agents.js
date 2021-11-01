import {AverageDailyCard, ChangingPercentageCard, LineChartCard} from "../../components/Cards";
import {MultipleLineChart} from "../../components/LineChart1";
import {EnhancedTable2} from "../../components/EnhancedTable2";
import * as React from "react";
import {CancelButton, NormalButton2} from "../../components/Button";
import {ContactFilterList} from "../../components/ContactFilterList";
import {CheckboxNew, CheckboxNew2, CheckboxNewSingle} from "../../components/Checkbox";
import {LabelSelect2} from "../../components/Select";
import {Pill} from "../../components/Pill";

export default function Agents() {
    const [open, setOpen] = React.useState(false);
    const handleClickAway = () => {
        setOpen(false);
    };
    const handleClickOut = () => {
        setOpen(true);
    };
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
            <div className="lineCardGroupSet">
                <div className="lineCardGroup1">
                    <LineChartCard/>
                    <LineChartCard/>
                    <LineChartCard/>
                    <LineChartCard/>
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
                    <div className="dashboardColumn"><MultipleLineChart title={"All Contacts"} yaxis={"Contacts"}
                                                                        data1={[25, 24, 32, 36, 32, 30, 33, 33, 20, 17, 19, 34]}
                                                                        data2={[10, 15, 8, 20, 17, 15, 13, 17, 16, 14, 5, 27]}
                                                                        data3={[15, 9, 24, 16, 15, 15, 20, 16, 4, 3, 14, 7]}
                                                                        min1={"12"} min2={12} min3={12}/></div>
                    <div className="dashboardColumn"><MultipleLineChart title={"All Contacts"} yaxis={"Contacts"}
                                                                        data1={[12, 17, 19, 22, 24, 20, 18, 26, 20, 17, 15, 19]}
                                                                        data2={[5, 12, 14, 4, 12, 6, 7, 12, 16, 3, 5, 7]}
                                                                        data3={[7, 5, 5, 18, 12, 14, 11, 14, 4, 14, 10, 12]}
                                                                        min1={"12"} min2={12} min3={12}/></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><MultipleLineChart title={"All Contacts"} yaxis={"Contacts"}
                                                                        data1={[23, 38, 30, 17, 26, 18, 34, 13, 19, 39, 22, 14]}
                                                                        data2={[17, 18, 20, 7, 16, 11, 19, 10, 12, 30, 14, 10]}
                                                                        data3={[6, 20, 10, 10, 10, 7, 15, 3, 7, 9, 8, 4]}
                                                                        min1={"12"} min2={12} min3={12}/></div>
                    <div className="dashboardColumn"><MultipleLineChart title={"All Contacts"} yaxis={"Contacts"}
                                                                        data1={[17, 18, 17, 13, 40, 17, 36, 33, 25, 34, 36, 15]}
                                                                        data2={[14, 13, 13, 7, 29, 10, 20, 14, 16, 20, 17, 10]}
                                                                        data3={[3, 5, 4, 6, 11, 7, 16, 19, 9, 14, 19, 5]}
                                                                        min1={"12"} min2={12} min3={12}/></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><MultipleLineChart title={"All Contacts"} yaxis={"Contacts"}
                                                                        data1={[40, 24, 37, 39, 21, 14, 19, 36, 27, 31, 28, 14]}
                                                                        data2={[30, 10, 14, 19, 14, 10, 6, 10, 17, 20, 21, 10]}
                                                                        data3={[10, 14, 23, 20, 7, 4, 13, 26, 10, 11, 7, 4]}
                                                                        min1={"12"} min2={12} min3={12}/></div>
                    <div className="dashboardColumn"><MultipleLineChart title={"All Contacts"} yaxis={"Contacts"}
                                                                        data1={[21, 18, 17, 35, 38, 16, 40, 18, 12, 24, 30, 20]}
                                                                        data2={[14, 13, 13, 21, 22, 10, 23, 10, 4, 19, 18, 13]}
                                                                        data3={[7, 5, 4, 14, 16, 6, 17, 8, 8, 5, 12, 7]}
                                                                        min1={"12"} min2={12} min3={12}/></div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardColumn"><MultipleLineChart title={"All Contacts"} yaxis={"Contacts"}
                                                                        data1={[16, 24, 23, 36, 19, 20, 25, 29, 29, 22, 34, 37]}
                                                                        data2={[10, 18, 14, 30, 12, 13, 20, 18, 17, 13, 30, 30]}
                                                                        data3={[6, 6, 9, 6, 7, 7, 5, 11, 12, 9, 4, 7]}
                                                                        min1={"12"} min2={12} min3={12}/></div>
                    <div className="dashboardColumn"><MultipleLineChart title={"All Contacts"} yaxis={"Contacts"}
                                                                        data1={[28, 30, 17, 18, 36, 13, 23, 36, 34, 23, 15, 26]}
                                                                        data2={[21, 22, 14, 13, 15, 7, 16, 15, 17, 18, 14, 13]}
                                                                        data3={[7, 8, 3, 5, 21, 6, 7, 21, 17, 5, 1, 13]}
                                                                        min1={"12"} min2={12} min3={12}/></div>
                </div>
                <div className="dashboardRow">
                    <div className="tableSet">
                        <div className="dashboardColumn" style={{width: "55%"}}><EnhancedTable2/></div>
                    </div>
                </div>
            </div>

        </div>

    )
}