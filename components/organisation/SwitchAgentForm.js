import {MF_Input} from "../../components/Input";
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
        padding: '0 26px 0 0',
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
    border: "1px solid #E5E7EC",
    borderRadius: "10px",
    opacity: 1,
    width:"100%",
    height:"2rem"
}

export default function SwitchAgentForm({show, toggle ,selectedUsers}){
    const [team , setTeam] = useState([])
    const [selectedTeam , setSelectedTeam] = useState({})
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)

    const handleSelect =e=>{
        setSelectedTeam(e.target.value)
    }
    useEffect( async () => {
        const data = await orgInstance.getOrgTeams()
        setTeam(data)
    },[])
    const submit = async ()=>{
        console.log(selectedUsers)
        for (let i=0;i<selectedUsers.length;i++){
            const user_phone = selectedUsers[i]
            const team_id = selectedTeam.id
            console.log(user_phone,team_id)
            const res = await userInstance.updateUserTeamIdByUserPhone(user_phone ,team_id)
            console.log(res)
        }
        toggle()
    }
    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"}>
                <div className={"modal_title"}>
                    <span>Move To</span>
                </div>
                <div className="inputField">
                    <span>Team</span>
                    <Select
                        sx={style}
                        value={selectedTeam}
                        onChange={handleSelect}
                        label={"Select Division"}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={null}>Null</MenuItem>
                        {team.map((d)=>{
                            return (<MenuItem key={d.id} value={d}>{d.name}</MenuItem>)
                        })}
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