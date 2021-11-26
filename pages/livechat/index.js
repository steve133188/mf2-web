import {useState , useEffect} from "react";
import ChatroomList from "../../components/ChatroomList";
import MsgRow from "../../components/MsgRow";
import { Picker } from 'emoji-mart-next'
import 'emoji-mart-next/css/emoji-mart.css'
import RobotSwitch from "../../components/livechat/RobotSwitch";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

export default function Live_chat() {
    const base_url ='https://e9bf-118-140-233-2.ngrok.io'
    const data = [
        {
            name:"1",
            last_msg_time:"03:45PM",
            team:"A",
            unreadCount:1,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU",
        },
        {
            name:"2",
            last_msg_time:"03:45PM",
            team:"B",
            unreadCount:1,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU",
        },
        {
            name:"1",
            last_msg_time:"03:45PM",
            team:"A",
            unreadCount:1,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU",
            message:["hi","bye"]
        },
        {
            name:"3",
            last_msg_time:"03:45PM",
            team:"C",
            unreadCount:5,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU",
        },
        {
            name:"1",
            last_msg_time:"03:45PM",
            team:"A",
            unreadCount:0,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU",
        },
        {
            name:"1",
            last_msg_time:"03:45PM",
            team:"A",
            unreadCount:1,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU",
        },
        {
            name:"2",
            last_msg_time:"03:45PM",
            team:"B",
            unreadCount:1,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU",
        },
        {
            name:"1",
            last_msg_time:"03:45PM",
            team:"A",
            unreadCount:1,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU",
            message:["hi","bye"]
        },
        {
            name:"3",
            last_msg_time:"03:45PM",
            team:"C",
            unreadCount:5,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU",
        },
        {
            name:"1",
            last_msg_time:"03:45PM",
            team:"A",
            unreadCount:0,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU",
        }
    ]

    const records = [
        {
            message_id:"123456789",
            body:"hi",
            type:"text",
            vCard:["","",""],
            author:null,
            fromMe:false,
            from:"Wiva",
            hasMedia:false,
            hasQuotedMsg:false,
            isForwarded:false,
            isStarred:true,
            to:"MSLAB",
            token:"",
            timestamp:1010101,
            orderId:"",
            links:"",
            mentionedIds:["","",""],
            isStatus:false,
            inviteV4:{},
            location:{data:"location"},
            forwardingScore:0,
            deviceType:"mobile",
            broadcast:false
        },
        {
            message_id:"234585258",
            body:"hi",
            type:"text",
            vCard:["","",""],
            author:null,
            fromMe:true,
            from:"MSLAB",
            hasMedia:false,
            hasQuotedMsg:false,
            isForwarded:false,
            isStarred:true,
            to:"Wiva",
            token:"",
            timestamp:1010101,
            orderId:"",
            links:"",
            mentionedIds:["","",""],
            isStatus:false,
            inviteV4:{},
            location:{data:"location"},
            forwardingScore:0,
            deviceType:"mobile",
            broadcast:false
        },
    ]
    const [chatrooms , setChatrooms] = useState([])
    const [selectedChat , setSelectedChat] = useState()
    const [chatrecord , setChatrecord] = useState([])
    const [isRobotOn , setIsRobotOn] = useState(false)
    const [isExpand , setIsExpand] = useState(false)
    const [isFilterOpen , setIsFilterOpen] = useState(false)
    const getChatRooms = async()=>{
        const res = await axios.get(`${base_url}/chats` , {
            headers:{'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',}
        })
        return res.data.response
    }
    const getChatRecord = async(phone)=>{
        const res = await axios.get(`${base_url}/get-record?phone=${phone}` , {
            headers:{'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',}
        })
        return res.data.response
    }

    async function handleChatRoom  (target){
        const data = await getChatRecord(target)
        setChatrecord(data)
    }
    // const chat_record =getChatRooms
    // console.log(getChatRooms)
    useEffect(async ()=>{
        // const data = await getChatRooms()
        setChatrooms(data)
        // const r = await getChatRecord(data[0].id.user)
        setChatrecord(records)
    } , [])

    return (
        <div className="live_chat_layout">
            <div className={"chat_list"}><div className={"search_ss"}><div className="mf_icon_input_block  mf_search_input">
                <div className={"mf_inside_icon mf_search_icon "} > </div>
                <input
                    className={"mf_input mf_bg_light_grey"}
                    // type={type}
                    // value={state}
                    // onChange={handleChange}
                    placeholder={"Search"}
                />
            </div>
            </div>
                <div className={"chatlist_ss"}>
                    <div  className={"chatlist_ss_filter"}><button className={"select_group"} ><div className={"group_icon"}></div>All Team <div className={"arrow_icon"}></div></button><div className={"filter_box "+(isFilterOpen?"active":"")} onClick={()=>setIsFilterOpen(!isFilterOpen)}><div className={"filter_icon"}></div></div></div>
                    <div  className={"chatlist_ss_list"}>
                        {chatrooms.map((d , index)=>{
                            return (<ChatroomList chatroom={d} key={index} className={+(index==0&& "active")} onClick={()=>{handleChatRoom(d)}}/>)
                        })}
                    </div>
                </div>
            </div>
            <div className={"chatroom"}>
                <div className={"chatroom_top"}>
                    <div className={"chatroom_top_info"}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81NV-e-gLTLGZmD2Ffa3dsDCms_o-sde3xlC4Fiz8ppcUABMvYywhvaxI1_NGrMSw3kQ&usqp=CAU" alt="icon"/>
                        <div className={"chatroom_name"}>Name</div>
                        <div className={"chatroom_channel"}>Channel</div>
                    </div>
                    <div className={"chatroom_top_btn_gp"}>
                        <div className={"chatroom_top_btn chatroom_top_btn_research"}></div>
                        <div className={"chatroom_top_btn chatroom_top_btn_refresh"}></div>
                        <div className={"chatroom_top_btn chatbot_switch"}>
                            <RobotSwitch isOn={isRobotOn} handleToggle={()=>setIsRobotOn(!isRobotOn)} onColor="#2198FA" />
                        </div>
                    </div>
                </div>
                <div className={"chatroom_records"}>
                    {chatrecord.map((r , i)=>{
                      return  <MsgRow msg={r} key={i} />
                    })}
                </div>
                <div className={"chatroom_input_field "+(isExpand?"expand":"")}>
                    {/*<Picker style={{ position: 'absolute', bottom: '20px', right: '20px' }} />*/}
                    <textarea className={"chatroom_textField"} placeholder={"Type something…"} name="message" id="message" ></textarea>
                    <div className={"chatroom_input_btn_gp"}>
                        <div className={"left_btn_gp"}>
                            <div className={"sticker_btn "}></div>
                            <div className={"emoji_btn "}></div>
                            <div className={"attach_btn "}></div>
                            <div className={"template_btn"}></div>
                            <div className={"payment_btn"}></div>
                        </div>
                        <div className={"right_btn_gp"}>
                            <div className={"voice_btn"}></div>
                            <div className={"send_btn"}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"chatroom_info"}>
                <div className={"contact"}>
                    <div className={"profile_pic"}><Avatar src={data[0].profile_pic_url} alt="" sx={{ width: 75, height: 75 }}/></div>
                    <div className={"contact_detail"}>
                        <div className={"contact_detail_name"}>Nobody</div>
                        <div className={"contact_detail_channel"}>+852 1833833</div>
                        <div className={"contact_detail_team"}> TeamA</div>
                    </div>
                    <div className={"config"}> ... </div>
                </div>
                <div className={"tabs_field"}>
                    <div className={"tabs_row"}>
                        <div className={"tab active"}>info</div>
                        <div className={"tab"}>note</div>
                    </div>
                    <div className={"content"}>
                        content
                    </div>
                </div>
            </div>
        </div>
    )
}