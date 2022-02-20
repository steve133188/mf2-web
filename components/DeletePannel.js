import React, {useContext, useEffect, useState} from "react";
import MF_Modal from "./MF_Modal";


export default function DeletePad({show, toggle,reload,data,submit,title , deleteId , deleteIds}){
    const [name , setName] = useState("")
    const [parent , setParent] = useState({})

    const handleChange = e=>{
        console.log(e.target.value)
        setName(e.target.value)
    }

    const confirm = async (e)=>{
        e.preventDefault()
        await submit(parseInt(deleteId))
        console.log(data)
        reload();
        toggle()
    }
    return(
        <MF_Modal show={show} toggle={toggle}>
        <div className={"mf_modal_form"} style={{minHeight:"130px",height:"130px"}}>
            <div className={"mf_modal_title"} style={{textAlign:"center"}}>
                {deleteId? <span>{`Delete ID: ${deleteId} Customer ?`}</span>
                    :                <span>{`Delete ${data?data.length:"this"} ${title}?`}</span>
                }
            </div>
            <div className={"btn_row"}>
                <button onClick={confirm }>Confirm</button>
                <button className={"cancel_btn"} onClick={toggle}>Cancel</button>
            </div>
        </div>
    </MF_Modal>

    )
}
