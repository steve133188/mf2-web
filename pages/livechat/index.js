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

import {Storage , API , graphqlOperation} from "aws-amplify";
import {  listMF2TCOCHATROOMS , listMF2TCOMESSAGGES} from "../../src/graphql/queries";
import { createMF2TCOCHATROOM} from "../../src/graphql/mutations"
import { onCreateMF2TCOMESSAGGE} from "../../src/graphql/subscriptions"
import {Avatar} from "@mui/material";

export default function Live_chat() {

    const teamdata = [{name:"TeamA",id:"A"},{name:"TeamB",id:"B"},{name:"TeamC",id:"C"}]

    const {contactInstance , userInstance ,adminInstance ,orgInstance, user , messageInstance} = useContext(GlobalContext)
    const [chatrooms , setChatrooms] = useState([])
    const [chatroomMsg , setChatroomMsg]  = useState([])
    const [attachment , setAttachment ] = useState([])
    const [selectedChat , setSelectedChat] = useState({})
    const [chatrecord , setChatrecord] = useState([])
    const [chatSearch, setSearch] = useState(false)
    const [isRobotOn , setIsRobotOn] = useState(false)
    const [chatboxSearch, setChatBoxSearch] = useState("")
    const [isExpand , setIsExpand] = useState(false)
    const [isEmojiOn,setEmojiOn] = useState(false)
    const [ChatButtonOn,setChatButtonOn] = useState(false)
    const [typedMsg , setTypedMsg] = useState({
        channel:"whatsapp",
        phone:"85269358633",
        message:"",
        type:"text"
    })
    const getChatrooms = async ()=>{
        const result = await API.graphql(graphqlOperation(listMF2TCOCHATROOMS))
        console.log(result.data.listMF2TCOCHATROOMS.items)
        setChatrooms(result.data.listMF2TCOCHATROOMS.items)
    }
    const fetchAttachment = async ()=>{
        let imageKeys = await Storage.list('')
        imageKeys = await Promise.all(imageKeys.map(async k=>{
            const signedUrl = await Storage.get(k.key)
            return signedUrl
        }))
        console.log("imgKeys : " , imageKeys)
        setAttachment(imageKeys)
    }
    const upload = async (e) =>{
        const file = e.target.files[0]
        const result = await Storage.put(file.name , file )
        console.log("result : " , result)
        await fetchAttachment()
    }
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


    const handleTypedMsg = e =>{
        const {name , value} = e.target
        console.log(name , " : " , value)
        setTypedMsg({
            ...typedMsg,
            [name]:value
        })
    }
    const fetchContacts = async () =>{
        const data = await contactInstance.getAllContacts()
        setContacts(data)
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

    async function handleChatRoom  (chatroom){
        setSelectedChat(chatroom)
        setChatroomMsg(await getChatroomMessage)
        // const data = await getChatRecord(target)
        // setChatrecord(data)
    }

    const getChatroomMessage = async()=>{
        const result = await API.graphql(graphqlOperation(listMF2TCOMESSAGGES,{limit:50}))
        console.log(result.data.listMF2TCOMESSAGGES.items)
        setChatroomMsg(result.data.listMF2TCOMESSAGGES.items)
    }
    // useEffect(async ()=>{
    //     if(!start){  setStart(true)}
    //     const data = await getChatrooms()
    //     setChatrooms(data)
    //     console.log(chatrooms)
    //     console.log(selectedTeams)
    // } , [selectedTeams])





    const [inputvalue,setInputValue] = useState("")
    const [emojied,setEmoji] = useState("")


    const attachFile = useRef()
    const fileAttach = () =>{
        attachFile.current.click();
    }

    const sendMessageToClient = async (e)=>{
        e.preventDefault()
        const data = {message:typedMsg.message , phone : typedMsg.phone ,chatroom:selectedChat.id||0}
        setTypedMsg({...typedMsg , message: ""})
        const res = await messageInstance.sendTextMessage(data)
        await getChatroomMessage()
        scrollToBottom()
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
            await getChatrooms()
            await getChatroomMessage()
        }
    },[]);

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


                        {selectedChat.room_id && (
                            <>
                            <Avatar src={selectedChat.avatar|| null} alt="icon"/>
                                <div className={"chatroom_name"}>{selectedChat.customer_name|| null}</div>
                            <div className={"chatroom_channel"}>{selectedChat.channel|| null}</div>
                            </>
                            )}

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
                    {chatroomMsg.map((r , i)=>{
                        return  <>
                        <MsgRow msg={r} key={i} />
                      </>
                    })}
                    {/*<div ref={messagesEndRef}> {console.log("done")}</div>*/}
                </div>

                <div className={"chatroom_input_field "+(isExpand?"expand":"")}>
                    <textarea className={"chatroom_textField"} placeholder={"Type something…"} name="message" id="message" value={typedMsg.message} onChange={handleTypedMsg}></textarea>
                    <Picker  onSelect={(emoji)=> {
                        setEmoji(emoji);
                        console.log(emoji)
                        setTypedMsg({...typedMsg,message: typedMsg.message+emoji.native})
                    }} style={ChatButtonOn=="m2"?{display:'block',position: 'absolute', bottom: '90px'}:{display:'none' }} />
                    <div className={"chatroom_input_btn_gp"}>
                        <div className={"left_btn_gp"} ref={wrapperRef}>
                            <div className={"sticker_btn"+(ChatButtonOn=="m1"?" active":"") } onClick={()=>setChatButtonOn("m1")}
                                    ><MaskGroup1/></div>
                            <div className={"emoji_btn "+(ChatButtonOn=="m2"?" active":"") }   onClick={()=>{setEmojiOn(!isEmojiOn); if(!isEmojiOn)setChatButtonOn("") ; if(isEmojiOn)setChatButtonOn("m2");}}
                                    // style={isEmojiOn?{backgroundColor:"#d0e9ff",background: "#d0e9ff 0% 0% no-repeat padding-box",borderRadius: "10px",fill:"#2198FA"}:{fill:"#8b8b8b"}}
                                    ><MaskGroup2/>
                                    {/* <Picker style={{ position: 'absolute', bottom: '35px', right: '20px' }} /> */}

                            </div>

                            <div className={"attach_btn "+(ChatButtonOn=="m3"?"":"") } onClick={()=>{setChatButtonOn("m3");fileAttach()}}
                            // style={isEmojiOn?{fill:"#2198FA"}:{fill:"#8b8b8b"}}
                                    >
                                    {/*<input type="file" name="fileAttach" ref={attachFile} onChange={(e)=>{setInputValue(e.target.value);console.log(e.target)}} ></input>*/}
                                    <input type="file" name="fileAttach" ref={attachFile} onChange={upload} ></input>
                                    <Mask_Group_3/>
                                   </div>
                            <div className={"template_btn" +(ChatButtonOn=="m4"?" active":"") } onClick={()=>setChatButtonOn("m4")}
                                    ><Mask_Group_4/></div>
                            <div className={"payment_btn"+(ChatButtonOn=="m5"?" active":"") } onClick={()=>setChatButtonOn("m5")}
                                    ><Mask_Group_5/></div>
                        </div>

                        <div className={"right_btn_gp"}>
                            <div className={"voice_btn"}><VoiceMsg/></div>
                            <div className={"send_btn"} onClick={sendMessageToClient}><SendButton/></div>
                        </div>
                    </div>
                </div>
            </div>
            <ChatroomInfo />
        </div>
    )
}