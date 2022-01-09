import Avatar from "@mui/material/Avatar";
import {API, graphqlOperation} from "aws-amplify";
import {createMF2TCOCHATROOM} from "../../src/graphql/mutations";
import {useContext, useEffect} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import { Tooltip } from "@mui/material";


export default function Newchatroom({ setFilteredData ,...props}){
    const {user} = useContext(GlobalContext)
    // useEffect(()=>{console.log(props, "chatrooms details ")}
    // ,[props])
    const createChatroom = async (data)=>{
        console.log(user)
        const input = {
            channel:"Whatsapp",
            customer_id:data.customer_id,
            is_pin: false,
            name: data.first_name + data.last_name,
            phone: data.customer_id,
            room_id:data.customer_id ,
            unread:0 ,
            user_id: user.user.user_id,
        }
        const result = await API.graphql(graphqlOperation(createMF2TCOCHATROOM, {input})).then(
            res=>{
                console.log(res)
                setFilteredData(prev=>[res.data.createMF2TCOCHATROOM , ...prev])
            }
        ).catch(err => alert("The user given chatroom was duplicated or something went wrong"))
    }
    return(
        <>
        <div className="top">

            <div className="searchbar">

            </div>
        </div>
        <div className="">
                <div style={{margin:"0 20px"}}>
                    New Chatroom
                    </div>
            <div className="contactList" >
                {props.contacts.map((contact, index)=>{
                    return(
                        <div key={index} className={"chatroom_li "} onClick={async ()=>{await createChatroom(contact)}} >

                            <div className={"chatroom_icon"}>

                                <Tooltip key={contact.customer_name} className={""} title={contact.customer_name} placement="top-start">
                                <Avatar className={"text-center"} src={contact.profile_pic_url} sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} alt={contact.customer_name} />
                                </Tooltip>
                            </div>

                            <div className={"contact_name_ss"}>
                               <div style={{display:"flex"}}>

                                <div>{contact.customer_name&&contact.customer_name!=""?contact.customer_name:"Unknown"}</div>
                                {/* <div className={"team"}>{contact.channel}</div> */}
                                {/* {<img src={`/channel_SVG/${contact.channels!=null?contact.channels:"Whatsapp"}.svg`} alt="Channel icon" width={20} height={20} style={{margin:"0 5px"}} />} */}
                               </div>

                                <div className={"team"}>+{contact.country_code} {contact.phone}</div>
                            </div>
                                <img src="/openChat.svg" style={{width:"30px",opacity:".8"}} />
                            {/*<div className={"chatroom_time"}>{chatroom.last_msg_time}</div>*/}
                            {/*<div className={"pin"}></div>*/}
                        </div>
                    )
                })}
            </div>

        </div>
        </>
    )
}
