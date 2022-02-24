import Avatar from "@mui/material/Avatar";
import {MF_Input} from "../../../components/Input";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import {useRouter} from "next/router";
import MF_Select from "../../../components/MF_Select";
import * as React from "react";
import Link from 'next/link';
import {useRootStore} from "../../../utils/provider/RootStoreProvider";

export default function AddAgent(){
    const router = useRouter()
    // const {user ,userInstance,orgInstance ,adminInstance,roleInstance} =useContext(GlobalContext)
    const {authStore:{token },usersActionsStore,orgActionsStore} =useRootStore()
    const [userCredential , setUserCredential] = useState({
        username:"",
        email:"",
        phone:"",
        password:"",
        organization:'',
        role_name:"",
        channels:"",
        authority:{},
        country_code:852,
    })

    const [teams , setTeams] = useState([])
    const [roles , setRoles] = useState([])
    const [selectedTeam , setSelectedTeam] = useState({})
    const [selectedRole , setSelectedRole] = useState({})
    const [authChannel,setAuthChannel] = useState({
        messager: "",
        waba: "",
        wechat: "",
        whatsapp: "",})
    const [submitCheck,setSubmitCheck]=useState(false)
    const channelData = [
        // name:"WhastApp",value:"All",channelID:"All",id:0},
                {name:"WhastApp",value:"Whatsapp",channelID:"whatsapp",id:1},
                {name:"WhatsApp Business",value:"WABA",channelID:"waba",id:2},
                {name:"Messager",value:"Messager",channelID:"messager",id:3},
                {name:"WeChat",value:"Wechat",channelID:"wechat",id:4},];

    const fieldCheck=()=>{
        if(userCredential.username.length<1){console.log("username to short");return }
    }

    const submit = async ()=>{
        fieldCheck();
        const data = {
            username:userCredential.username,
            email:userCredential.email,
            phone:parseInt(userCredential.phone),
            password:userCredential.password,
            team_id:selectedTeam.org_id,
            // role_name:selectedRole.role_name,
            role_id:selectedRole.role_id,
            country_code:parseInt(userCredential.country_code),
            // chat_access:authChannel,
        }
        await usersActionsStore.createUser(data )
        if(!usersActionsStore.error == 201) router.back()
        setSubmitCheck(!submitCheck )
    }
    const fetchRoles = async () =>{
        await orgActionsStore.getAllRoles()
        setRoles(orgActionsStore.roles)
    }
    const getTeams = async ()=>{
        await orgActionsStore.getOrgTeams()
        setTeams(orgActionsStore.teams)
    }
    const handleChange=e=>{
        const {name , value} = e.target
        setUserCredential({
            ...userCredential,
            [name]:value
        })
        console.log(userCredential)
    }
    const handleChannelSelect =e=>{

        const {name ,value ,checked,id} = e.target
        console.log(name )

        setAuthChannel({
            ...authChannel,
            [name]:"all"
        }  )
        if(!checked){
            setAuthChannel({
                ...authChannel,
                [name]:"assign"
            }  )
        }
        console.log(authChannel)
        }
    const handleChannelAssSelect =e=>{

        const {name ,value ,checked,id} = e.target
        console.log(id)

        setAuthChannel({
            ...authChannel,
            [name]:"assign"
        }  )
            if(!checked){
                setAuthChannel({
                    ...authChannel,
                    [name]:"all"
                }  )
            }
        }

    useEffect(async ()=>{
        if(token){
            await getTeams()
            await fetchRoles()
        }
    },[])
    // useEffect(()=>{
    //     if(userCredential.username.length<=0){alert("Please fill in username.")}

    // },[submitCheck])
    return(
        <div className="add_user_panel">
            <div className={"title"}>New User</div>
            <div className="avatarGroup">
                <div className={"avatar_top"}>Avatar</div>
                <div className={"avatar_row"}>
                    <Avatar sx={{
                        bgcolor: "#FCECD2",
                        color: "#F1B44C",
                        width: "90px",
                        height: "90px",
                        fontSize: "41px",
                        fontWeight:500,
                    }}>MF</Avatar>
                    <button className={"upload"}>Upload</button>
                    <button className={"remove"}>Remove</button>
                </div>
            </div>
            <div className="add_user_session">
                <div className="form_row">
                    <MF_Input name={"username"}  value={userCredential.username} onChange={handleChange} title="Username" minlength={1} />
                    <MF_Input name={"email"} value={userCredential.email} onChange={handleChange} title="Email" type={"email"}/>
                </div>
                <div className="form_row">
                    <MF_Input name={"country_code"} value={userCredential.country_code} onChange={handleChange} title="Country Code" placeholder={"852 HK"} style={{width:"110px"}} />
                    <MF_Input name={"phone"} value={userCredential.phone} onChange={handleChange} title="Phone" />
                </div>
            </div>
            <div className={"add_user_session"}>
                <div className="form_row">
                    <MF_Input name={"password"} type="password" value={userCredential.password} onChange={handleChange} title="Password"/>
                </div>
            </div>
            <div className={"add_user_session"}>
                <div className={"add_user_select"}>
                    <span className={"select_input_label"}>Team</span>
                    <MF_Select className={"select_input"} head={"Team"} top_head={selectedTeam.name?selectedTeam.name:"Team"}
                           customeDropdown={true}>
                    {teams.map((team)=>{
                        return(<li id={team.name} key={team.org_id} onClick={ (e)=>{setSelectedTeam(team);}}> {team.name}</li>)
                    })}
                </MF_Select>
                </div>
                <div className={"add_user_select"}>
                    <span className={"select_input_label"}>Role</span>
                    <MF_Select className={"select_input"} head={"Role"} top_head={selectedRole.role_name?selectedRole.role_name:"Role"}
                           customeDropdown={true}>
                    {roles.map((role)=>{
                        return(<li id={role.role_name} key={role.role_id} onClick={ (e)=>{setSelectedRole(role);}}> {role.role_name}</li>)
                    })}
                </MF_Select>
                </div>
            </div>
            {/* <div className={"add_user_session"}>
                <div className={"chat_access_right"}>
                    <span className={"session_label"}>Chat Access Right</span>
                    <div className={"chat_access_right_form"}>
                        {channelData.map((item,index)=>{return <div key={index} className={"chat_access_right_form_row"}>
                                <img src={`/channel_SVG/${item.value}.svg`} style={{width:"20px",margin:"0 5px"}}></img>
                                <div className={"channel_name"}>{item.name}</div>
                                <div className={"access_column"}>
                                <div className={"access_option"}>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" name={item.channelID} value={"all"} id={item.value}  checked={authChannel[item.channelID]=="all"}  onChange={handleChannelSelect}  />
                                        </label>
                                    </div>
                                    <span>All Chats</span>
                                </div>
                                <div className={"access_option"}>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" name={item.channelID} value={"assign"} id={item.value} checked={authChannel[item.channelID]=="assign"} onChange={handleChannelAssSelect} />
                                        </label>
                                    </div>
                                    <span>Assigned</span>
                                </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div> */}
            <div className={"submit_row"}>
            <button  onClick={async ()=> {
                    await submit()
                }} className={"save_btn"}>Create</button>
                <button className={"cancel_btn"} onClick={()=>{router.back()}}>Cancel</button>
            </div>
        </div>
    )
}
