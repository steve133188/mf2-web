import {useContext,useState , useEffect, useRef,createRef} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import ChatroomList from "../../components/ChatroomList";
import MsgRow from "../../components/livechat/ChatMessage/MsgRow";
import { Picker } from 'emoji-mart-next'
import 'emoji-mart-next/css/emoji-mart.css'
import RobotSwitch from "../../components/livechat/RobotSwitch";
import {MaskGroup1,MaskGroup2,Mask_Group_3,Mask_Group_4,Mask_Group_5,VoiceMsg,SendButton,RefreshBTN,ResearchBTN} from "../../public/livechat/MF_LiveChat_Landing/chat_svg";
import { AddButtonSVG } from "../../public/livechat/MF_LiveChat_Landing/Search_Bar/filter-icon";
import ChatroomInfo from "../../components/livechat/chatroom_info";
import ChatlistFilter from "../../components/livechat/serach_filter/filter.js/chatlist_filter";
import Team_Select from "../../components/livechat/filter/Team_Select";
import Newchatroom from "../../components/livechat/newchatroomPanel";
import VoiceRecorder from "../../components/VoiceRecorder";
import {Storage , API , graphqlOperation} from "aws-amplify";
import {
    listChatrooms,
    queryMessage,
    getMessageByMsgId
} from "../../src/graphql/queries";
import {createChatroom, updateChatroom} from "../../src/graphql/mutations"
import {
    subscribeChatroom,
    suballChatroom,
} from "../../src/graphql/subscriptions"
import Avatar from "@mui/material/Avatar";
import StickerBox from "../../components/livechat/sticker/sticker_box";
import QuickReply from "../../components/livechat/quickReply/quickreply";
import searchFilter from "../../helpers/searchFilter";
import CountDownTimer from "../../components/CountDownTimer";
import NotificationList from "../../components/NotificationList";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { getURL } from "next/dist/shared/lib/utils";
import { padding } from "@mui/system";
import BigPlayButton from "video-react/lib/components/BigPlayButton";
import Player from "video-react/lib/components/Player";
import Profile from "../../components/profile";
import EditProfileForm from "../../components/pageComponents/EditProfileForm";
import {useRouter} from "next/router";
import Forward from "../../components/livechat/forward";
import {  Tooltip } from "@mui/material";
import { forward } from "video-react/lib/actions/player";
import Chatroom from "../../components/livechat/chatroom/Chatroom";


