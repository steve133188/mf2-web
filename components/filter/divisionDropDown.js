import { useContext, useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DropDown from './teamDropDown';
import { GlobalContext } from '../../context/GlobalContext';


export default function DivisionDropDown ({data,setSelection}) {



    const { userInstance ,orgInstance} = useContext(GlobalContext);
    const [open, setOpen] = useState([]);
    const [levelOneData, setLevelOneData] = useState([]);
    const [levelTwoData, setLevelTwoData] = useState([]);


    const getTeam = async () =>{
        const data = await orgInstance.getOrgTeams ()
        console.log(data,"team")
        setLevelTwoData(data)
    }

    useEffect(async()=>{
        
        setLevelOneData(data.filter(data=>{return data.type=="division"}))
        setLevelTwoData(data.filter(data=>{return data.type=="team"}))
        await getTeam();

        // setLevelTwoData(props.data.teams)
    },[data])

    const handleClick = async (name,id) => {
        console.log(name,id)
        // await fetchTeamAgents(id)
        setOpen([...open,name]);
        if(open.includes(name)){setOpen(open.filter(e=>e!==name))}
        console.log(open)
  
      };
    useEffect(()=>{

        console.log(levelOneData)
        console.log(levelTwoData)
    },[levelOneData])

    return (
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
        {levelOneData.map((division,index)=>{ return <div key={index}>
            <ListItemButton onClick={()=>handleClick(division.name,division.org_id)} id={division.id} >
                 <ListItemText primary={division.name} />
                      {open.includes(division.name) ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.includes(division.name)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{display:"flex",justifyContent:"flex-end"}}>
                    {/* loop */}
                    <DropDown teamData={levelTwoData.filter(t=>t.parent_id==division.org_id)} setSelection={setSelection} />
                 </List>
            </Collapse>

                 </div>
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
    