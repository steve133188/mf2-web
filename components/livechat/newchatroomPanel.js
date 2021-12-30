import Avatar from "@mui/material/Avatar";
import {API, graphqlOperation} from "aws-amplify";
import {createMF2TCOCHATROOM} from "../../src/graphql/mutations";
import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import { Tooltip } from "@mui/material";


export default function Newchatroom(props){
    const {user} = useContext(GlobalContext)

    const createChatroom = async (data)=>{
        const user_id = parseInt(user.user.phone.replace("852",""))
        const room_id = parseInt(data.phone.replace("852",""))
        console.log(parseInt(user.user.phone))
        const input = {
            channel:"whatsapp",
            customer_id:data.id,
            is_pin: false,
            name: data.name,
            phone: data.phone,
            room_id:room_id ,
            unread:0 ,
            user_id: user_id ,
        }
        const result = await API.graphql(graphqlOperation(createMF2TCOCHATROOM, {input}))
        console.log(result)
    }
    return(
        <>
        <div className="top">

            <div className="searchbar">

            </div>
        </div>
        <div className="">
            <div className="contactList" >
                New Chatroom
                {props.contacts.map((contact, index)=>{
                    // console.log(contact)
                    return(
                        <div key={index} className={"chatroom_li "} onClick={async ()=>{await createChatroom(contact)}} >
                            
                            <div className={"chatroom_icon"}>

                                <Tooltip key={contact.name} className={""} title={contact.name} placement="top-start">
                                <Avatar className={"text-center"} src={contact.profile_pic_url} sx={{width:50 , height:50 ,fontSize:20,marginRight:"10px"}} alt={contact.name} />
                                </Tooltip> 
                            </div>
                           
                            <div className={"contact_name_ss"}>
                                <div>{contact.name??contact.phone}</div>
                                {/* <div className={"team"}>Team {contact.team}</div> */}
                                <div className={"team"}>+{contact.phone.slice(0,3)} {contact.phone.slice(3)}</div>
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