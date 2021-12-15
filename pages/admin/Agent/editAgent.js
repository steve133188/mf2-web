import Avatar from "@mui/material/Avatar";
import {MF_Input} from "../../../components/Input";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import {useRouter} from "next/router";
import MF_Select from "../../../components/MF_Select";
import * as React from "react";
import FilterDropDown from "../../../components/broadcast/filterDropDown";

export default function EditAgent(props){
    const router = useRouter()
    const {user ,userInstance,orgInstance ,adminInstance} =useContext(GlobalContext)
    const [userCredential , setUserCredential] = useState({
        username:"",
        email:"",
        phone:"",
        password:"",
        confirm_password:"",
        organization:'',
        role:"",
        channels:"",
        authority:{},
        chatAccessRight:{whatsapp:false , WABA : false, messager:false , wechat:false }
    })
    const [agent,setAgent] = useState({})
    const [teams , setTeams] = useState([])
    const [filteredTeams ,setFilteredTeams] =useState([]);
    const [selectedTeams ,setSelectedTeams] =useState([]);
    const [searchValue, setSearchValue]= useState("")
    const [teamBarOpen,setTeamBar] = useState(false)
    const [roles , setRoles] = useState([])
    const [selectedTeam , setSelectedTeam] = useState({})
    const [selectedRole , setSelectedRole] = useState({})
    const submit = async ()=>{
        const data = {
            username:userCredential.username,
            email:userCredential.email,
            phone:userCredential.phone,
            password:userCredential.password,
            team:selectedTeam.name,
            role:selectedRole.name
        }
        console.log("payload",data)
        const res = await userInstance.createUser(data )
        console.log("res :",res)
        if(res == 201) router.back()
    }
    const fetchUser = async (id) =>{
        const data = await userInstance.getAllUser()
        console.log(data)
        setAgent((data.filter((data)=>{return (data.phone==id)}))[0])
        // setRoles(data)
    }
    const fetchRoles = async () =>{
        const data = await adminInstance.getAllRoles()
        setRoles(data)
        console.log(data)
    }
    const getTeams = async ()=>{
        const data = await orgInstance.getOrgTeams()
        setTeams(data)
        setFilteredTeams(data)
    }
    const toggleSelectTeams = e => {
        const { checked ,id} = e.target;
        setSelectedTeams([...selectedTeams, id]);
        if (!checked) {
            setSelectedTeams(selectedTeams.filter(item => item !== id));
        }
        console.log(selectedTeams)
    };
    const handleChange=e=>{
        const {name , value} = e.target
        setUserCredential({
            ...userCredential,
            [name]:value
        })
        console.log(userCredential)
    }
    useEffect(async ()=>{
        if(user.token){
            await getTeams()
            await fetchRoles()
            await fetchUser (props.data)
            console.log(agent)
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
                    <MF_Input name={"phone"} value={userCredential.phone} onChange={handleChange} title="Phone" placeholder={agent.phone} />
                </div>
            </div>
            <div className={"add_user_session"}>
                <div className="form_row">
                    <MF_Input name={"restPassword"}  value={userCredential.password} onChange={handleChange} title="Reset Password"/>
                    <MF_Input name={"confirmPassword"}  value={userCredential.confirm_password} onChange={handleChange} title="Confirm Password"/>
                </div>
            </div>
            <div className={"add_user_session"}>
                <div className={"add_user_select"}>
                    {/* <span className={"select_input_label"}>Team</span> */}

                    <div className={"chatlist_filter_box"} style={{width:"370px",display:"flex",backgroundColor:"transparent",justifyContent:"center",padding:"0px 10px 0 10px",borderRadius:"15px"}}>

                    <FilterDropDown title={""} subtitle={"Teams"} filterdata={filteredTeams} selecteddata={selectedTeams} expand={teamBarOpen} expandClick={()=>setTeamBar(!teamBarOpen)} onchange={(e)=>setSearchValue(e.target.value)} toggle={toggleSelectTeams} agentSearchValue={searchValue} />
                    </div>
                    {/* <MF_Select className={"select_input"} head={"Team"} top_head={selectedTeam.name?selectedTeam.name:"Team"}
                           customeDropdown={true}>
                    {teams.map((team)=>{
                        return(<li id={team.name} key={team.id} onClick={ (e)=>{setSelectedTeam(team);}}> {team.name}</li>)
                    })}
                </MF_Select> */}
                </div>
                <div className={"add_user_select"}>
                    <span className={"select_input_label"}>Role</span>
                    <MF_Select className={"select_input"} head={"Role"} top_head={selectedRole.name?selectedRole.name:"Role"}
                           customeDropdown={true}>
                    {roles.map((role)=>{
                        return(<li id={role.name} key={role.id} onClick={ (e)=>{setSelectedRole(role);}}> {role.name}</li>)
                    })}
                </MF_Select>
                </div>
            </div>
            <div className={"add_user_session"}>
                <div className={"chat_access_right"}>
                    <span className={"session_label"}>Chat Access Right</span>
                    <div className={"chat_access_right_form"}>
                        <div className={"chat_access_right_form_row"}>
                            <div className={"channel_name"}>Whatsapp</div>
                            <div className={"access_column"}>
                            <div className={"access_option"}>
                                <div className="newCheckboxContainer">
                                    <label className="newCheckboxLabel">
                                        <input type="checkbox" name="whatsapp" value={userCredential.chatAccessRight.whatsapp} checked={userCredential.chatAccessRight.whatsapp}/>
                                    </label>
                                </div>
                                <span>All Chats</span>
                            </div>
                            <div className={"access_option"}>
                                <div className="newCheckboxContainer">
                                    <label className="newCheckboxLabel">
                                        <input type="checkbox" name="whatsapp" value={userCredential.chatAccessRight.whatsapp} checked={!userCredential.chatAccessRight.whatsapp}/>
                                    </label>
                                </div>
                                <span>Assigned</span>
                            </div>
                            </div>
                        </div>
                        <div className={"chat_access_right_form_row"}>
                            <div className={"channel_name"}>Whatsapp Business API</div>
                            <div className={"access_column"}>
                                <div className={"access_option"}>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" name="WABA" value={userCredential.chatAccessRight.WABA} checked={userCredential.chatAccessRight.WABA}/>
                                        </label>
                                    </div>
                                    <span>All Chats</span>
                                </div>
                                <div className={"access_option"}>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" name="WABA" value={userCredential.chatAccessRight.WABA} checked={!userCredential.chatAccessRight.WABA}/>
                                        </label>
                                    </div>
                                    <span>Assigned</span>
                                </div>
                            </div>
                        </div>
                        <div className={"chat_access_right_form_row"}>
                            <div className={"channel_name"}>Messager</div>
                            <div className={"access_column"}>
                                <div className={"access_option"}>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" name="messager" value={userCredential.chatAccessRight.messager} checked={userCredential.chatAccessRight.messager}/>
                                        </label>
                                    </div>
                                    <span>All Chats</span>
                                </div>
                                <div className={"access_option"}>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" name="messager" value={userCredential.chatAccessRight.messager}  checked={!userCredential.chatAccessRight.messager}/>
                                        </label>
                                    </div>
                                    <span>Assigned</span>
                                </div>
                            </div>
                        </div>
                        <div className={"chat_access_right_form_row"}>
                            <div className={"channel_name"}>WeChat</div>
                            <div className={"access_column"}>
                                <div className={"access_option"}>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" name="wechat" value={userCredential.chatAccessRight.wechat}  checked={userCredential.chatAccessRight.wechat}/>
                                        </label>
                                    </div>
                                    <span>All Chats</span>
                                </div>
                                <div className={"access_option"}>
                                    <div className="newCheckboxContainer">
                                        <label className="newCheckboxLabel">
                                            <input type="checkbox" value={userCredential.chatAccessRight.wechat} checked={!userCredential.chatAccessRight.wechat} name="wechat" />
                                        </label>
                                    </div>
                                    <span>Assigned</span>
                                </div>
                            </div>
                        </div>
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