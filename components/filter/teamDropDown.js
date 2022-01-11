import { useEffect, useState ,useContext} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Tooltip } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import { GlobalContext } from "../../context/GlobalContext";

export default function DropDown ({teamData,setSelection}) {


        const getUsers = async()=>{
          const res = await userInstance.getAllUser()
         setLevelTwoData(res)
        }
        const fetchTeamAgents = async (id) =>{
          // console.log(id)
          const res = await userInstance.getUsersByTeamId(id)
          console.log(res)

        //  setLevelTwoData(res)
        }

    const { userInstance } = useContext(GlobalContext);
    const [open, setOpen] = useState([]);
    const [levelOneData, setLevelOneData] = useState([]);
    const [levelTwoData, setLevelTwoData] = useState([]);

    const [selectedUsers ,setSelectedUsers] =useState([]);
    const [selectedTeams ,setSelectedTeams] =useState([])

    useEffect(async()=>{
      setLevelOneData(teamData)
      await getUsers()
      // setLevelTwoData(AgentsList)
        // console.log(teamData)
    },[teamData])

    const handleClick = async (name,id) => {
      console.log(name,id)
      // await fetchTeamAgents(id)
      setOpen(prev=>[...open,name]);
        if(open.includes(name)){setOpen(open.filter(e=>e!==name))}

    };
   
    const [checked, setChecked] = useState([0]);
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
    const toggleSelectUsers = e => {
      const { checked ,id} = e.target;
      setSelectedUsers(prev=>[...selectedUsers, id]);
      if (!checked) {
          setSelectedUsers(selectedUsers.filter(item => item !== id));
      }
      // props.agents(e)
      console.log(selectedUsers)
  };
  const toggleSelectTeams = e => {
    // console.log(e,"electaedTeams in filter")
    const { checked ,id} = e.target;
    setSelectedTeams(prev=>[...selectedTeams, id]);
    console.log(levelTwoData.filter(agent=>{return agent.team_id==parseInt(id)}),"dsafdasfadfdasfs")
    const list = levelTwoData.filter(agent=>{return agent.team_id==parseInt(id)})
    setSelectedUsers(list.map(e=>e.user_id.toString()))
    if (!checked) {
        setSelectedTeams(selectedTeams.filter(item => item !== id));
        setSelectedUsers([])
    }
    // props.team(e)
    // console.log(selectedTeams,"electaedTeams in filter")
};
    return (
        <List
          sx={{ width: '90%', maxWidth: 360, bgcolor: 'transparent' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >

          {levelOneData.map((team,index)=>{return<div key={index}>
            <div style={{display:"flex",padding:"0 16px 0 0 "}}>

          <ListItemButton onClick={()=>{handleClick(team.name,team.org_id);}} id={team.org_id}  >
            <ListItemText primary={team.name} />
            {open.includes(team.name) ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
            <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel"> 
                                        <input type="checkbox" id={team.org_id} name="checkbox" 
                                         checked={selectedTeams.includes(team.org_id.toString())} onClick={toggleSelectTeams} onChange={()=>{}}
                                          />
                                        </label>
                                    </div>
</div>
            <Collapse in={open.includes(team.name)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {levelTwoData.filter(agent=>agent.team_id==team.org_id).map((agent,i)=>{
                       const labelId = `checkbox-list-label-${agent.user_id}`;
                        // console.log("agent"+agent)
                        return ( <ListItemButton key={i} sx={{ pl: 4 }} onClick={handleToggle(agent.user_id)} dense>
                                     <Tooltip key={agent.username} className={""} title={agent.username} placement="top-start">
                                            <Avatar className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14,marginRight:"10px"}} >{agent.username.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                    <ListItemText primary={agent.username} />
                        
                                       <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel"> 
                                        <input type="checkbox" id={agent.user_id} name="checkbox" 
                                        // checked={checked.indexOf(agent.user_id) !== -1}
                                        checked={selectedUsers.includes(agent.user_id.toString())} onClick={toggleSelectUsers} onChange={()=>{}}
                                        />
                                        </label>
                                    </div>
                                    </ListItemButton>)} 
                        )}
                        
                </List>
            </Collapse>
            
          </div>

             }
             )
             }
        </List>
      );
    }
    