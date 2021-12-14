import {Search3} from "../../components/Input";
import {NormalButton, NormalButton2, TextWithIconButton} from "../../components/Button";
import {MultipleSelectPlaceholder} from "../../components/Select";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import * as React from "react";
import {Badge} from "../../components/Badge";
import {StatusPill} from "../../components/Pill";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {Checkbox} from "../../components/Checkbox";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {createTheme} from "@mui/material/styles";


// function getComparator(order, orderBy) {
//     return order === 'desc'
//         ? (a, b) => descendingComparator(a, b, orderBy)
//         : (a, b) => -descendingComparator(a, b, orderBy);
// }
// function stableSort(array, comparator) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
// }
//
//
//     return (
//         <TableHead>
//             <TableRow>
//                 <th style={{width: "30px", textAlign: "center", borderBottom: "1px solid #e0e0e0"}}><Checkbox/>
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

export default function Broadcast() {

    useEffect(() => {

    });
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('role');

    function createData(name, period, group, status, createby, createDate, description) {
        return {
            name,
            period,
            group,
            status,
            createby,
            createDate,
            description
        };
    }

    const rows = [
        createData("Broadcast", "Sep 30, 2021 7:00 AM - Oct 30, 2021 7:00 AM", <Badge color="gp1">Group1</Badge>, <StatusPill color="statusActive">Active</StatusPill>, "Mary Foster", "Sep 28, 2021", "Lorem Ipsum"),


    ];

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const theme2 = createTheme({
        palette: {
            neutral: {
                main: '#DEF0FF',
                contrastText: '#2198FA',
            },
            primary: {
                main: '#2198FA',
                contrastText: 'white',
            },
            secondary: {
                main: '#F1B44C',
                contrastText: 'white',
            },
            cancel: {
                main: '#F5F6F8',
                contrastText: '#444444',
            }
        },
    });

    const [isSelectRow, setSelectRow] = useState({"all": false});

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }
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

    const [page, setPage] = React.useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className="broadcast-layout">
            <div className="rightContent">
                <div className="broadcastContainer">
                    <div className="topBar">
                        <div className="searchBar">
                            <Search3 type="search">Search</Search3>
                        </div>
                        <div className="buttonGrp">
                            <NormalButton>Select</NormalButton>
                            <NormalButton2>+ New Broadcast</NormalButton2>
                        </div>
                    </div>
                    <div className="navbarPurple">
                        <div className="selectButtonGroup">
                            <MultipleSelectPlaceholder placeholder={"Agent"} />
                            <MultipleSelectPlaceholder placeholder="Team" />
                            <MultipleSelectPlaceholder placeholder="Tags" />
                        </div>
                    </div>
                    <Paper sx={{width: '100%', mb: 2, boxShadow: "none"}}>
                        <TableContainer>
                            <Table
                                sx={{minWidth: 750}}
                                aria-labelledby="tableTitle"
                            >
                                
                                <TableBody>
                                    {/*{stableSort(rows, getComparator(order, orderBy))*/}
                                    {/*    .map((d) => {*/}
                                    
                                    {/*        return (*/}
                                    {/*            <TableRow*/}
                                    {/*                hover*/}
                                    {/*                role="checkbox"*/}
                                    {/*                tabIndex={-1}*/}
                                    {/*                key={d.name}*/}
                                    {/*            >*/}
                                    {/*                <td style={{*/}
                                    {/*                    width: "30px",*/}
                                    {/*                    textAlign: "center",*/}
                                    {/*                    borderBottom: "1px #e0e0e0 solid"*/}
                                    {/*                }}><Checkbox/></td>*/}
                                    {/*                <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                                    {/*                           align="left">{d.name}</TableCell>*/}
                                    {/*                <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                                    {/*                           align="left">{d.period}</TableCell>*/}
                                    {/*                <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                                    {/*                           align="left">{d.group}</TableCell>*/}
                                    {/*                <TableCell sx={{padding: "26px", fontSize: "16px",  width: "330px"}}*/}
                                    {/*                           align="left">{d.status}</TableCell>*/}
                                    {/*                <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                                    {/*                           align="left">{d.createby}</TableCell>*/}
                                    {/*                <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                                    {/*                           align="left">{d.createDate}</TableCell>*/}
                                    {/*                <TableCell sx={{padding: "26px", fontSize: "16px"}}*/}
                                    {/*                           align="left">{d.description}</TableCell>*/}
                                    {/*            </TableRow>*/}
                                    {/*        );*/}
                                    {/*    })}*/}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <div className="pagination">
                        <Stack spacing={2}>
                            <Pagination count={10} page={page} onChange={handlePageChange} shape="rounded"/>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    )
}