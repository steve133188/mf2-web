import {MF_Input, Select} from "../../components/Input";
import React, {useContext, useState} from "react";
import MF_Modal from "../MF_Modal";
import MenuItem from "@mui/material/MenuItem";
import {GlobalContext} from "../../context/GlobalContext";

export default function CreateDivisionForm({show, toggle }){
    const [name , setName] = useState("")
    const handleChange = (e)=>{
        setName(e.target.value)
    }
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)

    const submit = async ()=>{
        const status = await orgInstance.createOrg({type:"division" ,name})
        console.log(status,"create Division")
        toggle()
    }
    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"}>
                <div className={"modal_title"}>
                    <span>Create Division</span>
                </div>
                <MF_Input title={"Division Name"} value={name} onChange={handleChange}></MF_Input>

                <div className={"btn_row"}>
                    <button onClick={submit}>Confirm</button>
                    <button className={"cancel_btn"} onClick={toggle}>Cancel</button>
                </div>
            </div>
        </MF_Modal>

    )
}