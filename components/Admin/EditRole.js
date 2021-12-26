import {MF_Input} from "../Input";
import React, {useContext, useEffect, useState} from "react";
import MF_Modal from "../MF_Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
const AuthList = [  {title:"Dashboard",name:"dashboard"},
                    {title:"Contact",name:"contact"},
                    {title:"Broadcast",name:"broadcast"},
                    {title:"Integrations",name:"integrations"},
                    {title:"Admin",name:"admin"},
                    {title:"Livechat",name:"livechat"},
                    {title:"Product",name:"product_catalogue"},
                    {title:"Flowbuilder",name:"flowbuilder"},
                    {title:"Organization",name:"organization"},]
const channelData = [
    // name:"WhastApp",value:"All",channelID:"All",id:0},
            {name:"WhastApp",value:"Whatsapp",channelID:"Whatsapp",id:1},
            {name:"WhatsApp Business",value:"WhatsappB",channelID:"WhatsappB",id:2},
            {name:"Messager",value:"Messager",channelID:"Messager",id:3},
            {name:"WeChat",value:"Wechat",channelID:"Wechat",id:4},];


export default function EditRole({show, toggle ,reload,role}){

    const [roleName , setRoleName] = useState("")

    const [authority , setAuthority] = useState({
        dashboard: false,
        livechat: false,
        contact: false,
        broadcast: false,
        flowbuilder: false,
        integrations: false,
        product_catalogue: false,
        organization: false,
        admin: false,
        Whatsapp: false,
        WhatsappB: false,
        Wechat: false,
        Messager: false,
    })
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)
   
    // useEffect(()=>{
    //     setAuthority(role.auth)
    //     console.log(authority,"edit role page")
    // },[authority])
    useEffect(()=>{
        if(!show)return
        show?console.log(role.auth,"dfasdfsd"):"";
        setAuthority(role.auth)

        setRoleName(role.name)
    },[show])

    const handleSelect =e=>{

        const {name ,value ,checked} = e.target
        console.log(name,"name Key")
        console.log(value)

        setAuthority({
            ...authority,
            [name]:true
        })
        if(!checked){
            setAuthority({
                ...authority,
                [name]:false
            })
        }
    }
    const handleChange=e =>{
        setRoleName(e.target.value)
        // console.log(roleName)
    }
    const submit = async ()=>{
        console.log({name:roleName,auth: {...authority}})
        const res = await adminInstance.updateRole(role.name,{name:roleName,auth: authority})
        console.log(res)
        reload()
        toggle()
    }
    const clearData = ()=>{
        setAuthority({  dashboard: false,
            livechat: false,
            contact: false,
            broadcast: false,
            flowbuilder: false,
            integrations: false,
            product_catalogue: false,
            organization: false,
            admin: false,
            Whatsapp: false,
            WhatsappB: false,
            Wechat: false,
            Messager: false,});
            toggle();
    }

    
    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"}>
                <div className={"modal_title"}>
                    <span>Edit Role</span>
                </div>
                <div className="inputField">
                    <span>Role Name</span>
                    <MF_Input value={roleName} onChange={handleChange}/>
                </div>


                <div className="inputField">
                        <span>Access Right</span>
                    </div>
                <div className={"access_right"}>

                    {AuthList.map((item,index)=>{return  <div key={index} className={"select_item"}> 
                        <div className="newCheckboxContainer">
                                <label className="newCheckboxLabel">
                                    <input type="checkbox"  name={item.name} value={authority[item.name]} checked={authority[item.name]} onChange={handleSelect} />
                                </label>
                                <span>{item.title}</span>
                        </div>
                    </div>
                    })}
                            
                </div>
                    <div className="inputField">
                            <span>Channels</span>
                        </div>
                    <div className={"access_right"}>

                        {channelData.map((item,index)=>{return  <div key={index} className={"select_item"} style={{width:"fit-content"}}> 
                            <div className="newCheckboxContainer">
                                    <label className="newCheckboxLabel">
                                        <input type="checkbox"  name={item.value} value={authority[item.value]} checked={authority[item.value]} onChange={handleSelect} />
                                    </label>
                                    <img src={`/channel_SVG/${item.value}.svg`} style={{width:"20px",margin:"0 5px"}}></img>
                                   <span>{item.name}</span>
                            </div>
                        </div>
                        })}
                    </div>
                <div className={"btn_row"}>
                    <button onClick={submit}>Confirm</button>
                    <button className={"cancel_btn"} onClick={clearData}>Cancel</button>
                </div>
            </div>
        </MF_Modal>

    )
}