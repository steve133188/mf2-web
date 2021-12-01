import Head from 'next/head'
import Image from 'next/image'
import { SearcBox} from "../../components/Input";
import {
    CancelButton,
    SelectButton,
    AddButton,
    ConfirmButton
} from "../../components/Button";
import {useRouter} from "next/router";
import {PaginationControlled} from "../../components/Pagination";
import {useState, useEffect} from "react";

import {useTheme} from "@mui/material/styles";
import {InnerSidebar} from "../../components/InnerSidebar";
import { Checkbox } from '../../components/Checkbox';

import * as userApi from "../../api/UserAPI";


export default function Admin() {
    const router = useRouter()
    router.push("/admin/Role")
    const [isSelectRow, setIsSelectRow] = useState(false);
    const [selectedRow, setSelectedRow] = useState({all: false});

    const [noOfSelectedRow, setNoOfSelectedRow] = useState(0);

    const [openAddPopper, setOpenAddPopper] = useState(false);
    const [openDeletePopper, setOpenDeletePopper] = useState(false);
    const [openFreezePopper, setOpenFreezePopper] = useState(false);

    const [selection ,setSelection] = useState("Role")
    const teamNames = [
        'team1',
        'team2',
        'team3',
        'team4',
        'team5',
    ];
    const [teamName, setTeamName] = useState(teamNames[1]);
    const [division, setDivision] = useState();

    const tableColumns = [
        {
            columnName: 'Name'
        },
        {
            columnName: 'Role'
        },
        {
            columnName: 'Email'
        },
        {
            columnName: 'Phone'
        },
        {
            columnName: 'No. Of Leads'
        }
    ];
    const [columns, updateColumns] = useState(tableColumns);

    const [agents_get, setAgents_get] = useState([
        {
            id: "1",
            name: "Harry Stewart",
            role: "Admin",
            email: "Harry.stewart@gmail.com",
            phone: "+852 9765 0348",
            no_of_leads: 7,
            status: "online",
            locked: false
        },
        {
            id: "2",
            name: "Jasmine Miller",
            role: "Agent",
            email: "jasmine.miller@gmail.com",
            phone: "+852 9765 0348",
            no_of_leads: 6,
            status: "offline",
            locked: true
        },
    ]);

    useEffect (() => {
        userApi.GetUsersByTeam(teamName, division).then(response => {
            if(Array.isArray(response)){
                setAgents_get(response);
                setAgents(response);
            } 
        });        
    },[teamName]);

    const [agents, setAgents] = useState(agents_get);
    
    let agent_name = Array.isArray(agents) ? agents.map((agent) => {
        return agent.name;
    }) : [];
    const handleSearch = (search) => {
        if(search.length && agents_get.length > 0) {
            var agent_name_filtered = agent_name.filter((str)=>{
                return str.toLowerCase().indexOf(search.toLowerCase()) >= 0; 
            });
            var filtered_agents = agents_get.filter(agent=> agent_name_filtered.includes(agent.name));
            console.log(filtered_agents);
            setAgents(filtered_agents);
            agents_get.map((agent)=> {
                if(!agent_name_filtered.includes(agent.name)){
                    if(selectedRow[agent.email]){
                        selectedRow[agent.email] = false;
                        setNoOfSelectedRow(noOfSelectedRow-1);
                    }
                }
            })
            setSelectedRow({...selectedRow})        
        } else {
            setAgents(agents_get);
        }
    }

    const handleSelect = (event) => {
        let email = event.target.id;
        if (email != "all"){
            setSelectedRow({...selectedRow, [email]: event.target.checked})
            if(event.target.checked){
                setNoOfSelectedRow(noOfSelectedRow+1);
            } else {
                setNoOfSelectedRow(noOfSelectedRow-1);
            }
        } else {
            selectedRow.all = event.target.checked;
            let selected = 0;
            if(selectedRow.all){
                agents.map((agent) => {
                    selectedRow[agent.email] = true;
                    selected++;
                })
            } else {
                agents.map((agent) => {
                    selectedRow[agent.email] = false;  
                })
                selected = 0;
            }
            setSelectedRow({...selectedRow})
            setNoOfSelectedRow(selected);
        }
    };


    const handleClickAddPopper = () => {
        setOpenAddPopper((prev) => !prev);
    };

    const handleClickAwayAddPopper = () => {
        setOpenAddPopper(false);
    };

    const editTeam = async () =>{
        const {value : team_name } = await Swal.fire({
            title: "Edit Team",
            inputLabel: 'Team Name',
            input: "text",
            inputValue: teamName,
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
        })
        if(team_name) {
            setTeamName(team_name);
        }
    }

    const editAgent = () =>{
        let keys = Object.keys(selectedRow);
        let agent_email = keys.find((key)=> {
            return key !="all" && selectedRow[key]
        })
        router.push("/admin/editAgent/"+agent_email)
    }

    const handleClickDeletePopper = () => {
        setOpenDeletePopper((prev) => !prev);
    };

    const handleClickAwayDeletePopper = () => {
        setOpenDeletePopper(false);
    };

    const handleClickFreezePopper = (isConfirm) =>  {
        if(isConfirm && Object.keys(selectedRow).length > 0){
            for(var key in selectedRow){
                if(key !== "all" && selectedRow[key]){
                    let lock_agent = agents.find(agent => {
                        return agent.email === key;
                    })
                    var index = agents.findIndex(agent => {
                        return agent.email === key;
                    })
                    if(index >=0){
                        lock_agent.locked = !lock_agent.locked;
                        agents[index] = lock_agent;
                    }
                }
            }
            console.log(agents);
            setAgents_get(agents);
            setAgents(agents);
        }
        setOpenFreezePopper((prev) => !prev);
    };

    const handleClickAwayFreezePopper = () => {
        setOpenFreezePopper(false);
    };
  
    const selects = [
        {
            selectTitle: teamName
        }
    ];

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const deleteStyles = {
        position: 'absolute',
        top: 55,
        right: -10,
        borderRadius: 2,
        zIndex: 1,
        boxShadow: 3,
        p: 1,
        bgcolor: 'background.paper',
        textAlign: "center",
        padding: "41px 32px 28px 32px",
        width: 376,
        lineHeight: 2
    };

    function getStyles(name, teamName, theme) {
        return {
            fontWeight:
                teamName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();

    
    const handleTeamNameChange = (event) => {
        setTeamName(event.target.value);
    };

    function toggleSelectRow() {
        setIsSelectRow(!isSelectRow);
    }

    return (
        <div>
            <div className="admin_layout">
              </div>
        </div>
    )
}