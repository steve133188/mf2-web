import {useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import {AvatarGroup} from "@mui/lab";
import {Tooltip} from "@mui/material";
import {Pill} from "../Pill";

export default function UserProfileGrid({data}){

    const [log , setLog]  = useState([])
    useEffect(()=>{
        //    fetch log by customer_id
        //    fetch assignee by customer_id
        //    fetch team by customer_id
    },[])
    return(<div className={"user_profile_grid"}>
        <div className={"info_col grid_box"}>
            <span className={"dot"} >...</span>
            <div className={"ava_block"}>
                <Avatar className={"ava"} src={data.img_url} alt="profile pic"/>
                <span className={"title"}>{data.username}</span>
            </div>
            <div className={"info_session"}>
            <div className={"info_row"}>
                <span className={"info_label"}>Organization</span>
                <span className={"info_content"}>{data.organization}</span>
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
                <span className={"info_label"}>Last Login</span>
                <span className={"info_content"}></span>
            </div>
            </div>
        </div>
        <div className={"main_col"}>
            <div className={"two_block half_session"}>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Role</span></div>
                        <div className={"session_content"}>
                            {data.role}
                        </div>
                    </div>
                </div>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Channels</span></div>
                        <div className={"session_content"}>
                            { data.channels!=null && data.channels.map((chan , index)=>{
                                return(<div key={index} className={"content_row"}><div><img key={index} width="24px" height="24px" src={`./${chan}Channel.svg`} alt=""/> <div>{chan} </div></div><div>{data.phone}</div></div>)
                            })}
                        </div>
                    </div>

                </div>
            </div>
            <div className={"log_input half_session grid_box"}>
                <div className={"block_session"}>
                    <div className={"top_row"}><span className={"title"}>No . of Assigned Contacts </span></div>
                </div>
            </div>
        </div>
    </div>)
}