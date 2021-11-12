import Head from 'next/head'
import Image from 'next/image'
import { SearcBox} from "../../components/Input";
import {
    CancelButton,
    SelectButton,
    AddButton,
    ConfirmButton
} from "../../components/Button";
import Swal from 'sweetalert2';
import {useRouter} from "next/router";
import {PaginationControlled} from "../../components/Pagination";
import {useState, useEffect} from "react";
import * as React from "react";
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from "@mui/material/OutlinedInput";
import {useTheme} from "@mui/material/styles";
import {BlueMenu2} from "../../components/BlueMenu";
import { Checkbox } from '../../components/Checkbox';

import * as post_link from "../../api/GetAPILink";
import { PostAPIAction, GetAPIAction } from '../../api/APIAction';

import styles from"../../styles/pages/admin.module.scss";

export default function Admin() {
    const router = useRouter()
    
    const [isSelectRow, setIsSelectRow] = useState(false);
    const [selectedRow, setSelectedRow] = useState({all: false});

    const [noOfSelectedRow, setNoOfSelectedRow] = useState(0);

    const [isFillCheckbox, setIsFillCheckbox] = useState(false);
    const [openAddPopper, setOpenAddPopper] = React.useState(false);
    const [openDeletePopper, setOpenDeletePopper] = React.useState(false);
    const [openFreezePopper, setOpenFreezePopper] = React.useState(false);

    const teamNames = [
        'team1',
        'team2',
        'team3',
        'team4',
        'team5',
    ];
    const [teamName, setTeamName] = useState(teamNames[1]);
    const [division, setDivision] = useState("div2");

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
        GetAPIAction(post_link.GET_USERS_BY_TEAM, "?team=" + teamName + "&division=" + division).then(responseBody => {
            if(responseBody.status ==200) {
                let agents_get_result = responseBody.payload;
                if(Array.isArray(agents_get_result)){
                    setAgents_get(agents_get_result);
                    setAgents(agents_get_result);
                }
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
                {/*<Dropzone/>*/}
                <BlueMenu2 />
                <div className="rightContent">
                    <div className="contactsContainer">
                        <div className={styles.topBar}>
                            <div className={styles.searchBar}>
                                <SearcBox type="search" handleSearch={handleSearch} ></SearcBox>
                            </div>
                            <div className={styles.buttonGrp}>
                                {!isSelectRow ? (
                                    <span onClick={toggleSelectRow}><SelectButton/></span>
                                ) : (
                                    <span onClick={toggleSelectRow}><CancelButton/></span>
                                )}
                                <AddButton>+ New Agent</AddButton>
                            </div>
                        </div>
                        <div className="navbarPurple">
                            <div className="selectButtonGroup">
                                {selects.map(({selectTitle}) => {
                                    return (
                                        <div className={styles.multipleSelectPlaceholder} key={selectTitle}>
                                            <FormControl sx={{m: 0, width: 171, mt: 1}}>
                                                <Select sx={{
                                                    height: 28,
                                                    marginBottom: 0.3,
                                                    marginRight: 3,
                                                    borderRadius: 2,
                                                    background: "white"
                                                }}
                                                        displayEmpty
                                                        value={teamName}
                                                        onChange={handleTeamNameChange}
                                                        input={<OutlinedInput/>}
                                                        renderValue={(selected) => {
                                                            if (selected.length === 0) {
                                                                return <span>{selectTitle}</span>;
                                                            }
                                                            return selected;
                                                        }}
                                                        MenuProps={MenuProps}
                                                        inputProps={{'aria-label': 'Without label'}}
                                                >
                                                    <MenuItem disabled value="">
                                                        <span>{selectTitle}</span>
                                                    </MenuItem>
                                                    {teamNames.map((name) => (
                                                        <MenuItem
                                                            key={name}
                                                            value={name}
                                                            style={getStyles(name, teamName, theme)}
                                                        >
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                            </FormControl>
                                        </div>
                                    );
                                })}
                                {/*    */}
                            </div>
                            
                            <div className="tagsButtonGroup">
                                {!isSelectRow ? (
                                    <div onClick={editTeam}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#2198fa"
                                            className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path
                                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
                                    </div>
                                ) : noOfSelectedRow == 1 ? (
                                    <div onClick={editAgent}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#2198fa"
                                            className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path
                                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                        </svg>
                                    </div>
                                ) : ""
                                }

                                {isSelectRow ? (
                                <div className={styles.freezePopperContainer}>
                                    <ClickAwayListener onClickAway={handleClickAwayFreezePopper}>
                                        <Box sx={{position: 'relative'}}>
                                            <img className={styles.lock_icon} src="icon-lock-topbar.svg" onClick={()=> handleClickFreezePopper(false)}/> 
                                            {openFreezePopper && noOfSelectedRow>0 ? (
                                                <Box sx={deleteStyles}>
                                                    Freeze {noOfSelectedRow} agents? <br/>
                                                    All conversation will also be freezed.
                                                    <div className={styles.controlButtonGroup}>
                                                        <AddButton onClick={() => handleClickFreezePopper(true)}>Freeze</AddButton>
                                                        <span
                                                            onClick={() => handleClickFreezePopper(false)}><CancelButton></CancelButton></span>
                                                    </div>
                                                </Box>
                                            ) : null}
                                        </Box>
                                    </ClickAwayListener>
                                </div> ) : "" }

                                

                                <div className={styles.deletePopperContainer}>
                                    <ClickAwayListener onClickAway={handleClickAwayDeletePopper}>
                                        <Box sx={{position: 'relative'}}>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#f46a6b"
                                                cursor="pointer"
                                                className="bi bi-trash" viewBox="0 0 16 16"
                                                onClick={handleClickDeletePopper}>
                                                <path
                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fillRule="evenodd"
                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                            {openDeletePopper ? (
                                                <Box sx={deleteStyles}>
                                                    Delete {noOfSelectedRow} agents? <br/>
                                                    All conversation history will also be erased.
                                                    <div className={styles.controlButtonGroup}>
                                                        <ConfirmButton>Delete</ConfirmButton>
                                                        <span
                                                            onClick={handleClickDeletePopper}><CancelButton></CancelButton></span>
                                                    </div>
                                                </Box>
                                            ) : null}
                                        </Box>
                                    </ClickAwayListener>
                                </div>
                                
                                {/*    */}
                            </div>
                        </div>
                        <div className="broadcastTable">
                            <table className="table">
                                <thead>
                                <tr className="headTr">
                                    {isSelectRow ? (
                                        <th><Checkbox onChange={handleSelect} id="all"/></th>

                                    ) : "" }
                                    {tableColumns.map((column , index) => {
                                        return (
                                            <th key={index} className={column.columnName === "Name" ? "trID" : ""}>{column.columnName}</th>
                                        );
                                    })}
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {/*add index to key prop*/}
                                    {Array.isArray(agents) ? agents.map((agent,index) => {
                                        let online_class = (agent.status == "online" ? "selectStatusOnline" : "selectStatusOffline")
                                        return (
                                            <tr key={index} className="bodyTr">
                                                {isSelectRow ? (
                                                    <td><Checkbox onChange={handleSelect} id={agent.email} checked={selectedRow[agent.email]} /></td>
                                                ) : ""}
                                                <td style={{display: "flex"}}>
                                                    <div className={online_class}></div>{agent.name}
                                                </td>
                                                <td>{agent.role}</td>
                                                <td>{agent.email}</td>
                                                <td>{agent.phone}</td>
                                                <td>{agent.no_of_leads}</td>
                                                <td>
                                                    {agent.locked ? 
                                                       <img src="icon-lock-topbar.svg" /> : ""
                                                    } 
                                                </td>
                                            </tr>
                                        );
                                    }) : null}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControlled/>
                    </div>
                </div>

            </div>
        </div>
    )
}