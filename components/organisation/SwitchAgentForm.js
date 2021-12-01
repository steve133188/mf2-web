import {MF_Input} from "../../components/Input";
import React, {useEffect, useState} from "react";
import MF_Modal from "../MF_Modal";
import {createOrg, getAllRootORG, getOrgTeams} from "../../helpers/orgHelpers";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {updateUserTeamIdByUserPhone} from "../../helpers/usersHelpers";

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

export default function SwitchAgentForm({show, toggle ,selectedUser}){
    const [team , setTeam] = useState([])
    const [selectedTeam , setSelectedTeam] = useState({})

    const handleSelect =e=>{
        setSelectedTeam(e.target.value)
    }
    useEffect(async ()=>{
        const data = await getOrgTeams()
        setTeam(data)
    },[])
    const submit = async ()=>{
        for (let u of selectedUser){
            const user_phone = u.phone
            const team_id = selectedTeam.id
            const res = await updateUserTeamIdByUserPhone(user_phone ,team_id)
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