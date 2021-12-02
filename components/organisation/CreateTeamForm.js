import {MF_Input} from "../../components/Input";
import React, {useEffect, useState} from "react";
import MF_Modal from "../MF_Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

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

export default function CreateTeamForm({show, toggle}){
    const [name , setName] = useState("")
    const [parent , setParent] = useState({})
    const [rootDivision , setRootDivision] = useState([])

    const handleChange = e=>{
        setName(e.target.value)
    }
    const handleSelect =e=>{
        setParent(e.target.value)
    }
    useEffect(async ()=>{
        // const data = await getAllRootORG()
        setRootDivision([])
    },[])
    const submit = async ()=>{
        // const status = await createOrg({type:"team" ,name})
        // console.log(status)
        toggle()
    }
    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"}>
                <div className={"modal_title"}>
                    <span>Create Team</span>
                </div>
                <MF_Input title={"Team Name"} value={name} onChange={handleChange}> </MF_Input>
                <div className="inputField">
                    <span>Division</span>
                    <Select
                        sx={style}
                        value={parent}
                        onChange={handleSelect}
                        label={"Select Division"}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={null}>Null</MenuItem>
                        {rootDivision.map((d)=>{
                            return (<MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
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