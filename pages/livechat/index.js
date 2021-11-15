import {useState , useEffect} from "react";
import ChatroomList from "../../components/ChatroomList";
import MsgRow from "../../components/MsgRow";
import { Picker } from 'emoji-mart-next'
import 'emoji-mart-next/css/emoji-mart.css'

export default function Live_chat() {
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
    useEffect(()=>{
        setChatrooms([...data])
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
                    // placeholder={placeholder}
                />
            </div>
            </div>
                <div className={"chatlist_ss"}>
                    <div  className={"chatlist_ss_filter"}><button>All Team </button>     <button>filter</button></div>
                    <div  className={"chatlist_ss_list"}>
                        {chatrooms.map((d , index)=>{
                            return (<ChatroomList chatroom={d} key={index}/>)
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
                        <button>search</button>
                        <button>refresh</button>
                        <button>robot</button>
                    </div>
                </div>
                <div className={"chatroom_records"}>
                    {records.map((r , i)=>{
                      return  <MsgRow msg={r} key={i}/>
                    })}
                </div>
                <div className={"chatroom_input_field"}>
                    {/*<Picker style={{ position: 'absolute', bottom: '20px', right: '20px' }} />*/}
                    <textarea className={"chatroom_textField"} placeholder={"Type something…"} name="message" id="message" autoComplete={true}></textarea>
                    <div className={"chatroom_input_btn_gp"}>
                        <div className={"left_btn_gp"}>
                            <div>.</div>
                            <div>.</div>
                            <div>.</div>
                            <div>.</div>
                            <div>.</div>
                        </div>
                        <div className={"right_btn_gp"}>
                            <button>voice</button>
                            <button>send</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"chatroom_info"}>
                <div className={"contact"}>
                    <div className={"profile_pic"}><img src={data[0].profile_pic_url} alt=""/></div>
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
                        <div className={"tab"}>file</div>
                    </div>
                    <div className={"content"}>
                        content
                    </div>
                </div>
            </div>
        </div>
    )
}