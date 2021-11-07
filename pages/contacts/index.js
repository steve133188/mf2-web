import {Search3} from "../../components/Input";
// import {
//     CancelButton,
//     SelectButton,
//     NormalButton,
//     NormalButton2,
// } from "../../components/Button";
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
import {MSelect2} from "../../components/multiSelects/MSelect2";
import {MSelect3} from "../../components/multiSelects/MSelect3";
import {MSelect4} from "../../components/multiSelects/MSelect4";
import Link from 'next/link';
import {ImportDropzone} from '../../components/ImportContact.js'
import axios from "axios";



// function EnhancedTable2Head({isSelectRow, ...props}) {
//     const {order, orderBy, onRequestSort } = props;
//
//     const createSortHandler = (property) => (event) => {
//         onRequestSort(event, property);
//     };
//
//     const headCells2 = [
//         {
//             id: 'customerID',
//             numeric: false,
//             disablePadding: false,
//             label: 'Customer ID',
//         },
//         {
//             id: 'name',
//             numeric: true,
//             disablePadding: false,
//             label: 'Name',
//         },
//         {
//             id: 'team',
//             numeric: true,
//             disablePadding: false,
//             label: 'Team',
//         },
//         {
//             id: 'channel',
//             numeric: true,
//             disablePadding: false,
//             label: 'Channel',
//         },
//         {
//             id: 'tags',
//             numeric: true,
//             disablePadding: false,
//             label: 'Tags'
//         },
//         {
//             id: 'assignee',
//             numeric: true,
//             disablePadding: false,
//             label: 'Assignee'
//         }
//     ];
//
//     return (
//         <TableHead>
//             <TableRow>
//                 <th style={{width: "30px", textAlign: "center", borderBottom: "1px solid #e0e0e0"}}>
//                     {isSelectRow?<Checkbox/>:null}
//                 </th>
//                 {headCells2.map((headCell2) => (
//                     <TableCell
//                         key={headCell2.id}
//                         align="left"
//                         padding={headCell2.disablePadding ? 'none' : 'normal'}
//                         sortDirection={orderBy === headCell2.id ? order : false}
//                         sx={{padding: "26px"}}
//                     >
//                         <TableSortLabel
//                             sx={{fontWeight: "bold", color: "#495057"}}
//                             active={orderBy === headCell2.id}
//                             direction={orderBy === headCell2.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell2.id)}
//                         >
//                             {headCell2.label}
//                             {orderBy === headCell2.id ? (
//                                 <Box component="span" sx={visuallyHidden}>
//                                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                 </Box>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}
//             </TableRow>
//         </TableHead>
//     );
// }
//
// EnhancedTable2Head.propTypes = {
//     onRequestSort: PropTypes.func.isRequired,
//     order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//     orderBy: PropTypes.string.isRequired,
//     rowCount: PropTypes.number.isRequired,
// };

