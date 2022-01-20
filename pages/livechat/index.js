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
import {listChatrooms, queryMessage, listMF2TCOCHATROOMS, listMF2TCOMESSAGGES} from "../../src/graphql/queries";
import {createChatroom, updateChatroom, updateMF2TCOCHATROOM} from "../../src/graphql/mutations"
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
        // setLastMsgFromClient(chatroom.last_msg_time)
        console.log(selectedChat,"chat check")
        // setSelectedChat(prev=>chatroom)
        setTypedMsg(typedMsg=>({...typedMsg ,phone:selectedChat.phone}))
        await getCustomerbyID(chatroom.customer_id)
        if(typeof chatroom.customer_id !=="number") return
        console.log("selected Chat" , selectedChat)
        console.log("typed message" , typedMsg)
    }

    const getChatroomMessage = async()=>{
            // let condition ={limit:1000 , filter:{room_id:{eq:selectedChat.room_id} , channel:{eq:selectedChat.channel} }}
            const result = await API.graphql(graphqlOperation(queryMessage,{room_id:selectedChat.room_id}))
                .then(async res=>{
                    setChatroomMsg([])
                    setChatroomMsg(prev=>[...res.data.queryMessage.items])
                    console.log("getChatroomMessage",chatroomMsg)
                    if(res.data.queryMessage.items!==-1){

                        let notFromMe = res.data.listMessages.items.filter(msg=>{
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
    const getAllChatrooms = async ()=>{
        const result = await API.graphql(graphqlOperation(listChatrooms , {limit:1000}))
            .then(async res =>{
                let chatroom = res.data.listChatrooms.items
                if(res.data.listChatrooms.nextToken) {

                }
                setChatrooms(chatroom)
                chatroom = chatroom.filter(ch=>{
                    return ch.channel == "WABA"
                })
                setFilteredData(chatroom)
                // setPinChat(pin)
            })
            .catch(error => console.log(error))
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
    const filePreviewOldState = {name:"",size:0,type:""}
    const [filePreview,setFilePrevier] = useState(filePreviewOldState)
    useEffect(()=>{
        if(ChatButtonOn!="m3") setFilePrevier(filePreviewOldState)
    },[ChatButtonOn])

    // useEffect(()=>{
    //     console.log(filePreview,"file attachment show")
    // },[filePreview])

    useEffect(async ()=>{
        if(user.token){
          const chan =  await getUserChannel(parseInt(user.user.user_id))
           setWhatsappChan(chan)
        }
    },[])

    const upload = async (e) =>{
        e.preventDefault()
        if(!e.target.files[0]){return}
        const file = e.target.files[0]
        console.log(URL.createObjectURL(file))
        const filetype =  messageInstance.mediaTypeHandler(file)
        console.log("file type 2" , filetype)
        const path =URL.createObjectURL(file)
        // console.log("result : " , result)
        setIsMedia(true)
        setIsExpand(true);
        setChatButtonOn("m3");
        if(filetype.includes("image")){
            const result = await mediaInstance.putImg(file , filetype)
            setFilePrevier({ name: file.name, size: file.size, type: "IMAGE", path: path,time:new Date() });
            setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "IMAGE"})
        }
        if(filetype.includes("video")){
            const result = await mediaInstance.putVideo(file , filetype)
            setFilePrevier({name:file.name,size:file.size,type:"VIDEO",path:path})
            setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "VIDEO"})
        }
        if(filetype.includes("audio")){
            const result = await mediaInstance.putVoice(file , filetype)
            setFilePrevier({name:file.name,size:file.size,type:"AUDIO",path:path})
            setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "AUDIO"})
        }
        if(filetype.includes("document")){
            const result = await mediaInstance.putDoc(file , filetype)
            setFilePrevier({name:file.name,size:file.size,type:"FILE",path:path})
            setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "FILE" , message:file.name })
        }

    }
    const getCustomerbyID = async (id)=>{
        console.log(id,"chatroom selected")
        const result = await contactInstance.getContactById(id)
        console.log(result,"chatroom selected result")
        setChatUser(result)
    }

    const [contacts, setContacts] = useState([]);

    const handleTypedMsg = e =>{
        const {name , value} = e.target
        setTypedMsg({
            ...typedMsg,
            [name]:value
        })
    }

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
        const gp = contact.filter(c=> {return gps.filter(g=> {return c.agents.some(el=>{return el.user_id==g.user_id})   }).length>0  }  )
        return chats.filter(ch=>{;return gp.map(g=>g.customer_id).includes(ch.customer_id);})
    }
    const agentfilter =(agents , filter ,contact, chats)=>{
        console.log(agents , filter , contact, "agent filter testing ")
        const gps= agents.filter(d=>filter.includes( d.user_id.toString() ))
        const gp = contact.filter(c=> {return gps.filter(g=> {return c.agents.some(el=>{return el.user_id==g.user_id})   }).length>0  }  )
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


    const toggleReply = () =>{
        setChatButtonOn(ChatButtonOn=="mr");
        setIsExpand(true);
    }
    const toggleSticker = () =>{
        setChatButtonOn(ChatButtonOn=="m1"?"":"m1");
        setIsExpand(isExpand&&ChatButtonOn=="m1"?false:true);
    }
    const toggleEmoji = () =>{
        setChatButtonOn(ChatButtonOn=="m2"?"":"m2");
        setEmojiOn(!isEmojiOn);
        setIsExpand(false);
    }
    const toggleFile= e =>{
        if(filePreview.size<2||!filePreview){
            setChatButtonOn(ChatButtonOn=="m3"?"":"m3");
            setIsExpand(false);
        // setIsExpand(isExpand&&ChatButtonOn=="m3"?false:true);
        // setAttachment(e.target.files[0])
        // console.log(e.target.files[0],"togglefile")
        // setAttachment(e.target.files[0].name)
        }
        fileAttach()
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
    const fileClear = () =>{
      attachFile.current.value = null
    }
    const replySelect = async(e) =>{
        e.preventDefault();
        setTypedMsg({...typedMsg , message: e.target.innerHTML})
        // setChatButtonOn("");
        // setIsExpand(false)
    }
    const stickerSend =  async e=>{
        e.preventDefault();
        console.log(selectedChat,"sticker for chat")
        console.log(e.target,"sticker")
        const imagetype= selectedChat.channel=="WABA"?"image":"sticker"
        console.log(imagetype)
        const data = {media_url:e.target.src , message:"", phone : selectedChat.phone ,room_id:selectedChat.room_id,message_type:imagetype,channel:selectedChat.channel,sign_name:user.user.username }
        console.log("sticker payload" , data);
        const res = await messageInstance.sendMessage(data)
        setTypedMsg({...typedMsg , message: ""})
        setChatButtonOn("");
        setIsExpand(false)
    }
    const onEnterPress = async (e) => {
        // if(e.keyCode == 13 && e.shiftKey == true) {}
            if(e.keyCode == 13 && !e.shiftKey) {
          e.preventDefault();
          // console.log("enter press")
          await sendMessageToClient(e)
        }
      }
    const searchBy =()=>{
    //    e.preventDefault();

            // document.dispatchEvent(new KeyboardEvent("keydown",{keyCode:70,which:70}))
            // document.dispatchEvent(new KeyboardEvent("keydown",{ metaKey: true ,which:90}))
            console.log("1")
            // document.dispatchEvent(new KeyboardEvent('keydown',{keyCode:91}))


    }
    const sendMessageToClient = async e=>{
        e.preventDefault()
        console.log("selected Chat",selectedChat)
        if(typedMsg.message ==""&&mediaUrl=="" &&!isMedia) return
        const data = {...typedMsg,message:typedMsg.message , phone :selectedChat.phone ,room_id:selectedChat.room_id,message_type:typedMsg.message_type,channel:selectedChat.channel ,media_url:mediaUrl ,is_media: isMedia ,sign_name:user.user.username,hasQuotedMsg:quoteMsg.hasQuotedMsg,quote:quoteMsg.message_id,quote_from:quoteMsg.sender}
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
        const res = await messageInstance.sendMessage(data).catch(error => console.log(error))
        console.log("data sent out :" , data)
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


    const wrapperRef1 = useRef();


    // useEffect(()=>{
    //     console.log(quoteMsg)
    // },[quoteMsg])
    const handleClickOutside = (event) => {

        if (wrapperRef1.current &&!wrapperRef1.current.contains(event.target)){
            setChatButtonOn("");
            setIsExpand(false);
            setIsReply(false);
            setQuotaMsg("")
            attachFile.current.value&& fileClear()
            filePreview.size>0?setFilePrevier(filePreviewOldState):""
            // console.log(attachFile.current.target)
          }
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
        const data = contact.filter(c=>c.agents.length==0)
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
            <div className={"chatroom"}>
                {selectedChat.room_id?
                    <>
                        <div className={"chatroom_top"}>
                            <div className={"chatroom_top_info"}>
                                <Avatar src={ null} alt="icon" />
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                    <div className={"chatroom_name"} style={{fontSize:"18px"}}>{selectedChat.name}
                                        <div className={"chatroom_channel"}>{selectedChat.channel?<img src={`/channel_SVG/${selectedChat.channel}.svg`} />:""}</div>
                                    </div>
                                    {selectedChat.channel=="WABA"&&lastMsgFromClient!==""&&chatroomMsg.length!==0? <div className="chatroom_name"><CountDownTimer dayString={lastMsgFromClient} timeCount={setWABA}/></div>:"" }
                                </div>
                        </div>
                            <div className={"chatroom_top_btn_gp"}>
                                <div className={"chatroom_top_btn chatroom_top_btn_research " +( chatSearch?"research_active":"")} >
                                    <ResearchBTN onclick={searchBy}/>
                                    {/* <ResearchBTN onclick={()=>{setSearch(!chatSearch)}}/> */}
                                    <div className={"search_bar"} style={{display:chatSearch?"flex":"none"}}>
                                        {/* <input type="text" className={"search_area"} onChange={(e)=>setChatBoxSearch(e.target.value)} placeholder={"Search"}></input> */}
                                        <input type="text" className={"search_area"} onChange={search} placeholder={"Search"}></input>
                                        <div className={"search_icon"}></div>
                                    </div>
                                </div>
                                <div className={"chatroom_top_btn chatroom_top_btn_refresh"} onClick={ReferechHandle}><RefreshBTN/></div>
                                <div className={"chatroom_top_btn chatbot_switch"}>
                                    <RobotSwitch isOn={isRobotOn} handleToggle={()=>setIsRobotOn(!isRobotOn)} onColor="#2198FA" />
                                </div>
                            </div>
                        </div>
                        <div
                            ref={messagesSearchRef}
                            className={"chatroom_records"}>
                            {chatroomMsg.map((r , i)=>{
                                return (
                                    <MsgRow isSearch={searchResult?(searchResult.some(result => result.timestamp==r.timestamp )&&searchResult.length >0 ):""}msg={r} key={i}
                                     d={filteredUsers}  c={contacts} replyMsg={replyMsg} replyHandle={replyClick} confirmForward={confirmForward} confirmReply={confirmReply} />
                                )
                            })}

                            <div ref={messagesEndRef}> </div>
                        </div>

                        <div className={"chatroom_input_field "+(isExpand?"expand":"")+(isReply?"replyArea":"")} ref={wrapperRef1} >
                            <Forward open={isForward}  switchs={() => { setIsForward(!forward) }} confirm={handleForward} clear={clearForward} style={{position:"absolute",top:"-55vh",left:"10vw",padding:"3%",maxHeight: "40vh"}} handleChange={(e) => {
                            const new_data = contacts.filter(i => i.customer_name.toLowerCase().includes(e.target.value.toLowerCase()))
                            setFilteredContacts(new_data)
                         }} >
                                <div >

                                {filteredContacts&&filteredContacts.map((user,index) => {
                                    // console.log(user,"for forward list")
                                    return (<li key={user.customer_name}>
                                <div style={{ display: "flex", gap: 10 }}>
                                    <Tooltip key={user.customer_name+index} className={""} title={user.customer_name} placement="top-start">
                                        <Avatar className={"mf_bg_warning mf_color_warning text-center"} sx={{ width: 25, height: 25, fontSize: 14 }} >{user.customer_name.substring(0, 2).toUpperCase()}</Avatar>
                                    </Tooltip>
                                    <div className={"name"} style={{width :"250px"}}>{user.customer_name}</div>
                                </div>
                                <div className="newCheckboxContainer">

                                    <label className="newCheckboxLabel"> <input type="checkbox" value={user.customer_id} id={user.customer_id} name="checkbox" onClick={toggleSelectContacts} checked={isContainContact(user.customer_id)} onChange={() => { }} />
                                    </label>
                                </div>
                            </li>)
                        })}
                        </div>
                            </Forward>
                            {quoteMsg&&
                            <div style={{display:(ChatButtonOn=="mr"?"flex":"none"), height:"45%",padding:"1rem 1.5rem 0" }}
                            // onClick={toggleReply }
                            >
                                {/* <MsgRow msg={quoteMsg}/> */}
                                <div style={{}} className="reply_box">
                                                                            <div>
                                                                                <div>{quoteMsg.from_me?quoteMsg.sign_name:chatUser.customer_name}</div>
                                                                                    <div>{quoteMsg.message_type=="document"?<img src={"/livechat/attach.svg"}/>:""}{quoteMsg.body}</div>
                                                                                    {quoteMsg.message_type=="voice"?<img src={"/livechat/recording.svg"}/>:""}

                                                                                    {quoteMsg.message_type=="video"?"Video":""}
                                                                            </div>
                                                                            <div className="media_div">
                                                                                    {quoteMsg.message_type=="image"?<img src={quoteMsg.media_url}/>:""}
                                                                                    {quoteMsg.message_type=="video"?<Player    className={"videoBox"} playsInline fluid={false} width={100} muted={true}>
                                                                                    <source  src={quoteMsg.media_url}   type="video/mp4"/></Player>:""}
                                                                                    {/* <div>{filePreview.size/1000}kb</div> */}
                                                                            </div>
                                                                        </div>
                            </div>
                            }


                            { ChatButtonOn=="m3"?
                                <div style={{display:(filePreview.size >= 1 ?"flex":"none"), padding:"1.5rem 1rem 0" }}
                                // onClick={toggleReply }
                                >
                                    {/* <div style={{backgroundColor:"blue",width:"100%",height:"100px"}}></div> */}
                                    {/* <div>{filePreview.name} </div> */}


                                            {filePreview.type=="IMAGE"? <div style={{display:"flex"}} className="attachment_box">
                                                                                <div>
                                                                                    <img src={filePreview.path} style={{width:"100px",height:"100px", margin:"0 15px"}}/>
                                                                                </div>
                                                                            <div>
                                                                                    <div>{filePreview.type}</div>
                                                                                    <div>{filePreview.size/1000}kb</div>
                                                                            </div>
                                                                        </div>:""}
                                            {filePreview.type=="VIDEO"?<div style={{display:"flex"}} className="attachment_box">
                                                                                <div>
                                                                                    <div style={{display:"flex",alignItems:"center",margin:"0 15px"}}>
                                                                                        <Player   className={"videoBox"} playsInline fluid={false} width={150} height={100} muted={true}>
                                                                                        <BigPlayButton position="center" />
                                                                                                    <source  id={filePreview.name} src={filePreview.path}  onClick={e=>e.preventDefault} type="video/mp4" />
                                                                                    </Player>
                                                                                            {/* <svg xmlns="http://www.w3.org/2000/svg"  width="35" height="35" viewBox="0 0 35 35" >
                                                                                                <g id="Mask_Group_62" data-name="Mask Group 62" transform="translate(-2746 -1111)" >
                                                                                                    <rect id="Background-2" data-name="Background" width="35" height="35" transform="translate(2746 1111)" fill="none"/>
                                                                                                    <path id="Path_34405" data-name="Path 34405" d="M973.181,507.951h0a1.148,1.148,0,0,0-1.1,1.1v14.067a5.318,5.318,0,0,1-4.667,5.362c-.175.017-.348.026-.519.026a5.141,5.141,0,0,1-5.13-4.651,4.806,4.806,0,0,1-.028-.52V506.919a3.306,3.306,0,0,1,2.849-3.349,3.222,3.222,0,0,1,.333-.017,3.168,3.168,0,0,1,3.156,2.846,2.922,2.922,0,0,1,.017.338v13.951a1.189,1.189,0,0,1-1.222,1.144h0a1.19,1.19,0,0,1-1.145-1.14V509.048a1.144,1.144,0,0,0-1.182-1.1h0a1.146,1.146,0,0,0-1.1,1.1v11.438a3.6,3.6,0,0,0,3.1,3.644,3.468,3.468,0,0,0,3.81-3.09c.012-.12.017-.242.017-.364V506.956a5.607,5.607,0,0,0-4.927-5.656c-.18-.017-.359-.026-.536-.026a5.436,5.436,0,0,0-5.429,4.93c-.016.174-.023.348-.025.523v16.3a7.655,7.655,0,0,0,6.723,7.737c.247.025.493.036.735.036a7.431,7.431,0,0,0,7.416-6.736c.023-.241.035-.484.035-.728V509.048A1.144,1.144,0,0,0,973.181,507.951Z" transform="translate(1796.697 612.626)" className={"attachmentPinLogo"} fill="#2198fa"/>
                                                                                                </g>
                                                                                            </svg> */}
                                                                                    </div>
                                                                                </div>
                                                                            <div>
                                                                                    <div style={{fontSize:"18px"}}>{filePreview.type}</div>
                                                                                <div>{filePreview.name}</div>
                                                                                    <div>{filePreview.size/1000}kb</div>
                                                                            </div>
                                                                        </div>:""}
                                            {filePreview.type=="AUDIO"?<div className="attachment_box" style={{display:"flex",background: "#D0E9FF 0% 0% no-repeat padding-box",borderRadius:" 10px",padding:"1rem"}}>
                                                                            <div  style={{margin:"0 15px",fill:"#2198fa"}}>
                                                                            <VoiceMsg size={20} />
                                                                            </div>
                                                                            <div>
                                                                                    <div>{filePreview.type}</div>
                                                                                    <div>{filePreview.size/1000}kb</div>
                                                                            </div>
                                                                        </div>:""}
                                            {filePreview.type=="FILE"?<div className="attachment_box" style={{display:"flex",background: "#D0E9FF 0% 0% no-repeat padding-box",borderRadius:" 10px",padding:"1rem"}}>
                                                                                <div style={{display:"flex",alignItems:"center"}}>
                                                                                        <svg xmlns="http://www.w3.org/2000/svg"  width="35" height="35" viewBox="0 0 35 35" >
                                                                                            <g id="Mask_Group_62" data-name="Mask Group 62" transform="translate(-2746 -1111)" >
                                                                                                <rect id="Background-2" data-name="Background" width="35" height="35" transform="translate(2746 1111)" fill="none"/>
                                                                                                <path id="Path_34405" data-name="Path 34405" d="M973.181,507.951h0a1.148,1.148,0,0,0-1.1,1.1v14.067a5.318,5.318,0,0,1-4.667,5.362c-.175.017-.348.026-.519.026a5.141,5.141,0,0,1-5.13-4.651,4.806,4.806,0,0,1-.028-.52V506.919a3.306,3.306,0,0,1,2.849-3.349,3.222,3.222,0,0,1,.333-.017,3.168,3.168,0,0,1,3.156,2.846,2.922,2.922,0,0,1,.017.338v13.951a1.189,1.189,0,0,1-1.222,1.144h0a1.19,1.19,0,0,1-1.145-1.14V509.048a1.144,1.144,0,0,0-1.182-1.1h0a1.146,1.146,0,0,0-1.1,1.1v11.438a3.6,3.6,0,0,0,3.1,3.644,3.468,3.468,0,0,0,3.81-3.09c.012-.12.017-.242.017-.364V506.956a5.607,5.607,0,0,0-4.927-5.656c-.18-.017-.359-.026-.536-.026a5.436,5.436,0,0,0-5.429,4.93c-.016.174-.023.348-.025.523v16.3a7.655,7.655,0,0,0,6.723,7.737c.247.025.493.036.735.036a7.431,7.431,0,0,0,7.416-6.736c.023-.241.035-.484.035-.728V509.048A1.144,1.144,0,0,0,973.181,507.951Z" transform="translate(1796.697 612.626)" className={"attachmentPinLogo"} fill="#2198fa"/>
                                                                                            </g>
                                                                                        </svg>
                                                                                    <div>{filePreview.name}</div>
                                                                            <div>
                                                                                    <div>{filePreview.type}</div>
                                                                                    <div>{filePreview.size/1000}kb</div>
                                                                            </div>
                                                                                </div>
                                                                        </div>:""}



                                </div>:""
                            }
                            <textarea  disabled={selectedChat.channel=="WABA"&&!isWABAStart} onKeyDown={onEnterPress}  className={"chatroom_textField"} placeholder={"Type something..."} name="message" id="message" value={typedMsg.message} onChange={handleTypedMsg} style={{display:(ChatButtonOn=="m1"?"none":"block"),backgroundColor:(ChatButtonOn=="m4"?"#ECF2F8":"") ,borderRadius: "10px"}} >
                    </textarea>
                            <Picker  onSelect={(emoji)=> {
                                setTypedMsg({...typedMsg,message: typedMsg.message+" "+emoji.native+" "})
                            }} style={ChatButtonOn=="m2"?{display:'block',position: 'absolute', bottom: '90px'}:{display:'none' }} />
                            <div  disabled={selectedChat.channel=="WABA"&&!isWABAStart} style={{maxWidth:"95%",display:(ChatButtonOn=="m1"?"block":"none"),whiteSpace: 'nowrap' }}  >
                                <StickerBox data={stickerData} stickerSend={stickerSend}  />
                            </div>
                            <div style={{maxWidth:"95%",height:"100%",display:(ChatButtonOn=="m4"?"block":"none"),whiteSpace: 'nowrap' }} disabled={selectedChat.channel=="WABA"&&!isWABAStart}>
                                <QuickReply data={replyData} onclick={replySelect} disabled={isWABAStart} />
                            </div>

                            <div className={"chatroom_input_btn_gp"} >
                                <div className={"left_btn_gp"}  >
                                    <div  className={"sticker_btn"+(ChatButtonOn=="m1"?" active":"")}  style={{pointerEvents:((!isWABAStart)?"none":"") , backgroundColor:((!isWABAStart)?"#dee2e6":""),borderRadius:"10px"}} onClick={toggleSticker }
                                    ><MaskGroup1/></div>
                                    <div className={"emoji_btn "+(ChatButtonOn=="m2"?" active":"") }  style={{pointerEvents:((!isWABAStart)?"none":"") , backgroundColor:((!isWABAStart)?"#dee2e6":""),borderRadius:"10px"}}  onClick={ toggleEmoji }
                                        // style={isEmojiOn?{backgroundColor:"#d0e9ff",background: "#d0e9ff 0% 0% no-repeat padding-box",borderRadius: "10px",fill:"#2198FA"}:{fill:"#8b8b8b"}}
                                    ><MaskGroup2/>
                                        {/* <Picker style={{ position: 'absolute', bottom: '35px', right: '20px' }} /> */}

                                    </div>

                                    <div className={"attach_btn "+(ChatButtonOn=="m3"?"":"")}  style={{pointerEvents:((!isWABAStart)?"none":"") , backgroundColor:((!isWABAStart)?"#dee2e6":""),borderRadius:"10px"}} onClick={toggleFile }>
                                        {/*<input type="file" name="fileAttach" ref={attachFile} onChange={(e)=>{setInputValue(e.target.value);console.log(e.target)}} ></input>*/}
                                        <input type="file" name="fileAttach" ref={attachFile} onChange={upload} ></input>
                                        <Mask_Group_3/>
                                    </div>
                                    <div className={"template_btn" +(ChatButtonOn=="m4"?" active":"") } onClick={toggleQuickReply} ><Mask_Group_4/></div>
                                    {/* <div className={"payment_btn"+(ChatButtonOn=="m5"?" active":"") } onClick={toggleM5}
                                    ><Mask_Group_5/></div> */}
                                </div>

                                <div className={"right_btn_gp"}>
                                    {/* <VoiceRecorder returnVoiceMessage={getAudioFile} /> */}
                                    <div className={"send_btn"} onClick={sendMessageToClient} ><SendButton/></div>
                                </div>
                            </div>
                        </div></> : <div className={"center_text"}> Select a conversation </div>}

            </div>
            <ChatroomInfo data={selectedChat} click={toggleEditProfile }/>
        </div>
    )
}
