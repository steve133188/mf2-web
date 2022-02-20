import { Checkbox } from "@mui/material";
import { CheckBoxM,Whatsapp,WhatsappB,Messager,Wechat } from "../../public/livechat/MF_LiveChat_Landing/Search_Bar/filter-icon";
import MF_Select from "../MF_Select";
import ChannelListItem from "../livechat/serach_filter/filter.js/channelListItem";
import {useContext, useEffect, useRef, useState} from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Pill } from "../Pill";
import { AvatarGroup } from "@mui/material";
import { getThemeProps } from "@mui/system";
import FilterDropDown from "./filterDropDown";
import DivisionDropDown from "../filter/divisionDropDown";
import {useRootStore} from "../../utils/provider/RootStoreProvider";


export default function DashBroadFilter(props){
    const {users ,
        teams ,
        auth ,
        cancelClick ,
        submit ,
        toggleSelectedTeams ,
        toggleSelectedUsers,
        selectedUsers,
        selectedTeams
    } = props
    const { orgInstance, user} = useContext(GlobalContext);
    const {orgActionsStore,authStore:{isAuth}} = useRootStore()

    const [division ,setDivision] =useState([]);
    const [root_org, set_root_org] = useState([]);
    const [selectedAgents ,setSelectedAgents] =useState([]);
    const [filteredDivision ,setFilteredDivision] =useState([]);
    const [agentSearch , setAgentSearch] = useState("")
    const [agentBarOpen,setAgentBar] = useState(false)
    const [teamBarOpen,setTeamBar] = useState(false)


    // Fetch data  ##########################################################

    const fetchRootORG = async () =>{

        await orgActionsStore.getAllRootORG()

        set_root_org(orgActionsStore.root_orgs)

    }


    const getDivision = async ()=>{

        await orgActionsStore.getAllORG ()

        setDivision(orgActionsStore.orgs)

        setFilteredDivision(orgActionsStore.orgs)

    }


    // Fetch data  ##########################################################



    const clearFilter=()=>{
        cancelClick()
    }

    useEffect(   async()=>{

        if(isAuth) {

            await getDivision()
            await fetchRootORG()

        }

    },[]);

    const renderUserList = (val)=>{

        let filter = users.filter(user=>user.username.toLowerCase().includes(val.toLowerCase()))

        if(val.trim()=="") filter=users

        return(
            filter&&filter.map((user , i)=>{
              return<li className={"channelListitem"} key={i} style={{width:"100%"}}>
                  <div className={"left"} style={{display:"flex" ,gap:10}}>
                      <Tooltip key={user.username} className={""} title={user.username} placement="top-start">
                          <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{user.username.substring(0,2).toUpperCase()}</Avatar>
                      </Tooltip>
                      <div className={"name"}>{user.username}</div>
                  </div>
                  <div className="newCheckboxContainer right">
                      <label className="newCheckboxLabel"> <input type="checkbox" id={user.user_id} name="checkbox" checked={selectedUsers.includes(user.user_id.toString())} onClick={toggleSelectedUsers} onChange={()=>{}}/>
                      </label>
                  </div>
              </li>
            })
        )


    }

    const renderTeamList = ()=>{

        let filter = teams

        let check = (name)=>{
           return  selectedTeams.includes(name)
        }


        return(
            filter&&filter.map((team , i)=>{
                return<li className={"channelListitem"} key={i} style={{width:"100%"}}>
                    <div className={"left"} style={{display:"flex" ,gap:10}}>
                        <div className={"name"}>{team.name}</div>
                    </div>
                    <div className="newCheckboxContainer right">
                        <label className="newCheckboxLabel"> <input type="checkbox" id={team.name} name="checkbox" checked={check(team.name)} onClick={toggleSelectedTeams} onChange={()=>{}} />
                        </label>
                    </div>
                </li>
            })
        )


    }

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
         <div>
             <div className={"filter_title"}><h5> Filter  </h5> </div>

                {/*{auth==1?<div className={"filter_box_channel"}  >*/}
                {/*    <div className={"channelList"}>*/}
                {/*        Channel<br/>*/}
                {/*        <ChannelListItem name={"All Channels"} value={"All"} id={"All"} key={"All"} checked={selectedChannels.includes("All")} onclick={toggleSelectAllChannels } />*/}
                {/*        {channels.map((e,i)=>{ return <ChannelListItem name={e.name} value={e.value} key={e.id} checked={selectedChannels.includes(e.value)} onclick={toggleSelectChannels } agentSearchValue={agentSearchValue} />})}*/}
                {/*    </div>*/}
                {/*</div>:""}*/}
                {/* {auth==2?<FilterDropDown title={"Teams & Division"} orgData={root_org} filterdata={filteredTeams} selecteddata={selectedTeams} expand={teamBarOpen} expandClick={()=>setTeamBar(!teamBarOpen)} onchange={(e)=>setAgentValue(e.target.value)} toggle={toggleSelectTeams} agentSearchValue={agentSearchValue} iname={"name"}/>:""} */}
                {/*{auth==2?<DivisionDropDown data={division} division={"divisionSelect"} team={toggleSelectTeams} agents={toggleSelectAgents} clear={ ()=>{}} isclear={clearFilter} />:"" }*/}
             {auth==3?<div className={"filter_box_agents"}  >
                 <h6>Agents</h6>
                 <div className={"agentBroad"} >

                     <div className={"filter_title"} onClick={()=>{setAgentBar(!agentBarOpen)}}>Choose Agent(s)</div>
                     <div className={"agentSearchArea"}  style={agentBarOpen?{display:"block"}:{display:"none"}}>
                         <div className={"search_bar"}>
                             <input type="text" className={"search_area"} placeholder={"Search"}  onChange={e=>{setAgentSearch(prev=>e.target.value)}} defaultValue="" />
                         </div>


                         <div className={"channelList"} >

                             {users && renderUserList(agentSearch)}
                             {/*{users.filter(users=>users.username.toLowerCase().includes(agentSearchRef.current.value.toLowerCase())).map((user , i)=>{*/}
                             {/*    return(<li className={"channelListitem"} key={i} style={{width:"100%"}}>*/}
                             {/*        <div className={"left"} style={{display:"flex" ,gap:10}}>*/}
                             {/*            <Tooltip key={user.username} className={""} title={user.username} placement="top-start">*/}
                             {/*                <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{user.username.substring(0,2).toUpperCase()}</Avatar>*/}
                             {/*            </Tooltip>*/}
                             {/*            <div className={"name"}>{user.username}</div>*/}
                             {/*        </div>*/}
                             {/*        <div className="newCheckboxContainer right">*/}
                             {/*            <label className="newCheckboxLabel"> <input type="checkbox" id={user.username} name="checkbox" checked={selectedAgents.includes(user.username)} onClick={toggleSelectedUsers} onChange={()=>{}} />*/}
                             {/*            </label>*/}
                             {/*        </div>*/}
                             {/*    </li>) })*/}
                             {/*}*/}
                         </div>
                     </div>
                 </div>
                 <div className={"taglList"}>
                     {selectedUsers.map((user,i)=>{
                         let usr = users.find(u=>u.user_id== parseInt(user))
                         return(
                             <div key={i} className={"tag"} style={{display:"flex" ,gap:10}}>
                                 <Tooltip key={user} className={""} title={user} placement="top-start">
                                     <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14}} >{usr.username.substring(0,2).toUpperCase()}</Avatar>
                                 </Tooltip>
                             </div>
                         )
                     })}
                 </div>
             </div>:""}

             {auth==3?<div className={"filter_box_agents"}  >
                    <h6>Teams</h6>
                    <div className={"agentBroad"} >

                        <div className={"filter_title"} onClick={()=>{setTeamBar(!teamBarOpen)}}>Choose Team(s)</div>
                        <div className={"agentSearchArea"}  style={teamBarOpen?{display:"block"}:{display:"none"}}>
                                {/* <div className={"search_bar"}>
                                <input type="text" className={"search_area"} onChange={(e)=>setTeamValue(e.target.value)} placeholder={"Search"}></input>
                            </div> */}
                            <div className={"channelList"} >

                                {teams&&renderTeamList()}
                                {/*teams.map((team , i)=>{*/}
                                {/*    return(<li className={"channelListitem"} key={i} style={{width:"100%"}}>*/}
                                {/*        <div className={"left"} style={{display:"flex" ,gap:10}}>*/}
                                {/*            <div className={"name"}>{team.name}</div>*/}
                                {/*        </div>*/}
                                {/*        <div className="newCheckboxContainer right">*/}
                                {/*            <label className="newCheckboxLabel"> <input type="checkbox" id={team.name} name="checkbox" checked={selectedTeams.includes(team.name)} onClick={toggleSelectedTeams} onChange={()=>{}} />*/}
                                {/*            </label>*/}
                                {/*        </div>*/}
                                {/*    </li>) })*/}
                                {/*}*/}
                            </div>
                        </div>
                    </div>
                 <div className={"taglList"}>
                     {selectedTeams.length>0&&selectedTeams.map((team,i)=>{
                         return(
                             <div key={i} className={"tag"} style={{display:"flex" ,gap:10}}>
                                 <Tooltip key={i} className={""} title={user} placement="top-start">
                                     <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14}} >{team.substring(0,2).toUpperCase()}</Avatar>
                                 </Tooltip>
                             </div>
                         )
                     })}
                 </div>
                </div>:""}




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

                    <button className={"confirmButton"} style={{margin:" 0 10px"}} onClick={submit}  color="neutral"> Confirm </button>
                    <button className={"cancelButton"} onClick={clearFilter} > Cancel </button>
                </div>
         </div>
    )
}
