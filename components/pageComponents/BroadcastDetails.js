import {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import {Pill} from "../Pill";
import {Tooltip} from "@mui/material";
import {AvatarGroup} from "@mui/lab";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BroadcastDatails({data}){

    const [log , setLog]  = useState([])
    const [state, setState] = useState({
         series: [44, 55, 41, 17, 15],
        
        options: {
            labels: ['A', 'B', 'C', 'D', 'E'],

        },

    })
    useEffect(()=>{
    //    fetch log by customer_id
    //    fetch assignee by customer_id
    //    fetch team by customer_id
    },[])
    return(<>
    <div className={"profile_grid"}>
       
        <div className={"main_col"}>
            <div className={"two_block top"}>
                <div className={"block_session grid_box block top"}>
                    <div className={"information_broad"}>
                        <div className={"top_row"}><span className={"title"}>Info</span></div>
                        <div className={"session_content"}>
                            {/*<AvatarGroup className={"AvatarGroup"} xs={{flexDirection:"row"}} max={10} spacing={"1"} align="left">*/}
                                {/* {data.agents!=null &&data.agents_id.map((agent , index)=>{
                                    return(
                                        <Tooltip key={index} className={""} title={agent} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning"}  size="roundedPill size30" alt={agent}>{agent.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                    )
                                })} */}
                            {/*</AvatarGroup>*/}

                            <div>Total Audiexnces</div>
                            <div>Successful Receiver</div>
                            <div>Failed Receiver</div>
                        </div>
                    </div>
                    <div className={"chart_broad"}>
                        <div className={"top_row"}><span className={"title"}>Team</span></div>
                        <div className={"session_content"}><Pill color="teamA">{data.team?data.team:"null"}</Pill></div>
                                
                            <div id={"session_content_chart"}>
                                <div id={"chart-line"}>
                                    <div>
                                        {/* <p style={{color: "#495057", fontSize: "16px", fontWeight: "600"}}>"fa"</p> */}
                                        <div style={{marginLeft: "25px", fontSize: "12px", color: "#74788D"}}>
                                            <div style={{color: "#6279EC", fontSize: "20px", fontWeight: "bold"}}>&quot;total&quot;
                                            {/* <span style={{marginLeft: "6px", fontSize: "8px", fontWeight: "600", color: "#34C38F"}}>"percentage"</span> */}
                                        </div></div>
                                    </div>
                                    <Chart options={state.options}  series={state.series} labels={state.labels} type="pie" width="500"  />
                                </div>
                                <div id={"chart-line"}>
                                    <div>
                                        {/* <p style={{color: "#495057", fontSize: "16px", fontWeight: "600"}}>"fa"</p> */}
                                        <div style={{marginLeft: "25px", fontSize: "12px", color: "#74788D"}}>
                                            <div style={{color: "#6279EC", fontSize: "20px", fontWeight: "bold"}}>&quot;total&quot;
                                            {/* <span style={{marginLeft: "6px", fontSize: "8px", fontWeight: "600", color: "#34C38F"}}>"percentage"</span> */}
                                        </div></div>
                                    </div>
                                    <Chart options={state.options}  series={state.series} labels={state.labels} type="pie" width="500"  />
                                </div>
                                <div id={"chart-line"}>
                                    <div>
                                        {/* <p style={{color: "#495057", fontSize: "16px", fontWeight: "600"}}>"fa"</p> */}
                                        <div style={{marginLeft: "25px", fontSize: "12px", color: "#74788D"}}>
                                            <div style={{color: "#6279EC", fontSize: "20px", fontWeight: "bold"}}>&quot;total&quot;
                                            {/* <span style={{marginLeft: "6px", fontSize: "8px", fontWeight: "600", color: "#34C38F"}}>"percentage"</span> */}
                                        </div></div>
                                    </div>
                                    <Chart options={state.options}  series={state.series} labels={state.labels} type="pie" width="500"  />
                                </div>
                            </div>
                    </div>
                </div>
                {/* <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Channels</span></div>
                        <div className={"session_content"}>
                            { data.channels!=null && data.channels.map((chan , index)=>{
                                return(<img key={index} width="24px" height="24px" src={`./${chan}Channel.svg`} alt=""/>)
                            })}
                        </div>
                    </div>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Tags</span></div>
                        <div className={"session_content"}>
                            {data.tags.map((tag , index)=>{
                                return( <Pill key={index} color="lightBlue">{tag}</Pill>)
                            })}
                        </div>
                    </div>
                </div> */}
            </div>
            <div className={"log_input half_session grid_box"}>
                <div className={"block_session"}>
                    <div className={"top_row"}><span className={"title"}>Activity Log</span></div>
                    <ul>{log!=-1&& log.map((l , i )=>{
                        return <li key={i}> {l} </li>
                    })}</ul>
                </div>
            </div>
        </div>
    </div></>)
}