import {Tooltip} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

const renderAgentAVA = (uids , users) =>{
    if(!uids||uids.length==0) return <span>-</span>

    return (uids.map(c =>{
        return users.find(user=>{
            return user.user_id == c
        })
    }).map((agent , index )=>{
            return <Tooltip key={index} className={""} title={agent.username?agent.username:"a"} placement="top-start">
                <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:30 , height:30 ,fontSize:14}}>
                    {agent.username.toString().substring(0,2).toUpperCase()}
                </Avatar>
            </Tooltip>
        }))
}

export {renderAgentAVA}
