import {useEffect,useContext, useState} from "react";
import Avatar from "@mui/material/Avatar";
import { GlobalContext } from "../../context/GlobalContext";
import {AvatarGroup} from "@mui/lab";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell, TableHead} from "@mui/material";
import {Tooltip} from "@mui/material";
import {Pill} from "../Pill";
import Profile from "../profile";
import EditAgent from "../../pages/admin/Agent/editAgent";

export default function UserProfileGrid({data}){

    const {contactInstance } = useContext(GlobalContext)
    const [log , setLog]  = useState([])
    const [assingedContacts, setAssingedContacts] = useState([])
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)

    useEffect(async()=>{
             await  fetchContacts()
        //    fetch log by customer_id
        //    fetch assignee by customer_id
        //    fetch team by customer_id
    },[])
    const fetchContacts = async () =>{
        const contactsdata = await contactInstance.getAllContacts()

        console.log(contactsdata,"contactssss")
        const assigned = contactsdata.filter(c=>c.agents.includes(data.username))
        console.log(assigned,"contactssss")

        setAssingedContacts(assigned)
        // setFilteredData(data)
    }
    const toggleEdit = ()=>{
      console.log(data)
        toggleEditProfile(data)
    }   
    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) 
        // setUseUser(key);
        if(isEditProfileShow) ;
        setIsEditProfileShow(!isEditProfileShow)
    }

    const default_cols = ["Customer ID","Name","Phone No.","Channel",""]


    return(<div className={"user_profile_grid"}>
         {isEditProfileShow?  ( <Profile handleClose={toggleEditProfile}><EditAgent data={data.phone} toggle={toggleEditProfile}/></Profile>):null}

        <div className={"info_col grid_box"}>
            <span className={"dot"} onClick={toggleEdit } >...</span>
            <div className={"ava_block"}>
                <Avatar className={"ava"} src={data.img_url} alt="profile pic"/>
                <span className={"title"}>{data.username}</span>
            </div>
            <div className={"info_session"}>
            <div className={"info_row"}>
                <span className={"info_label"}>Organization</span>
                <span className={"info_content"}>{data.organization}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Phone Number</span>
                <span className={"info_content"}>{data.phone}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Email</span>
                <span className={"info_content"}>{data.email}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Last Login</span>
                <span className={"info_content"}></span>
            </div>
            </div>
        </div>
        <div className={"main_col"}>
            <div className={"two_block half_session"}>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Role</span></div>
                        <div className={"session_content"}>
                            {data.role}
                        </div>
                    </div>
                </div>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Channels</span></div>
                        <div className={"session_content"}>
                            { data.channels!=null && data.channels.map((chan , index)=>{
                                return(<div key={index} className={"content_row"}><div><img key={index} width="24px" height="24px" src={`./${chan}Channel.svg`} alt=""/> <div>{chan} </div></div><div>{data.phone}</div></div>)
                            })}
                        </div>
                    </div>

                </div>
            </div>
            <div className={"log_input half_session grid_box"}>
                <div className={"block_session"}>
                    <div className={"top_row"}><span className={"title"}>No . of Assigned Contacts ({assingedContacts.length})</span></div>
                    {/* {data.agents.map(agent=>{<div>agent.username</div>})} */}
                    <TableContainer
                        sx={{minWidth: 600 ,}}
                        className={"table_container"}
                    >
                        <Table
                            sx={{minWidth: 650 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            stickyHeader={true}
                        >
                            <TableHead>
                                <TableRow>

                                    {default_cols.map((col,index)=>{
                                        return ( <TableCell key={index}>{col}</TableCell>)
                                    })}
    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {assingedContacts.map((item,index)=>{
                                    return( <TableRow
                                            key={index}
                                            hover
                                            // role="checkbox"
                                            name={index}
                                            // checked={selectedUsers.includes(data.phone)}

                                        >
                                            <TableCell style={{width: "28%",}}>
                                                {item.id}
                                            </TableCell>
                                            <TableCell align="left" style={{width: "27%"}}>
                                                <div style={{display:"flex",alignItems:"center"}}>
                                                <Tooltip key={index} className={""} title={item.name} placement="top-start">
                                                    <Avatar alt={item.name}  className={"mf_bg_warning mf_color_warning text-center"} src="/livechat/tempSourceStore/pp.jpg" sx={{width:25 , height:25 ,fontSize:14}} />
                                                </Tooltip>
                                                <span style={{marginLeft:"1rem"}}>{item.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="left" style={{width: "35%",}}>
                                                <span >{item.phone}</span>
                                            </TableCell>
                                            <TableCell align="left" style={{width: "12%",}}> 
                                                {item.channels?<img src={`/channel_SVG/${item.channels}.svg`} style={{width:"20px",margin:"0 5px"}}></img>:""}
                                            </TableCell>
                                            <TableCell align="left">

                                            </TableCell>
    
    
                                            {/*<TableCell align="right">*/}
                                            {/*    <span className={"right_icon_btn"}>{editSVG}</span>*/}
                                            {/*    <span className={"right_icon_btn"}>{deleteSVG}</span>*/}
                                            {/*</TableCell>*/}
                                        </TableRow>
                                    ) })}
                            </TableBody>
                        </Table>
                    </TableContainer>
    
                        
                        
                        
                        
                        
                        
                    

                </div>
            </div>
        </div>
    </div>)
}