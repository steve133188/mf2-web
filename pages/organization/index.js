import {ORGMenu} from "../../components/BlueMenu";
import {BlueMenuDropdown, BlueMenuLink} from "../../components/BlueMenuLink";
import {Search3} from "../../components/Input";
import {NormalButton, NormalButton2} from "../../components/Button";
import {NavbarPurple} from "../../components/NavbarPurple";
import {BroadcastTable} from "../../components/Table";
import {PaginationControlled} from "../../components/Pagination";
import {Badge} from "../../components/Badge";
import {Pill, StatusPill} from "../../components/Pill";
import {useState, useEffect, useRef, useContext} from "react";
import SearchSession from "../../components/SearchSession";
import Link from "next/link";
import SelectSession from "../../components/SelectSession";
import Pagination from "@mui/material/Pagination";
import {GlobalContext} from "../../context/GlobalContext";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TableCell, Tooltip} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import {AvatarGroup} from "@mui/lab";
import Mf_icon_dropdown_select_btn from "../../components/mf_dropdown_select";
import styles from "../../styles/Contacts.module.css";

export default function Organization() {
    const searchRef = useRef(null)
    const [users, setUsers] = useState([]);
    const [root_org, set_root_org] = useState([]);
    const [org, set_org] = useState([]);
    const {get_root_org} = useContext(GlobalContext)
    const [filteredData , setFilteredData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [filter , setFilter] = useState({agent:[] , team:[] , channel:[] , tag:[] })

    const [useContact , setUseContact] = useState()
    const [isProfileShow , setIsProfileShow] = useState(false)
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)

    const [currentPage , setCurrentPage] = useState(1)
    const [selectedContacts , setSelectedContacts] = useState([])
    const [isShowDropzone, setIsShowDropzone] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const indexOfLastTodo = currentPage * 10; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 10;
    const currentContacts = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    //filtered Data

    const fetchContacts = async () =>{
        const data = await get_contacts()
        setUsers(data)
        setFilteredData(data)
    }
    const fetchRootORG = async () =>{
        const data = await get_root_org()
        set_root_org(data)
        setFilteredData(data)
    }
    useEffect(    async () => {
        await fetchRootORG()
    },[]);

    const toggleSelect = e => {
        const { checked ,id} = e.target;
        setSelectedContacts([...selectedContacts, id]);
        if (!checked) {
            setSelectedContacts(selectedContacts.filter(item => item !== id));
        }
        console.log(selectedContacts)
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedContacts(currentContacts.map(c => c.id));
        if (selectAll) {
            setSelectedContacts([]);
        }
        console.log(selectedContacts)
    };

    const handleFilterChange = (search)=>{
        if(search.includes(":")){
            console.log("trigger regex search")
        }
        console.log("search filter :",search)
        const newData = contacts.filter(contact=> {
            if(search.trim() == ""){
                return contacts
            }
            return contact.name.toLowerCase().includes(search)
        })
        console.log("newdata " , newData)
        // const newData = filterFunc()
        setFilteredData([...newData])
        setCurrentPage(1)
    }

    const toggleProfile = (key) =>{
        if(!isProfileShow) setUseContact(key)
        console.log(useContact)
        setIsProfileShow(!isProfileShow)
    }
    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) setUseContact(key);
        if(isEditProfileShow) await fetchContacts();
        setIsEditProfileShow(!isEditProfileShow)
    }
    const removeContact = async (id)=>{
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/id"
        const deleteItems = {data:[id]}
        console.log("remove contact id",deleteItems)
        const res = axios.delete(url ,{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            data: deleteItems})
        await fetchContacts()
    }
    const removeManyContact = async ()=>{
        let items =[]
        if(selectedContacts!=-1){
            selectedContacts.forEach((c)=>{
                console.log("c",c)
                items.push(c)
            })
        }
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/id"
        const deleteItems = {data:[...items]}
        console.log("remove contact id",deleteItems)
        const res = axios.delete(url ,{ headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            data: deleteItems})
        await fetchContacts()
    }
    // const handleClick = (event) => {
    //     event.stopPropagation()
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const default_cols = [ 'Name' ,'Role', 'Email','Phone' ,'No. of Assigned Contacts']
    const [isSelectRow, setSelectRow] = useState( false);

    function toggleSelectRow() {
        setSelectRow(!isSelectRow);
    }
    function toggleDropzone() {
        setIsShowDropzone(!isShowDropzone);
    }
    return (
        <div className="organization-layout">
            <ORGMenu orgData={root_org} />
            <div className="rightContent">
                    <SearchSession
                        placeholder={"Search"}
                        handleChange={handleFilterChange}
                        value={filter.keyword}
                    >
                        {!isSelectRow ? (
                            <button onClick={toggleSelectRow} className={"mf_bg_light_blue mf_color_blue"}> Select </button>
                        ) : (
                            <button  onClick={toggleSelectRow} className={"mf_bg_light_grey mf_color_text"}> Cancel</button>
                        )}
                        <button>+ New Team</button>
                        <Link href="/contacts/addcontact"><button>+ New Division</button></Link>
                    </SearchSession>
                    <SelectSession btn={(<button style={{marginLeft: "auto"}}>+ New Agent</button>)}>

                    </SelectSession>
                <TableContainer
                    sx={{minWidth: 750 , minHeight:750}}
                >
                    <Table
                        sx={{minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        stickyHeader={true}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <div className="newCheckboxContainer">
                                        {isSelectRow ? <label className="newCheckboxLabel">
                                            <input type="checkbox" name="checkbox" checked={selectAll} onClick={toggleSelectAll} />
                                        </label> : null}
                                    </div>
                                </TableCell>
                                {default_cols.map((col,index)=>{
                                    return ( <TableCell key={index}>{col}</TableCell>)
                                })}
                                <TableCell>
                                    <div className="newCheckboxContainer">

                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length!=0 && currentContacts.map((data ,index) => {
                                return( <TableRow
                                        key={index}
                                        hover
                                        role="checkbox"
                                        // tabIndex={-1}
                                        name={index}
                                        checked={selectedContacts.includes(data.id)}
                                        onClick={isSelectRow?toggleSelect:(e)=>{toggleProfile(data)}}
                                    >
                                        <TableCell style={{
                                            width: "30px",
                                            textAlign: "center",
                                            borderBottom: "1px #e0e0e0 solid"
                                        }}>
                                            <div className="newCheckboxContainer">
                                                {isSelectRow ? <label className="newCheckboxLabel">
                                                    <input type="checkbox" id={data.id} name="checkbox" checked={selectedContacts.includes(data.id)} onClick={isSelectRow?toggleSelect:null} />
                                                </label> : null}

                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <span >{data.name}</span>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className={"name_td"} style={{display: "flex", alignItems: "center"}}>
                                                <span style={{marginLeft: "11px"}}>{data.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Pill color="teamA"></Pill>
                                        </TableCell>

                                        <TableCell align="left">
                                        </TableCell>

                                        <TableCell align="left">
                                            <div className="tagsGroup">

                                            </div>
                                        </TableCell>

                                        <TableCell >

                                        </TableCell>
                                        {/*<TableCell  onClick={(e)=>{e.stopPropagation();toggleEditProfile(data)}}>*/}
                                        {/*<TableCell >*/}
                                        {/*    <Mf_icon_dropdown_select_btn*/}
                                        {/*        btn={(<span className={styles.edit_span}*/}
                                        {/*        >*/}
                                        {/*    ...*/}
                                        {/*</span>)}*/}
                                        {/*    >*/}
                                        {/*        <li onClick={(e)=>{e.stopPropagation();toggleEditProfile(data);}}> Edit </li>*/}
                                        {/*        <li onClick={(e)=>{e.stopPropagation();removeContact(data.id);}}> Delete </li>*/}
                                        {/*    </Mf_icon_dropdown_select_btn>*/}


                                        {/*</TableCell>*/}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Pagination count={Math.ceil(filteredData.length/10)} page={currentPage} onChange={(e,value)=>{setCurrentPage(value)}}/>
            </div>
        </div>
    )
}