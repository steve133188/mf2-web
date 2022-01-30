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

export default function UserProfileGrid({data , roles , teams}){

    const {contactInstance } = useContext(GlobalContext)
    const [log , setLog]  = useState([])
    const [assingedContacts, setAssingedContacts] = useState([])
    const [isEditProfileShow , setIsEditProfileShow] = useState(false)
    const [isReload,setReload] = useState(false)
    const [role,setRole] = useState()


    const renderTeam = (tid , teams)=>{
        if(tid==0 ||!tid) return "-"
        console.log("tid: " ,tid)
        const team =teams.find(t=>t.org_id== tid)
        console.log("team :" ,team)
        if(team)return team.name
        if(team==0)return "-"
    }

    const renderRole = (rid , roles)=>{
        if(!rid|| rid==0) return "-"
        const agent_role =roles.find(r=>r.role_id== rid)
        if(agent_role) return agent_role.role_name
    }

    console.log(data)
    useEffect(async()=>{
             await  fetchContacts()
        //    fetch log by customer_id
        //    fetch assignee by customer_id
        //    fetch team by customer_id

    },[])
    useEffect(()=>{
        console.log(data,"agent profile")
    },[])
    const fetchContacts = async () =>{
        const contactsdata = await contactInstance.getAllContacts()
        console.log(data)
        console.log(data.authority)
        console.log(contactsdata,"contactssss")
        const assigned = contactsdata.filter(c=>{return c.agents_id.some(el=>el.username ==data.username)})
        console.log(assigned,"contactssss")
        setAssingedContacts(assigned)

        const date = new Date(data.last_login)
        console.log(data.last_login)
        console.log(Date.now())
        console.log(date.toUTCString())
        // setFilteredData(data)
    }
    const toggleEdit = ()=>{
      console.log(data, "toggleEdit")
        toggleEditProfile(data)
    }
    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow)
        // setUseUser(key);
        if(isEditProfileShow) ;
        setIsEditProfileShow(!isEditProfileShow)
    }
    const reload = async( )=>{
        await fetchContacts();
    }
    useEffect( async ()=>{
        await fetchContacts();
    },[isReload])
    const default_cols = ["Customer ID","Name","Phone No.","Channel",""]


    return(<div className={"user_profile_grid"}>
         {isEditProfileShow?  ( <Profile handleClose={toggleEditProfile}><EditAgent data={data.phone} toggle={toggleEditProfile} reload={reload} /></Profile>):null}

        <div className={"info_col grid_box"}>
            <span className={"dot"} onClick={toggleEdit } >...</span>
            <div className={"ava_block"}>
                <Avatar className={"ava"} src={data.img_url} alt="profile pic"/>
                <span className={"title"}>{data.username}</span>
            </div>
            <div className={"info_session"}>
            <div className={"info_row"}>
                <span className={"info_label"}>Organization</span>
                <span className={"info_content"}>{renderTeam(data.team_id ,teams)}</span>
                {/* team.id > */}
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Phone Number</span>
                <span className={"info_content"}><span >+{data.country_code} {data.phone}</span>
                {/* +${data.phone.toString().slice(0,3)} ${data.phone.toString().slice(3)} */}
                </span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Email</span>
                <span className={"info_content"}>{data.email}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Last Login</span>
                <span className={"info_content"}>{(new Date(data.last_login*1000)).toUTCString()}</span>
            </div>
            </div>
        </div>
        <div className={"main_col"}>
            <div className={"two_block half_session"}>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Role</span></div>
                        <div className={"session_content"}>
                            {data.role_id? `${renderRole(data.role_id , roles)}`:"No Role Assigned"}
                        </div>
                        <div className={"top_row"}><span className={"title"}>Authority</span></div>
                        <div className={"session_content"} style={{padding:0}}>
                            <div className={"authBox"}>
                            {data.authority!=null&&Object.keys(data.authority).filter(e=>{return data.authority[e]==true?"true":""}).map(e=>{return <div className={"authContainer"}>{e}</div>})}

                            </div>
                        </div>
                    </div>
                </div>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Channels</span></div>
                        <div className={"session_content"}>
                            { data.channels!=null && data.channels.map((chan , index)=>{console.log(data,"chan1111");
                                return(<div><img key={index} width="24px" height="24px" style={{ margin:"15px 30px"}} src={`/channel_SVG/${chan}.svg`} alt=""/> {data.phone}</div>)
                            })}

                            <div style={{width:"80%",display:"flex",justifyContent:"flex-start", fontSize:"16px",alignItems:"center"}}>
                                <img width="40px" height="40px" style={{ margin:"15px 30px"}} src={`/channel_SVG/whatsapp.svg`} alt=""/> </div>
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
                                            <TableCell style={{width: "20%",}}>
                                                {item.customer_id}
                                            </TableCell>
                                            <TableCell align="left" style={{width: "32%"}}>
                                                <div style={{display:"flex",alignItems:"center"}}>
                                                <Tooltip key={index} className={""} title={item.customer_name} placement="top-start">
                                                    <Avatar alt={item.customer_name}  className={"text-center"} src="" sx={{width:25 , height:25 ,fontSize:14}} />
                                                </Tooltip>
                                                <span style={{marginLeft:"1rem"}}>{item.customer_name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell align="left" style={{width: "35%",}}>
                                                <span >+{item.country_code} {item.phone}</span>
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
