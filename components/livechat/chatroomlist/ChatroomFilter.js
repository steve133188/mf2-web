import { useEffect, useState} from "react";
import {Avatar, AvatarGroup, Tooltip} from "@mui/material";
import ChannelListItem from "../serach_filter/filter.js/channelListItem";
import {Pill} from "../../Pill";
import List from "@mui/material/List";
import DropDown from "../../filter/teamDropDown";

export default function ChatroomFilter( props){

    const {  onClick , users, tags ,confirm  , clear , teams ,chats ,contacts} = props

    const channelData = [
        {name:"WhastApp",value:"Whatsapp",channelID:"Whatsapp",id:1},
        {name:"WhatsApp Business",value:"WABA",channelID:"WhatsappB",id:2},
        {name:"Messager",value:"Messager",channelID:"Messager",id:3},
        {name:"WeChat",value:"Wechat",channelID:"Wechat",id:4},];

    const [filteredTags ,setFilteredTags] =useState([]);
    const [filteredUsers ,setFilteredUsers] =useState([]);
    const [selectedTeams ,setSelectedTeams] =useState([])
    const [selectedChannels ,setSelectedChannels] =useState(["all","Whatsapp","WABA","Wechat","Messager"]);
    const [selectedTags ,setSelectedTags] =useState([])
    const [selectedUsers ,setSelectedUsers] =useState([]);
    const [agentBarOpen,setAgentBar] = useState(false)
    const [agentSearchValue, setAgentValue]= useState("")
    const [selectedDivision ,setSelectedDivision] =useState([])
    const [teamBarOpen,setTeamBar] = useState(false)
    const [dBarOpen,setDBar] = useState(false)

    useEffect(    async () => {
        setFilteredTags(tags)
        setFilteredUsers(users)

    },[]);

   const updateSelectedTeams = (data)=>{
       setSelectedTeams(data)
   }
    const updateSelectedUsers = (data)=>{
        setSelectedUsers(data)
    }
    const toggleSelectTags = e => {
        const { id} = e.target;
        if (selectedTags.includes(id)) {
            setSelectedTags(selectedTags.filter(item => item !== id));
            return
        }
        setSelectedTags(prev=>[...selectedTags, id]);

    };
    const toggleSelectChannels = e => {
        const { id} = e.target;
        if (selectedChannels.includes(id)) {
            setSelectedChannels(selectedChannels.filter(item => item !== id));
            return
        }
        setSelectedChannels(prev=>[...selectedChannels, id]);
    };
    const toggleSelectAllChannels = e => {
        const { checked ,id} = e.target;

        setSelectedChannels(["all","Whatsapp","WABA","Wechat","Messager"]);
        if (!checked) {
            setSelectedChannels([]);
        }
    };
    const handleConfirm = ()=>{
        const result = filterData()
        updateSelectedUsers([])
        updateSelectedTeams([])
        setSelectedTags([])
        confirm(result);
        onClick();
    }
    const handleClear = ()=>{
        setSelectedUsers([])
        setSelectedChannels([])
        setSelectedTags([])
        clear();
    }
    const handleCancel = ()=>{
        onClick();
    }
    const tagFilter =( chats ,filter ,contacts)=>{

        const gp= contacts.filter(c=>c.tags_id.filter(d=>{return filter.includes(d.toString())}))
        return chats.filter(ch=>{return gp.map(g=>g.customer_id.toString()).includes(ch.customer_id.toString())})

    }

    const filterData =()=>{
        let data = [...chats]

        console.log("selectedUsers" , selectedUsers)
        console.log("selectedTeams " , selectedTeams)
        console.log("selectedTags " , selectedTags)
        console.log("selectedChannels " , selectedChannels)
        if(selectedUsers.length>0){
            data =  data.filter(d=>selectedUsers.includes(d.user_id.toString()))
        }
        if(selectedTeams.length>0)data = data.filter(d=>selectedUsers.includes(d.team_id.toString()))
        if(selectedTags.length>0)data = tagFilter(data , selectedTags ,contacts)
        console.log("filter channel " ,selectedChannels)
        console.log("filter channel data " ,data)
        if(selectedChannels.includes('all')){
            return data
        }
        if(selectedChannels.includes("Whatsapp"))data = whatsappFilter(data);
        if(selectedChannels.includes("WABA"))data=WABAFilter(data);
        if(selectedChannels.includes("Messager"))data=[];
        if(selectedChannels.includes("Wechat"))data=[];

        return data
    }
    const whatsappFilter = (chats)=>{
        return chats.filter(chat=>chat.channel=="Whatsapp")
    }
    const WABAFilter = (chats)=>{
        return chats.filter(chat=>chat.channel=="WABA")
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
        <div className={""} style={{width:"92%",height: "100%",maxHeight: "97vh"}}><div className={"filter_title"} style={{display:"flex",justifyContent:"space-between" }}><div>Filter</div>
            <div style={{padding:"0 0.5rem", cursor:"pointer",width:"50px",backgroundColor:"#DEF0FF",color:"#2198FA",textAlign:"center",borderRadius:"10px" }} onClick={handleClear} >Clear</div></div>
            <div className={"filter_box_status"}  >
                <div className={"status_box"}>
                    <div className="newCheckboxContainer">
                        <label className="newCheckboxLabel"> <input type="checkbox"  name="checkbox" onChange={()=>{}} onClick={props.unread} />
                        </label>
                    </div>
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
                    ChatBot Off
                </div>
            </div>
            <div className={"filter_box_channel"}  >
                <div className={"channelList"}>
                    Channels<br/>
                    <ChannelListItem name={"All Channels"} value={"All"} id={"All"} key={"All"} checked={selectedChannels.includes("all")} onclick={toggleSelectAllChannels } />
                    {channelData.map((e,i)=>{ return <ChannelListItem name={e.name} value={e.value} id={e.value} key={i} checked={selectedChannels.includes(e.value)} onclick={toggleSelectChannels } />})}
                </div>
            </div>
            <div >Agents
                <div style={{backgroundColor:"#F8F9FB"}}>

                    <div style={{padding:'15px 15px 0',font:"16px",display:"flex" ,width:"100%",justifyContent:"space-between"}} onClick={()=>{setAgentBar(!agentBarOpen)}} >
                        <div className={"filter_title"} >Choose Agent</div>
                        <div style={{margin:'0 15px 0 0'}}> { !agentBarOpen? (
                            <svg id="expand_more-24px" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 16.291 16.291"
                                 style={{ transform: "rotate(180deg)" }}>
                                <path id="Path_3108" data-name="Path 3108" d="M16.291,16.291H0V0H16.291Z" fill="none"
                                      opacity="0.87" />
                                <path id="Path_3109" data-name="Path 3109"
                                      d="M12.841,9.2,10.207,11.83,7.573,9.2a.677.677,0,1,0-.957.957l3.116,3.116a.676.676,0,0,0,.957,0L13.8,10.153a.676.676,0,0,0,0-.957A.691.691,0,0,0,12.841,9.2Z"
                                      transform="translate(-2.065 -3.087) rotate" fill="currentColor" />
                            </svg>) : (
                            <svg id="expand_more-24px" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 16.291 16.291">
                                <path id="Path_3108" data-name="Path 3108" d="M16.291,16.291H0V0H16.291Z"
                                      fill="none" opacity="0.87" />
                                <path id="Path_3109" data-name="Path 3109"
                                      d="M12.841,9.2,10.207,11.83,7.573,9.2a.677.677,0,1,0-.957.957l3.116,3.116a.676.676,0,0,0,.957,0L13.8,10.153a.676.676,0,0,0,0-.957A.691.691,0,0,0,12.841,9.2Z"
                                      transform="translate(-2.065 -3.087)" fill="currentColor" />
                            </svg>)}</div>

                    </div>

                    <div className={"agentSearchArea"}  style={agentBarOpen?{display:"block"}:{display:"none"}}>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' ,display:"flex",flexDirection:"column",justifyContent:"flex-start", }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <DropDown
                                teamData={teams}
                                clear={clear}
                                agents={users}
                                selectedUsers={selectedUsers}
                                selectedTeams={selectedTeams}
                                updateSelectedTeams={updateSelectedTeams}
                                updateSelectedUsers={updateSelectedUsers}
                            />

                            <div style={{display:"flex",justifyContent:"flex-end",}}>

                            </div>
                        </List>
                    </div>
                </div>
            </div>

            {/* <div className={"filter_box_agents"}  >Team
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
                                            <label className="newCheckboxLabel"> <input type="checkbox" id={team.org_id} name="checkbox" checked={selectedTeams.includes(team.org_id.toString())} onClick={toggleSelectTeams} onChange={()=>{}}/>
                                            </label>
                                        </div>
                                    </li>) })
                                }
                            </div>
                        </div>
                    </div>

                </div> */}



            <div className={"filter_box_tag"}  >
                <div className={"channelList"}>
                    <div className={"filter_title"}>Tag</div>


                    {filteredTags.map((tag)=>{
                        return(<li className={"channelListitem"}  key={tag.tag_id}><Pill key={tag.tag_id} size="30px" color="vip">{tag.tag_name}</Pill>
                            <div className="newCheckboxContainer">
                                <label className="newCheckboxLabel">
                                    <input
                                        type="checkbox"
                                        id={tag.tag_name}
                                        name="checkbox"
                                        checked={selectedTags.includes(tag.tag_name)}
                                        onClick={toggleSelectTags}
                                        onChange={()=>{}}
                                    />
                                </label>
                            </div>
                        </li>)
                    })}

                </div>
            </div>

            <div className="confirm_btn_set">

                <button className={"confirmButton"}  onClick={handleConfirm}  color="neutral">Confirm</button>
                <button className={"cancelButton"} onClick={handleCancel} >Cancel</button>
            </div>
        </div>
    )
}
