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
import {listMF2TCOCHATROOMS, listMF2TCOMESSAGGES} from "../../src/graphql/queries";
import {createMF2TCOCHATROOM, updateMF2TCOCHATROOM} from "../../src/graphql/mutations"
import {subscribeToChatroom, subscribeToChatroomUpdate, subscribeToNewMessage} from "../../src/graphql/subscriptions"
import Avatar from "@mui/material/Avatar";
import StickerBox from "../../components/livechat/sticker/sticker_box";
import QuickReply from "../../components/livechat/quickReply/quickreply";
import searchFilter from "../../helpers/searchFilter";
import CountDownTimer from "../../components/CountDownTimer";
import NotificationList from "../../components/NotificationList";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { getURL } from "next/dist/shared/lib/utils";


export default function Live_chat() {

    const replyTemplateList = [
            {id:0,name:"Whatspp Template",set:[{name:"temp1",content:"temp1"}]},
            {id:1,name:"Greating",set:[{name:"Morning",content:"Morning"}]},
            {id:4,name:"Questioning",set:[{name:"What can i help you?",content:"What can i help you?"},{name:"Follow up",content:"Follow up"}]},
            {id:2,name:"Merry Chrismax",set:[{name:"Merry Christmas! I hope you receive one blessing after another this coming year!",content:"Merry Christmas! I hope you receive one blessing after another this coming year!"}
            ,{name:"Merry Christmas, and may all your Christmases be white!!!",content:"Merry Christmas, and may all your Christmases be white!!!"}
            ,{name:"Super mario~~ Jump!!!Super mario~~ Jump!!!Super mario~~ Jump!!!",content:"Super mario~~ Jump!!!Super mario~~ Jump!!!Super mario~~ Jump!!!"}
        ]},
            {id:3,name:"Happy new year",set:[{name:"恭賀新春!",content:"恭賀新春!"},{name:"心想事成!",content:"心想事成!"},{name:"身體健康",content:"身體健康!"}]},

        ]



    const [stickerData ,setStickerData] = useState({folders:[] , files:[]})
    const [replyData ,setReplyData] = useState([])


    const {contactInstance ,mediaInstance, userInstance ,tagInstance ,orgInstance, user , messageInstance , chatHelper} = useContext(GlobalContext)
    const [chatrooms , setChatrooms] = useState([])
    const [chatroomMsg , setChatroomMsg]  = useState([])
    const [attachment , setAttachment ] = useState([])
    const [selectedChat , setSelectedChat] = useState({})
    const [chatSearch, setSearch] = useState(false)
    const [isRobotOn , setIsRobotOn] = useState(false)
    const [chatboxSearch, setChatBoxSearch] = useState("")
    const [isExpand , setIsExpand] = useState(false)
    const [isEmojiOn,setEmojiOn] = useState(false)
    const [ChatButtonOn,setChatButtonOn] = useState(false)
    const [subscribe,setSubscribe] = useState()
    const [subscribePin,setSubscribePin] = useState()
    const [subscribeToNewMessage,setSubscribeToNewMessage] = useState()
    const [replyMsg, setReplyMsg] = useState("")
    const [quotaMsg,setQuotaMsg] = useState({})
    const [reply,setReply] =useState(false)

    const [searchResult, setSearchResult] = useState([])
    const [typedMsg , setTypedMsg] = useState({
        channel:"whatsapp",
        phone:"",
        message:"",
        message_type:"text"
    })
    const [chatroomsSub , setChatroomsSub] = useState()
    const [replybox,setReplybox] = useState("")
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
    const [unread,setUnread] = useState(false)
    const [unassigned,setUnassigned] = useState(false)
    const [isFilterOpen , setIsFilterOpen] = useState(false)
    const [start,setStart] = useState(false)
    const [chatroomStart,setChatroomStart] = useState(false)
    const [pinChat , setPinChat] = useState([])
    const [mediaUrl , setMediaUrl] = useState('')
    const [isMedia , setIsMedia ] = useState(false)

    const gqlFilter = async ()=>{

    }
    const getOwnPinChatList = async ()=>{
        const user_id = parseInt(user.user.user_id.toString().slice(3) )
        const res = await API.graphql(graphqlOperation(listMF2TCOCHATROOMS , {filter:{user_id: {eq:user_id} , is_pin: {eq:true}} ,limit:1000}))
            .then(response=>{
            setPinChat(prev=>response.data.listMF2TCOCHATROOMS.items)
        })
            .catch(err=>alert(err))
    }


    const subChatrooms=  ()=>{
        let user_id= parseInt(user.user.user_id.toString().slice(3))
        if(chatroomsSub) chatroomsSub.unsubscribe()
        const sub = API.graphql(graphqlOperation(subscribeToChatroomUpdate, {user_id: user_id ,is_pin:false}))
            .subscribe({
                next: async (chat) => {
                    console.log("update chat " ,chat)
                    // const newChat = chat.value.data.subscribeToChatroomUpdate
                    // const filter = chatrooms.filter(c=>c.room_id!=newChat.room_id)
                    // setChatrooms(chatroomMsg => [newChat,...filter])
                    // setFilteredData(prev=>[newChat,...filter])
                    // console.log("new message: ", newChat)
                }
            })
        console.log("subscribe chatrooms start : " , sub)
        setChatroomsSub(prev=>sub)

    }

    const getChatrooms = async ()=>{
        const user_id = parseInt(user.user.user_id.toString().slice(3) )
        const result = await API.graphql(graphqlOperation(listMF2TCOCHATROOMS , {limit:1000 , filter:{user_id:{eq:user_id} , is_pin:{eq:false} }}))
            .then(async res =>{
                const chatroom = res.data.listMF2TCOCHATROOMS.items
                console.log("loop chatroom start" , chatroom)
                    chatroom.forEach( chat=>{
                    chat.unread=  API.graphql(graphqlOperation(listMF2TCOMESSAGGES , {limit:1000 , filter:{room_id: {eq:chat.room_id} , user_id:{eq:user_id} , read:{eq:false}}}))
                        .then(async msg=>{
                            return msg.data.listMF2TCOMESSAGGES.items.length
                        }).catch(error => console.log(error))
                })
                return chatroom
            })
            .catch(error => console.log(error))
        console.log("get chatrooms" ,result)
        // const myData = [].concat(result.data.listMF2TCOCHATROOMS.items)
        // .sort((a, b) => a.is_pin == b.is_pin ? 0: b.is_pin? 1 : -1);
        await getOwnPinChatList()
        setChatrooms(result)
        setFilteredData(result)

    }
    const getAllChatrooms = async ()=>{
        const user_id = parseInt(user.user.user_id.toString().slice(3) )
        const result = await API.graphql(graphqlOperation(listMF2TCOCHATROOMS , {limit:1000}))
            .then(async res =>{
                let chatroom = res.data.listMF2TCOCHATROOMS.items
                console.log("loop chatroom start" , chatroom)
                 chatroom.forEach(async chat=>{
                    await API.graphql(graphqlOperation(listMF2TCOMESSAGGES , {limit:1000 , filter:{room_id: {eq:chat.room_id}  , read:{eq:false}}}))
                        .then(async msg=>{
                            chat.unread = msg.data.listMF2TCOMESSAGGES.items.length
                        }).catch(error => console.log(error))
                })
                console.log(chatroom)
                setChatrooms(chatroom)
                setFilteredData(chatroom)
            })
            .catch(error => console.log(error))
        // const myData = [].concat(result.data.listMF2TCOCHATROOMS.items)
        //     .sort((a, b) => a.is_pin == b.is_pin ? 0: b.is_pin? 1 : -1);
        // console.log(myData,"afterSort")
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
    const [filePreview,setFilePrevier] = useState({name:"",size:0,type:""})
    // useEffect(()=>{
    //
    //     console.log(filePreview,"filepreview")
    //
    // },[filePreview])
    const upload = async (e) =>{
        e.preventDefault()
        const file = e.target.files[0]
        console.log(file.mozFullPath,"file data console")
        console.log(URL.createObjectURL(file))
        // console.log()

        const filetype =  messageInstance.mediaTypeHandler(file)
        const path =URL.createObjectURL(file)
        console.log("FileType~~~",filetype)
        // console.log("result : " , result)
        setIsMedia(true)
        if(filetype.includes("image")){
            setFilePrevier({name:file.name,size:file.size,type:"image",path:path})
            const result = await mediaInstance.putImg(file , filetype)
           setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "IMAGE"})
        }
        if(filetype.includes("video")){
            setFilePrevier({name:file.name,size:file.size,type:"video",path:path})
            const result = await mediaInstance.putVideo(file , filetype)
            setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "VIDEO"})
        }
        if(filetype.includes("audio")){
            setFilePrevier({name:file.name,size:file.size,type:"AUDIO",path:path})
            const result = await mediaInstance.putVoice(file , filetype)
            setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "AUDIO"})
        }
        if(filetype.includes("document")){
            setFilePrevier({name:file.name,size:file.size,type:"document",path:path})
            const result = await mediaInstance.putDoc(file , filetype)
            setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "document"})
        }

    }
    const getCustomerbyID = async (id)=>{
        console.log(id,"chatroom selected")
        const result = await contactInstance.getContactById(id)
        console.log(result)
        setChatUser(result.data)
    }
    const [contacts, setContacts] = useState([]);

    // const windowUrl = window.location.search;
    // const params = new URLSearchParams("https://cn.webmota.com/comic/chapter/yidengjiading-erciyuandongman/0_66.html");
    // // params['id']
    // const rul_id = params.get('id');
    // const rul_name = params.get('name');
    // const rul_type = params.get('type');
    // console.log(rul_id, rul_name, rul_type)
    // console.log(params)

    const handleTypedMsg = e =>{
        const {name , value} = e.target
        setTypedMsg({
            ...typedMsg,
            [name]:value
        })
    }

    useEffect(()=>{
        setReplyData(replyTemplateList)
    },[])

    const fetchContacts = async () =>{
        const data = await contactInstance.getAllContacts()
        setContacts(data)
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


    const whatsappFilter = ()=>{
        return chatrooms.filter(chat=>chat.channel=="Whatsapp")
    }
    const WABAFilter = ()=>{
        return chatrooms.filter(chat=>chat.channel=="WABA")
    }

    const teamFilter =(agents , filter , chats )=>{
        const gp= agents.some(d=>filter.includes(d.team_id)).map(g=>g.user_id)
        return chats.filter(ch=>gp.includes(ch.user_id))
    }
    const agentfilter =(agents , filter , chats)=>{
        const gp= agents.some(d=>filter.includes(d.username)).map(g=>g.user_id)
        return chats.filter(ch=>gp.includes(ch.user_id))
    }
    const tagFilter =(agents , filter , chats)=>{
        const gp= agents.tags.some(d=>filter.includes(d.tag_name)).map(g=>g.user_id)
        return chats.filter(ch=>gp.includes(ch.user_id))
    }
    const messagesSearchRef = useRef()
    const scrollToMSG = () => {messagesSearchRef.current?.scrollIntoView({behavior: "auto", block:"nearest"})}
    useEffect(()=>{scrollToMSG()
        ,[chatboxSearch]})
    //////Chatroom End Point
    const messagesEndRef = useRef()
    const scrollToBottom = () => {messagesEndRef.current?.scrollIntoView({behavior: "auto", block: "end"})}
    useEffect(()=>{scrollToBottom(),[chatroomMsg]})
    ///////

    async function handleChatRoom(chatroom){
        if(chatroom == selectedChat) return ;
        setChatroomMsg([])
        setSelectedChat(chatroom)
        setTypedMsg(typedMsg=>({...typedMsg ,phone:selectedChat.phone}))
        if(typeof chatroom.customer_id !=="number") return
        await getCustomerbyID(chatroom.customer_id)

        console.log("selected Chat" , selectedChat)
        console.log("typed message" , typedMsg)
    }

    const getChatroomMessage = async()=>{
        const result = await API.graphql(graphqlOperation(listMF2TCOMESSAGGES,{limit:1000 , filter:{room_id:{eq:selectedChat.room_id}}}))
        console.log("getChatroomMessage",result.data.listMF2TCOMESSAGGES.items)
        setChatroomMsg(result.data.listMF2TCOMESSAGGES.items)
    }

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
        setChatButtonOn(ChatButtonOn=="m3"?"":"m3");
        setIsExpand(false);
        fileAttach()
        setIsExpand(isExpand&&ChatButtonOn=="m3"?false:true);
        // setAttachment(e.target.files[0])
        // console.log(e.target.files[0],"togglefile")
        // setAttachment(e.target.files[0].name)
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
        e.preventDefault();
        setTypedMsg({...typedMsg , message: e.target.childNodes[1].innerHTML})
        // setChatButtonOn("");
        // setIsExpand(false)
    }
    const stickerSend =  async e=>{
        e.preventDefault();
        const data = {media_url:e.target.src , message:"", phone : selectedChat.phone ,chatroom_id:selectedChat.room_id,message_type:"sticker",channel:selectedChat.channel}
        console.log("sticker payload" , data);
        const res = await messageInstance.sendMessage(data)
        setTypedMsg({...typedMsg , message: ""})
        console.log(res)
        setChatButtonOn("");
        setIsExpand(false)
    }
    const onEnterPress = async (e) => {
        if(e.keyCode == 13 && e.ctrlKey == false) {
          e.preventDefault();
          // console.log("enter press")
          await sendMessageToClient(e)
        }
        if(e.keyCode == 13 && e.ctrlKey == true) {
            e.preventDefault();
            e.target.innerHTML+="/n"
            // setTypedMsg({
            //     ...typedMsg,
            //     message: typedMsg.message+="/n"
            // })
        }
      }

    const sendMessageToClient = async e=>{
        e.preventDefault()
        console.log("selected Chat",selectedChat)
        const data = {message:typedMsg.message , phone : selectedChat.phone ,chatroom_id:selectedChat.room_id,message_type:typedMsg.message_type,channel:selectedChat.channel ,media_url: mediaUrl ,is_media: isMedia}
        setTypedMsg({...typedMsg , message: ""})
        if(isMedia){
            setIsMedia(false)
            setFilePrevier({})
        }
        const res = await messageInstance.sendMessage(data).catch(error => console.log(error))
        setIsExpand(false)
        console.log("data :" , data)
        setChatButtonOn("")
    }

    const ReferechHandle=async()=>{
        await getChatrooms();
        await getChatroomMessage ();
    }
    const wrapperRef1 = useRef();
    const wrapperRef2 = useRef();
    const wrapperRef3 = useRef();


    const handleClickOutside = (event) => {

        if (wrapperRef1.current &&!wrapperRef1.current.contains(event.target)){
            setChatButtonOn("");
            setIsExpand(false);
            if (wrapperRef2.current &&!wrapperRef2.current.contains(event.target.node)){
                if (wrapperRef3.current &&!wrapperRef3.current.contains(event.target.node)){

                    setChatButtonOn("");
                    setIsExpand(false);
                }

            }

        }

    };
    const replyClick=click=>{
        console.log(click,"done donedone")
        setReplyMsg(click)
        const quotaMsg = chatroomMsg.filter(e=>{return click==(e.room_id+e.timestamp)})
        const m={...quotaMsg[0],message_type:"replyMsg"}
        console.log(m,"message get")
        setQuotaMsg(m)
        !m?setQuotaMsg({}):""
        if(click==replyMsg){setReplyMsg("")}
    }

    const confirmReply=()=>{
        setReply(!reply)
        setChatButtonOn(ChatButtonOn=="mr"?"":"mr");
        setIsExpand(isExpand&&ChatButtonOn=="mr"?false:true);
    }

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
    useEffect(    async () => {
        if(user.token!=null) {
            await fetchContacts()
            await getTags()
            await getUsers()
            await getTeams()
            // await getChatrooms()
            await getAllChatrooms()
            await getStickers()
            subChatrooms()
            // await getChatroomMessage()
            // TODO need to implete receiver id to sub input
        }
    },[]);

    const handleSub = async (chatroom)=>{

        if(subscribe)subscribe.unsubscribe()
        const sub = API.graphql(graphqlOperation(subscribeToChatroom ,{room_id:chatroom.room_id} ))
            .subscribe({
                next: async (chatmessage)=>{
                    const newMessage = chatmessage.value.data.subscribeToChatroom
                    // let updatedPost = [ ...chatroomMsg,newMessage ]
                    setChatroomMsg(chatroomMsg=>[...chatroomMsg ,newMessage ])
                    scrollToBottom()
                    console.log("new message: " , newMessage)
                    // setNotis({type:"newMsg",channel:newMessage.channel??"whatsapp",content:newMessage.body,sender:newMessage.sender})
                }
            })
        setSubscribe(prev=> sub)

    }
    useEffect(async ()=>{
        if(selectedChat)  await getChatroomMessage(selectedChat.room_id) ;
        await handleSub(selectedChat)

    },[selectedChat])



    const advanceFilter =()=>{
        setFilter({team:[...selectedTeams], agent:[...selectedUsers] ,channel: [...selectedChannels] , tag:[...selectedTags]})
        // console.log("filter",filter)

        const channelFiltered = chatrooms.filter(data=>{
            if(selectedChannels.length ==0){
                return data
            }
            console.log(selectedChannels)
            return selectedChannels.includes(data.channel)
        })

        const agentFiltered = channelFiltered.filter(data=>{
            if(selectedUsers.length==0){

                return data
            }
            return  data.agents.every(el=>selectedUsers.includes(el.username))
        })

        const tagFiltered = agentFiltered.filter(data=>{
            if(selectedTags.length ==0){
                return data
            }
            return data.tags.every(el=>selectedTags.includes(el.tag_name))
        })


        const teamFiltered = tagFiltered.filter(data=>{
        // const teamFiltered = channelFiltered.filter(data=>{
            if(selectedTeams.length ==0){
                return data
            }
            return data.team==selectedTeams
            //contacts not yet have team
        })

        const unreadfilter = teamFiltered.filter(data=>{
            if(!unread ){
                return data
            }
            return data.unread>0
        })

        const unassignedfilter = unreadfilter.filter(data=>{
            if(!unassigned ){
                return data
            }
            return data.agents.length<1
        })

        setFilteredData([...unassignedfilter])
    }
    const unreadHandle = () =>{
        setUnread(!unread);
        advanceFilter();
    }
    const unassigneHandle = () =>{
        setUnassigned(!unassigned)
        advanceFilter();
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
            // advanceFilter()
    }
    const refreshChatrooms = async ()=>{
        clear()
        await getChatrooms()
    }
    const updateChatroomPin = async (input)=>{await chatHelper.toggleIsPin(input ,(newData)=>{
        const oldFilter = filteredData.filter(d=> d.room_id != newData.room_id)
        const newPinChat = pinChat.filter(d=>d.room_id != newData.room_id)
        console.log("oldFilter : " , oldFilter)
        console.log("newPinChat : " , newPinChat)
        // const indexOfDate = filteredData.indexOf(el=>newData.room_id==el.room_id)
        if(newData.is_pin){
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
            var file = new File([audioFile], new Date().toISOString().replace(/:/g,"_").replace(/\./g,"_") +'.oga')
        const result = await mediaInstance.putVoice(file)
        console.log(result,"audioFile")}
    }
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
                            <div className={"add_button"} onClick={()=>{setChatButtonOn("m0"),setIsFilterOpen(false)}}  style={{display:ChatButtonOn!=="m0"?"block":"none"}}>
                            <AddButtonSVG c={"#f5f6f8"} />
                            </div>
                    </div>
                        <div className={"chatlist_filter_box"} style={{display:isFilterOpen?"flex":"none",overflowY:"scroll"}}>
                             {/*<ChatlistFilter click={()=>setIsFilterOpen(!isFilterOpen)} channel={toggleSelectChannels} tag={toggleSelectTags} confirm={advanceFilter} cancel={clear}*/}
                             {/*agents={toggleSelectUsers} unread={unreadHandle} unassigned={unassigneHandle} /> */}
                            <ChatlistFilter click={()=>setIsFilterOpen(!isFilterOpen)} channel={toggleSelectChannels} tag={toggleSelectTags} confirm={advanceFilter} cancel={clear}
                             agents={toggleSelectUsers}  />
                        </div>
                        <div className={"chatlist_newChat_box"} style={{display:ChatButtonOn=="m0"?"flex":"none"}}>
                                    <Newchatroom contacts={contacts} setFilteredData={setFilteredData}/>
                        </div>
                    <ul  className={"chatlist_ss_list"} style={{display:!isFilterOpen?ChatButtonOn!=="m0"?"":"none":("none")}}>
                        {pinChat!=-1&&pinChat.map((d , index)=>{

                            // return ( <ChatroomList  chatroom={d} key={index} chose={selectedChat} togglePin={updateChatroomPin} refresh={refreshChatrooms} className={" "+(index==0&& "active")} onClick={ (e)=>{e.preventDefault() ; e.stopPropagation(); handleChatRoom(d)}}/> )
                            return ( <ChatroomList  chatroom={d} key={index} chose={selectedChat} togglePin={updateChatroomPin}  className={" "+(index==0&& "active")} onClick={ (e)=>{e.preventDefault() ; e.stopPropagation(); handleChatRoom(d)}}/> )

                        })}
                        {filteredData.map((d , index)=>{

                            // return ( <ChatroomList  chatroom={d} key={index} chose={selectedChat} togglePin={updateChatroomPin} refresh={refreshChatrooms} className={" "+(index==0&& "active")} onClick={ (e)=>{e.preventDefault() ; e.stopPropagation(); handleChatRoom(d)}}/> )
                            return ( <ChatroomList  chatroom={d} key={index} chose={selectedChat} togglePin={updateChatroomPin}  className={" "+(index==0&& "active")} onClick={ (e)=>{e.preventDefault() ; e.stopPropagation();handleChatRoom(d)}}/> )

                        })}
                    </ul>
                </div>
            </div>
            <div className={"chatroom"}>
                {selectedChat.room_id?
                    <>
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
                                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>

                                    <div className={"chatroom_name"} style={{fontSize:"18px"}}>{selectedChat.name}
                                        <div className={"chatroom_channel"}>{selectedChat.channel?<img src={`/channel_SVG/${selectedChat.channel}.svg`} />:""}</div>
                                    </div>
                                    {/* {selectedChat.channel=="whatsapp"? <div className="chatroom_name"><CountDownTimer dayString={new Date().toISOString()}/></div>:""} */}
                                    {selectedChat.channel=="whatsappBusinessAPI"? <div className="chatroom_name"><CountDownTimer dayString={new Date().toISOString()}/></div>:""}
                                </div>

                                {/* {selectedChat.channel=="whatsapp"? <div className="chatroom_name"><CountDownTimer dayString={new Date().toISOString()}/></div>:""} */}
                                {selectedChat.channel=="WABA"? <div className="chatroom_name"><CountDownTimer dayString={new Date(

                                    // chatroomMsg.map

                                ).toISOString()}/></div>:""}
                        </div>
                            <div className={"chatroom_top_btn_gp"}>
                                <div className={"chatroom_top_btn chatroom_top_btn_research " +( chatSearch?"research_active":"")} >
                                    <ResearchBTN onclick={()=>{setSearch(!chatSearch)}}/>
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
                                    <MsgRow isSearch={searchResult?(searchResult.some(result => result.timestamp==r.timestamp )&&searchResult.length >0 ):""}msg={r} key={i} d={filteredUsers}  c={contacts} replyMsg={replyMsg} replyHandle={replyClick} confirmReply={confirmReply} />
                                )
                            })}

                            <div ref={messagesEndRef}> </div>
                        </div>

                        <div className={"chatroom_input_field "+(isExpand?"expand":"")} ref={wrapperRef1} >
                            {quotaMsg&&
                            <div style={{display:(ChatButtonOn=="mr"?"flex":"none")}} onClick={toggleReply }>
                                <MsgRow msg={quotaMsg} d={filteredUsers} c={contacts}/>
                            </div>
                            }
                            {filePreview&&
                            <div style={{display:(ChatButtonOn=="m3"?"flex":"none")}} onClick={toggleReply }>
                                {/* <div style={{backgroundColor:"blue",width:"100%",height:"100px"}}></div> */}
                                {/* <div>{filePreview.name} </div> */}
                                <div>{filePreview.type}file </div>
                                <div>
                                    <img src={filePreview.path} style={{width:"80px",height:"80px"}}/><div>{filePreview.size/1000}kb</div>
                                </div>
                            </div>
                            }
                            <textarea   onKeyDown={onEnterPress}  className={"chatroom_textField"} placeholder={"Type something..."} name="message" id="message" value={typedMsg.message} onChange={handleTypedMsg} style={{display:(ChatButtonOn=="m1"?"none":"block"),backgroundColor:(ChatButtonOn=="m4"?"#ECF2F8":"") ,borderRadius: "10px"}} >
                    </textarea>
                            <Picker  onSelect={(emoji)=> {
                                setTypedMsg({...typedMsg,message: typedMsg.message+emoji.native})
                            }} style={ChatButtonOn=="m2"?{display:'block',position: 'absolute', bottom: '90px'}:{display:'none' }} />
                            <div style={{maxWidth:"95%",display:(ChatButtonOn=="m1"?"block":"none"),whiteSpace: 'nowrap' }}  >
                                <StickerBox data={stickerData} stickerSend={stickerSend}  />
                            </div>
                            <div style={{maxWidth:"95%",height:"100%",display:(ChatButtonOn=="m4"?"block":"none"),whiteSpace: 'nowrap' }} >
                                <QuickReply data={replyData} onclick={replySelect} />
                            </div>

                            <div className={"chatroom_input_btn_gp"}>
                                <div className={"left_btn_gp"}>
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
                                    {/* <div className={"payment_btn"+(ChatButtonOn=="m5"?" active":"") } onClick={toggleM5}
                                    ><Mask_Group_5/></div> */}
                                </div>

                                <div className={"right_btn_gp"}>
                                    {/* <VoiceRecorder returnVoiceMessage={getAudioFile}/> */}
                                    <div className={"send_btn"} onClick={sendMessageToClient}><SendButton/></div>
                                </div>
                            </div>
                        </div></> : <div className={"center_text"}> Select a conversation </div>}

            </div>
            <ChatroomInfo data={selectedChat}/>
        </div>
    )
}
