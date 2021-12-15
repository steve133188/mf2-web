import { width } from "@mui/system"
import { Avatar } from "../../components/Icon"


export default function Newchatroom(props){
    // console.log(props.contacts)
    return(
        <>
        <div className="top">

            <div className="searchbar">

            </div>
        </div>
        <div className="">
            <div className="contactList" >
                {props.contacts.map((contact)=>{
                    // console.log(contact)
                    return(
                        <div className={"contact_box "} >
                            <div className={"contact_icon"}>
                                <Avatar src={contact.profile_pic_url} style={{width: '64px',height:"64px"}} alt={contact.name} />
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