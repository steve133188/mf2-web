import {useContext,useState , useEffect, useRef} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import ChatroomList from "../../components/ChatroomList";
import MsgRow from "../../components/livechat/ChatMessage/MsgRow";
import { Picker } from 'emoji-mart-next'
import 'emoji-mart-next/css/emoji-mart.css'
import RobotSwitch from "../../components/livechat/RobotSwitch";
import axios from "axios";
import {MaskGroup1,MaskGroup2,Mask_Group_3,Mask_Group_4,Mask_Group_5,VoiceMsg,SendButton,RefreshBTN,ResearchBTN} from "../../public/livechat/MF_LiveChat_Landing/chat_svg";
import { AddButtonSVG } from "../../public/livechat/MF_LiveChat_Landing/Search_Bar/filter-icon";
import ChatroomInfo from "./chatroom_info/chatroom_info";
import ChatlistFilter from "./serach_filter/filter.js/chatlist_filter";
import Team_Select from "../../components/livechat/filter/Team_Select";
import Newchatroom from "./newchatroomPanel";

export default function Live_chat() {
    const base_url ='https://e9bf-118-140-233-2.ngrok.io'
    const tempdata = [
        {
            name:"John Davidson",
            last_msg_time:"03:45PM",
            team:"A",
            unreadCount:1,
            is_pin:true,
            channel:"whatsapp",
            profile_pic_url:"https://p0.pikrepo.com/preview/876/531/orange-tabby-cat-sitting-on-green-grasses-selective-focus-photo.jpg",
        },
        {
            name:"2",
            last_msg_time:"03:45PM",
            team:"B",
            unreadCount:1,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://imgv3.fotor.com/images/side/Fotor-powerful-photo-enhancement-tools.jpg",
        },
        {
            name:"1",
            last_msg_time:"03:45PM",
            team:"A",
            unreadCount:1,
            is_pin:false,
            channel:"whatsapp",
            profile_pic_url:"https://imgv3.fotor.com/images/side/Create-graphic-designs-easily-with-Fotor.png",
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
            body:"text",
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
        {
            message_id:"234585258",
            body:"I say hi too. How are you today? I saw you and your mum at cinema .",
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
        {
            message_id:"234585359",
            body:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp",
            type:"sticker",
            vCard:["","",""],
            author:null,
            fromMe:false,
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
        {
            message_id:"234585359",
            body:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp",
            type:"sticker",
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
        {
            message_id:"234585359",
            body:"livechat/tempSourceStore/bensound-dubstep.ogg",
            type:"voice",
            vCard:["","",""],
            author:null,
            fromMe:false,
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
        {
            message_id:"234585359",
            body:"livechat/tempSourceStore/bensound-dubstep.mp3",
            type:"voice",
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
        {
            message_id:"234585359",
            body:"https://www.youtube.com/watch?v=Il0S8BoucSA",
            type:"url",
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
        {
            message_id:"234585359",
            body:"https://twitter.com/Vimeo/status/1461731229422735363?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet",
            type:"url",
            vCard:["","",""],
            author:null,
            fromMe:false,
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
        {
            message_id:"234585259",
            body:["Attachement.pdf"],
            type:"attachment",
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
        {
            message_id:"234585259",
            body:"https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
            type:"video",
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
        {
            message_id:"234585259",
            body:"/livechat/tempSourceStore/00112345.mov",
            type:"video",
            vCard:["","",""],
            author:null,
            fromMe:false,
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
        {
            message_id:"234585259",
            body:"https://thebossmagazine.com/wp-content/uploads/2020/05/charles-deluvio-1-nx1QR5dTE-unsplash-scaled.jpg",
            // body:"/livechat/tempSourceStore/png-clipart-computer-icon-digital-marketing-social-media-marketing-strategy-marketing-file-search-engine-optimization-content-marketing.png",
            type:"image",
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
        {
            message_id:"234585269",
            body:"https://p0.pikrepo.com/preview/876/531/orange-tabby-cat-sitting-on-green-grasses-selective-focus-photo.jpg",
            type:"imageCaption",
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
        {
            message_id:"234585269",
            body:"https://p0.pikrepo.com/preview/876/531/orange-tabby-cat-sitting-on-green-grasses-selective-focus-photo.jpg",
            type:"imageCaption",
            vCard:["","",""],
            author:null,
            fromMe:false,
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
    const teamdata = [{name:"TeamA",id:"A"},{name:"TeamB",id:"B"},{name:"TeamC",id:"C"}]

    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)
    const [chatrooms , setChatrooms] = useState([])
    const [selectedChat , setSelectedChat] = useState()
    const [chatrecord , setChatrecord] = useState([])
    const [chatSearch, setSearch] = useState(false)
    const [isRobotOn , setIsRobotOn] = useState(false)
    const [chatboxSearch, setChatBoxSearch] = useState("")
    const [isExpand , setIsExpand] = useState(false)
    const [isEmojiOn,setEmojiOn] = useState(false)
    const [ChatButtonOn,setChatButtonOn] = useState(false)
 
    const [contacts, setContacts] = useState([]);
    const [users ,setUsers] =useState([])
    const [teams ,setTeams] =useState([])
    const [tags ,setTags] =useState([])
    const [selectedTags ,setSelectedTags] =useState([])
    const [selectedUsers ,setSelectedUsers] =useState([])
    const [selectedTeams ,setSelectedTeams] =useState("")
    const [selectedChannel ,setSelectedChannel] =useState([])
    const [filter , setFilter] = useState({agent:[] , team:"" , channel:[] , tag:[] })
    const [filteredTags ,setFilteredTags] =useState([])
    const [filteredUsers ,setFilteredUsers] =useState([])
    const [filteredData , setFilteredData] = useState([])
    
    const [isShow , setIsShow] =useState(false)
    const [isFilterOpen , setIsFilterOpen] = useState(false)
    const[start,setStart] = useState(false)


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
    const fetchContacts = async () =>{
        const data = await contactInstance.getAllContacts()
        setContacts(tempdata)
        setFilteredData(data)
        console.log(data)
    }

    const getUsers = async ()=>{
        const data = await userInstance.getAllUser()
        setUsers(data)
        setFilteredUsers(data)
    }
    const getTeams = async ()=>{
        const data = await orgInstance.getOrgTeams()
        setTeams(data)
    }

    const getTags = async ()=>{
        const data = await adminInstance.getAllTags()
        setTags(data)
        setFilteredTags(data)

    }

    const messagesSearchRef = useRef()

    const scrollToMSG = () => {
        messagesSearchRef.current?.scrollIntoView({behavior: "auto", block:"nearest"})
    }
    useEffect(()=>{
        // console.log(chatboxSearch)
        scrollToMSG(),[chatboxSearch]
    })

    //////Chatroom End Point
    const messagesEndRef = useRef()
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "auto", block: "end"})
    }
    useEffect(()=>{
        scrollToBottom(),[chatrecord]
    })///////

    async function handleChatRoom  (target){
        const data = await getChatRecord(target)
        setChatrecord(data)
    }
    // const chat_record =getChatRooms
    // console.log(getChatRooms)
    useEffect(()=>{

        if(!start){return  setStart(true)}
       
        console.log(chatrooms)
        console.log(selectedTeams)
        // setChatrooms(...chatrooms,chatrooms.push["2"]
        //     // chatrooms.filter()
        // )


    } , [selectedTeams])
    
    useEffect(async ()=>{
        // const data = await getChatRooms()
        setChatrooms(tempdata)
        // const r = await getChatRecord(data[0].id.user)
        setChatrecord(records)
    } , [])




    const [inputvalue,setInputValue] = useState("")
    const [emojied,setEmoji] = useState("")


    const attachFile = useRef()
    const fileAttach = () =>{
        attachFile.current.click();
    }
    const wrapperRef = useRef();

    const handleClickOutside = (event) => {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target)
    ) {
        setChatButtonOn("");
        }
    };
    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[])
    useEffect(    async () => {
        if(user.token!=null) {
            await fetchContacts()
            await getTags()
            await getUsers()
            await getTeams()
        }
        // setSelectedUsers([])
        // setSelectedContacts([])
    },[]);

    useEffect(()=>{
        console.log("contacts")
        console.log(contacts)
        console.log(ChatButtonOn)
    },[ChatButtonOn])

    const advanceFilter =()=>{
        setFilter({team:selectedTeams, agent:[...selectedUsers] ,channel: [...selectedChannel] , tag:[...selectedTags]
        })
        console.log("filter",filter)
        // const teamFiltered = contacts.filter(data=>{

        const agentFiltered = contacts.filter(data=>{
            if(selectedUsers.length==0){
                return data
            }
            return data.agents.some(el=>selectedUsers.includes(el))
        })
        console.log("agent:",agentFiltered)

        const tagFiltered = agentFiltered.filter(data=>{
            if(selectedTags.length ==0){
                return data
            }
            return data.tags.some(el=>selectedTags.includes(el))
        })
        console.log("tagFiltered:",tagFiltered)

        const channelFiltered = tagFiltered.filter(data=>{
            if(selectedChannel.length ==0){
                return data
            }
            return data.channels.some(el=>selectedChannel.includes(el))
        })
        console.log("channelFiltered:",channelFiltered)

        const teamFiltered = tagFiltered.filter(data=>{
            if(selectedTeams.trim() ==""){
                return data
            }
            return data.team==selectedTeams
        })
        console.log("teamFiltered:",teamFiltered)
        setFilteredData([...teamFiltered])
    }



    return (
        <div className="live_chat_layout">
            <div className={"chat_list"}><div className={"search_ss"}><div className="mf_icon_input_block  mf_search_input" style={{minWidth:"none",maxWidth:"320px"}} >
                <div className={"mf_inside_icon mf_search_icon "} > </div>
                <input
                    className={"mf_input mf_bg_light_grey"}
                    // type={type}
                    // value={state}
                    // onChange={handleChange}
                    placeholder={"Search"}
                />
                {/* <Livechat/> */}
            </div>
            </div>
                <div className={"chatlist_ss"} style={{}}>
                    <div  className={"chatlist_ss_filter"}>
                        <div className={"filter_bar_left"}>
                            <button className={"select_group"} onClick={()=>{setIsShow(!isShow);console.log(isShow)}}>
                                <div className={"group_icon"} ></div>
                                {/* All Team <div className={"arrow_icon"} ></div> */}
                              
                                <Team_Select  show={isShow} head={"All Team"} top_head={selectedTeams==""?"All Team":selectedTeams}  submit={advanceFilter}  customeDropdown={true}>
                                    <li onClick={()=> {
                                        setSelectedTeams("");
                                        advanceFilter()
                                    }}>All Team</li>
                                    {/* {teams.map((team)=>{ */}
                                    {teamdata.map((team)=>{
                                        return(<li  id={team.name} key={team.id} onClick={(e)=>{setSelectedTeams(e.target.id);advanceFilter();}}> {team.name}</li>)
                                    })}
                                </Team_Select>
                            </button>

                            <div className={"filter_box "+(isFilterOpen?"active":"")} onClick={()=>setIsFilterOpen(!isFilterOpen)}>
                                        <div className={"filter_icon"}></div>
                            </div>
                        </div>
                            <div className={"add_button"} onClick={()=>{setChatButtonOn("")}}  style={{display:ChatButtonOn=="m0"?"block":"none"}}>
                            <AddButtonSVG c={"#D0E9FF"}/>
                            </div>
                            <div className={"add_button"} onClick={()=>{setChatButtonOn("m0")}}  style={{display:ChatButtonOn!=="m0"?"block":"none"}}>
                            <AddButtonSVG c={"#f5f6f8"} />
                            </div>
                    </div>
                        <div className={"chatlist_filter_box"} style={{display:isFilterOpen?"flex":"none"}}>
                             <ChatlistFilter click={()=>setIsFilterOpen(!isFilterOpen)} channel={setSelectedChannel}/>
                        </div>
                        <div className={"chatlist_newChat_box"} style={{display:ChatButtonOn=="m0"?"flex":"none"}}>
                                    <Newchatroom contacts={contacts} />
                        </div>
                    <div  className={"chatlist_ss_list"} style={{display:!isFilterOpen?"":"none"}}>
                        {/* {filteredData.map((d , index)=>{ */}
                        {chatrooms.map((d , index)=>{

                            return (<> <ChatroomList chatroom={d} key={index} className={+(index==0&& "active")} onClick={()=>{handleChatRoom(d)}}/> </>)
                        })}
                    </div>
                </div>
            </div>
            <div className={"chatroom"}>
                <div className={"chatroom_top"}>
                    <div className={"chatroom_top_info"}>
                        <img src="https://p0.pikrepo.com/preview/876/531/orange-tabby-cat-sitting-on-green-grasses-selective-focus-photo.jpg" alt="icon"/>
                        <div className={"chatroom_name"}>Name</div>
                        <div className={"chatroom_channel"}>Channel</div>
                    </div>
                    <div className={"chatroom_top_btn_gp"}>
                        <div className={"chatroom_top_btn chatroom_top_btn_research " +( chatSearch?"research_active":"")} ><ResearchBTN onclick={()=>{setSearch(!chatSearch)}}/>
                            <div className={"search_bar"} style={{display:chatSearch?"flex":"none"}}>     
                                <input type="text" className={"search_area"} onChange={(e)=>setChatBoxSearch(e.target.value)} placeholder={"Search"}></input>
                            </div>
                        </div>
                        <div className={"chatroom_top_btn chatroom_top_btn_refresh"}><RefreshBTN/></div>
                        <div className={"chatroom_top_btn chatbot_switch"}>
                            <RobotSwitch isOn={isRobotOn} handleToggle={()=>setIsRobotOn(!isRobotOn)} onColor="#2198FA" />
                        </div>
                    </div>
                </div>
                <div ref={messagesSearchRef} className={"chatroom_records"}>
                    {chatrecord.map((r , i)=>{
                        return  <>
                        <MsgRow msg={r} key={i} /> 
                      </>
                    })}
                    <div ref={messagesEndRef}> {console.log("done")}</div>
                </div>
                
                <div className={"chatroom_input_field "+(isExpand?"expand":"")}>
                    <textarea className={"chatroom_textField"} placeholder={"Type something…"} name="message" id="message" ></textarea>
                    <Picker onSelect={(emoji)=>setEmoji(emoji)} style={ChatButtonOn=="m2"?{display:'block',position: 'absolute', bottom: '90px'}:{display:'none' }} />
                    <div className={"chatroom_input_btn_gp"}>
                        <div className={"left_btn_gp"} ref={wrapperRef}>
                            <div className={"sticker_btn"+(ChatButtonOn=="m1"?" active":"") } onClick={()=>setChatButtonOn("m1")}  
                                    ><MaskGroup1/></div>
                            <div className={"emoji_btn "+(ChatButtonOn=="m2"?" active":"") }   onClick={()=>{setEmojiOn(!isEmojiOn);setChatButtonOn("m2")}} 
                                    // style={isEmojiOn?{backgroundColor:"#d0e9ff",background: "#d0e9ff 0% 0% no-repeat padding-box",borderRadius: "10px",fill:"#2198FA"}:{fill:"#8b8b8b"}}  
                                    ><MaskGroup2/>
                                    {/* <Picker style={{ position: 'absolute', bottom: '35px', right: '20px' }} /> */}
                                   
                            </div>
                   
                            <div className={"attach_btn "+(ChatButtonOn=="m3"?"":"") } onClick={()=>{setChatButtonOn("m3");fileAttach()}}  
                            // style={isEmojiOn?{fill:"#2198FA"}:{fill:"#8b8b8b"}} 
                                    >
                                    <input type="file" name="fileAttach" ref={attachFile} onChange={(e)=>{setInputValue(e.target.value);console.log(e.target)}} ></input>
                                    <Mask_Group_3/>
                                   </div>
                            <div className={"template_btn" +(ChatButtonOn=="m4"?" active":"") } onClick={()=>setChatButtonOn("m4")}   
                                    ><Mask_Group_4/></div>
                            <div className={"payment_btn"+(ChatButtonOn=="m5"?" active":"") } onClick={()=>setChatButtonOn("m5")}   
                                    ><Mask_Group_5/></div>
                        </div>

                        <div className={"right_btn_gp"}>
                            <div className={"voice_btn"}><VoiceMsg/></div>
                            <div className={"send_btn"}><SendButton/></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={"chatroom_info"}>
                <div className={"contact_card"}>
                    <div className={"profile_pic"}><Avatar src={data[0].profile_pic_url} alt="" sx={{ width: 100, height: 100 }}/></div>
                    <div className={"contact_detail"}>
                        <div className={"contact_detail_name"}>{data[0].name}</div>
                        <div className={"contact_detail_channel"}>+852 1833833</div>
                        <div className={"contact_detail_team"}> Team{data[0].team}</div>
                    </div>
                    <div className={"config"}> ... </div>
                </div>

                <div className={"tabs_field"}>
                    <div className={"tabs_row"}>
                   
                        <div className={"tab active"}>info</div>
                        <div className={"tab"}>note</div>
                    </div>
                    <div className={"content"} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        content
                        <ContantDetail />
                    </div>
                </div>
            </div> */}
            <ChatroomInfo data={tempdata}/>
        </div>
    )
}