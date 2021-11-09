import {Search3} from "../../components/Input";
import {useContext, useEffect, useState} from "react";
import Avatar from "@mui/material/Avatar";
import {Pill} from "../../components/Pill";
import {Checkbox} from "../../components/Checkbox"
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import {GlobalContext} from "../../context/GlobalContext";
import Link from 'next/link';
import {ImportDropzone} from '../../components/ImportContact.js'
import axios from "axios";
import styles from "../../styles/Contacts.module.css";






export default function Contacts() {

    // const [contacts, setContacts] = React.useState([]);
    const { contacts , get_contacts} = useContext(GlobalContext)
    useEffect( async () => {
        //  await get_contacts()
        // console.log("data:",contacts)

    },[]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('role');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const defualt_cols = ['customer_id' , 'name' , 'team' ,  'channels','tags' ,'assignee']
    const data = [
        {
            customer_id:"000001",
            name:"000001",
            team:"000001",
            assignee:["steve","ben","lapson"],
            tags:["VVIP","New Customer","Promotion" ],
            channels:["whatsapp"],
        },
        {
            customer_id:"000002",
            name:"000002",
            team:"000002",
            assignee:["ben","lapson"],
            tags:["VVIP","New Customer","Promotion" ],
            channels:["whatsapp"],
        },
        {
            customer_id:"000003",
            name:"000003",
            team:"000003",
            assignee:["steve","lapson"],
            tags:["VIP","New Customer" ],
            channels:["whatsapp"],
        }
    ]

    const [isSelectRow, setSelectRow] = useState( false);

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const [openAddPopper, setOpenAddPopper] = React.useState(false);

    const handleClickAddPopper = () => {
        setOpenAddPopper((prev) => !prev);
    };

    const handleClickAwayAddPopper = () => {
        setOpenAddPopper(false);
    };
    const [openDeletePopper, setOpenDeletePopper] = React.useState(false);

    const handleClickDeletePopper = () => {
        setOpenDeletePopper((prev) => !prev);
    };

    const handleClickAwayDeletePopper = () => {
        setOpenDeletePopper(false);
    };

    function showDropzone() {
        setIsShowDropzone(true);
    }



    const [isShowDropzone, setIsShowDropzone] = useState(false);

    function toggleDropzone() {
        setIsShowDropzone(!isShowDropzone);
    }


    return (
        <div className={styles.layout}>
            <span style={{display: isShowDropzone ? "block" : "none"}}>
                {/*DND Import Data start */}
                <ImportDropzone onClose={toggleDropzone} accept={"image/*"} isShowDropzone={isShowDropzone} setIsShowDropzone={setIsShowDropzone}/>
                {/*DND Import Data end */}
            </span>
                    <div className={styles.row}>
                        <div className="searchBar">
                            <div >
                                    {/*<input className="searchInput" placeholder="Search"/>*/}
                                <div className="mf_icon_input_block  mf_search_input">
                                    <div className={"mf_inside_icon mf_search_icon "} > </div>
                                    <input
                                        className={"mf_input mf_bg_light_grey"}
                                        type={"text"}
                                        // value={credential.email}
                                        // onChange={(e)=>{setCredential({...credential, ['email']: e.target.value})}}
                                        placeholder={"Search"}
                                        // className={invalid}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.btn_group}>
                            {isSelectRow ? (
                                <button onClick={toggleSelectRow}> Select</button>
                            ) : (
                                <button  onClick={toggleSelectRow}> Cancel</button>
                            )}
                                                <button  className="textWithIconButton" onClick={handleClick}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor"
                                                         className="bi bi-pencil" viewBox="0 0 16 16"
                                                         style={{marginRight: "4px"}}>
                                                        <path
                                                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                    </svg>
                                                    Edit Column
                                                </button>
                                        {/*{open ? (*/}
                                        {/*    <>*/}
                                        {/*        <div className="topSide">*/}
                                        {/*            <span>Column Setting</span>*/}
                                        {/*            <button>Add</button>*/}
                                        {/*        </div>*/}

                                        {/*        <DragDropContext >*/}
                                        {/*            <Droppable droppableId="columns">*/}
                                        {/*                {(provided) => (*/}
                                        {/*                    <ul className="columnGroup" {...provided.droppableProps}*/}
                                        {/*                        ref={provided.innerRef}>*/}
                                        {/*                        /!*{columns.map(({columnName}, index) => {*!/*/}
                                        {/*                        /!*    return (*!/*/}
                                        {/*                        /!*        <Draggable key={columnName}*!/*/}
                                        {/*                        /!*                   draggableId={columnName}*!/*/}
                                        {/*                        /!*                   index={index}>*!/*/}
                                        {/*                        /!*            {(provided) => (*!/*/}
                                        {/*                        /!*                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}*!/*/}
                                        {/*                        /!*                    className="columnCheckboxContainer">*!/*/}
                                        {/*                        /!*                    <div>*!/*/}
                                        {/*                        /!*                        <img*!/*/}
                                        {/*                        /!*                            src="icon-columnControl.svg"*!/*/}
                                        {/*                        /!*                            alt=""/>{columnName}*!/*/}
                                        {/*                        /!*                        </div>*!/*/}
                                        {/*                        /!*                    <Checkbox />*!/*/}
                                        {/*                        /!*                </li>*!/*/}
                                        {/*                        /!*            )}*!/*/}
                                        {/*                        /!*        </Draggable>*!/*/}
                                        {/*                        /!*    );*!/*/}
                                        {/*                        /!*})}*!/*/}
                                        {/*                        {provided.placeholder}*/}
                                        {/*                    </ul>*/}
                                        {/*                )}*/}
                                        {/*            </Droppable>*/}
                                        {/*        </DragDropContext>*/}
                                        {/*    </>*/}
                                        {/*) : null}*/}

                            <button onClick={showDropzone}>Import</button>
                            <Link href="/contacts/addcontact"><button>+ New Contact</button></Link>
                        </div>
                    </div>
                    {/* drag and drop end*/}

                    <div className={"mf_bg_light_grey "+styles.row }>
                        <div className={styles.select_group}>
                            <div className="multipleSelectPlaceholder">
                                {/*<FormControl sx={{m: 0, width: 171, mt: 1}}>*/}

                                {/*    <Select sx={{*/}
                                {/*        height: 28,*/}
                                {/*        marginBottom: 0.3,*/}
                                {/*        marginRight: 3,*/}
                                {/*        borderRadius: 2,*/}
                                {/*        background: "white"*/}
                                {/*    }}*/}
                                {/*            multiple*/}
                                {/*            displayEmpty*/}
                                {/*            value={personName}*/}
                                {/*            onChange={handleChange}*/}
                                {/*            input={<OutlinedInput/>}*/}
                                {/*            renderValue={(selected) => {*/}
                                {/*                if (selected.length === 0) {*/}
                                {/*                    return <span>Agnet</span>;*/}
                                {/*                }*/}
                                {/*                return selected.join('');*/}
                                {/*            }}*/}
                                {/*            MenuProps={MenuProps}*/}
                                {/*            inputProps={{'aria-label': 'Without label'}}*/}
                                {/*    >*/}
                                {/*        <MenuItem disabled value="">*/}
                                {/*            <span>Agent</span>*/}
                                {/*        </MenuItem>*/}

                                {/*        <MenuItem*/}
                                {/*            value={"Mary Foster"}*/}
                                {/*        >*/}
                                {/*            {"Mary Foster"}*/}
                                {/*        </MenuItem>*/}
                                {/*    </Select>*/}

                                {/*</FormControl>*/}
                                {/*<MSelect2/>*/}
                                {/*<MSelect3/>*/}
                                {/*<MSelect4/>*/}
                            </div>
                        </div>

                        <div className="tagsButtonGroup">
                            <div className="addPopperContainer">
                                <ClickAwayListener onClickAway={handleClickAwayAddPopper}>
                                    <div >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                             fill="currentColor"
                                             className="bi bi-tag" viewBox="0 0 16 16" onClick={handleClickAddPopper}>
                                            <path
                                                d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z"/>
                                            <path
                                                d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z"/>
                                        </svg>
                                        {openAddPopper ? (
                                            <div>
                                                <div className="addTagHeader">
                                                    <span>Add Tag</span>
                                                    <button>Confirm</button>
                                                </div>
                                                <Search3 type="search">Search</Search3>
                                                <div className="checkboxGrp">
                                                    <label className="checkboxContainer">
                                                            <span className="pillContainer">
                                                                <span className="pill vip">VIP</span>
                                                            </span>
                                                        <Checkbox/>
                                                    </label>
                                                    <label className="checkboxContainer">
                                                            <span className="pillContainer">
                                                                <span className="pill newCustomer">New Customer</span>
                                                            </span>
                                                        <Checkbox/>
                                                    </label>
                                                    <label className="checkboxContainer">
                                                            <span className="pillContainer">
                                                                <span className="pill promotions">Promotions</span>
                                                            </span>
                                                        <Checkbox/>
                                                    </label>
                                                    <label className="checkboxContainer">
                                                            <span className="pillContainer">
                                                                <span className="pill vvip">VVIP</span>
                                                            </span>
                                                        <Checkbox/>
                                                    </label>
                                                </div>

                                            </div>
                                        ) : null}
                                    </div>
                                </ClickAwayListener>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#2198fa"
                                     cursor="pointer"
                                     className="bi bi-upload" viewBox="0 0 16 16">
                                    <path
                                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                    <path
                                        d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                </svg>
                            </div>
                            <div className="deletePopperContainer">
                                <ClickAwayListener onClickAway={handleClickAwayDeletePopper}>
                                    <div>

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
                                            <div>
                                                Delete 2 contacts? <br/>
                                                All conversation history will also be erased.
                                                <div className="controlButtonGroup">
                                                    <button>Delete</button>
                                                    <span
                                                        onClick={handleClickDeletePopper}><button></button></span>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </ClickAwayListener>
                            </div>
                        </div>

                    </div>
                    {/**/}

                            {/*<TableContainer>*/}
                            {/*    <Table*/}
                            {/*        sx={{minWidth: 750}}*/}
                            {/*        aria-labelledby="tableTitle"*/}
                            {/*    >*/}
                            {/*        <TableBody>*/}
                            {/*            /!*{<li>{contacts}</li>}*!/*/}
                            {/*            {contacts.map((c ) => {*/}
                            {/*               return(  <TableRow*/}
                            {/*                    key={c.id}*/}
                            {/*                    hover*/}
                            {/*                    role="checkbox"*/}
                            {/*                    tabIndex={-1}*/}
                            {/*                >*/}
                            {/*                    <td style={{*/}
                            {/*                        width: "30px",*/}
                            {/*                        textAlign: "center",*/}
                            {/*                        borderBottom: "1px #e0e0e0 solid"*/}
                            {/*                    }}>*/}
                            {/*                        <div className="newCheckboxContainer">*/}
                            {/*                            {isSelectRow ? <label className="newCheckboxLabel">*/}
                            {/*                                <input type="checkbox" name="checkbox"/>*/}
                            {/*                            </label> : null}*/}

                            {/*                        </div>*/}
                            {/*                    </td>*/}
                            {/*                    <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                            {/*                               align="left">*/}
                            {/*                        <div style={{display: "flex", alignItems: "center"}}>*/}
                            {/*                            <Avatar alt="Remy Sharp"*/}
                            {/*                                    src={c.img_url||""}/>*/}
                            {/*                        </div>*/}
                            {/*                    </TableCell>*/}
                            {/*                    <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                            {/*                               align="left">*/}
                            {/*                        <span style={{marginLeft: "11px"}}>{c.name}</span>*/}
                            {/*                    </TableCell>*/}
                            {/*                    /!*name*!/*/}
                            {/*                    <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                            {/*                               align="left">*/}
                            {/*                        <Pill color="teamA">{c.team}</Pill>*/}
                            {/*                    </TableCell>*/}
                            {/*                    /!*team*!/*/}
                            {/*                    <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                            {/*                               align="left">*/}
                            {/*                        <img width="24px" height="24px" src="./whatsappChannel.svg"*/}
                            {/*                             alt=""/>*/}
                            {/*                    </TableCell>*/}
                            {/*                    /!*channel*!/*/}
                            {/*                    <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                            {/*                               align="left">*/}
                            {/*                        <div className="tagsGroup"><Pill color="lightBlue">VIP</Pill><Pill*/}
                            {/*                            color="lightPurple">New*/}
                            {/*                            Customer</Pill></div>*/}
                            {/*                    </TableCell>*/}
                            {/*                    /!*tags*!/*/}
                            {/*                    <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                            {/*                               align="left">*/}
                            {/*                        <div className="assigneeGroup">*/}
                            {/*                            <Pill color="lightYellow" size="roundedPill size30">MF</Pill>*/}
                            {/*                            <Pill color="lightBlue" size="roundedPill size30">AX</Pill>*/}
                            {/*                            <Pill color="lightGreen" size="roundedPill size30">DS</Pill>*/}
                            {/*                            <Pill color="lightPurple" size="roundedPill size30">EW</Pill>*/}
                            {/*                            <Pill color="lightRed" size="roundedPill size30">KA</Pill>*/}
                            {/*                        </div>*/}
                            {/*                    </TableCell>*/}
                            {/*                /!*    assignee*!/*/}

                            {/*                </TableRow>)*/}
                            {/*            })}*/}
                            {/*            /!*        );*!/*/}
                            {/*            /!*    })}*!/*/}
                            {/*        </TableBody>*/}
                            {/*    </Table>*/}
                            {/*</TableContainer>*/}
            <table>
                <thead>
                {defualt_cols.map((col)=>{
                   return ( <th> {col} </th>)
                })}
                </thead>
                <tbody>
                {data.map(d=>{
                    return(
                        <tr></tr>
                    )
                })}
                </tbody>
            </table>


                </div>


    )
}

