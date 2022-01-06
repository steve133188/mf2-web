import Avatar from "@mui/material/Avatar";
import {API, graphqlOperation} from "aws-amplify";
import {createMF2TCOCHATROOM} from "../../src/graphql/mutations";
import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import { Tooltip } from "@mui/material";


export default function Newchatroom({ setFilteredData ,...props}){
    const {user} = useContext(GlobalContext)

    const createChatroom = async (data)=>{
        console.log(user)
        const input = {
            channel:"Whatsapp",
            customer_id:data.customer_id,
            is_pin: false,
            name: data.first_name + data.last_name,
            phone: data.customer_id,
            room_id:parseInt(data.phone.toString().slice(3)) ,
            unread:0 ,
            user_id:  parseInt(user.user.phone.toString().slice(3)),
        }
        const result = await API.graphql(graphqlOperation(createMF2TCOCHATROOM, {input})).then(
            res=>{
                setFilteredData(prev=>[res.data.createMF2TCOCHATROOM , ...prev])
            }
        )
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
                                {<img src={`/channel_SVG/${contact.channels!=null?contact.channels[0].slice(0).toUpperCase()+contact.channels[0].slice(1):"Whatsapp"}.svg`} alt="Channel icon" width={20} height={20} style={{margin:"0 5px"}} />}
                               </div>

                                <div className={"team"}>+{contact.customer_id.toString().slice(0,3)} {contact.phone.toString().slice(3)}</div>
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
