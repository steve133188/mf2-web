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

import styles from"../../styles/pages/admin.module.scss";
import bg from "../../styles/variables/_variables.module.scss"

export default function Role() {
    const router = useRouter()
    const [rolesGet, setRolesGet] = useState([
        {
            id: "1",
            name: "Admin",
            no_of_user: "1",
        },
        {
            id: "2",
            name: "Manager",
            no_of_user: "2",
        },
        {
            id: "3",
            name: "Agent",
            no_of_user: "10",
        },
    ]);
    
    const [roles, setRoles] = useState(rolesGet);
    
    const [roleNames, setRoleNames] = useState(roles.map((role) => {
        return role.name;
    }))
    
    const tableColumns = [
        {
            columnName: 'Role'
        },
        {
            columnName: 'No. of User'
        }
    ];
    
    const [columns, updateColumns] = useState(tableColumns);
 
    const handleSearch = (search) => {
        if(search.length) {
            var roles_name_filtered = roleNames.filter((str)=>{
                return str.toLowerCase().indexOf(search.toLowerCase()) >= 0; 
            });
            var filtered_roles = rolesGet.filter(role=> roles_name_filtered.includes(role.name));
            console.log(filtered_roles);
            setRoles(filtered_roles);        
        } else {
            setRoles(rolesGet);
        }
    }
    
    const deleteAgent = async () =>{
        Swal.fire({
            text: "Delete agent role?",
            showCancelButton: true,
            confirmButtonColor: bg.mf_bg_blue,
            cancelButtonColor: bg.mf_light_grey_color,
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Agent role has been deleted.',
                'success'
              )
            }
        })
    }

    const editRole = async () =>{
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
            //setTeamName(team_name);
        }
    }

    const theme = useTheme();

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
                                <AddButton>+ New Role</AddButton>
                            </div>
                        </div>
                        <div className="navbarPurple"></div>
                        <div className="broadcastTable">
                            <table className="table">
                                <thead>
                                <tr className="headTr">
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
                                    {roles.map((role,index) => {
                                        return (
                                            <tr key={index} className="bodyTr">
                                                <td>{role.name}</td>
                                                <td>{role.no_of_user}</td>
                                                <td className="buttonColumn">
                                                    <div className="pencilButton">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#2198fa"
                                                            className="bi bi-pencil" viewBox="0 0 16 16">
                                                            <path
                                                                d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#f46a6b"
                                                            cursor="pointer"
                                                            className="bi bi-trash" viewBox="0 0 16 16"
                                                            onClick={deleteAgent}>
                                                            <path
                                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                            <path fillRule="evenodd"
                                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                        </svg>
                                                    </div>
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
        </div>
    )
}