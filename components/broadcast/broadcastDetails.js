import {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import {Pill} from "../Pill";
import {Tooltip} from "@mui/material";
import {AvatarGroup} from "@mui/lab";

export default function BroadcastDetails({data}){

    const [log , setLog]  = useState([])
    useEffect(()=>{
    //    fetch log by customer_id
    //    fetch assignee by customer_id
    //    fetch team by customer_id
    },[])
    return(<div className={"profile_grid"}>
        <div className={"info_col grid_box"}>
            <span className={"dot"} >...</span>
            <div className={"ava_block"}>
                <Avatar className={"ava"} src={data.img_url} alt="profile pic"/>
                <span className={"title"}>{data.name}</span>
                <button className={"chat_btn"}>chat</button>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>CustomerID</span>
                <span className={"info_content"}>{data.id}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Phone Number</span>
                <span className={"info_content"}>{data.phone}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Email</span>
                <span className={"info_content"}>{data.email}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Birthday</span>
                <span className={"info_content"}>{data.birthday}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Gender</span>
                <span className={"info_content"}>{data.gender}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Address</span>
                <span className={"info_content"}>{data.address}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Created Date</span>
                <span className={"info_content"}>{data.created_at}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Contact Owner</span>
                <span className={"info_content"}>{data.user}</span>
            </div>
        </div>
        <div className={"main_col"}>
            <div className={"two_block half_session"}>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Assignee</span></div>
                        <div className={"session_content"}>
                            {/*<AvatarGroup className={"AvatarGroup"} xs={{flexDirection:"row"}} max={10} spacing={"1"} align="left">*/}
                                {data.agents!=null &&data.agents.map((agent , index)=>{
                                    return(
                                        <Tooltip key={index} className={""} title={agent} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning"}  size="roundedPill size30" alt={agent}>{agent.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                    )
                                })}
                            {/*</AvatarGroup>*/}
                        </div>
                    </div>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Team</span></div>
                        <div className={"session_content"}><Pill color="teamA">{data.team?data.team:"null"}</Pill></div>
                    </div>
                </div>
                <div className={"block_session grid_box block"}>
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
                </div>
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
    </div>)
}