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

export default function DeleteTag({show, toggle,reload,tag}){
    const [name , setName] = useState("")
    const [parent , setParent] = useState({})
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)

    const handleChange = e=>{
        console.log(e.target.value)
        setName(e.target.value)
    }

    const submit = async ()=>{
        const status = await adminInstance.deleteTag(tag.id)
        console.log("status",status)
        reload()
        toggle()
    }
    return(
        <MF_Modal show={show} toggle={toggle}>
        <div className={"modal_form"}>
            <div className={"modal_title"} style={{textAlign:"center"}}>
                <span>Delete Tag?</span>
            </div> 
            <div className={"btn_row"}>
                <button onClick={submit }>Confirm</button>
                <button className={"cancel_btn"} onClick={toggle}>Cancel</button>
            </div>
        </div>
    </MF_Modal>

    )
}