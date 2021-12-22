import { useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DropDown from './teamDropDown';


export default function DivisionDropDown (props) {



    const [open, setOpen] = useState(true);
    const [levelOneData, setLevelOneData] = useState([]);
    const [levelTwoData, setLevelTwoData] = useState([]);

    useEffect(()=>{
        setLevelOneData(props.data)

        // console.log("props.data level one")

        // setLevelTwoData(props.data.teams)
    },[])

    const handleClick = (name) => {
        if(name==open){setOpen("")}
        else{
            setOpen(name);
        }
    };


    return (
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
        {levelOneData.map(division=>{ return <>
            <ListItemButton onClick={()=>handleClick(division.name)} id={division.id} >
                 <ListItemText primary={division.name} />
                      {open==division.name ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open==division.name} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{display:"flex",justifyContent:"flex-end"}}>
                    {/* loop */}
                    <DropDown data={division.teams} />
                 </List>
            </Collapse>

                 </>
        })}
        </List>

        // <List
        //   sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        //   component="nav"
        //   aria-labelledby="nested-list-subheader"
        //   subheader={
        //     <ListSubheader component="div" id="nested-list-subheader">
        //       Nested List Items
        //     </ListSubheader>
        //   }
        // >

        //   {levelOneData.map(team=>{return<>
        //   <ListItemButton onClick={()=>handleClick(team.name)} id={team.id} >
        //     <ListItemText primary={"Team "+team.name} />
        //     {open==team.name ? <ExpandLess /> : <ExpandMore />}
        //   </ListItemButton>
        //     <Collapse in={open==team.name} timeout="auto" unmountOnExit>
        //         <List component="div" disablePadding>
        //             {levelTwoData.filter(agent=>agent.team==team.name).map(agent=>{
        //                 console.log("agent"+agent)
        //                 return ( <ListItemButton sx={{ pl: 4 }}>
        //                                 <ListItemText primary={agent.name} />
        //                             </ListItemButton>)} 
        //                 )}
                        
                
        //         </List>
        //     </Collapse>
            
        //   </>

        //      }
        //      )
        //      }
        // </List>
      );
    }
    