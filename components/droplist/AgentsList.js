import { Avatar, Tooltip } from "@mui/material"
import { useEffect ,useState } from "react";

export default function AgentsDropList({filterData,selectedData,toggleAgents}){
    const [agentBarOpen,setAgentBar] = useState(true)
    const [agentSearchValue, setAgentValue]= useState("")

    const [filteredUsers ,setFilteredUsers] =useState([]);
    const [selectedUsers ,setSelectedUsers] =useState([]);
    const toggleSelectUsers = e => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, id]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }
        toggleAgents(e)
        console.log(selectedUsers)
    };
    useEffect(()=>{
        setFilteredUsers(filterData);
    })
    return(

        <div className={"filter_box_agents"}  >
            <div style={{display:"flex" ,alignItems:"center"}} > Agent  
            {/* onClick={()=>{setAgentBar(!agentBarOpen)}} */}
            <div className={"taglList"}>
                    {selectedUsers.map((user,index)=>{
                        return(
                            <div key={index} className={"tag"} style={{display:"flex" }}>
                                <Tooltip  className={""} title={user} placement="top-start">
                                    <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14}} >{user.substring(0,2).toUpperCase()}</Avatar>
                                </Tooltip>

                            </div>
                    )})}
            </div> </div>
            <div className={"agentBroad"} style={agentBarOpen?{display:"block"}:{display:"none"}}>
                <div className={"filter_title"} ></div>
                <div className={"agentSearchArea"}  >
                            <div className={"inputField"}>    
                                <input type="text" className={"search_area"} onChange={(e)=>setAgentValue(e.target.value)} placeholder={"Search"}></input>
                            </div>
                    
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
                            </li> 
                            )})}
                    </div>
                </div>
            </div>
            
        </div>
    )
}