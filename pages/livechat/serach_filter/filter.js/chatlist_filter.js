import { Checkbox } from "@mui/material";
import { CheckBoxM,Whatsapp,WhatsappB,Messager,Wechat } from "../../../../public/livechat/MF_LiveChat_Landing/Search_Bar/filter-icon";
import MF_Select from "../../../../components/MF_Select";
import ChannelListItem from "./channelListItem";
import { useContext, useEffect,useState } from "react";
import { GlobalContext } from "../../../../context/GlobalContext";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Pill } from "../../../../components/Pill";
import { AvatarGroup } from "@mui/material";


export default function ChatlistFilter(){
    const channelData = [{apiName:"All Channel",value:"All",id:0},
                {apiName:"WhastApp",value:"Whatsapp",id:1},
                {apiName:"WhatsApp Business",value:"WhatsappB",id:2},
                {apiName:"Messager",value:"Messager",id:3},
                {apiName:"WeChat",value:"Wechat",id:4},];


    const [selectedUsers ,setSelectedUsers] =useState([]);
    const [selectedTags ,setSelectedTags] =useState([])
    const { userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext);
    const [users ,setUsers] =useState([]);
    const [tags ,setTags] =useState([]);
    const [teams ,setTeams] =useState([]);
    const [filteredTags ,setFilteredTags] =useState([]);
    const [filteredUsers ,setFilteredUsers] =useState([]);


                const advanceFilter =()=>{
                    setFilter({team:selectedTeams, agent:[...selectedUsers] ,channel: [...selectedChannel] , tag:[...selectedTags]})
                    console.log("filter",filter)
                    const agentFiltered = contacts.filter(data=>{
                        if(selectedUsers.length==0){
                            return data
                        }
                        return data.agents.some(el=>selectedUsers.includes(el))
                    })
                    console.log("agent:",agentFiltered)
                    const tagFiltered = agentFiltered.filter(data=>{
                        if(selectedTags.length ==0){
                            return data
                        }
                        return data.tags.some(el=>selectedTags.includes(el))
                    })
                    console.log("tagFiltered:",tagFiltered)

                }


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
                const fetchContacts = async () =>{
                    const data = await contactInstance.getAllContacts()
                    setContacts(data)
                    setFilteredData(data)
                }
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
        console.log(selectedUsers)
    };
    const toggleSelectTags = e => {
        const { checked ,id} = e.target;
        setSelectedTags([...selectedTags, id]);
        if (!checked) {
            setSelectedTags(selectedTags.filter(item => item !== id));
        }
        console.log(selectedTags)
    };

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
         <div><div className={"filter_title"}>Filter</div>
                <div className={"filter_box_status"}  >
                    <label className={"status_box"}>
                        <input type="checkbox" name="unread_check" />
                        <span className={"checkboxStyle"}></span>
                        <span className={"checkboxStyleout"}> </span>
                        Unread
                        {/* <div className="newCheckboxContainer">
                                                    <label className="newCheckboxLabel"> <input type="checkbox" id={user.username} name="checkbox" checked={selectedUsers.includes(user.username)} onClick={toggleSelectUsers} />
                                                    </label>
                                                </div> */}
                    </label>
                    <label className={"status_box"}>
                        <input type="checkbox" name="unassign_check" />
                        <span className={"checkboxStyle"}></span>
                        <span className={"checkboxStyleout"}> </span>
                        Unassign
                    </label>
                    <label className={"status_box"}>
                        <input type="checkbox" name="bot_check" />
                        <span className={"checkboxStyle"}></span>
                        <span className={"checkboxStyleout"}> </span>
                        
                        ChatBot
                    </label>
                </div>
                <div className={"filter_box_channel"}  >
                    <div className={"channelList"}>
                        Channel<br/>
                        {channelData.map((e)=>{ return <ChannelListItem name={e.apiName} value={e.value} key={e.id} />})}
                    </div>
                </div>
                <div className={"filter_box_agents"}  >
                    <div >
                            <div className={"filter_title"}>Agent try</div><br/>
                            <MF_Select top_head={selectedUsers.length!=0? renderUsers():"Agent"} head={"Agent"} submit={advanceFilter}handleChange={(e)=>{ userSearchFilter(e.target.value , users,(new_data)=>{
                                        setFilteredUsers(new_data)
                                    })}}>
                                        {filteredUsers.map((user)=>{
                                            return(<li key={user.username}>
                                                <div style={{display:"flex" ,gap:10}}>
                                                    <Tooltip key={user.username} className={""} title={user.username} placement="top-start">
                                                        <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{user.username.substring(0,2).toUpperCase()}</Avatar>
                                                    </Tooltip>
                                                    <div className={"name"}>{user.username}</div>
                                                </div>
                                                <div className="newCheckboxContainer">
                                                    <label className="newCheckboxLabel"> <input type="checkbox" id={user.username} name="checkbox" checked={selectedUsers.includes(user.username)} onClick={toggleSelectUsers} />
                                                    </label>
                                                </div>
                                            </li>)
                                        })}
                            </MF_Select>

                    </div>
                </div>
                <div className={"filter_box_agents"}  >
                    <div className={"channelList"}>
                    <div className={"filter_title"}>Agent</div>
                        <div className={"channelList"}>
                            {filteredUsers.map((user)=>{
                                return(<li className={"channelListitem"} key={user.username} style={{width:"100%"}}>
                                    <div className={"left"} style={{display:"flex" ,gap:10}}>
                                        <Tooltip key={user.username} className={""} title={user.username} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{user.username.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                        <div className={"name"}>{user.username}</div>
                                    </div>
                                    <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel"> <input type="checkbox" id={user.username} name="checkbox" checked={selectedUsers.includes(user.username)} onClick={toggleSelectUsers} />
                                        </label>
                                    </div>
                                </li>)
                            })}
                        </div>
                    </div>
                </div>
                <div className={"filter_box_tag"}  >
                     <div className={"channelList"}>
                        <div className={"filter_title"}>Tag</div>
                    

                            {filteredTags.map((tag)=>{
                            return(<li className={"channelListitem"}  key={tag.id}><Pill key={tag.id} size="30px" color="vip">{tag.tag}</Pill>
                                <div className="newCheckboxContainer">
                                    <label className="newCheckboxLabel">
                                        <input type="checkbox" id={tag.tag} name="checkbox" checked={selectedTags.includes(tag.tag)} onClick={toggleSelectTags} />
                                    </label> </div></li>)
                        })}

                    </div>
                </div>
         </div>
    )
} 