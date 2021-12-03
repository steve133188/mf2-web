import {MF_Input} from "../../components/Input";
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

export default function CreateRole({show, toggle ,reload}){

    const [roleName , setRoleName] = useState("")

    const [authority , setAuthority] = useState({
        dashboard: false,
        livechat: false,
        contact: false,
        boardcast: false,
        flowbuilder: false,
        integrations: false,
        product_catalogue: false,
        organization: false,
        admin: false
    })
    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)

    const handleSelect =e=>{

        const {name ,value ,checked} = e.target
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
        console.log(roleName)
    }
    const submit = async ()=>{
        console.log({name:roleName,auth: {...authority}})
        const res = await adminInstance.createRole({name:roleName,auth: {authority}})
        console.log(res)
        reload()
        toggle()
    }
    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"}>
                <div className={"modal_title"}>
                    <span>Create Role</span>
                </div>
                <div className="inputField">
                    <span>Role Name</span>
                    <MF_Input onChange={handleChange}/>
                </div>


                <div className={"access_right"}>
                    <div className="inputField">
                        <span>Access Right</span>
                    </div>
                       <div className={"select_row"}>
                           <div className={"select_item"}> <div className="newCheckboxContainer">
                               <label className="newCheckboxLabel">
                                   <input type="checkbox"  name={"dashboard"} value={authority.dashboard} checked={authority.dashboard} onChange={handleSelect} />
                               </label>
                               <span>Dashboard</span>
                           </div></div>
                           <div > <div className="newCheckboxContainer">
                               <label className="newCheckboxLabel">
                                   <input type="checkbox"  name={"livechat"} value={authority.livechat} checked={authority.livechat} onChange={handleSelect} />
                               </label>
                               <span>livechat</span>
                           </div></div>
                       </div>
                    <div className={"select_row"}>
                        <div className={"select_item"}> <div className="newCheckboxContainer">
                            <label className="newCheckboxLabel">
                                <input type="checkbox"  name={"contact"} value={authority.contact} checked={authority.contact} onChange={handleSelect} />
                            </label>
                            <span>contact</span>
                        </div></div>
                        <div > <div className="newCheckboxContainer">
                            <label className="newCheckboxLabel">
                                <input type="checkbox"  name={"product_catalogue"} value={authority.product_catalogue} checked={authority.product_catalogue} onChange={handleSelect} />
                            </label>
                            <span>product_catalogue</span>
                        </div></div>
                    </div>
                    <div className={"select_row"}>
                    <div className={"select_item"}> <div className="newCheckboxContainer">
                        <label className="newCheckboxLabel">
                            <input type="checkbox"  name={"boardcast"} value={authority.boardcast} checked={authority.boardcast} onChange={handleSelect} />
                        </label>
                        <span>boardcast</span>
                    </div></div>
                    <div > <div className="newCheckboxContainer">
                        <label className="newCheckboxLabel">
                            <input type="checkbox"  name={"flowbuilder"} value={authority.flowbuilder} checked={authority.flowbuilder} onChange={handleSelect} />
                        </label>
                        <span>flowbuilder</span>
                    </div></div>
                </div>
                    <div className={"select_row"}>
                        <div className={"select_item"}> <div className="newCheckboxContainer">
                            <label className="newCheckboxLabel">
                                <input type="checkbox"  name={"integrations"} value={authority.integrations} checked={authority.integrations} onChange={handleSelect} />
                            </label>
                            <span>integrations</span>
                        </div></div>
                        <div > <div className="newCheckboxContainer">
                            <label className="newCheckboxLabel">
                                <input type="checkbox"  name={"organization"} value={authority.organization} checked={authority.organization} onChange={handleSelect} />
                            </label>
                            <span>organization</span>
                        </div></div>
                    </div>
                    <div className={"select_row"}>
                        <div className={"select_item"}> <div className="newCheckboxContainer">
                            <label className="newCheckboxLabel">
                                <input type="checkbox"  name={"admin"} value={authority.admin} checked={authority.admin} onChange={handleSelect} />
                            </label>
                            <span>admin</span>
                        </div></div>

                    </div>
                   </div>
                <div className={"btn_row"}>
                    <button onClick={submit}>Confirm</button>
                    <button className={"cancel_btn"} onClick={toggle}>Cancel</button>
                </div>
            </div>
        </MF_Modal>

    )
}