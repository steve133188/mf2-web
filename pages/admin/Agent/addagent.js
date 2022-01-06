import Avatar from "@mui/material/Avatar";
import {MF_Input} from "../../../components/Input";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import {useRouter} from "next/router";
import MF_Select from "../../../components/MF_Select";
import * as React from "react";
import Link from 'next/link';

export default function AddAgent(){
    const router = useRouter()
    const {user ,userInstance,orgInstance ,adminInstance,roleInstance} =useContext(GlobalContext)
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
        chatAccessRight:{whatsapp:false , WABA : false, messager:false , wechat:false }
    })

    const [teams , setTeams] = useState([])
    const [roles , setRoles] = useState([])
    const [selectedTeam , setSelectedTeam] = useState({})
    const [selectedRole , setSelectedRole] = useState({})
    const [authChannel,setAuthChannel] = useState([])
    const [submitCheck,setSubmitCheck]=useState(false)
    const channelData = [
        // name:"WhastApp",value:"All",channelID:"All",id:0},
                {name:"WhastApp",value:"Whatsapp",channelID:"Whatsapp",id:1},
                {name:"WhatsApp Business",value:"WABA",channelID:"WhatsappB",id:2},
                {name:"Messager",value:"Messager",channelID:"Messager",id:3},
                {name:"WeChat",value:"Wechat",channelID:"Wechat",id:4},];
    
    const submit = async ()=>{
        const data = {
            user_id:parseInt(userCredential.country_code+userCredential.phone),
            username:userCredential.username,
            email:userCredential.email,
            phone:parseInt(userCredential.phone),
            password:userCredential.password,
            team_id:selectedTeam.org_id,
            role_name:selectedRole.role_name,
            role_id:selectedRole.role_id,
            country_code:parseInt(userCredential.country_code),
            role_channel:authChannel,
        }
        console.log("payload",data)
        const res = await userInstance.createUser(data )
        console.log("res :",res)
        if(res == 201) router.back()
        if(res == 200) router.back()
        setSubmitCheck(!submitCheck )
    }
    const fetchRoles = async () =>{
        const data = await roleInstance.getAllRoles()
        setRoles(data)
    }
    const getTeams = async ()=>{
        const data = await orgInstance.getOrgTeams()
        setTeams(data)
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
        console.log(id)
        
        setAuthChannel([
            ...authChannel,id])
            if(!checked){
                
                setAuthChannel(
                authChannel.filter(item => {return item != id})
                )
            }
        }
    useEffect(async ()=>{
        if(user.token){
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
                    <MF_Input name={"username"}  value={userCredential.username} onChange={handleChange} title="Username"/>
                    <MF_Input name={"email"} value={userCredential.email} onChange={handleChange} title="Email"/>
                </div>
                <div className="form_row"> 
                    <MF_Input name={"country_code"} value={userCredential.country_code} onChange={handleChange} title="Country Code" placeholder={"852 HK"} style={{width:"110px"}} />
                    <MF_Input name={"phone"} value={userCredential.phone} onChange={handleChange} title="Phone"/>
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
            <div className={"add_user_session"}>
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
                                            <input type="checkbox" name={item.channelID} value={item.value} id={item.value}  checked={authChannel.includes(item.value)} onChange={()=>{}}  onChange={handleChannelSelect}  />
                                        </label>
                                    </div>
                                    <span>All Chats</span>
                                </div>
                                <div className={"access_option"}>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" name={item.channelID} value={item.value} id={item.value} checked={!authChannel.includes(item.value)} onChange={()=>{}} onChange={handleChannelSelect} />
                                        </label>
                                    </div>
                                    <span>Assigned</span>
                                </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div className={"submit_row"}>
            <button  onClick={async ()=> {
                    await submit()
                }} className={"save_btn"}>Create</button>
                <button className={"cancel_btn"} onClick={()=>{router.back()}}>Cancel</button>
            </div>
        </div>
    )
}