import Head from 'next/head'
import Image from 'next/image'
import { Search3} from "../../components/Input";
import {
    CancelButton,
    SelectButton,
    NormalButton2,
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

export default function Admin() {
    const router = useRouter()
    
    const [isSelectRow, setIsSelectRow] = useState(false);
    const [selectedRow, setSelectedRow] = useState({all: false});
    const [teamName, setTeamName] = useState("");

    const [agents_get, setAgents_get] = useState([
        {
            id: "1",
            name: "Harry Stewart",
            role: "Admin",
            email: "Harry.stewart@gmail.com",
            phone: "+852 9765 0348",
            no_of_leads: 7,
            online_status: "online",
            locked: false
        },
        {
            id: "2",
            name: "Jasmine Miller",
            role: "Agent",
            email: "jasmine.miller@gmail.com",
            phone: "+852 9765 0348",
            no_of_leads: 6,
            online_status: "offline",
            locked: true
        },
    ]);

    const [agents, setAgents] = useState(agents_get);
    
    const agent_name = agents.map((agent) => {
        return agent.name;
    })

    function toggleSelectRow() {
        setIsSelectRow(!isSelectRow);
    }
    const [noOfSelectedRow, setNoOfSelectedRow] = useState(0);

    const [isFillCheckbox, setIsFillCheckbox] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [openAddPopper, setOpenAddPopper] = React.useState(false);
    const [openDeletePopper, setOpenDeletePopper] = React.useState(false);
    const [openFreezePopper, setOpenFreezePopper] = React.useState(false);

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

    const handleSearch = (search) => {
        if(search.length) {
            var agent_name_filtered = agent_name.filter((str)=>{
                return str.toLowerCase().indexOf(search.toLowerCase()) >= 0; 
            });
            var filtered_agents = agents_get.filter(agent=> agent_name_filtered.includes(agent.name));
            console.log(filtered_agents);
            setAgents(filtered_agents);
            agents_get.map((agent)=> {
                if(!agent_name_filtered.includes(agent.name)){
                    if(selectedRow[agent.id]){
                        selectedRow[agent.id] = false;
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
        let id = event.target.id;
        if (id != "all"){
            setSelectedRow({...selectedRow, [id]: event.target.checked})
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
                    selectedRow[agent.id] = true;
                    selected++;
                })
            } else {
                agents.map((agent) => {
                    selectedRow[agent.id] = false;  
                })
                selected = 0;
            }
            setSelectedRow({...selectedRow})
            setNoOfSelectedRow(selected);
        }
    };

    function toggleFill() {
        setIsFillCheckbox(!isFillCheckbox);
    }

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
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
        let agent_id = keys.find((key)=> {
            return key !="all" && selectedRow[key]
        })
        router.push("/admin/editAgent/"+agent_id)
    }
    const addStyles = {
        position: 'absolute',
        top: 50,
        right: -30,
        borderRadius: 2,
        zIndex: 1,
        boxShadow: 3,
        p: 1,
        bgcolor: 'background.paper',
        textAlign: "center",
        padding: "41px 32px 28px 32px",
        width: 457,
        lineHeight: 2
    };

    const editColumnStyles = {
        position: 'absolute',
        top: 55,
        right: -10,
        borderRadius: 2,
        zIndex: 2,
        boxShadow: 3,
        p: 1,
        bgcolor: 'background.paper',
        textAlign: "center",
        padding: "32px 29px 48px 29px",
        width: 376,
        lineHeight: 2
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
                        return agent.id === key;
                    })
                    var index = agents.findIndex(agent => {
                        return agent.id === key;
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

    const names = [
        'Team A',
        'Team B',
        'Team C',
        'Team D',
        'Team E',
    ];
    if(teamName == "") {
        setTeamName(names[0]);
    }
    
    const selects = [
        {
            selectTitle: teamName
        }
    ];

    function getStyles(name, teamName, theme) {
        return {
            fontWeight:
                teamName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setTeamName(value);
    };

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(columns);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateColumns(items);
    }

    

    return (
        <div className="admin-layout">
            {/*<Dropzone/>*/}
            <BlueMenu2 />
            <div className="rightContent">
                <div className="contactsContainer">
                    <div className="topBar">
                        <div className="searchBar">
                            <Search3 type="search" onChange={(e)=>handleSearch(e.target.value)} >Search</Search3>
                        </div>
                        <div className="buttonGrp">
                            {!isSelectRow ? (
                                <span onClick={toggleSelectRow}><SelectButton/></span>
                            ) : (
                                <span onClick={toggleSelectRow}><CancelButton/></span>
                            )}
                            <NormalButton2>+ New Agent</NormalButton2>
                        </div>
                    </div>
                    <div className="navbarPurple">
                        <div className="selectButtonGroup">
                            {selects.map(({selectTitle}) => {
                                return (
                                    <div className="multipleSelectPlaceholder" key={selectTitle}>
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
                                                    onChange={handleChange}
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
                                                {names.map((name) => (
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
                            <div className="freezePopperContainer">
                                <ClickAwayListener onClickAway={handleClickAwayFreezePopper}>
                                    <Box sx={{position: 'relative'}}>

                                    {/*    build error Error: Unknown property 'clip-path' found, use 'clipPath' instead react/no-unknown-property*/}
                                    {/*<svg id="trash-alt" width="25" height="25" viewBox="0 0 18 18" onClick={() => handleClickFreezePopper(false)}>*/}
                                    {/*    <defs>*/}
                                    {/*        <clipPath id="clip-path">*/}
                                    {/*        <rect id="Background" width="25" height="25" fill="none"/>*/}
                                    {/*        </clipPath>*/}
                                    {/*    </defs>*/}
                                    {/*    <rect id="Background-2" data-name="Background" width="25" height="25" fill="none"/>*/}
                                    {/*    <g id="trash-alt-2" data-name="trash-alt" clip-path="url(#clip-path)">*/}
                                    {/*        <g id="noun_locked_lock_1010538" data-name="noun_locked lock_1010538" transform="translate(-19.672 -15.931)">*/}
                                    {/*        <path id="Path_34516" data-name="Path 34516" d="M33.569,32.261H23.777A1.359,1.359,0,0,1,22.416,30.9V23.846a1.359,1.359,0,0,1,1.361-1.358h.262v-.266h.009a4.624,4.624,0,0,1,9.249,0c0,.093,0,.18,0,.265h.269a1.359,1.359,0,0,1,1.361,1.358V30.9A1.359,1.359,0,0,1,33.569,32.261ZM28.692,19.23a2.991,2.991,0,0,0-3,2.986h-.006v.272h5.983v-.021c.008-.079.014-.16.014-.25A2.992,2.992,0,0,0,28.692,19.23ZM33.3,24.667a.544.544,0,0,0-.544-.543H24.587a.544.544,0,0,0-.544.543v5.425a.544.544,0,0,0,.544.543H32.76a.544.544,0,0,0,.544-.543ZM28.806,29h-.272a.677.677,0,0,1-.678-.676V26.446a.677.677,0,0,1,.678-.676h.272a.677.677,0,0,1,.678.676v1.876A.677.677,0,0,1,28.806,29Z" fill="#5b73e8"/>*/}
                                    {/*        </g>*/}
                                    {/*    </g>*/}
                                    {/*</svg>*/}
                                        {openFreezePopper && noOfSelectedRow>0 ? (
                                            <Box sx={deleteStyles}>
                                                Freeze {noOfSelectedRow} agents? <br/>
                                                All conversation will also be freezed.
                                                <div className="controlButtonGroup">
                                                    <NormalButton2 onClick={() => handleClickFreezePopper(true)}>Freeze</NormalButton2>
                                                    <span
                                                        onClick={() => handleClickFreezePopper(false)}><CancelButton></CancelButton></span>
                                                </div>
                                            </Box>
                                        ) : null}
                                    </Box>
                                </ClickAwayListener>
                            </div> ) : "" }

                            

                            <div className="deletePopperContainer">
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
                                                <div className="controlButtonGroup">
                                                    <NormalButton2>Delete</NormalButton2>
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
                                    <th>x</th>
                                ) : "" }
                                {tableColumns.map((column , index) => {
                                    return (
                                        <th key={index} className= {column.columnName === "Name" ? "trID" : ""}>{column.columnName}</th>
                                    );
                                })}
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {/*add index to key prop*/}
                                {agents.map((agent,index) => {
                                    let online_class = (agent.online_status == "online" ? "selectStatusOnline" : "selectStatusOffline")
                                    return (
                                        <tr key={index} className="bodyTr">
                                            {isSelectRow ? (
                                                <td>agent.id</td>
                                            ) : ""}
                                            <td style={{display: "flex"}}>
                                                <div className={online_class}></div>{agent.name}
                                            </td>
                                            <td>{agent.role}</td>
                                            <td>{agent.email}</td>
                                            <td>{agent.phone}</td>
                                            <td>{agent.no_of_leads}</td>
                                            <td>
                                                {/*build fail Error: Unknown property 'clip-path' found, use 'clipPath' instead react/no-unknown-property*/}
                                                {/*{agent.locked ? */}
                                                {/*    <svg id="trash-alt" width="25" height="25" viewBox="0 0 18 18">*/}
                                                {/*        <defs>*/}
                                                {/*            <clipPath id="clip-path">*/}
                                                {/*            <rect id="Background" width="25" height="25" fill="none"/>*/}
                                                {/*            </clipPath>*/}
                                                {/*        </defs>*/}
                                                {/*        <rect id="Background-2" data-name="Background" width="25" height="25" fill="none"/>*/}
                                                {/*        <g id="trash-alt-2" data-name="trash-alt" clip-path="url(#clip-path)">*/}
                                                {/*            <g id="noun_locked_lock_1010538" data-name="noun_locked lock_1010538" transform="translate(-19.672 -15.931)">*/}
                                                {/*            <path id="Path_34516" data-name="Path 34516" d="M33.569,32.261H23.777A1.359,1.359,0,0,1,22.416,30.9V23.846a1.359,1.359,0,0,1,1.361-1.358h.262v-.266h.009a4.624,4.624,0,0,1,9.249,0c0,.093,0,.18,0,.265h.269a1.359,1.359,0,0,1,1.361,1.358V30.9A1.359,1.359,0,0,1,33.569,32.261ZM28.692,19.23a2.991,2.991,0,0,0-3,2.986h-.006v.272h5.983v-.021c.008-.079.014-.16.014-.25A2.992,2.992,0,0,0,28.692,19.23ZM33.3,24.667a.544.544,0,0,0-.544-.543H24.587a.544.544,0,0,0-.544.543v5.425a.544.544,0,0,0,.544.543H32.76a.544.544,0,0,0,.544-.543ZM28.806,29h-.272a.677.677,0,0,1-.678-.676V26.446a.677.677,0,0,1,.678-.676h.272a.677.677,0,0,1,.678.676v1.876A.677.677,0,0,1,28.806,29Z" fill="#5b73e8"/>*/}
                                                {/*            </g>*/}
                                                {/*        </g>*/}
                                                {/*    </svg> : */}
                                                {/*"" }*/}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <PaginationControlled/>
                </div>
            </div>

        </div>
    )
}