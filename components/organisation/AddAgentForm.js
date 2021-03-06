import {MF_Input} from "../../components/Input";
import {useState} from "react";
import MF_Modal from "../MF_Modal";

export default function AddAgentForm({show, toggle }){
    const [data , setData] = useState()
    const handleChange = (e)=>{

    }
    const submit = async ()=>{

    }
    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"}>
                <div className={"modal_title"}>
                    <span>Add Agent</span>
                </div>
                <MF_Input title={"Add Index"} value={data}> </MF_Input>
                <div className={"btn_row"}>
                    <button onClick={submit}>Confirm</button>
                    <button className={"cancel_btn"} onClick={toggle}>Cancel</button>
                </div>
            </div>
        </MF_Modal>

    )
}