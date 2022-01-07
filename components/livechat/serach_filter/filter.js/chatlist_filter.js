
import { CheckBoxM,Whatsapp,WhatsappB,Messager,Wechat } from "../../../../public/livechat/MF_LiveChat_Landing/Search_Bar/filter-icon";
import ChannelListItem from "./channelListItem";
import { useContext, useEffect,useState } from "react";
import { GlobalContext } from "../../../../context/GlobalContext";
import { Tooltip ,Avatar ,AvatarGroup } from "@mui/material";
import { Pill } from "../../../Pill";

export default function ChatlistFilter( {...props}){

const channelData = [
    // name:"WhastApp",value:"All",channelID:"All",id:0},
            {name:"WhastApp",value:"Whatsapp",channelID:"Whatsapp",id:1},
            {name:"WhatsApp Business",value:"WABA",channelID:"WhatsappB",id:2},
            {name:"Messager",value:"Messager",channelID:"Messager",id:3},
            {name:"WeChat",value:"Wechat",channelID:"Wechat",id:4},];

                const [selectedTags ,setSelectedTags] =useState([])
                const { userInstance ,tagInstance ,orgInstance, user} = useContext(GlobalContext);
                const [users ,setUsers] =useState([]);
                const [tags ,setTags] =useState([]);
                const [teams ,setTeams] =useState([]);
                const [division ,setDivision] =useState([]);
                const [selectedChannels ,setSelectedChannels] =useState([]);
                const [filteredTags ,setFilteredTags] =useState([]);
                const [filteredUsers ,setFilteredUsers] =useState([]);
                const [selectedUsers ,setSelectedUsers] =useState([]);
                const [agentBarOpen,setAgentBar] = useState(false)
                const [agentSearchValue, setAgentValue]= useState("")
                const [selectedTeams ,setSelectedTeams] =useState([])
                const [selectedDivision ,setSelectedDivision] =useState([])
                const [teamBarOpen,setTeamBar] = useState(false)
                const [dBarOpen,setDBar] = useState(false)


                const getTags = async ()=>{
                    const data = await tagInstance.getAllTags()
                    setTags(data)
                    setFilteredTags(data)

                }
                const getUsers = async ()=>{
                    const data = await userInstance.getAllUser()
                    setUsers(data)
                    setFilteredUsers(data)
                }
                const getTeams = async ()=>{
                    const data = await orgInstance.getOrgTeams()
                    setTeams(data)
                }
                const getDivision = async () =>{
                    const data = await orgInstance.getAllORG ()
                    setDivision(data.filter(e=>{return e.type=="division"}))
                }
                // const fetchContacts = async () =>{
                //     const data = await contactInstance.getAllContacts()
                //     setContacts(data)
                //     setFilteredData(data)
                // }
                useEffect(    async () => {
                    if(user.token!=null) {
                        await getTags()
                        await getUsers()
                        await getTeams()
                        await getDivision()
                    }
                    setSelectedUsers([])

                },[]);


    const toggleSelectUsers = e => {
        const { checked ,id} = e.target;
        setSelectedUsers(prev=>[...selectedUsers, id]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }
        props.agents(e)
        console.log(selectedUsers)
    };
    const toggleSelectDivision = e => {
        const { checked ,id} = e.target;
        setSelectedDivision(prev=>[...selectedDivision, id]);
        if (!checked) {
            setSelectedDivision(selectedDivision.filter(item => item !== id));
        }
        // props.team(e)
        console.log(selectedTeams)
    };
    const toggleSelectTeams = e => {
        const { checked ,id} = e.target;
        setSelectedTeams(prev=>[...selectedTeams, id]);
        if (!checked) {
            setSelectedTeams(selectedTeams.filter(item => item !== id));
        }
        // props.team(e)
        console.log(selectedTeams)
    };
    const toggleSelectTags = e => {
        const { checked ,id} = e.target;
        setSelectedTags(prev=>[...selectedTags, id]);
        if (!checked) {
            setSelectedTags(selectedTags.filter(item => item !== id));
        }
        props.tag(e)
        console.log(selectedTags)
    };
    const toggleSelectChannels = e => {
        const { checked ,id} = e.target;
        setSelectedChannels(prev=>[...selectedChannels, id]);
        if (!checked) {
            setSelectedChannels(selectedChannels.filter(item => item !== id));
        }
        props.channel(e)
        console.log(selectedChannels)
    };
    const toggleSelectAllChannels = e => {
        const { checked ,id} = e.target;
        // setSelectedChannels(["all","Whatsapp","WABA","Wechat","Messager"]);
        setSelectedChannels(["Whatsapp","WABA","Wechat","Messager"]);
        if (!checked) {
            setSelectedChannels([]);
        }
        props.channel(e)
    };
    const handelConfirm = ()=>{
        props.click();
        props.confirm();
    }
    const handelCancel = ()=>{
        props.click();
        props.cancel();
        setSelectedUsers([])
        setSelectedChannels([])
        setSelectedTags([])
    }

    const renderUsers = ()=>{
        return<AvatarGroup className={"AvatarGroup"} xs={{flexFlow:"row",justifyContent:"flex-start"}} max={5} spacing={"1"} >
            {selectedUsers.map((agent, index) => {
                return (
                    <Tooltip key={index} className={""} title={agent} placement="top-start">
                        <Avatar className={"mf_bg_warning mf_color_warning text-center"} sx={{
                            width: 25,
                            height: 25,
                            fontSize: 14
                        }}>{agent.substring(0, 2).toUpperCase()}</Avatar>
                    </Tooltip>
                )
            })}
        </AvatarGroup>
    }

    return(
         <div className={""} style={{width:"92%",height: "90%",maxHeight: "97vh"}}><div className={"filter_title"}>Filter</div>
                <div className={"filter_box_status"}  >
                    <div className={"status_box"}>
                        <div className="newCheckboxContainer">
                            <label className="newCheckboxLabel"> <input type="checkbox"  name="checkbox" onChange={()=>{}} onClick={props.unread} />
                            </label>
                        </div>
                        {/* <input type="checkbox" name="unread_check" />
                        <span className={"checkboxStyle"}></span>
                        <span className={"checkboxStyleout"}> </span> */}
                        Unread
                    </div>
                    <div className={"status_box"}>
                    <div className="newCheckboxContainer">
                            <label className="newCheckboxLabel"> <input type="checkbox"  name="checkbox" onChange={()=>{}} onClick={props.unassigned}/>
                            </label>
                        </div>
                        Unassign
                    </div>
                    <div className={"status_box"}>
                    <div className="newCheckboxContainer">
                            <label className="newCheckboxLabel"> <input type="checkbox"  name="checkbox" onChange={()=>{}} />
                            </label>
                        </div>
                        ChatBot
                    </div>
                </div>
                <div className={"filter_box_channel"}  >
                    <div className={"channelList"}>
                        Channels<br/>
                          <ChannelListItem name={"All Channels"} value={"All"} id={"All"} key={"All"} checked={selectedChannels.includes("all")} onclick={toggleSelectAllChannels } />
                        {channelData.map((e,i)=>{ return <ChannelListItem name={e.name} value={e.value} id={e.value} key={i} checked={selectedChannels.includes(e.value)} onclick={toggleSelectChannels } />})}
                    </div>
                </div>


                        {/* <DropDown data={"teamsList"}/> */}
 <div className={"filter_box_agents"}  >Agent
                    <div className={"agentBroad"} >

                        <div className={"filter_title"} onClick={()=>{setAgentBar(!agentBarOpen)}}>Choose Agent</div>
                        <div className={"agentSearchArea"}  style={agentBarOpen?{display:"block"}:{display:"none"}}>
                                <div className={"search_bar"}>
                                <input type="text" className={"search_area"} onChange={(e)=>setAgentValue(e.target.value)} placeholder={"Search"}></input>
                            </div>
                            {/* <DivisionDropDown data={Division}  /> */}


                            <div className={"channelList"} >
                                {filteredUsers.filter(users=>users.username.includes(agentSearchValue)).map((user)=>{
                                    return(<li className={"channelListitem"} key={user.username} style={{width:"100%"}}>
                                        <div className={"left"} style={{display:"flex" ,gap:10}}>
                                            <Tooltip key={user.username} className={""} title={user.username} placement="top-start">
                                                <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{user.username.substring(0,2).toUpperCase()}</Avatar>
                                            </Tooltip>
                                            <div className={"name"}>{user.username}</div>
                                        </div>
                                        <div className="newCheckboxContainer right">
                                            <label className="newCheckboxLabel"> <input type="checkbox" id={user.username} name="checkbox" checked={selectedUsers.includes(user.username)} onClick={toggleSelectUsers} onChange={()=>{}}/>
                                            </label>
                                        </div>
                                    </li>) })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"taglList"}>
                        {selectedUsers.map((user,index)=>{
                                return(
                                    <div key={index} className={"tag"} style={{display:"flex" ,gap:10}}>
                                        <Tooltip  className={""} title={user} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14}} >{user.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>

                                    </div>


                                )
                            })}
                    </div>
                </div>

                {/*<div className={"filter_box_agents"}  >Division*/}
                {/*    <div className={"agentBroad"} >*/}

                {/*        <div className={"filter_title"} onClick={()=>{setDBar(!dBarOpen)}}>Choose Division</div>*/}
                {/*        <div className={"agentSearchArea"}  style={dBarOpen?{display:"block"}:{display:"none"}}>*/}


                {/*            <div className={"channelList"} >*/}

                {/*                {division.map((team)=>{*/}
                {/*                    return(<li className={"channelListitem"} key={team.name} style={{width:"100%"}}>*/}
                {/*                        <div className={"left"} style={{display:"flex" ,gap:10}}>*/}

                {/*                            <div className={"name"}>{team.name}</div>*/}
                {/*                        </div>*/}
                {/*                        <div className="newCheckboxContainer right">*/}
                {/*                            <label className="newCheckboxLabel"> <input type="checkbox" id={team.name} name="checkbox" checked={selectedDivision.includes(team.name)} onClick={toggleSelectDivision} onChange={()=>{}}/>*/}
                {/*                            </label>*/}
                {/*                        </div>*/}
                {/*                    </li>) })*/}
                {/*                }*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className={"filter_box_agents"}  >Team
                    <div className={"agentBroad"} >

                        <div className={"filter_title"} onClick={()=>{setTeamBar(!teamBarOpen)}}>Choose Team</div>
                        <div className={"agentSearchArea"}  style={teamBarOpen?{display:"block"}:{display:"none"}}>
                                <div className={"search_bar"}>
                                <input type="text" className={"search_area"} onChange={(e)=>setTeamValue(e.target.value)} placeholder={"Search"}></input>
                            </div>



                            <div className={"channelList"} >

                                {teams.map((team)=>{
                                    return(<li className={"channelListitem"} key={team.name} style={{width:"100%"}}>
                                        <div className={"left"} style={{display:"flex" ,gap:10}}>

                                            <div className={"name"}>{team.name}</div>
                                        </div>
                                        <div className="newCheckboxContainer right">
                                            <label className="newCheckboxLabel"> <input type="checkbox" id={team.org_id} name="checkbox" checked={selectedTeams.includes(team.org_id)} onClick={toggleSelectTeams} onChange={()=>{}}/>
                                            </label>
                                        </div>
                                    </li>) })
                                }
                            </div>
                        </div>
                    </div>

                </div>



                <div className={"filter_box_tag"}  >
                     <div className={"channelList"}>
                        <div className={"filter_title"}>Tag</div>


                            {filteredTags.map((tag)=>{
                            return(<li className={"channelListitem"}  key={tag.tag_id}><Pill key={tag.tag_id} size="30px" color="vip">{tag.tag_name}</Pill>
                                <div className="newCheckboxContainer">
                                    <label className="newCheckboxLabel">
                                        <input type="checkbox" id={tag.tag_name} name="checkbox" checked={selectedTags.includes(tag.tag_name)} onClick={toggleSelectTags} onChange={()=>{}}/>
                                    </label> </div></li>)
                        })}

                    </div>
                </div>

                <div className="confirm_btn_set">

                    <button className={"confirmButton"}  onClick={handelConfirm}  color="neutral">Confirm</button>
                    <button className={"cancelButton"} onClick={handelCancel} >Cancel</button>
                </div>
         </div>
    )
}