export default function Live_chat() {

    const replyTemplateList = [
            {id:0,name:<img src={`/channel_SVG/WABA.svg`}/>,set:[{name:"感謝你與Tiffany & Co. 香港WhatsApp官方帳戶聯繫上!",content:"感謝你與Tiffany & Co. 香港WhatsApp官方帳戶聯繫上!"},{name:"我們希望可以時刻為您提供最新的品牌資訊及更全面的顧客服務。",content:"我們希望可以時刻為您提供最新的品牌資訊及更全面的顧客服務。"}]},
            {id:1,name:"Greating",set:[{name:"Morning",content:"Morning"}]},
            {id:4,name:"Questioning",set:[{name:"What can i help you?",content:"What can i help you?"},{name:"Follow up",content:"Follow up"}]},
            {id:2,name:"Merry Chrismax",set:[{name:"Merry Christmas! I hope you receive one blessing after another this coming year!",content:"Merry Christmas! I hope you receive one blessing after another this coming year!"}
            ,{name:"Merry Christmas, and may all your Christmases be white!!!",content:"Merry Christmas, and may all your Christmases be white!!!"}
            ,{name:"Super mario~~ Jump!!!Super mario~~ Jump!!!Super mario~~ Jump!!!",content:"Super mario~~ Jump!!!Super mario~~ Jump!!!Super mario~~ Jump!!!"}
        ]},
            {id:3,name:"Happy new year",set:[{name:"恭賀新春!",content:"恭賀新春!"},{name:"心想事成!",content:"心想事成!"},{name:"身體健康",content:"身體健康!"}]},

        ]
        const router = useRouter()
        const {contactInstance ,mediaInstance, userInstance ,tagInstance ,orgInstance, user , messageInstance , chatHelper  ,selectedChat , setSelectedChat , getUserChannel} = useContext(GlobalContext)
        const [chatrooms , setChatrooms] = useState([])
        const [chatroomMsg , setChatroomMsg]  = useState([])
        const [attachment , setAttachment ] = useState([])
        const [chatSearch, setSearch] = useState(false)
        const [isRobotOn , setIsRobotOn] = useState(false)
        const [chatboxSearch, setChatBoxSearch] = useState("")
        const [isExpand , setIsExpand] = useState(false)
        const [isReply , setIsReply] = useState(false)
        const [isEmojiOn,setEmojiOn] = useState(false)
        const [ChatButtonOn,setChatButtonOn] = useState(false)
        const [whatsappChan , setWhatsappChan] = useState()
        const [subscribe,setSubscribe] = useState()
        const [subscribePin,setSubscribePin] = useState()
        const [subscribeToNewMessage,setSubscribeToNewMessage] = useState()
        const [isUpdating , setIsUpdating] = useState(false)
        const [stickerData ,setStickerData] = useState({folders:[] , files:[]})
        const [replyData ,setReplyData] = useState([])
        const [replyMsg, setReplyMsg] = useState("")
        const [quoteMsg,setQuotaMsg] = useState({})
        const [reply,setReply] =useState(false)
        const [whatsapp , setWhatsapp ] = useState()
        const [searchResult, setSearchResult] = useState([])
        const [typedMsg , setTypedMsg] = useState({
            channel:"whatsapp",
            phone:"",
            message:"",
            message_type:"text"
        })
        const [chatroomsSub , setChatroomsSub] = useState()

        const [isEditProfileShow , setIsEditProfileShow] = useState(false)
        const [users ,setUsers] =useState([])
        const [teams ,setTeams] =useState([])
        const [tags ,setTags] =useState([])
        const [selectedTags ,setSelectedTags] =useState([])
        const [selectedUsers ,setSelectedUsers] =useState([])
        const [selectedContacts ,setSelectedContacts] =useState([])
        const [chatUser , setChatUser] = useState({})
        const [selectedTeams ,setSelectedTeams] =useState([])
        const [selectedChannels ,setSelectedChannels] =useState([]);
        const [filter , setFilter] = useState({agent:[] , team:"" , channel:[] , tag:[] })
        const [chatroomsInfo, setChatroomsInfo] = useState([])
        const [filteredTags ,setFilteredTags] =useState([])
        const [filteredUsers ,setFilteredUsers] =useState([])
        const [filteredData , setFilteredData] = useState([])
        const [filteredContacts , setFilteredContacts] = useState([])

        const [isWABAStart , setWABA] =useState(true)
        useEffect(()=>{
            console.log(isWABAStart,"check state")
        },[isWABAStart])
        // const [totalUnread, setTotalUnread] = useState(0)
        const [unread,setUnread] = useState(false)
        const [unassigned,setUnassigned] = useState(false)
        const [isFilterOpen , setIsFilterOpen] = useState(false)
        const [pinChat , setPinChat] = useState([])
        const [mediaUrl , setMediaUrl] = useState('')
        const [isMedia , setIsMedia ] = useState(false)
        const [lastMsgFromClient , setLastMsgFromClient] = useState("")
        const [isForward,setIsForward] = useState(false)

    const getOwnPinChatList = async ()=>{
        const user_id = user.user.user_id
        const res = await API.graphql(graphqlOperation(listChatrooms , {filter:{user_id: {eq:user_id} , is_pin: {eq:true}} ,limit:1000}))
            .then(response=>{
            setPinChat(prev=>response.data.listChatrooms.items)
        })
            .catch(err=>alert(err))
    }
    const subChatrooms= async ()=>{
        let user_id= user.user.user_id
        if(chatroomsSub) chatroomsSub.unsubscribe()
        console.log("subscribe all start")
        const sub = API.graphql(graphqlOperation(suballChatroom))
            .subscribe({
                next: async (chat) => {
                    console.log("new message" , chat)
                    const newChat = chat.value.data.suballChatroom
                    await getAllChatrooms()
                }
            })
        console.log("subscribe chatrooms start : " , sub)
        setChatroomsSub(prev=>sub)
    }

    const updateChatroomUnread = async (chat)=>{
        console.log("update chatroom start")
        return  await API.graphql(graphqlOperation(updateChatroom , {input:{user_id:chat.user_id  , room_id:chat.room_id , unread:0 , channel:chat.channel } }))
            .then(async res =>{
                const data = res.data.updateChatroom
                const index = filteredData.findIndex(d=>d.room_id==chat.room_id)

                if (index!==-1&&index!==0){
                    const start = filteredData.slice(0,index)
                    const end = filteredData.slice(index+1)
                    setFilteredData(prev=>[start ,prev[index] , end ])
                }
                console.log("handle unread "  , data)
            }).catch(err=>{
                console.log(err)

            })
    }
    async function handleChatRoom(chatroom){
        if(chatroom.name == selectedChat.name && chatroom.room_id === selectedChat.room_id) return
        if(chatroom.channel !== "WABA")setLastMsgFromClient("")
        console.log(chatroom, "while select")
        setChatroomMsg([])
        if (chatroom.unread>0  )await updateChatroomUnread(chatroom);
        setSelectedChat(chatroom)
        console.log(selectedChat,"chat check")
        // setLastMsgFromClient(chatroom.last_msg_time)
        // setSelectedChat(prev=>chatroom)
        setTypedMsg(typedMsg=>({...typedMsg ,phone:selectedChat.phone}))
        await getCustomerbyID(chatroom.customer_id)
        if(typeof chatroom.customer_id !=="number") return
        console.log("selected Chat" , selectedChat)
        console.log("typed message" , typedMsg)
    }



    const getChatroomMessage = async()=>{
            const result = await API.graphql(graphqlOperation(queryMessage,{room_id:selectedChat.room_id}))
                .then(async res=>{
                    setChatroomMsg([])
                    setChatroomMsg([...res.data.queryMessage.items])
                    console.log("getChatroomMessage",res.data.queryMessage.items)
                    if(res.data.queryMessage.items!==-1){
                        let notFromMe = res.data.queryMessage.items.filter(msg=>{
                            return msg.from_me ==false
                    })
                    if(notFromMe.length==0) return
                    notFromMe = notFromMe.pop()
                    setLastMsgFromClient(notFromMe.timestamp)
                }
            }).catch(err=>console.log("get message errors" ,err))
    }

    const getChatrooms = async ()=>{
        const user_id = parseInt(user.user.user_id.toString() )
        const result = await API.graphql(graphqlOperation(listChatrooms , {limit:1000 , filter:{user_id:{eq:user_id} , is_pin:{eq:false} }}))
            .then(async res =>{
                const chatroom = res.data.listChatrooms.items
                return chatroom
            })
            .catch(error => console.log(error))
        await getOwnPinChatList()
        setChatrooms(result)
        setFilteredData(result)
    }
    const getAllChatrooms = async (next)=>{
        const result = await API.graphql(graphqlOperation(listChatrooms , {limit:1000 , nextToken:next}))
            .then(async res =>{
                let chatroom = res.data.listChatrooms.items
                if(res.data.listChatrooms.nextToken){
                    console.log("Have Next Token")
                    await getAllChatrooms(res.data.listChatrooms.nextToken)
                }
                setChatrooms(prev=>[...prev,...chatroom])

                chatroom = chatroom.filter(ch=>{
                    return ch.channel == "WABA"
                })
                console.log("chatrooms:",chatroom)
                setFilteredData(prev=>[...prev , ...chatroom])
                // setPinChat(pin)
            })
            .catch(error => console.log(error))

    }



    // const listAllChat = async (next)=>{
    //     const result = await API.graphql(graphqlOperation(listChatrooms , {limit:1000 , nextToken:next}))
    //         .then(async res =>{
    //             let chatroom = res.data.listChatrooms.items
    //             if(res.data.listChatrooms.nextToken){
    //                 const data = await listAllChat(res.data.listChatrooms.nextToken)
    //             }
    //             setChatrooms(chatroom)
    //             chatroom = chatroom.filter(ch=>{
    //                 return ch.channel == "WABA"
    //             })
    //             setFilteredData(chatroom)
    //             // setPinChat(pin)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             return null
    //         })
    //
    //     return result
    // }

    const fetchAttachment = async ()=>{
        let imageKeys = await Storage.list('')
        imageKeys = await Promise.all(imageKeys.map(async k=>{
            const signedUrl = await Storage.get(k.key)
            return signedUrl
        }))
        console.log("imgKeys : " , imageKeys)
        setAttachment(imageKeys)
    }
    const filePreviewOldState = {name:"",size:0,type:""}
    const [filePreview,setFilePrevier] = useState(filePreviewOldState)
    useEffect(()=>{
        if(ChatButtonOn!="m3") setFilePrevier(filePreviewOldState)
    },[ChatButtonOn])


    useEffect(async ()=>{
        if(user.token){
          const chan =  await getUserChannel(parseInt(user.user.user_id))
           setWhatsappChan(chan)
        }
    },[])


    const getCustomerbyID = async (id)=>{
        console.log(id,"chatroom selected")
        const result = await contactInstance.getContactById(id)
        console.log(result,"chatroom selected result")
        setChatUser(result)
    }

    const [contacts, setContacts] = useState([]);


    useEffect(()=>{
        setReplyData(replyTemplateList)
        console.log("init mf2chat" , selectedChat)
    },[])

    const fetchContacts = async () =>{
        const data = await contactInstance.getAllContacts()
        console.log(data,"contact fetch at start")
        setContacts(data)
        setFilteredContacts(data)
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
        const data = await tagInstance.getAllTags()
        setTags(data)
        setFilteredTags(data)
    }


    const whatsappFilter = (chats)=>{
        return chats.filter(chat=>chat.channel=="Whatsapp")
    }
    const WABAFilter = (chats)=>{
        return chats.filter(chat=>chat.channel=="WABA")
    }

    const teamFilter =(agents , filter ,contact, chats)=>{
        const gps= agents.filter(d=>{;return filter.includes(d.team_id.toString())})
        const gp = contact.filter(c=> {return gps.filter(g=> {return c.agents_id.some(el=>{return el.user_id==g.user_id})   }).length>0  }  )
        return chats.filter(ch=>{;return gp.map(g=>g.customer_id).includes(ch.customer_id);})
    }
    const agentfilter =(agents , filter ,contact, chats)=>{
        console.log(agents , filter , contact, "agent filter testing ")
        const gps= agents.filter(d=>filter.includes( d.user_id.toString() ))
        const gp = contact.filter(c=> {return gps.filter(g=> {return c.agents_id.some(el=>{return el.user_id==g.user_id})   }).length>0  }  )
        return chats.filter(ch=>{;return gp.map(g=>g.customer_id).includes(ch.customer_id);})
    }
    const tagFilter =(agents , filter , chats)=>{

        const gp= agents.filter(a=>a.tags.filter(d=>{return filter.includes(d.tag_name)}).length>0)
        console.log("TagF" , gp)
        return chats.filter(ch=>{return gp.map(g=>g.customer_id).includes(parseInt(ch.customer_id))})
    }
    const messagesSearchRef = useRef()
    const scrollToMSG = () => {messagesSearchRef.current?.scrollIntoView({behavior: "auto", block:"nearest"})}
    useEffect(()=>{scrollToMSG()
        ,[chatboxSearch]})
    //////Chatroom End Point
    const messagesEndRef = useRef()
    const scrollToBottom = () => {messagesEndRef.current?.scrollIntoView({behavior: "auto", block: "end"})}
    useEffect(()=>{
        setTimeout(()=>{
            scrollToBottom()
        },500)
        }
        ,[chatroomMsg])

    ///////

    // async function handleChatRoom(chatroom){
    //     if(chatroom == selectedChat) return ;
    //     if(chatroom.channel !== "WABA") setLastMsgFromClient("")
    //     setChatroomMsg([])
    //     setSelectedChat(chatroom)
    //     setTypedMsg(typedMsg=>({...typedMsg ,phone:selectedChat.phone}))
    //     if (chatroom.unread!==0)await updateChatroomUnread(chatroom);
    //     await getCustomerbyID(chatroom.customer_id)
    //     if(typeof chatroom.customer_id !=="number") return
    //     console.log("selected Chat" , selectedChat)
    //     console.log("typed message" , typedMsg)
    // }




    const searchBy =()=>{
            // e.preventDefault();
            // document.dispatchEvent(new KeyboardEvent("keydown",{keyCode:70,which:70}))
            // document.dispatchEvent(new KeyboardEvent("keydown",{ metaKey: true ,which:90}))
            console.log("1")
            // document.dispatchEvent(new KeyboardEvent('keydown',{keyCode:91}))
        }



    const ReferechHandle=async()=>{
        console.log("refershing")
        await getAllChatrooms();
        await getChatroomMessage();
            // await subChatrooms()
    }


    const replyClick=click=>{
        console.log(click,"done donedone")
        setReplyMsg(click)


        if(click==replyMsg){setReplyMsg("");setQuotaMsg("")}
    }
    const confirmReply=()=>{
        setReply(!reply)
        const quote = chatroomMsg.filter(e=>{return replyMsg==(e.timestamp)})
        const m={...quote[0],hasQuotedMsg:true,quote:quote[0].message_id,quote_from:quote.sender}
        console.log(quote[0],"raw data to quote")
        setQuotaMsg(m)
        setReplyMsg("")
        setChatButtonOn(ChatButtonOn=="mr"?"":"mr");
        setIsReply(isReply&&ChatButtonOn=="mr"?false:true);

        setTypedMsg({...typedMsg ,message_type: "text",hasQuotedMsg:true,media_url:quote.media_url,is_media:true,sign_name:quote.sign_name})
        // setQuotaMsg("")
    }
    const confirmForward = ()=>{
        setIsForward(!isForward)
        setReplyMsg("")
    }

    const clearForward = ()=>{
        setSelectedContacts([])
    }

    const handleForward =async()=>{

            const data = {...quoteMsg,message:quoteMsg.body,message_type:quoteMsg.message_type,channel:selectedChat.channel ,media_url:quoteMsg.media_url ,is_media: quoteMsg.is_media ,is_forwarded:true,quote:quoteMsg.message_id,hasQuotedMsg:false}

            selectedContacts.map(async e=>{
                const recipients = contacts.filter(c=>parseInt(e)==c.customer_id)
                if(recipients[0].channels[0]&&recipients[0].channels[0]=="WABA") {
                    const senddata = {...data,room_id:e,recipient:e,phone:recipients[0].country_code.toString()+recipients[0].phone.toString()}
                console.log("data to be send out", senddata)

                const res = await messageInstance.sendMessage(senddata).catch(error => console.log(error))
                ;return }
                if(recipients[0].channels[0]&&recipients[0].channels[0]=="") {
                    const senddata = {...data,room_id:e+"-"+user.user.user_id,recipient:e}
                console.log("data to be send out", senddata)

                const res = await messageInstance.sendMessage(senddata).catch(error => console.log(error))
                ;return }

            })
            setTypedMsg({...typedMsg , message: ""})
            if(quoteMsg){
                setQuotaMsg({})
            }
            if(isMedia){
                setIsMedia(false)
                setFilePrevier(filePreviewOldState)
                setMediaUrl("")

            }
            setTypedMsg({channel:"",phone:"",message:"",message_type:"text"})
            setIsExpand(false)
            setIsReply(false)
            setChatButtonOn("")
            setReplyMsg("")

        clearForward();

    }


    // useEffect(()=>{
    //     console.log(quoteMsg)
    // },[quoteMsg])
    const handleClickOutside = (event) => {

        // if (wrapperRef1.current &&!wrapperRef1.current.contains(event.target)){
        //     setChatButtonOn("");
        //     setIsExpand(false);
        //     setIsReply(false);
        //     setQuotaMsg("")
        //     attachFile.current.value&& fileClear()
        //     filePreview.size>0?setFilePrevier(filePreviewOldState):""
        //     // console.log(attachFile.current.target)
        //   }
    };

    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[])

    const getStickers = async ()=>{
        const {folders , files} = await mediaInstance.getStickers()
        const arrfolders = Array.from(folders)

        setStickerData({folders: arrfolders , files: files})
        console.log("stickers data" , stickerData)

    }

    const fetchHandle = async() => {
        await fetchContacts()
        await getTags()
        await getUsers()
        await getTeams()
    }

    useEffect(    async () => {
        if(user.token!=null) {
            await getAllChatrooms()
            await subChatrooms()
            await fetchContacts()
            // await getTags()
            // await getUsers()
            // await getTeams()
            // await fetchHandle()
            // await getChatrooms()
            await getStickers()
        }
    },[]);

    const handleSub = async (chatroom)=>{
        if(subscribe)subscribe.unsubscribe()
        const sub =await API.graphql(graphqlOperation(    subscribeChatroom,{room_id:chatroom.room_id ,channel:selectedChat.channel } ))
            .subscribe({
                next: async (chatmessage)=>{
                    if(router.pathname == "/livechat") await updateChatroomUnread(chatroom)
                    const newMessage = chatmessage.value.data.subscribeChatroom
                    // let updatedPost = [ ...chatroomMsg,newMessage ]
                    setChatroomMsg(chatroomMsg=>[...chatroomMsg ,newMessage ])
                    if(!newMessage.from_me)setLastMsgFromClient(newMessage.timestamp)
                    setTimeout(()=>{
                        scrollToBottom()
                    },500)
                    console.log("new message: " , newMessage)
                    // setNotis({type:"newMsg",channel:newMessage.channel??"whatsapp",content:newMessage.body,sender:newMessage.sender})
                }
            })
        setSubscribe(prev=> sub)
    }

    useEffect(async ()=>{
        if(selectedChat)  await getChatroomMessage() ;
        await handleSub(selectedChat)

    },[selectedChat])

    const unassignFilter = (contact ,chats)=>{
        console.log(contact)
        const data = contact.filter(c=>c.agents_id.length==0)
        console.log(data,"unassign")
        return chats.filter(chat=>{console.log(chat);return data.includes(parseInt(chat.user_id))})
    }
    useEffect(()=>{
        console.log(selectedContacts)
    },[selectedContacts])
    const advanceFilter =()=>{
        setFilter({team:[...selectedTeams], agent:[...selectedUsers] ,channel: [...selectedChannels] , tag:[...selectedTags]})
        let newData = [...chatrooms]
        if(selectedTeams.length>0) newData = teamFilter(users , selectedTeams ,contacts, newData);
        if(selectedUsers.length>0) newData = agentfilter(users , selectedUsers ,contacts, newData);
        if(selectedTags.length>0)  newData = tagFilter(contacts , selectedTags , newData);
        if(selectedChannels.includes("Whatsapp"))newData = whatsappFilter(newData);
        if(selectedChannels.includes("WABA"))newData=WABAFilter(newData);
        if(selectedChannels.includes("Messager"))newData=[];
        if(selectedChannels.includes("Wechat"))newData=[];
        if(unread)newData = newData.filter(data => data.unread>0)
        if(unassigned)newData = unassignFilter(contacts , newData)
        setFilteredData([...newData])
    }
    const unreadHandle = () =>{
        setUnread(!unread);
        console.log(unread)
        advanceFilter();
    }
    const unassigneHandle = () =>{
        setUnassigned(!unassigned)
        console.log(unassigned)
        advanceFilter();
    }
    const chatbotHandle = () =>{
        setUnassigned(!chatbot)
        console.log(chatbot)
        advanceFilter();
    }

    const toggleSelectChannels = e => {
        const { checked ,id} = e.target;
        setSelectedChannels([...selectedChannels, id]);
        if (!checked) {
            setSelectedChannels(selectedChannels.filter(item => item !== id));
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
    const toggleSelectTeams = e => {
        const { checked ,id} = e.target;

        console.log(e.target.id,id,"electaedTeams in filter")
        setSelectedTeams([...selectedTeams, id]);
        if (!checked) {
            setSelectedTeams(selectedTeams.filter(item => item !== id));
        }
        console.log(selectedTeams,"selectedTeam")
    };
    const toggleSelectContacts = e => {
        const { checked ,id} = e.target;
        setSelectedContacts([...selectedContacts, id]);
        if (!checked) {
            setSelectedContacts(selectedContacts.filter(item => item !== id));
        }
        console.log(selectedContacts)
    };
    const isContainContact = (id) => {

        if (selectedContacts) {
            return selectedContacts.some(e => e == id.toString())
        }
        else { return false }
    }
    const [isClear,setClear] = useState(false)
    const clear=()=>{
        setSelectedUsers([])
        setSelectedChannels([])
        setSelectedTags([])
        setSelectedTeams([])
        setClear(true)
        advanceFilter()

    }
    useEffect(()=>{

        isClear?setClear(false):""
    },[isClear])
    // const [doubleList,setDoubleList] = useState([])
    // const [List,setList] = useState([{phone:"123"},])
    // useEffect(()=>{
    //     console.log(filteredData,"chatroom volumn")

    // },[filteredData])
    // useEffect(()=>{
    // console.log(doubleList,"doubledoubledouble")
    // filteredData.map(e=>{
    //   if(  e.phone=="85265779712"){console.log(e, "double")}
    // })

    // },[doubleList])

    // useEffect(async ()=>{
    //     if(selectedChat.unread>0){
    //         await updateChatroomUnread(selectedChat)
    //     }
    // },[selectedChat])
    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) ;
        if(isEditProfileShow) ;
        setIsEditProfileShow(!isEditProfileShow)
    }
    const refreshChatrooms = async ()=>{
        clear()
        await getChatrooms()
    }
    const updateChatroomPin = async (input)=>{
        await chatHelper.toggleIsPin(input ,(newData)=>{
            // setIsUpdating(true)
        const oldFilter = filteredData.filter(d=> d.name !== newData.name)
        const newPinChat = pinChat.filter(d=>d.name !== newData.name)
        console.log("oldFilter : " , oldFilter)
        console.log("newPinChat : " , newPinChat)
        // const indexOfDate = filteredData.indexOf(el=>newData.room_id==el.room_id)
        if(newData.is_pin ){
            setFilteredData(filteredData=> [...oldFilter])
            setPinChat(chatrooms=>[newData , ...newPinChat])
        }else{
            setFilteredData(filteredData=> [newData, ...oldFilter ])
            setPinChat(chatrooms=>[ ...newPinChat ])
        }
    }); }
    const [resultMoreThanOne, setResultMoreThanOne] = useState(false);
    //function find chatroomMsg.id by keyword as list
    const search = e => {
        if(e.target.value==""){setSearchResult("")}
        if(e.target.value!=""){
            const result = chatroomMsg.filter(i => {
                return i.body.toLowerCase().includes(e.target.value.toLowerCase());
            });
            console.log(result,"search result");
            setSearchResult(result);
            if(result.length==0)setResultMoreThanOne(false)
            if(result.length>0) {document.getElementById(result[result.length-1].timestamp).scrollIntoView({behavior: "smooth"});}
            if(result.length>1) setResultMoreThanOne(true)
        }

    }



    //record and send audio
    const getAudioFile = async (audioFile) => {
        console.log("calling getAudioFile")
        if(audioFile){
            console.log(audioFile,"dfasdfd")
            const path =URL.createObjectURL(audioFile)
            setIsMedia(true)
            setIsExpand(true);

        setChatButtonOn("m3");
        var file = new File([audioFile], new Date().toISOString().replace(/:/g,"_").replace(/\./g,"_") +'.oga')
        const result = await mediaInstance.putVoice(file)
        setMediaUrl(result)
        setFilePrevier({name:(new Date().toISOString().replace(/:/g,"_").replace(/\./g,"_")),size:audioFile.size,type:"AUDIO",path:path})
        setTypedMsg({...typedMsg ,message_type: "AUDIO"})
        console.log(result,"audioFile")}

    }
    return (
        <div className="live_chat_layout">
            <div style={{position:"absolute",backgroundColor:isEditProfileShow? "white":"",width:isEditProfileShow?"100vw":"0",height:"100%",    zIndex: 136}}>

            {isEditProfileShow?  (<Profile handleClose={toggleEditProfile}><EditProfileForm data={chatUser } toggle={toggleEditProfile}/></Profile>):null}
            </div>
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
                                                console.log(e.target.value ,"searching chatlist")
                                                searchFilter(e.target.value , chatrooms,(new_data)=>{
                                                    setFilteredData(new_data);
                                                    console.log(new_data,"after searching");
                                                })
                                            }}
                                            placeholder={"Search"}
                                        />
                                    {/* <Livechat/> */}
                                        </div>
                                </div>
                        </div>
                        <div className={"filter_box "+(isFilterOpen?"active":"")} onClick={async()=>{ setIsFilterOpen(!isFilterOpen);!isFilterOpen?await fetchHandle():"" ;}}>
                                        <div className={"filter_icon"}></div>
                            </div>
                            <div className={"add_button"} onClick={()=>{setChatButtonOn("")}}  style={{display:ChatButtonOn=="m0"?"block":"none"}}>
                            <AddButtonSVG c={"#D0E9FF"}/>
                            </div>
                            <div className={"add_button"} onClick={()=>{setChatButtonOn("m0"),setIsFilterOpen(false)}}  style={{display:ChatButtonOn!=="m0"?"block":"none"}}>
                            <AddButtonSVG c={"#f5f6f8"} />
                            </div>
                    </div>
                        <div className={"chatlist_filter_box"} style={{display:isFilterOpen?"flex":"none",overflowY:"scroll"}}>
                           {isFilterOpen? <ChatlistFilter click={()=>setIsFilterOpen(!isFilterOpen)} channel={toggleSelectChannels} tag={toggleSelectTags} team={toggleSelectTeams} confirm={advanceFilter} clear={clear} unread={unreadHandle}
                             agents={toggleSelectUsers} unassigned={unassigneHandle}  isclear={isClear} />:""}
                        </div>
                        <div className={"chatlist_newChat_box"} style={{display:ChatButtonOn=="m0"?"flex":"none"}}>
                                    <Newchatroom contacts={contacts} setFilteredData={setFilteredData}/>
                        </div>
                    <ul  className={"chatlist_ss_list"} style={{display:!isFilterOpen?ChatButtonOn!=="m0"?"":"none":("none")}}>
                        {/*{pinChat.length!==0&&pinChat.map((d , index)=>{*/}
                        {/*    // return ( <ChatroomList  chatroom={d} key={index} chose={selectedChat} togglePin={updateChatroomPin} refresh={refreshChatrooms} className={" "+(index==0&& "active")} onClick={ (e)=>{e.preventDefault() ; e.stopPropagation(); handleChatRoom(d)}}/> )*/}
                        {/*    return ( <ChatroomList  chatroom={d} key={d.room_id} chose={selectedChat} togglePin={updateChatroomPin}  className={" "+(index==0&& "active")} onClick={ (e)=>{e.preventDefault() ; e.stopPropagation(); handleChatRoom(d)}}/> )*/}
                        {/*sort((first , second)=>{return second.unread-first.unread}).*/}
                        {/*})}*/}
                        {filteredData.length!==0&&filteredData.sort(function (a,b){return parseInt(b.last_msg_time)- parseInt(a.last_msg_time)}).map((d , index)=>{
                            // return ( <ChatroomList  chatroom={d} key={index} chose={selectedChat} togglePin={updateChatroomPin} refresh={refreshChatrooms} className={" "+(index==0&& "active")} onClick={ (e)=>{e.preventDefault() ; e.stopPropagation(); handleChatRoom(d)}}/> )
                            return ( <ChatroomList  chatroom={d} selectedChat={selectedChat} key={index} chose={selectedChat} togglePin={updateChatroomPin}  className={" "+(index==0&& "active")} onClick={ (e)=>{e.preventDefault() ; e.stopPropagation();handleChatRoom(d)}}/> )
                        })}
                    </ul>
                </div>
            </div>
            <Chatroom
            selectedChat={selectedChat}
            lastMsgFromClient={lastMsgFromClient}
            msg={chatroomMsg}
            handleRobot={null}
            refresh={refreshChatrooms}
            confirmForward={confirmForward}
            confirmReply={confirmReply}
            />
            {/*<div className={"chatroom"}>*/}
            {/*    {selectedChat.room_id?*/}
            {/*        <>*/}


            {/*            /!*Map Chat record Start*!/*/}

            {/*            /!*Map Chat record End*!/*/}


            {/*            </> : <div className={"center_text"}> Select a conversation </div>}*/}

            {/*</div>*/}
            <ChatroomInfo data={selectedChat} click={toggleEditProfile }/>
        </div>
    )
}