export default function Contacts() {
    const [page, setPage] = React.useState(1);
    // const [contacts, setContacts] = React.useState([]);
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    let cons;
    const { contacts , get_contacts} = useContext(GlobalContext)
    useEffect( async () => {
         await get_contacts()
        console.log("data:",contacts)
    },[]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('role');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


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
    // const addStyles = {
    //     position: 'absolute',
    //     top: 50,
    //     right: -30,
    //     borderRadius: 2,
    //     zIndex: 1,
    //     boxShadow: 3,
    //     p: 1,
    //     bgcolor: 'background.paper',
    //     textAlign: "center",
    //     padding: "41px 32px 28px 32px",
    //     width: 457,
    //     lineHeight: 2
    // };
    //
    // const editColumnStyles = {
    //     position: 'absolute',
    //     top: 55,
    //     right: -10,
    //     borderRadius: 2,
    //     zIndex: 2,
    //     boxShadow: 3,
    //     p: 1,
    //     bgcolor: 'background.paper',
    //     textAlign: "center",
    //     padding: "32px 29px 48px 29px",
    //     width: 376,
    //     lineHeight: 2
    // };
    // const deleteStyles = {
    //     position: 'absolute',
    //     top: 55,
    //     right: -10,
    //     borderRadius: 2,
    //     zIndex: 1,
    //     boxShadow: 3,
    //     p: 1,
    //     bgcolor: 'background.paper',
    //     textAlign: "center",
    //     padding: "41px 32px 28px 32px",
    //     width: 376,
    //     lineHeight: 2
    // };
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

    //
    // const contactColumns = [
    //     {
    //         columnName: 'Customer ID'
    //     },
    //     {
    //         columnName: 'Name'
    //     },
    //     {
    //         columnName: 'Team'
    //     },
    //     {
    //         columnName: 'Channel'
    //     },
    //     {
    //         columnName: 'Tags'
    //     },
    //     {
    //         columnName: 'Assignee'
    //     }
    // ];

    // const [columns, updateColumns] = useState(contactColumns);

    // function handleOnDragEnd(result) {
    //     if (!result.destination) return;
    //
    //     const items = Array.from(columns);
    //     const [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);
    //
    //     updateColumns(items);
    // }

    const [isShowDropzone, setIsShowDropzone] = useState(false);

    function toggleDropzone() {
        setIsShowDropzone(!isShowDropzone);
    }


    return (
        <div className="contacts-layout">
            <span style={{display: isShowDropzone ? "block" : "none"}}>
                {/*DND Import Data start */}
                <ImportDropzone onClose={toggleDropzone} accept={"image/*"} isShowDropzone={isShowDropzone} setIsShowDropzone={setIsShowDropzone}/>
                {/*DND Import Data end */}
            </span>
            <div className="rightContent">
                <div className="contactsContainer">
                    <div className="topBar">
                        <div className="searchBar">
                            <div >
                                {/*<label className="searchSVG">*/}
                                    <input className="searchInput" placeholder="Search"/>
                                {/*</label>*/}
                            </div>
                        </div>
                        <div className="buttonGrp">
                            {isSelectRow ? (
                                <span onClick={toggleSelectRow}><button/></span>
                            ) : (
                                <span onClick={toggleSelectRow}><button/></span>
                            )}
                            <div className="editColumnPopperContainer">
                                <ClickAwayListener onClickAway={handleClickAway}>
                                    <div sx={{position: 'relative'}}>
                                        <div className="textWithIconButton" onClick={handleClick}>
                                                <button variant="contained" color="neutral">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor"
                                                         className="bi bi-pencil" viewBox="0 0 16 16"
                                                         style={{marginRight: "4px"}}>
                                                        <path
                                                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                    </svg>
                                                    <span>Edit Column</span>
                                                </button>
                                        </div>
                                        {open ? (
                                            <>
                                                <div className="topSide">
                                                    <span>Column Setting</span>
                                                    <button>Add</button>
                                                </div>

                                                <DragDropContext >
                                                    <Droppable droppableId="columns">
                                                        {(provided) => (
                                                            <ul className="columnGroup" {...provided.droppableProps}
                                                                ref={provided.innerRef}>
                                                                {/*{columns.map(({columnName}, index) => {*/}
                                                                {/*    return (*/}
                                                                {/*        <Draggable key={columnName}*/}
                                                                {/*                   draggableId={columnName}*/}
                                                                {/*                   index={index}>*/}
                                                                {/*            {(provided) => (*/}
                                                                {/*                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}*/}
                                                                {/*                    className="columnCheckboxContainer">*/}
                                                                {/*                    <div>*/}
                                                                {/*                        <img*/}
                                                                {/*                            src="icon-columnControl.svg"*/}
                                                                {/*                            alt=""/>{columnName}*/}
                                                                {/*                        </div>*/}
                                                                {/*                    <Checkbox />*/}
                                                                {/*                </li>*/}
                                                                {/*            )}*/}
                                                                {/*        </Draggable>*/}
                                                                {/*    );*/}
                                                                {/*})}*/}
                                                                {provided.placeholder}
                                                            </ul>
                                                        )}
                                                    </Droppable>
                                                </DragDropContext>
                                            </>
                                        ) : null}

                                    </div>
                                </ClickAwayListener>
                            </div>
                            <button onClick={showDropzone}>Import</button>
                            <Link href="/contacts/addcontact"><a><button>+ New Contact</button></a></Link>

                        </div>
                    </div>
                    {/* drag and drop end*/}

                    <div className="navbarPurple">
                        <div className="selectButtonGroup">
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
                    <div sx={{}}>
                        <div >
                            <TableContainer>
                                <Table
                                    sx={{minWidth: 750}}
                                    aria-labelledby="tableTitle"
                                >
                                    <TableBody>
                                        {/*{<li>{contacts}</li>}*/}
                                        {contacts.map((c ) => {
                                           return(  <TableRow
                                                key={c.id}
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                            >
                                                <td style={{
                                                    width: "30px",
                                                    textAlign: "center",
                                                    borderBottom: "1px #e0e0e0 solid"
                                                }}>
                                                    <div className="newCheckboxContainer">
                                                        {isSelectRow ? <label className="newCheckboxLabel">
                                                            <input type="checkbox" name="checkbox"/>
                                                        </label> : null}

                                                    </div>
                                                </td>
                                                <TableCell sx={{padding: "26px", fontSize: "16px"}}
                                                           align="left">
                                                    <div style={{display: "flex", alignItems: "center"}}>
                                                        <Avatar alt="Remy Sharp"
                                                                src={c.img_url||""}/>
                                                    </div>
                                                </TableCell>
                                                <TableCell sx={{padding: "26px", fontSize: "16px"}}
                                                           align="left">
                                                    <span style={{marginLeft: "11px"}}>{c.name}</span>
                                                </TableCell>
                                                {/*name*/}
                                                <TableCell sx={{padding: "26px", fontSize: "16px"}}
                                                           align="left">
                                                    <Pill color="teamA">{c.team}</Pill>
                                                </TableCell>
                                                {/*team*/}
                                                <TableCell sx={{padding: "26px", fontSize: "16px"}}
                                                           align="left">
                                                    <img width="24px" height="24px" src="./whatsappChannel.svg"
                                                         alt=""/>
                                                </TableCell>
                                                {/*channel*/}
                                                <TableCell sx={{padding: "26px", fontSize: "16px"}}
                                                           align="left">
                                                    <div className="tagsGroup"><Pill color="lightBlue">VIP</Pill><Pill
                                                        color="lightPurple">New
                                                        Customer</Pill></div>
                                                </TableCell>
                                                {/*tags*/}
                                                <TableCell sx={{padding: "26px", fontSize: "16px"}}
                                                           align="left">
                                                    <div className="assigneeGroup">
                                                        <Pill color="lightYellow" size="roundedPill size30">MF</Pill>
                                                        <Pill color="lightBlue" size="roundedPill size30">AX</Pill>
                                                        <Pill color="lightGreen" size="roundedPill size30">DS</Pill>
                                                        <Pill color="lightPurple" size="roundedPill size30">EW</Pill>
                                                        <Pill color="lightRed" size="roundedPill size30">KA</Pill>
                                                    </div>
                                                </TableCell>
                                            {/*    assignee*/}

                                            </TableRow>)
                                        })}
                                        {/*        );*/}
                                        {/*    })}*/}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

