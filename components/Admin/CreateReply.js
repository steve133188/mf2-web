import {MF_Input} from "../Input";
import React, {useContext, useEffect, useState} from "react";
import MF_Modal from "../MF_Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {GlobalContext} from "../../context/GlobalContext";
import { Avatar, Tooltip } from "@mui/material";
import { createRouteLoader } from "next/dist/client/route-loader";
import { ImportDropzone } from "../ImportContact";

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

export default function CreateReply({show, toggle,data,check}){
    const [name , setName] = useState("")
    const [body , setBody] = useState({})
    const [rootDivision , setRootDivision] = useState([])
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)

    const handleChange = e=>{
        setName(e.target.value)
    }
    const handleSelect =e=>{
        setParent(e.target.value)
    }
    useEffect(async ()=>{
        console.log(body)
        console.log(data)
    //   const data = await orgInstance.getAllRootORG()
    //     setRootDivision(data.filter(data=>{return data.type=="division"}))
    },[body])
    const submit = async ()=>{
        const dataupload = {name:data.name,body:body}
        console.log(dataupload,"create reply")
        const status = await adminInstance.addContentToFolder( data.name,body)
        console.log(status,"create reply")
        toggle()


    }
    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"}>
                <div className={"modal_title"}>
                    <span>New Template</span>
                </div>
                {/* <MF_Input  title={"Team Name"} value={name} onChange={handleChange}> </MF_Input> */}
                <div className="reply_temp_box">
                    <div className="box_left">
                    <div className="title">Message</div>
                    <textarea  className="message_box" placeholder="Type Here ..." onChange={(e)=>{setBody(e.target.value)}}>
                    </textarea>
                    <div className="dropArea">Drag and drop a file or browse to upload your image.
                    <ImportDropzone />
                    </div>
                    </div>
                    <div className="box_right">
                        <div>
                            
                        </div>
                    </div>
                   
                        
                </div>
                <div className={"btn_row"}>
                    <button style={{padding:".4rem 1.2rem"}}onClick={submit}>Confirm</button>
                    <button className={"cancel_btn"} onClick={toggle}>Cancel</button>
                </div>
            </div>
        </MF_Modal>

    )
}