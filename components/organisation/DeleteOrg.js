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
export default function DeleteDivisionForm({show, toggle,reload ,org}){
    const [div , setDiv] = useState(" ")
    const [team , setTeam] = useState(" ")
    const [rootDivision , setRootDivision] = useState([])
    const handleChangeDiv = (e)=>{
        console.log(e.target.value,"division data")
        setDiv(e.target.value)
        setTeam(" ")
    }
    const handleSelectTeam =e=>{
        setTeam(e.target.value)
        setDiv(" ")
    }
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)
    const teams = []
    const[teamlist,setTeamlist]=useState([])
    
    const fetchOrg = async () => {
        
        setTeamlist(await orgInstance.getOrgTeams())

    }
    useEffect( ()=>{
        fetchOrg()
        setRootDivision(getDivisionTree(org))
      },[org])
    const submit = async (e)=>{
        e.preventDefault()
        // const newDivision = {type:"division"}
        // console.log(newDivision)
        if(div===" "&&team!==" "){
            console.log(team,"teamID")
            const userList = await userInstance.getUsersByTeamId(team)
            userList.map(async (e)=>{
                const status = await userInstance.updateUserTeamIdById(e.user_id,0)
                console.log(status,"get Team")
            })
            const status = await orgInstance.deleteOrgById(team)
        }else{
            
            console.log(div,"div number")
            const dSelect = await orgInstance.getOrgById(div)
            if(dSelect[0].children){
                dSelect[0].children.map(async (c)=>{
                    console.log(c.org_id)
                    const userList = await userInstance.getUsersByTeamId(c.org_id)
                    console.log(userList,"user many")
                    userList.length>0&&userList.map(async (e)=>{
                        const status = await userInstance.updateUserTeamIdById(e.user_id,0)
                        console.log(e,"clean")
                    })
                    
                })
            }

            const status = await orgInstance.deleteOrgById(div)
            console.log(status,"delete Division")
        }
        
        toggle()
        reload()
    }
   
    const getDivisionTree =  (data) => {
        let tree = [];
        for(let i = 0; i < data.length; i++){
            if(data[i].type=="division"){
                tree.push(data[i]);
            if(data[i].children!=null){tree=tree.concat( getDivisionTree(data[i].children)); }
            }
        }
        return tree;
    };

    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"}>
                <div className={"modal_title"}>
                    <span>Delete Division or Team</span>
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
                        <MenuItem value=" ">Please Select</MenuItem>
                        {rootDivision.map((d,i)=>{
                            
                            return (<MenuItem key={i} value={d.org_id}>{d.name}</MenuItem>)
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
                        <MenuItem value=" ">Please Select</MenuItem>
                        {teamlist.map((d,i)=>{
                            return (<MenuItem key={i} value={d.org_id}>{d.name}</MenuItem>)
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
