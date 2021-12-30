import {MF_Input} from "../Input";
import React, {useContext, useEffect, useState} from "react";
import MF_Modal from "../MF_Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {GlobalContext} from "../../context/GlobalContext";

const style ={
    background:" #FFFFFF",
    // border: "1px solid #E5E7EC",
    borderRadius: "10px",
    opacity: 1,
    width:"100%",
    height:"2rem"
}

export default function DeleteTag({show, toggle,reload,tags}){
    const [name , setName] = useState("")
    const [parent , setParent] = useState({})
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)

    const handleChange = e=>{
        console.log(e.target.value)
        setName(e.target.value)
    }

    const submit = async ()=>{
        tags.map(async(id)=>{
            const status = await adminInstance.deleteTag(id)
            console.log("status",status)
        }  )
        reload()
        toggle()
    }
    return(
        <MF_Modal show={show} toggle={toggle}>
        <div className={"modal_form"}style={{minHeight:"130px",height:"130px"}}>
            <div className={"modal_title"} style={{textAlign:"center"}}>
                <span>{`Delete ${!tags?"":tags.length} Tag?`}</span>
            </div> 
            <div className={"btn_row"}>
                <button onClick={submit }>Confirm</button>
                <button className={"cancel_btn"} onClick={toggle}>Cancel</button>
            </div>
        </div>
    </MF_Modal>

    )
}