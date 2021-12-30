import {MF_Input} from "../Input";
import React, {useContext, useEffect, useState} from "react";
import MF_Modal from "../MF_Modal";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import {GlobalContext} from "../../context/GlobalContext";
import ChannelsDropList from "../droplist/ChannelsList";
import AgentsDropList from "../droplist/AgentsList";

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


export default function EditReplyFolder({show, toggle ,reload,data}){

    const [roleName , setRoleName] = useState("")
    const [authority , setAuthority] = useState({
        assignee: null,
        channel: [],
        content: [],
        id: "",
        name: "",
        team: "",
    })

    const [filteredUsers ,setFilteredUsers] =useState([]);
    const [selectedUsers ,setSelectedUsers] =useState([]);

    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)
    const toggleSelectUsers = e => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, id]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }

        console.log(selectedUsers)
    };
    const getUsers = async ()=>{
        const data = await userInstance.getAllUser()
        setFilteredUsers(data)
    }
    useEffect(    async () => {
        if(user.token!=null) {
            await getUsers()
        }
        setSelectedUsers([])
    },[]);

    useEffect(()=>{
        if(!show)return
        show?console.log(data,"data in"):"";
        setAuthority(data)
    },[show])

    const [selectedChannels ,setSelectedChannels] =useState([]);
    const toggleSelectChannels = e => {
        const { checked ,id} = e.target;
        setSelectedChannels([...selectedChannels, id]);
        if (!checked) {
            setSelectedChannels(selectedChannels.filter(item => item !== id));
        }
        console.log(selectedChannels)
    };
    const toggleSelectAllChannels = e => {
        const { checked ,id} = e.target;
        setSelectedChannels(["all","whatsapp","whatsappB","wechat","messager"]);
        if (!checked) {
            setSelectedChannels([]);
        }
    };
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
        console.log({...authority})

        // const res = await adminInstance.updateStandardReply(authority);

        
        console.log(res)
        reload()
        toggle()
    }

    
    return(
        <MF_Modal show={show} toggle={toggle}>
            <div className={"modal_form"} style={{width:"100%",display:"flex",justifyContent:'center'}}>
                <div className={"modal_title"}>
                    <span>Edit Folder</span>
                </div>
                <div className="inputField">
                    <span>Folder Name</span>
                    <MF_Input value={authority.name} onChange={handleChange}/>
                </div>


                <div className="inputField">
                        <span>Channels</span>
                    </div>
                <div className={"access_right"} style={{display:"flex",justifyContent:'center',alignItems:"center"}}>


                    <ChannelsDropList toggleChannels={toggleSelectChannels} toggleAll={toggleSelectAllChannels} />                            
                </div>
                <div className="inputField">
                    <span>Assign to</span>
                </div>

                    <div className={"access_right"} style={{display:"flex",justifyContent:'center',alignItems:"center"}}>
                    <AgentsDropList filterData={filteredUsers} toggleAgents={toggleSelectUsers} />
                       
                    </div>
                <div className={"btn_row"}>
                    <button onClick={submit}>Confirm</button>
                    <button className={"cancel_btn"} onClick={toggle} >Cancel</button>
                </div>
            </div>
        </MF_Modal>

    )
}