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
import {useRootStore} from "../../utils/provider/RootStoreProvider";

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


export default function EditReplyFolder({show, toggle ,reload,data,filteredTeams,}){

    const [name , setName] = useState("")
    const [authority , setAuthority] = useState({

        channels: [],
        body: [],
        id: "",
        name: "",
        variables:[],
    })

    const [parent , setParent] = useState({})
    const [filteredUsers ,setFilteredUsers] =useState([]);
    const [selectedUsers ,setSelectedUsers] =useState([]);

    const [selectedTeams ,setSelectedTeams] =useState([])

    const {mediaActionsStore , usersActionsStore , authStore:{isAuth}} = useRootStore()
    const toggleSelectUsers = e => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, id]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }
    };
    const toggleSelectTeams = (e) =>{
        const { checked ,id} = e.target;
   setSelectedTeams([...selectedTeams, id]);
   if (!checked) {
       setSelectedTeams(selectedTeams.filter(item => item !== id));
   }
   console.log(selectedTeams,"selectedTeams")
   }
    const getUsers = async ()=>{
        await usersActionsStore.getAll()
        setFilteredUsers(usersActionsStore.users)
    }
    useEffect(    async () => {
        if(isAuth!=null) {
            await getUsers()
        }
        setSelectedUsers([])

    },[]);

    useEffect(()=>{
        if(!show)return
        show?console.log(data,"data in"):"";
        setAuthority(data)
        setName(data.name)
        setSelectedTeams(data.variables)
        setSelectedChannels(data.channels)

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
        setSelectedChannels(["All","Whatsapp","WABA","Wechat","Messager"]);
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
        setName(e.target.value)
        // console.log(roleName)
    }
    const submit = async ()=>{
        console.log({...authority})
        console.log(selectedChannels)

        const dataupload = {...data,name:name,channels:selectedChannels,variables:selectedTeams}
        console.log(dataupload)
        const res = await mediaActionsStore.updateOneStandardReply(dataupload )


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
                    <MF_Input value={name} onChange={handleChange}/>
                </div>


                <div className="inputField">
                        <span>Channels</span>
                    </div>
                <div className={"access_right"} style={{display:"flex",justifyContent:'center',alignItems:"center"}}>


                    <ChannelsDropList data={selectedChannels} toggleChannels={toggleSelectChannels} toggleAll={toggleSelectAllChannels} />
                </div>
                <div className="inputField">
                    <span>Assign to</span>
                </div>

                    <div className={"access_right"} style={{display:"flex",justifyContent:'center',alignItems:"center"}}>
                    {/* <AgentsDropList filterData={filteredUsers} toggleAgents={toggleSelectUsers} /> */}
                    <Select
                        sx={style}
                        value={parent}
                        onChange={()=>{}}
                        label={"Select Division"}
                        input={<BootstrapInput />}
                        >
                       <div className={"filter_box_agents"}  >
                    <div className={"agentBroad"} >

                    <div className={"filter_title"} onClick={toggle}> </div>
                    <div className={"agentSearchArea"}  style={show?{display:"block"}:{display:"none"}}>
                         {/* <div className={"search_bar"}>
                            <input type="text" className={"search_area"} onChange={(e)=>setAgentValue(e.target.value)} placeholder={"Search"}></input>
                        </div>  */}

                        <div className={"channelList"} >
                            {filteredTeams.map((team)=>{
                                return(<li className={"channelListitem"} key={team.name} style={{width:"90%"}}>
                                            <div className={"left"} style={{display:"flex" ,gap:10}}>
                                                {/* <Tooltip key={team.name} className={""} title={team.name} placement="top-start">
                                                    <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14,marginLeft:"10px"}} >{team.name.substring(0,2).toUpperCase()}</Avatar>
                                                </Tooltip> */}
                                                <div className={"name"}>{team.name}</div>
                                            </div>
                                        <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel"> <input type="checkbox" id={team.name} name={team.name} checked={selectedTeams.includes(team.name)} onClick={toggleSelectTeams} />
                                        </label>
                                    </div>
                                </li>) })
                            }
                        </div>
                    </div>
                    </div>
                </div>
                    </Select>
                        <div className={"taglList"} style={{display:"flex"}}>
                            {selectedTeams.map((team)=>{
                                    return(

                                        <div key={team.id} className={""} style={{display:"flex",padding:"7px" ,gap:1}}>
                                            <div className={"name"}>{team}</div>
                                            {/* <Tooltip key={team} className={""} title={team} placement="top-start">
                                                <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14}} >{team.substring(0,2).toUpperCase()}</Avatar>
                                            </Tooltip> */}
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                <div className={"btn_row"}>
                    <button onClick={submit}>Confirm</button>
                    <button className={"cancel_btn"} onClick={toggle} >Cancel</button>
                </div>
            </div>
        </MF_Modal>

    )
}
