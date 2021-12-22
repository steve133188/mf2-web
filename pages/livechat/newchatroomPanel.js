import { width } from "@mui/system"
import Avatar from "@mui/material/Avatar";
import {API, graphqlOperation} from "aws-amplify";
import {createMF2TCOCHATROOM} from "../../src/graphql/mutations";
import {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";


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
                {props.contacts.map((contact, index)=>{
                    // console.log(contact)
                    return(
                        <div key={index} className={"contact_box "} onClick={async ()=>{await createChatroom(contact)}} >
                            <div className={"contact_icon"}>
                                <Avatar src={contact.profile_pic_url} style={{width: '35px',height:"35px"}} alt={contact.name} />
                            </div>
                            <div className={"contact_name_ss"}>
                                <div>{contact.name}</div>
                                <div className={"team"}>Team {contact.team}</div>
                            </div>
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