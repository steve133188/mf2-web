import { Checkbox } from "@mui/material";
import { CheckBoxM,Whatsapp,WhatsappB,Messager,Wechat } from "../../../../public/livechat/MF_LiveChat_Landing/Search_Bar/filter-icon";
import MF_Select from "../../../MF_Select";
import ChannelListItem from "./channelListItem";
import { useContext, useEffect,useState } from "react";
import { GlobalContext } from "../../../../context/GlobalContext";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Pill } from "../../../Pill";
import { AvatarGroup } from "@mui/material";
import { getThemeProps } from "@mui/system";
import DropDown from "../../../filter/teamDropDown";
import DivisionDropDown from "../../../filter/divisionDropDown";

export default function ChatlistFilter( {...props}){
    const channelData = [
        // {name:"All Channel",value:"All",id:0},
                {name:"WhastApp",value:"Whatsapp"},
                {name:"WhatsApp Business",value:"WhatsappB"},
                {name:"Messager",value:"Messager"},
                {name:"WeChat",value:"Wechat"},];

    const [selectedUsers ,setSelectedUsers] =useState([]);
    const [selectedTags ,setSelectedTags] =useState([])
    const { userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext);
    const [users ,setUsers] =useState([]);
    const [tags ,setTags] =useState([]);
    const [teams ,setTeams] =useState([]);
    const [selectedChannels ,setSelectedChannels] =useState([]);
    const [filteredTags ,setFilteredTags] =useState([]);
    const [filteredUsers ,setFilteredUsers] =useState([]);
    const [agentBarOpen,setAgentBar] = useState(false)
    const [agentSearchValue, setAgentValue]= useState("")


                // const advanceFilter =()=>{
                //     setFilter({team:selectedTeams, agent:[...selectedUsers] ,channel: [...selectedChannels] , tag:[...selectedTags]})
                //     console.log("filter",filter)
                //     const agentFiltered = contacts.filter(data=>{
                //         if(selectedUsers.length==0){
                //             return data
                //         }
                //         return data.agents.some(el=>selectedUsers.includes(el))
                //     })
                //     console.log("agent:",agentFiltered)
                //     const tagFiltered = agentFiltered.filter(data=>{
                //         if(selectedTags.length ==0){
                //             return data
                //         }
                //         return data.tags.some(el=>selectedTags.includes(el))
                //     })
                //     console.log("tagFiltered:",tagFiltered)

                // }


                const getTags = async ()=>{
                    const data = await adminInstance.getAllTags()
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
                    }
                    setSelectedUsers([])

                },[]);


    const toggleSelectUsers = e => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, id]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }
        props.agents(e)
        console.log(selectedUsers)
    };
    const toggleSelectTags = e => {
        const { checked ,id} = e.target;
        setSelectedTags([...selectedTags, id]);
        if (!checked) {
            setSelectedTags(selectedTags.filter(item => item !== id));
        }
        props.tag(e)
        console.log(selectedTags)
    };
    const toggleSelectChannels = e => {
        const { checked ,id} = e.target;
        setSelectedChannels([...selectedChannels, id]);
        if (!checked) {
            setSelectedChannels(selectedChannels.filter(item => item !== id));
        }
        props.channel(e)
        console.log(selectedChannels)
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
                            <label className="newCheckboxLabel"> <input type="checkbox"  name="checkbox" onChange={()=>{}} />
                            </label>
                        </div>
                        {/* <input type="checkbox" name="unread_check" />
                        <span className={"checkboxStyle"}></span>
                        <span className={"checkboxStyleout"}> </span> */}
                        Unread
                    </div>
                    <div className={"status_box"}>
                    <div className="newCheckboxContainer">
                            <label className="newCheckboxLabel"> <input type="checkbox"  name="checkbox" onChange={()=>{}} />
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
                        Channel<br/>
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
                <div className={"filter_box_tag"}  >
                     <div className={"channelList"}>
                        <div className={"filter_title"}>Tag</div>
                    

                            {filteredTags.map((tag)=>{
                            return(<li className={"channelListitem"}  key={tag.id}><Pill key={tag.id} size="30px" color="vip">{tag.tag}</Pill>
                                <div className="newCheckboxContainer">
                                    <label className="newCheckboxLabel">
                                        <input type="checkbox" id={tag.tag} name="checkbox" checked={selectedTags.includes(tag.tag)} onClick={toggleSelectTags} onChange={()=>{}}/>
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