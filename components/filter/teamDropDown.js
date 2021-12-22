import { useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import { Tooltip } from '@mui/material';
import Avatar from "@mui/material/Avatar";

export default function DropDown (props) {


    const Division=[
        {id:1,teams:[{id:1,name:"A"},{id:2,name:"B"}]},
        {id:2,teams:[{id:1,name:"A"},{id:2,name:"B"}]},
    ]
    const AgentsList =[
        {id:1,name:"Johr hor",team:"A"},
        {id:2,name:"Daivd drr",team:"A"},
        {id:3,name:"Nest orange",team:"B"},
        {id:4,name:"Flask Bug",team:"C"},
        ]


    const [open, setOpen] = useState(true);
    const [levelOneData, setLevelOneData] = useState([]);
    const [levelTwoData, setLevelTwoData] = useState([]);

    useEffect(()=>{
        // console.log(props.data)
        // console.log("props.data level one")
        // console.log(levelOneData)

        setLevelOneData(props.data)
        setLevelTwoData(AgentsList)
    },[])

    const handleClick = (name) => {
        if(name==open){setOpen("")}
        else{
            setOpen(name);
        }
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

    return (
        <List
          sx={{ width: '90%', maxWidth: 360, bgcolor: 'transparent' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >

          {levelOneData.map(team=>{return<>
          <ListItemButton onClick={()=>handleClick(team.name)} id={team.id} >
            <ListItemText primary={"Team "+team.name} />
            {open==team.name ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
            <Collapse in={open==team.name} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {levelTwoData.filter(agent=>agent.team==team.name).map(agent=>{
                       const labelId = `checkbox-list-label-${agent.id}`;
                        // console.log("agent"+agent)
                        return ( <ListItemButton sx={{ pl: 4 }} onClick={handleToggle(agent.id)} dense>
                                     <Tooltip key={agent.name} className={""} title={agent.name} placement="top-start">
                                            <Avatar className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14,marginRight:"10px"}} >{agent.name.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                    <ListItemText primary={agent.name} />
                                    {/* <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(agent.id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        sx={{color:"#e5e7ec"}}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                      /> */}
                                       <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel"> <input type="checkbox" id={agent.id} name="checkbox" 
                                        checked={checked.indexOf(agent.id) !== -1}
                                        // checked={selectedAgents.includes(agent.id)} onClick={toggleSelectAgents} 
                                        />
                                        </label>
                                    </div>
                                    </ListItemButton>)} 
                        )}
                        
                </List>
            </Collapse>
            
          </>

             }
             )
             }
        </List>
      );
    }
    