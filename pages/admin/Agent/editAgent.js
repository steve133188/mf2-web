import Avatar from "@mui/material/Avatar";
import {MF_Input} from "../../../components/Input";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import {useRouter} from "next/router";
import MF_Select from "../../../components/MF_Select";
import * as React from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import FilterDropDown from "../../../components/broadcast/filterDropDown";

export default function EditAgent(props){
    const router = useRouter()
    const {user ,userInstance,orgInstance ,roleInstance,contactInstance} =useContext(GlobalContext)
    const [userCredential , setUserCredential] = useState({
        username:"",
        email:"",
        phone:"",
        // password:"",
        country_code:0,
        // confirm_password:"",
        organization:'',
        role_name:"",
        team_id:0,
        channels:"",
        authority:{},

    })  
    const channelData = [
        // name:"WhastApp",value:"All",channelID:"All",id:0},
                {name:"WhastApp",value:"Whatsapp",channelID:"whatsapp",id:1},
                {name:"WhatsApp Business",value:"WABA",channelID:"waba",id:2},
                {name:"Messager",value:"Messager",channelID:"messager",id:3},
                {name:"WeChat",value:"Wechat",channelID:"wechat",id:4},];
   
    const [agent,setAgent] = useState({})
    const [teams , setTeams] = useState([{org_id:0,name:""}])
    const [filteredTeams ,setFilteredTeams] =useState([]);

    const [searchValue, setSearchValue]= useState("")
    const [teamBarOpen,setTeamBar] = useState(false)
    const [roles , setRoles] = useState([])
    const [selectedTeam , setSelectedTeam] = useState({})
    const [selectedRole , setSelectedRole] = useState({})

    const [authChannel,setAuthChannel] = useState({
        messager: false,
        waba: false,
        wechat: false,
        whatsapp: false,})
    const submit = async (phone)=>{
        const data = {...agent,
            username:userCredential.username,
            email:userCredential.email,
            phone:parseInt(userCredential.phone),
            team_id:selectedTeam.org_id,
            role_id:selectedRole.role_id, 
            country_code:parseInt(userCredential.country_code),
            chat_access:authChannel,
        }
        console.log("payload",data)
        const res = await userInstance.updateUser(data )
        console.log("res :",res)
        // if(res == 201) router.back()
        // if(res == 200) router.back()
    }
    
    const fetchUser = async (id) =>{
        console.log(id)
        const data = await userInstance.getUserById (id)
        console.log(data,"user will edit")
        // setAgent((data.filter((data)=>{return (data.phone==id)}))[0])
        // console.log(agent,"i am Agent")
        setAgent(data)
        setUserCredential(data)
        setAuthChannel([data.authority.whatsapp,data.authority.wechat,data.authority.waba,data.authority.messager])
        setSelectedTeam(data.team)

    }
    useEffect(async()=>{
        setUserCredential({...userCredential,username:agent.username,password:agent.password,email:agent.email,country_code:agent.country_code,phone:agent.phone,role_name:agent.role_name??" ",team_id:agent.team_id??" "})
      setSelectedRole({role_name:agent.role_name,role_id:agent.role_id})
    },[agent])
    const fetchRoles = async () =>{
        const data = await roleInstance.getAllRoles()
        setRoles(data)
        console.log(data,"role")
    }
    const getTeams = async ()=>{
        const data = await orgInstance.getOrgTeams()
        console.log(data,"team")
        setTeams(data)
        setFilteredTeams(data)
    }
    // const toggleSelectTeams = e => {
    //     const { checked ,id} = e.target;
    //     console.log(id)
    //     setSelectedTeams([...selectedTeams, e.target]);
    //     if (checked) {
    //         setSelectedTeams(selectedTeams.filter(item => item !== id));
    //     }
    //     console.log(selectedTeams)
    // };
    const handleChange=e=>{
        const {name , value} = e.target
        setUserCredential({
            ...userCredential,
            [name]:value
        })
        console.log(userCredential)
        console.log(agent)
    }
    const handleChannelSelect =e=>{
        
        const {name ,value ,checked,id} = e.target
        console.log(name )
        
        setAuthChannel({
            ...authChannel,
            [name]:true
        }  )
        if(!checked){
            setAuthChannel({
                ...authChannel,
                [name]:false
            }  )
        }
        console.log(authChannel)
        }
    const handleChannelAssSelect =e=>{
        
        const {name ,value ,checked,id} = e.target
        console.log(id)
        
        setAuthChannel({
            ...authChannel,
            [name]:false
        }  )
            if(!checked){
                setAuthChannel({
                    ...authChannel,
                    [name]:true
                }  )
            }
        }

    useEffect(async ()=>{
        if(user.token){
            await getTeams()
            await fetchRoles()
            await fetchUser (props.data)
      
            // setSelectedTeam(agent.team)
        }
    },[])
    return(
        <div className="add_user_panel">
            <div className={"title"}>Edit Agent - {agent.username}</div>
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
                    <MF_Input name={"username"}  value={userCredential.username} onChange={handleChange} title="Username" placeholder={agent.username}/>
                    <MF_Input name={"email"} value={userCredential.email} onChange={handleChange} title="Email" placeholder={agent.email}/>
                </div>
                <div className="form_row">
                    <MF_Input name={"country_code"} value={userCredential.country_code} onChange={handleChange} title="Country Code" placeholder={"852 HK"} style={{width:"110px"}} />
                    <MF_Input name={"phone"} value={userCredential.phone} onChange={handleChange} title="Phone" placeholder={agent.phone} />
                </div>
            </div>
            <div className={"add_user_session"}>
                <div className="form_row">
                    <MF_Input name={"restPassword"} type={"password"} value={userCredential.password} onChange={handleChange} title="Reset Password"/>
                    <MF_Input name={"confirmPassword"} type={"password"} value={userCredential.confirm_password} onChange={handleChange} title="Confirm Password"/>
                </div>
            </div>
            <div className={"add_user_session"}>
                <div className={"add_user_select"}>
                    <div className="">
                        <span className={"select_input_label"}>Team</span>

                        {/* <div className={"chatlist_filter_box"} style={{width:"370px",display:"flex",backgroundColor:"transparent",justifyContent:"center",padding:"0px 10px 0 10px",borderRadius:"15px"}}>
                            <FilterDropDown title={""} subtitle={"Teams"} filterdata={filteredTeams} selecteddata={selectedTeams} expand={teamBarOpen} expandClick={()=>setTeamBar(!teamBarOpen)} onchange={(e)=>setSearchValue(e.target.value)} toggle={toggleSelectTeams} agentSearchValue={searchValue} />
                        </div> */}
                        <MF_Select className={"select_input"} head={"Team"} top_head={selectedTeam.name?selectedTeam.name:"Team"}
                            customeDropdown={true}>
                        {teams.map((team)=>{
                            return(<li id={team.org_id} key={team.org_id} onClick={ ()=>{setSelectedTeam(team)}}> {team.name}</li>)
                        })}
                    </MF_Select>
                    </div>
                </div>
                <div className={"add_user_select"}>

                <div className="">
                    <span className={"select_input_label"}>Role</span>
                    <MF_Select className={"select_input"} head={"Role"} top_head={selectedRole.role_name?selectedRole.role_name:"Role"}
                           customeDropdown={true}>
                    {roles.map((role)=>{
                        return(<li id={role.role_name} key={role.role_id} onClick={ (e)=>{setSelectedRole(role);}}> {role.role_name}</li>)
                    })}
                </MF_Select>
                </div>
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
                                            <input type="checkbox" name={item.channelID} value={"all"} id={item.value}  checked={authChannel[item.channelID]==true}  onChange={handleChannelSelect}  />
                                        </label>
                                    </div>
                                    <span>All Chats</span>
                                </div>
                                <div className={"access_option"}>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" name={item.channelID} value={"assign"} id={item.value} checked={authChannel[item.channelID]==false} onChange={handleChannelAssSelect} />
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
                    await submit(agent.phone);router.back()
                }} className={"save_btn"}>Confirm</button>
                <button className={"cancel_btn"} onClick={()=>{router.back()}}>Cancel</button>
            </div>
        </div>
    )
}