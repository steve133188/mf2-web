import {Tooltip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

const renderAgentAVA = (uids , users) =>{
    if(!uids||uids.length==0||uids==undefined||!users||users.length==0||users==undefined) return <span>-</span>
    return (users.filter(u=>{
        return uids.includes(u.user_id)
    }).map((agent , index )=>{
            return <Tooltip key={index} className={""} title={agent.username?agent.username:"a"} placement="top-start">
                <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:30 , height:30 ,fontSize:14}}>
                    {agent.username.toString().substring(0,2).toUpperCase()}
                </Avatar>
            </Tooltip>
        }))
}

export {renderAgentAVA}
