import Avatar from "@mui/material/Avatar";
import {API, graphqlOperation} from "aws-amplify";
import {createChatroom} from "../../src/graphql/mutations";
import {useContext, useEffect} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import { Tooltip } from "@mui/material";
import {getChatroom} from "../../src/graphql/queries";


export default function Newchatroom({ setFilteredData ,...props}){
    const {user , setSelectedChat} = useContext(GlobalContext)
    // useEffect(()=>{console.log(props, "chatrooms details ")}
    // ,[props])
    const createChatroomAction = async (data)=>{
        console.log(user)
        const input = {
            channel:"WABA",
            customer_id:parseInt(data.customer_id),
            is_pin: false,
            name: data.customer_name,
            phone:`${data.country_code}${data.phone}`,
            room_id: `${data.customer_id}` ,
            country_code:data.country_code,
            unread:0 ,
            user_id: parseInt(user.user.user_id),
        }
        // const check= await API.graphql(graphqlOperation(getChatroom , {channel: "WABA" , room_id:`${data.customer_id}` })).then(async response=>{
        //     if(response.data){
        //         setSelectedChat(response.data.getChatroom)
        //         return
        //     }
        // }).catch(async error=>{
        //     console.log(error)
        //    alert("Something went wrong")
        // })
        const result = await API.graphql(graphqlOperation(createChatroom, {input})).then(
            res=>{
                console.log(res)
                if(res.data.createChatroom){
                    setFilteredData(prev=>[res.data.createChatroom , ...prev])
                    setSelectedChat(res.data.createChatroom)
                    return
                }

            }
        ).catch(err => {
            alert("The user given chatroom was duplicated or something went wrong");
            console.log(err);
            return
        })

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
                        <div key={index} className={"chatroom_li "} onClick={async ()=>{await createChatroomAction(contact)}} >

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
