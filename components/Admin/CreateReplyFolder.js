import {MF_Input} from "../Input";
import React, {useContext, useEffect, useState} from "react";
import MF_Modal from "../MF_Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {GlobalContext} from "../../context/GlobalContext";

const BootstrapInput = styled(InputBase)(({ theme }) => ({

    '& .MuiInputBase-input': {
        borderRadius: "10px",
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #E5E7EC',
        fontSize: 15,
        padding: '5px 26px 0 10px',
        height:"2rem",
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: 'none',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));
const style ={
    background:" #FFFFFF",
    // border: "1px solid #E5E7EC",
    borderRadius: "10px",
    opacity: 1,
    width:"100%",
    height:"2rem"
}

export default function CreateReplyFolder({show, toggle}){
    const [name , setName] = useState("")
    const [parent , setParent] = useState({})
    const [rootDivision , setRootDivision] = useState([])
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)

    const handleChange = e=>{
        setName(e.target.value)
    }
    const handleSelect =e=>{
        setParent(e.target.value)
    }
    useEffect(async ()=>{
      const data = await orgInstance.getAllRootORG()
        setRootDivision(data.filter(data=>{return data.type=="division"}))
    },[])
    const submit = async ()=>{
        const status = await orgInstance.createOrg({type:"team" ,name,parent_id:parent})
        console.log(status,"create team")
        console.log(parent,",parent_id:parent")
        toggle()
    }
    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"}>
                <div className={"modal_title"}>
                    <span>Folder Name</span>
                </div>
                <MF_Input title={"Team Name"} value={name} onChange={handleChange}> </MF_Input>
                <div className="inputField">
                    <span>Assign to</span>
                    <Select
                        sx={style}
                        value={parent}
                        onChange={handleSelect}
                        label={"Select Division"}
                        input={<BootstrapInput />}
                    >
                       <div className={"filter_box_agents"}  >Agent
                    <div className={"agentBroad"} >

                    <div className={"filter_title"} onClick={()=>{setAgentBar(!agentBarOpen)}}>Choose Agent</div>
                    <div className={"agentSearchArea"}  style={agentBarOpen?{display:"block"}:{display:"none"}}>
                         <div className={"search_bar"}>    
                            <input type="text" className={"search_area"} onChange={(e)=>setAgentValue(e.target.value)} placeholder={"Search"}></input>
                        </div>
                        {/* <DivisionDropDown data={Division}  /> */}
                    

                        <div className={"channelList"} >
                            {filteredUsers.filter(users=>users.username.includes(agentSearchValue)).map((user)=>{
                                return(<li className={"channelListitem"} key={user.username} style={{width:"100%"}}>
                                    <div className={"left"} style={{display:"flex" ,gap:10}}>
                                        <Tooltip key={user.username} className={""} title={user.username} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{user.username.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                        <div className={"name"}>{user.username}</div>
                                    </div>
                                    <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel"> <input type="checkbox" id={user.username} name="checkbox" checked={selectedUsers.includes(user.username)} onClick={toggleSelectUsers} />
                                        </label>
                                    </div>
                                </li>) })
                            }
                        </div>
                    </div>
                    </div>
                    <div className={"taglList"}>
                        {selectedUsers.map((user)=>{
                                return(
                                    <div className={"tag"} style={{display:"flex" ,gap:10}}>
                                        <Tooltip key={user} className={""} title={user} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14}} >{user.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>

                                    </div>


                                )
                            })}
                    </div>
                </div>
                    </Select>
                </div>
                <div className={"btn_row"}>
                    <button onClick={submit}>Confirm</button>
                    <button className={"cancel_btn"} onClick={toggle}>Cancel</button>
                </div>
            </div>
        </MF_Modal>

    )
}