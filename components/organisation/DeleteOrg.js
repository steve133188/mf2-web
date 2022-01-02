import {MF_Input} from "../../components/Input";
import Select from "@mui/material/Select";
import React, {useContext, useEffect, useState} from "react";
import MF_Modal from "../MF_Modal";
import MenuItem from "@mui/material/MenuItem";
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
export default function DeleteDivisionForm({show, toggle,reload }){
    const [div , setDiv] = useState({})
    const [team , setTeam] = useState({})
    const [rootDivision , setRootDivision] = useState([])
    const handleChangeDiv = (e)=>{
        setDiv(e.target.value)
    }
    const handleSelectTeam =e=>{
        setTeam(e.target.value)
    }
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)
    const teams = []
    const[teamlist,setTeamlist]=useState([])
    useEffect(async ()=>{
        const data = await orgInstance.getAllORG()
          setRootDivision(data.filter(data=>{return data.type=="division"}))
          const teamCheck = data.map(item=>item.children&&item.children.map(child=>{console.log(child,"child");child.type=="team"?teams.push(child):null}))
          setTeamlist(teams)

      },[])
    const submit = async (e)=>{
        e.preventDefault()
        const newDivision = {name:name,type:"division"}
        console.log(newDivision)
        const status = await orgInstance.deleteOrgById(parent)
        // console.log(status,"create Division")
        toggle()
        reload()
    }

    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"}>
                <div className={"modal_title"}>
                    <span>Delete Division</span>
                </div>
                {/* <MF_Input title={"Division Name"} value={name} onChange={handleChange}></MF_Input> */}
                <div className="inputField">
                    <span>Division</span>
                    <Select
                        sx={style}
                        value={div}
                        onChange={handleChangeDiv}
                        label={"Select Division"}
                        input={<BootstrapInput />}
                        >
                        <MenuItem value={null}>Please Select</MenuItem>
                        {rootDivision.map((d)=>{
                            return (<MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
                        })}
                    </Select>
                    <span></span>
                    <span></span>
                    <span>Team</span>
                    <Select
                        sx={style}
                        value={team}
                        onChange={handleSelectTeam}
                        label={"Select Division"}
                        input={<BootstrapInput />}
                        >
                        <MenuItem value={null}>Please Select</MenuItem>
                        {teamlist.map((d)=>{
                            return (<MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)
                        })}
                    </Select>
                        <span style={{height:"35px"}}></span>
                </div>
                <div className={"btn_row"}>
                    <button onClick={submit}>Confirm</button>
                    <button className={"cancel_btn"} onClick={toggle}>Cancel</button>
                </div>
            </div>
        </MF_Modal>

    )
}
