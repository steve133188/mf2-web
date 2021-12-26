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
import {listMF2TCOCHATROOMS, listMF2TCOMESSAGGES} from "../../src/graphql/queries";
import { createMF2TCOCHATROOM} from "../../src/graphql/mutations"
import { subscribeToNewMessage} from "../../src/graphql/subscriptions"
import Avatar from "@mui/material/Avatar";
import StickerBox from "../../components/livechat/sticker/sticker_box";
import QuickReply from "../../components/livechat/quickReply/quickreply";
import searchFilter from "../../helpers/searchFilter";

export default function Live_chat() {

    const stickersList = [
        // {id:"1",name:"sticker_set_1",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"}]},
        // {id:"232",name:"sticker_set_2",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
        // {id:"weq",name:"sticker_set_3",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
        // {id:"va",name:"bobby",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
    
        ]
    const replyTemplateList = [
            {id:1,name:"Greating",set:[{name:"Morning",content:"Good morning, have a nice day!"}]},
            {id:4,name:"Questioning",set:[{name:"First meet",content:"What can i help you?"},{name:"Follow up",content:"That's great. Let me introduce you our service."}]},
            {id:2,name:"Merry Chrismax",set:[{name:"Set1",content:"Merry Christmas! I hope you receive one blessing after another this coming year!"},{name:"Set2",content:"Merry Christmas, and may all your Christmases be white!!!"}]},
            {id:3,name:"Happy new year",set:[{name:"賀詞一",content:"恭賀新春!"},{name:"賀詞二",content:"心想事成!"},{name:"賀詞三",content:"身體健康!"}]},
           
        ]



    const [stickerData ,setStickerData] = useState([])
    const [replyData ,setReplyData] = useState([])
    useEffect(()=>{
        setStickerData(stickersList)
        setReplyData(replyTemplateList)
    },[])
    let subscriptions ;
    const {contactInstance ,mediaInstance, userInstance ,adminInstance ,orgInstance, user , messageInstance} = useContext(GlobalContext)
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
        phone:"",
        message:"",
        type:"text"
    })
    const getChatrooms = async ()=>{
        const result = await API.graphql(graphqlOperation(listMF2TCOCHATROOMS))
        console.log("get chatrooms" ,result.data.listMF2TCOCHATROOMS.items)
        setChatrooms([...result.data.listMF2TCOCHATROOMS.items])
       
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
    const getCustomerbyID = async (id)=>{
        console.log(id)
        const result = await contactInstance.getContactById(id)
        setChatUser(result.data)
    }
    const [contacts, setContacts] = useState([]);
    const [users ,setUsers] =useState([])
    const [teams ,setTeams] =useState([])
    const [tags ,setTags] =useState([])
    const [selectedTags ,setSelectedTags] =useState([])
    const [selectedUsers ,setSelectedUsers] =useState([])
    const [chatUser , setChatUser] = useState({})
    const [selectedTeams ,setSelectedTeams] =useState([])
    const [selectedChannels ,setSelectedChannels] =useState([]);
    const [filter , setFilter] = useState({agent:[] , team:"" , channel:[] , tag:[] })
    const [chatroomsInfo, setChatroomsInfo] = useState([])
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
        console.log(data,"all contacts")
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
    const scrollToMSG = () => {messagesSearchRef.current?.scrollIntoView({behavior: "auto", block:"nearest"})}
    useEffect(()=>{scrollToMSG(),[chatboxSearch]})
    //////Chatroom End Point
    const messagesEndRef = useRef()
    const scrollToBottom = () => {messagesEndRef.current?.scrollIntoView({behavior: "auto", block: "end"})}
    useEffect(()=>{scrollToBottom(),[chatrecord]})
    ///////

    async function handleChatRoom(chatroom){
        setSelectedChat(chatroom)
        console.log("selected Chat" , selectedChat)
        const phone = selectedChat.phone
        setTypedMsg({...typedMsg ,phone:phone})
        console.log("typed message" , typedMsg)
        setChatroomMsg([])
        await getChatroomMessage(selectedChat.room_id)
        await getCustomerbyID(selectedChat.customer_id)
    }

    const getChatroomMessage = async()=>{
        const result = await API.graphql(graphqlOperation(listMF2TCOMESSAGGES,{limit:1000 , filter:{room_id:{eq:selectedChat.room_id}}}))
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

    const toggleSticker = () =>{
        setChatButtonOn(ChatButtonOn=="m1"?"":"m1");
        setIsExpand(isExpand&&ChatButtonOn=="m1"?false:true);

    }
    const toggleEmoji = () =>{
        setChatButtonOn(ChatButtonOn=="m2"?"":"m2");
        setEmojiOn(!isEmojiOn);
        setIsExpand(false);

    }
    const toggleFile= (e) =>{
        setChatButtonOn(ChatButtonOn=="m3"?"":"m3");
        setIsExpand(false);
        fileAttach()
        // console.log(e.terget.files[0])
        setAttachment("e.terget.name")

    }
    const toggleQuickReply = () =>{
        setChatButtonOn(ChatButtonOn=="m4"?"":"m4");
        setIsExpand(isExpand&&ChatButtonOn=="m4"?false:true);
        
        
    }
    const toggleM5 = () =>{
        setChatButtonOn(ChatButtonOn=="m5"?"":"m5");
        setIsExpand(false);

    }
    
    const attachFile = useRef()
    const fileAttach = () =>{
        attachFile.current.click();
    }
    const replySelect = async(e) =>{
        console.log("replySelect")
        e.preventDefault();
        setTypedMsg({...typedMsg , message: e.target.childNodes[1].innerHTML})
        setChatButtonOn("");
        setIsExpand(false)
    }
    const stickerSend =  async (e)=>{
        console.log(e.target)
        e.preventDefault();
        const data = {message:e.target.src , phone : typedMsg.phone ,chatroom_id:selectedChat.id,type:"sticker"||0}
        console.log(data);
        setTypedMsg({...typedMsg , message: ""})
        const res = await messageInstance.sendTextMessage(data)
        setTimeout(async ()=>{
            await getChatroomMessage()
            scrollToBottom()
        },1500)
        setChatButtonOn("");
        setIsExpand(false)
    }
    const sendMessageToClient = async (e)=>{
        e.preventDefault()
        console.log("selected Chat",selectedChat)
        const data = {message:typedMsg.message , phone : selectedChat.phone ,chatroom_id:selectedChat.room_id}
        console.log("data :" , data)
        setTypedMsg({...typedMsg , message: ""})
        const res = await messageInstance.sendTextMessage(data)
        setIsExpand(false)

        // setTimeout(async ()=>{
        //     await getChatroomMessage()
        //     scrollToBottom()
        // },1500)

    }
    const wrapperRef = useRef();

    const handleClickOutside = (event) => {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target)
    ) {
        setChatButtonOn("");
        setIsExpand(false);
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
            // await getChatroomMessage()
            // TODO need to implete receiver id to sub input

            // API.graphql(graphqlOperation(subscribeToNewMessage ,{sender:"85260957729"} ))
            //     .subscribe({
            //         next: (chatmessage)=>{
            //             console.log("chatmsg:" , chatroomMsg)
            //             const newMessage = chatmessage.value.data.subscribeToNewMessage
            //             const prevMessage = chatroomMsg.filter(msg => msg.timestamp!= newMessage.timestamp)
            //             console.log(newMessage)
            //             let updatedPost = [ ...chatroomMsg,newMessage ]
            //             setChatroomMsg(updatedPost)
            //             scrollToBottom()
            //         }
            //     })
        }
    },[]);
    useEffect(()=>{
        API.graphql(graphqlOperation(subscribeToNewMessage ,{room_id:selectedChat.room_id} ))
            .subscribe({
                next: (chatmessage)=>{
                    console.log("chatmsg:" , chatroomMsg)
                    const newMessage = chatmessage.value.data.subscribeToNewMessage
                    const prevMessage = chatroomMsg.filter(msg => msg.timestamp!= newMessage.timestamp)
                    console.log(newMessage)
                    let updatedPost = [ ...chatroomMsg,newMessage ]
                    setChatroomMsg(updatedPost)
                    scrollToBottom()
                }
            })
    },[selectedChat])

    
    useEffect(()=>{
        const new1=[]
        chatrooms.map(chat=>{ const cc = contacts.filter(c=>c.id==chat.customer_id)
            return new1.push({...chat, agents:cc[0].agents,agentsOrgan:cc[0].organiztion,tags:cc[0].tags,})
        })
        setFilteredData(new1)
        setChatroomsInfo(new1)
    },[chatrooms])

    const advanceFilter =()=>{
        setFilter({team:[...selectedTeams], agent:[...selectedUsers] ,channel: [...selectedChannels] , tag:[...selectedTags]
        })
        console.log("filter",filter)

        const channelFiltered = chatroomsInfo.filter(data=>{
            if(selectedChannels.length ==0){
                return data
            }
            return selectedChannels.includes(data.channel)
        })
        console.log(selectedChannels)
        console.log("channelFiltered:",channelFiltered)
        console.log(selectedUsers)

        const agentFiltered = channelFiltered.filter(data=>{
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


        const teamFiltered = tagFiltered.filter(data=>{
        // const teamFiltered = channelFiltered.filter(data=>{
            if(selectedTeams.length ==0){
                return data
            }
            return data.team==selectedTeams
        })
        console.log("teamFiltered:",teamFiltered)
        setFilteredData([...teamFiltered])
    }

    const toggleSelectChannels = e => {
        const { checked ,id} = e.target;
        setSelectedChannels([...selectedChannels, id.toLowerCase()]);
        if (!checked) {
            setSelectedChannels(selectedChannels.filter(item => item !== id.toLowerCase()));
        }
    };
    const toggleSelectUsers = e => {
        const { checked ,id} = e.target;
        setSelectedUsers([...selectedUsers, id]);
        if (!checked) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        }
        console.log(selectedUsers)
    };
    const toggleSelectTags = e => {
        const { checked ,id} = e.target;
        setSelectedTags([...selectedTags, id]);
        if (!checked) {
            setSelectedTags(selectedTags.filter(item => item !== id));
        }
        console.log(selectedTags)
    };
    const clear=()=>{
        setSelectedUsers([])
        setSelectedChannels([])
        setSelectedTags([])
        setSelectedTeams([])
    }
    useEffect(()=>{
        advanceFilter
        console.log(filteredData,"filteredData")
    },[filteredData])
    return (
        <div className="live_chat_layout">
            <div className={"chat_list"}>
             
                <div className={"chatlist_ss"} style={{}}>
                    <div  className={"chatlist_ss_filter"}>
                        <div className={"filter_bar_left"}>
                               <div className={"search_ss"}>
                                   <div className="mf_icon_input_block  mf_search_input"  >
                                        <div className={"mf_inside_icon mf_search_icon "} > </div>
                                        <input
                                            className={"mf_input mf_bg_light_grey"}
                                            // type={type}
                                            // value={state}
                                            onChange={(e)=> {
                                                searchFilter(e.target.value , chatroomsInfo,(new_data)=>{
                                                    setFilteredData(new_data)
                                                })
                                            }}
                                            placeholder={"Search"}
                                        />
                                    {/* <Livechat/> */}
                                        </div>
                                </div>
                {/* <button className={"select_group"} onClick={()=>{setIsShow(!isShow);console.log(isShow)}}>
                                <div className={"group_icon"} ></div>
                                <Team_Select  show={isShow} head={"All Team"} top_head={selectedTeams==""?"All Team":selectedTeams}  submit={advanceFilter}  customeDropdown={true}>
                                    <li onClick={()=> {
                                        setSelectedTeams("");
                                        advanceFilter()
                                    }}>All Team</li>

                                    {teamdata.map((team)=>{
                                        return(<li  id={team.name} key={team.id} onClick={(e)=>{setSelectedTeams(e.target.id);advanceFilter();}}> {team.name}</li>)
                                    })}
                                </Team_Select>
                            </button> */}

                            
                        </div>
                        <div className={"filter_box "+(isFilterOpen?"active":"")} onClick={()=>setIsFilterOpen(!isFilterOpen)}>
                                        <div className={"filter_icon"}></div>
                            </div>
                            <div className={"add_button"} onClick={()=>{setChatButtonOn("")}}  style={{display:ChatButtonOn=="m0"?"block":"none"}}>
                            <AddButtonSVG c={"#D0E9FF"}/>
                            </div>
                            <div className={"add_button"} onClick={()=>{setChatButtonOn("m0")}}  style={{display:ChatButtonOn!=="m0"?"block":"none"}}>
                            <AddButtonSVG c={"#f5f6f8"} />
                            </div>
                    </div>
                        <div className={"chatlist_filter_box"} style={{display:isFilterOpen?"flex":"none",overflowY:"scroll"}}>
                             <ChatlistFilter click={()=>setIsFilterOpen(!isFilterOpen)} channel={toggleSelectChannels} tag={toggleSelectTags} confirm={advanceFilter} cancel={clear} agents={toggleSelectUsers} />
                        </div>
                        <div className={"chatlist_newChat_box"} style={{display:ChatButtonOn=="m0"?"flex":"none"}}>
                                    <Newchatroom contacts={contacts} />
                        </div>
                    <div  className={"chatlist_ss_list"} style={{display:!isFilterOpen?"":"none"}}>
                        {filteredData.map((d , index)=>{
                            return (<> <ChatroomList chatroom={d} key={index} className={+(index==0&& "active")} onClick={async ()=>{ await handleChatRoom(d)}}/> </>)
                        })}
                    </div>
                </div>
            </div>
            <div className={"chatroom"}>
                <div className={"chatroom_top"}>
                    <div className={"chatroom_top_info"}>


                        {/*{selectedChat!==-1 && (*/}
                        {/*    <>*/}
                        {/*    <Avatar src={selectedChat.avatar|| null} alt="icon"/>*/}
                        {/*        <div className={"chatroom_name"}>{selectedChat.customer_name|| null}</div>*/}
                        {/*    <div className={"chatroom_channel"}>{selectedChat.channel|| null}</div>*/}
                        {/*    </>*/}
                        {/*    )}*/}

                        {/*<img src="https://p0.pikrepo.com/preview/876/531/orange-tabby-cat-sitting-on-green-grasses-selective-focus-photo.jpg" alt="icon"/>*/}
                        <Avatar src={ null} alt="icon" />
                        <div className={"chatroom_name"} style={{fontSize:"18px"}}>{selectedChat.name}</div>
                        <div className={"chatroom_channel"}>{selectedChat.channel?<img src={`/channel_SVG/${selectedChat.channel}.svg`} />:""}</div>
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
                    <div ref={messagesEndRef}> {console.log("done")}</div>
                </div>

                <div className={"chatroom_input_field "+(isExpand?"expand":"")}>

                    <textarea className={"chatroom_textField"} placeholder={"Type something…"} name="message" id="message" value={typedMsg.message} onChange={handleTypedMsg} style={{display:(ChatButtonOn=="m1"?"none":"block")}} ></textarea>
                    <Picker  onSelect={(emoji)=> {
                        setTypedMsg({...typedMsg,message: typedMsg.message+emoji.native})
                    }} style={ChatButtonOn=="m2"?{display:'block',position: 'absolute', bottom: '90px'}:{display:'none' }} />
                        <div style={{maxWidth:"95%",display:(ChatButtonOn=="m1"?"block":"none"),whiteSpace: 'nowrap' }} onClick={toggleSticker }>
                            <StickerBox data={stickerData} stickerSend={stickerSend} />
                            </div>
                        <div style={{maxWidth:"95%",height:"100%",display:(ChatButtonOn=="m4"?"block":"none"),whiteSpace: 'nowrap' }} onClick={toggleQuickReply }>
                            <QuickReply data={replyData} onclick={replySelect}/>
                        </div>
                    
                    <div className={"chatroom_input_btn_gp"}>
                        <div className={"left_btn_gp"} ref={wrapperRef}>
                            <div className={"sticker_btn"+(ChatButtonOn=="m1"?" active":"") } onClick={toggleSticker }
                                    ><MaskGroup1/></div>
                            <div className={"emoji_btn "+(ChatButtonOn=="m2"?" active":"") }   onClick={ toggleEmoji }
                                    // style={isEmojiOn?{backgroundColor:"#d0e9ff",background: "#d0e9ff 0% 0% no-repeat padding-box",borderRadius: "10px",fill:"#2198FA"}:{fill:"#8b8b8b"}}
                                    ><MaskGroup2/>
                                    {/* <Picker style={{ position: 'absolute', bottom: '35px', right: '20px' }} /> */}

                            </div>

                            <div className={"attach_btn "+(ChatButtonOn=="m3"?"":"") } onClick={toggleFile }
                            // style={isEmojiOn?{fill:"#2198FA"}:{fill:"#8b8b8b"}}
                                    >
                                    {/*<input type="file" name="fileAttach" ref={attachFile} onChange={(e)=>{setInputValue(e.target.value);console.log(e.target)}} ></input>*/}
                                    <input type="file" name="fileAttach" ref={attachFile} onChange={upload} onClick={toggleFile}></input>
                                    <Mask_Group_3/>
                                   </div>
                            <div className={"template_btn" +(ChatButtonOn=="m4"?" active":"") } onClick={toggleQuickReply}
                                    ><Mask_Group_4/></div>
                            <div className={"payment_btn"+(ChatButtonOn=="m5"?" active":"") } onClick={toggleM5}
                                    ><Mask_Group_5/></div>
                        </div>

                        <div className={"right_btn_gp"}>
                            <div className={"voice_btn"}><VoiceMsg size={12}/></div>
                            <div className={"send_btn"} onClick={sendMessageToClient}><SendButton/></div>
                        </div>
                    </div>
                </div>
            </div>
            <ChatroomInfo data={selectedChat}/>
        </div>
    )
}