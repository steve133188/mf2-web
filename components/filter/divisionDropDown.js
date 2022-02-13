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


export default function DivisionDropDown (props) {

    const {teams , agents} = props

    const { userInstance ,orgInstance} = useContext(GlobalContext);
    const [open, setOpen] = useState([]);



    const handleClick = async (name,id) => {

        setOpen([...open,name]);

        if(open.includes(name)){setOpen(open.filter(e=>e!==name))}

      };



    return (
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' ,display:"flex",flexDirection:"column",justifyContent:"flex-start", }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
            <DropDown teamData={teams} isclear={props.isclear} clear={props.clear} agents={agents} />

        <div style={{display:"flex",justifyContent:"flex-end",}}>

        </div>
        </List>

      );
    }
