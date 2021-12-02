import {MF_Input, Select} from "../../components/Input";
import React, {useState} from "react";
import MF_Modal from "../MF_Modal";
import MenuItem from "@mui/material/MenuItem";

export default function CreateDivisionForm({show, toggle }){
    const [name , setName] = useState("")
    const handleChange = (e)=>{
        setName(e.target.value)
    }

    const submit = async ()=>{
        // const status = await createOrg({type:"division" ,name})
        // console.log(status)
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