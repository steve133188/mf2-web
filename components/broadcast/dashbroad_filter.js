import { Checkbox } from "@mui/material";
import { CheckBoxM,Whatsapp,WhatsappB,Messager,Wechat } from "../../public/livechat/MF_LiveChat_Landing/Search_Bar/filter-icon";
import MF_Select from "../MF_Select";
import ChannelListItem from "../livechat/serach_filter/filter.js/channelListItem";
import { useContext, useEffect,useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Pill } from "../Pill";
import { AvatarGroup } from "@mui/material";
import { getThemeProps } from "@mui/system";
import FilterDropDown from "./filterDropDown";


export default function DashBroadFilter(props){
    
    const { userInstance ,adminInstance ,orgInstance, user,contactInstance} = useContext(GlobalContext);
    // const [users ,setUsers] =useState([]);
    // const [selectedUsers ,setSelectedUsers] =useState([]);
    const channelData = [
        // name:"WhastApp",value:"All",channelID:"All",id:0},
                {name:"WhastApp",value:"Whatsapp",channelID:"Whatsapp",id:1},
                {name:"WhatsApp Business",value:"WhatsappB",channelID:"WhatsappB",id:2},
                {name:"Messager",value:"Messager",channelID:"Messager",id:3},
                {name:"WeChat",value:"Wechat",channelID:"Wechat",id:4},];
    const [tags ,setTags] =useState([]);
    const [teams ,setTeams] =useState([]);
    const [agents ,setAgents] =useState([]);
    const [division ,setDivision] =useState([]);
    const [channels ,setChannels] =useState([]);
    const [selectedTags ,setSelectedTags] =useState([])
    const [selectedTeams ,setSelectedTeams] =useState([]);
    const [selectedAgents ,setSelectedAgents] =useState([]);
    const [selectedDivision ,setSelectedDivision] =useState([]);
    const [selectedChannels ,setSelectedChannels] =useState([]);
    const [filteredTags ,setFilteredTags] =useState([]);
    const [filteredTeams ,setFilteredTeams] =useState([]);
    const [filteredAgents ,setFilteredAgents] =useState([]);
    const [filteredDivision ,setFilteredDivision] =useState([]);
    const [filteredChannels ,setFilteredChannels] =useState([]);
    // const [filteredUsers ,setFilteredUsers] =useState([]); 
    const [filteredData , setFilteredData] = useState([])
    const [filter , setFilter] = useState({agent:[] , team:[] , channel:[] , tag:[], division:[], })

    const [agentBarOpen,setAgentBar] = useState(false)
    const [dBarOpen,setDBar] = useState(false)
    const [teamBarOpen,setTeamBar] = useState(false)
    const [agentSearchValue, setAgentValue]= useState("")
   

    useEffect(()=>{() =>{

        props.change(selectedAgents)
    }
        },[selectedAgents])

        const advanceFilter =()=>{
                    setFilter({division:[...selectedDivision],team:[...selectedTeams], agent:[...selectedAgents] ,channels: [...selectedChannels] , tag:[...selectedTags]})
                    console.log("filter",filter)
                    const agentFiltered = channels.filter(data=>{
                        if(selectedAgents.length==0){
                            return data
                        }
                        return data.agents.some(el=>selectedAgents.includes(el))
                    })
                    console.log("agent:",agentFiltered)
                    const tagFiltered = agentFiltered.filter(data=>{
                        if(selectedTags.length ==0){
                            return data
                        }
                           return data.tags.some(el=>selectedTags.includes(el))
                    })
                    console.log("tagFiltered:",tagFiltered)

                    setFilteredData([...tagFiltered])
                }


                const getTags = async ()=>{
                    const data = await adminInstance.getAllTags()
                    console.log("tag")
                    console.log(data)
                    setTags(data,"dashboard filter tags")
                    setFilteredTags(data)
                    
                }
                const getAgents = async ()=>{
                    const data = await userInstance.getAllUser()
                    console.log("AAAA")
                    console.log(data)
                    setAgents(data)
                    setFilteredAgents(data)
                }
                const getDivision = async ()=>{
                    const data = await orgInstance.getOrgTeams()
                    console.log("DDDDD")
                    console.log(data)
                    setDivision(data)
                    setFilteredDivision(data)
                }
                const getTeams = async ()=>{
                    console.log("TTTTT")
                    const data = await orgInstance.getOrgTeams()
                    console.log(data)
                    setTeams(data)
                    setFilteredTeams(data)
                }
       
            
                // const getChannels = async ()=>{
                //     const data = await contactInstance.getContactsByChannels()
                //     console.log(data)
                //     console.log("CCCCC")
                //     setChannels(data)
                // }

    const toggleSelectTags = e => {
        const { checked ,id} = e.target;
        setSelectedTags([...selectedTags, id]);
        if (!checked) {
            setSelectedTags(selectedTags.filter(item => item !== id));
        }
        console.log(selectedTags)
    };
    const toggleSelectAgents = e => {
        const { checked ,id} = e.target;
        setSelectedAgents([...selectedAgents, id]);
        if (!checked) {
            setSelectedAgents(selectedAgents.filter(item => item !== id));
        }
        props.agents(e)
        console.log(selectedAgents)
    };
    const toggleSelectDivision = e => {
        const { checked ,id} = e.target;
        setSelectedDivision([...selectedDivision, id]);
        if (!checked) {
            setSelectedDivision(selectedDivision.filter(item => item !== id));
        }
        console.log(selectedDivision)
    };
    const toggleSelectTeams = e => {
        const { checked ,id} = e.target;
        setSelectedTeams([...selectedTeams, id]);
        if (!checked) {
            setSelectedTeams(selectedTeams.filter(item => item !== id));
        }
        console.log(selectedTeams)
    };
    const toggleSelectChannels = e => {
        const { checked ,id} = e.target;

        setSelectedChannels([...selectedChannels, id]);
        if (!checked) {
            setSelectedChannels(selectedChannels.filter(item => item !== id));
        }
        // console.log(selectedChannels)
    };

    useEffect(   async()=>{ 

        // let abortController = new AbortController();
        // async () => {
        if(user.token!=null) {

            // await getUsers()
            await getTags()
            await getTeams()
            await getAgents()
            await getDivision()
            // await getChannels()
            // await fetchContacts()

        }
    
    channelOri()
        // setSelectedUsers([])
        // return () => {
        //     abortController.abort();
        //   }
    },[]);

    const channelOri =()=>{
    setChannels(channelData)
    setFilteredChannels(channelData)

    }

    useEffect(()=>{
        advanceFilter()
    },[tags,channels])
    
    
    const renderUsers = ()=>{
        return<AvatarGroup className={"AvatarGroup"} xs={{flexFlow:"row",justifyContent:"flex-start"}} max={5} spacing={"1"} >
            {selectedAgents.map((agent, index) => {
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

                <div className={"filter_box_channel"}  >
                    <div className={"channelList"}>
                        Channel<br/>
                        {channels.map((e,i)=>{ return <ChannelListItem name={e.name} value={e.value} key={e.id} checked={selectedChannels.includes(e.value)} onclick={toggleSelectChannels } agentSearchValue={agentSearchValue} />})}
                    </div>
                </div>
                <FilterDropDown title={"Teams"} filterdata={filteredTeams} selecteddata={selectedTeams} expand={teamBarOpen} expandClick={()=>setTeamBar(!teamBarOpen)} onchange={(e)=>setAgentValue(e.target.value)} toggle={toggleSelectTeams} agentSearchValue={agentSearchValue} iname={"name"}/>
                <FilterDropDown title={"Division"} filterdata={filteredDivision} selecteddata={selectedDivision} expand={dBarOpen} expandClick={()=>setDBar(!dBarOpen)} onchange={(e)=>setAgentValue(e.target.value)} toggle={toggleSelectDivision} agentSearchValue={agentSearchValue} iname={"username"} />
                <div className={"filter_box_agents"}  >Agent
                    <div className={"agentBroad"} >

                    <div className={"filter_title"} onClick={()=>{setAgentBar(!agentBarOpen)}}>Choose Agent</div>
                    <div className={"agentSearchArea"}  style={agentBarOpen?{display:"block"}:{display:"none"}}>
                         <div className={"search_bar"}>    
                            <input type="text" className={"search_area"} onChange={(e)=>setAgentValue(e.target.value)} placeholder={"Search"}></input>
                        </div>
                    

                        <div className={"channelList"} >
                            {filteredAgents.filter(users=>users.username.includes(agentSearchValue)).map((user)=>{
                                return(<li className={"channelListitem"} key={user.username} style={{width:"100%"}}>
                                    <div className={"left"} style={{display:"flex" ,gap:10}}>
                                        <Tooltip key={user.username} className={""} title={user.username} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{user.username.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                        <div className={"name"}>{user.username}</div>
                                    </div>
                                    <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel"> <input type="checkbox" id={user.username} name="checkbox" checked={selectedAgents.includes(user.username)} onClick={toggleSelectAgents} onChange={()=>{}} />
                                        </label>
                                    </div>
                                </li>) })
                            }
                        </div>
                    </div>
                    </div>
                    <div className={"taglList"}>
                        {selectedAgents.map((user,i)=>{
                                return(
                                    <div key={i} className={"tag"} style={{display:"flex" ,gap:10}}>
                                        <Tooltip key={user} className={""} title={user} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14}} >{user.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                {/* <div className={"filter_box_tag"}  >
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
                </div> */}

                <div className="confirm_btn_set">

                    <button className={"confirmButton"}  onClick={props.click}  color="neutral">Confirm</button>
                    <button className={"cancelButton"} onClick={props.click} >Cancel</button>
                </div>
         </div>
    )
}