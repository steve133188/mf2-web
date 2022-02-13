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

export default function DropDown ({teamData,setSelection,...props}) {
        const {agents , selectedUsers , selectedTeams , updateSelectedUsers , updateSelectedTeams} = props

        const getUsers = async()=>{
          const res = await userInstance.getAllUser()
         setLevelTwoData(res)
        }
        const fetchTeamAgents = async (id) =>{
          const res = await userInstance.getUsersByTeamId(id)

        }

    const { userInstance } = useContext(GlobalContext);
    const [open, setOpen] = useState([]);
    const [levelOneData, setLevelOneData] = useState([]);
    const [levelTwoData, setLevelTwoData] = useState([]);


    useEffect(async()=>{
      setLevelOneData(teamData)
      await getUsers()

    },[])

    const clear = () =>{
        updateSelectedUsers([])
        updateSelectedTeams([]);
    }


    const handleClick = async (name,id) => {
      setOpen(prev=>[...open,name]);
        if(open.includes(name)){setOpen(open.filter(e=>e!==name))}
    };


    const toggleSelectUsers = e => {
      const {  id} = e.target;
      if (selectedUsers.includes(id)) {
          updateSelectedUsers(selectedUsers.filter(item => item !== id));
          return
      }
        updateSelectedUsers([...selectedUsers, id]);

    };
  const toggleSelectTeams = e => {

      const {  id} = e.target;
      if (selectedTeams.includes(id)) {
          updateSelectedTeams(selectedTeams.filter(item => item !== id));
          updateSelectedUsers(levelTwoData.filter(item => item.team_id==parseInt(id)))
          return
      }
      updateSelectedTeams([...selectedTeams, id]);
      const list = levelTwoData&&levelTwoData.filter(agent=>{return agent.team_id==parseInt(id)})
      updateSelectedUsers(list.map(e=>e.user_id.toString()))
    };
    return (
        <List
          sx={{ width: '95%', maxWidth: 360, bgcolor: 'transparent',paddingTop:"0",paddingBottom:"0"}}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >

          {levelOneData&&levelOneData.map((team,index)=>{return<div key={index}>
            <div style={{display:"flex",padding:"0 16px 0 0 "}}>

          <ListItemButton onClick={()=>{handleClick(team.name,team.org_id);}} id={team.org_id}  sx={{padding:"0 1rem "}} >
            <ListItemText primary={team.name} />
            <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel">
                                        <input type="checkbox" id={team.org_id} name={team.name}
                                         checked={selectedTeams.includes(team.org_id.toString())} onClick={(e)=>{e.stopPropagation();toggleSelectTeams(e)}} onChange={()=>{}}
                                          />
                                        </label>
                                    </div>
            {open.includes(team.name) ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
</div>
            <Collapse in={open.includes(team.name)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {levelTwoData&&levelTwoData.filter(agent=>agent.team_id==team.org_id).map((agent,i)=>{
                       const labelId = `checkbox-list-label-${agent.user_id}`;
                        // console.log("agent"+agent)
                        return ( <ListItemButton key={i} sx={{ pl: 4 }} dense>
                                     <Tooltip key={agent.username} className={""} title={agent.username} placement="top-start">
                                            <Avatar className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14,marginRight:"10px"}} >{agent.username.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                    <ListItemText primary={agent.username} />

                                       <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel">
                                        <input type="checkbox" id={agent.user_id} name={agent.username}
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
