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
import searchFilter from "../../helpers/searchFilter";
import Profile from "../../components/profile";
import EditProfileForm from "../../components/pageComponents/EditProfileForm";
import {useRouter} from "next/router";
import Chatroom from "../../components/livechat/chatroom/Chatroom";
import LiveChatLeftColumn from "../../components/livechat/chatroomlist/LiveChatLeftColumn";


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
        const {  updateSelectedChatroom, contactInstance ,mediaInstance, userInstance ,tagInstance ,orgInstance, user , messageInstance , chatHelper  ,selectedChat , setSelectedChat , getUserChannel} = useContext(GlobalContext)
        const [chatroomMsg , setChatroomMsg]  = useState([])
        const [chats , setChats]  = useState([])
    const [contacts, setContacts] = useState([]);
    const [chatboxSearch, setChatBoxSearch] = useState("")
        const [isReply , setIsReply] = useState(false)
        const [ChatButtonOn,setChatButtonOn] = useState(false)
        const [subscribe,setSubscribe] = useState()
        const [subscribeToNewMessage,setSubscribeToNewMessage] = useState()
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
        const [filteredTags ,setFilteredTags] =useState([])
        const [filteredUsers ,setFilteredUsers] =useState([])
        const [filteredData , setFilteredData] = useState([...chats])
        const [filteredContacts , setFilteredContacts] = useState([])
        // const [totalUnread, setTotalUnread] = useState(0)
        const [unread,setUnread] = useState(false)
        const [unassigned,setUnassigned] = useState(false)
        const [isFilterOpen , setIsFilterOpen] = useState(false)
        const [pinChat , setPinChat] = useState([])
        const [mediaUrl , setMediaUrl] = useState('')
        const [isMedia , setIsMedia ] = useState(false)
        const [lastMsgFromClient , setLastMsgFromClient] = useState("")
        const [isForward,setIsForward] = useState(false)


    const updateFilteredData = (data)=>{
            setFilteredData([...data])
        console.log("filtered data: " ,data)
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
                    const filteredChat = chats.filter(chat=>chat.room_id==newChat.room_id)
                    let newChatList = [newChat , ...filteredChat]
                    setChats(newChatList)
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


    const getChats = async () =>{
        const data = await chatHelper.getOwnedChatrooms(user.user.user_id)
        setChats([...data])
        setFilteredData([...data])
        console.log("context chats:" , data)

    }
    const getChatroomMessage = async()=>{
            setChatroomMsg([])

            const result = await chatHelper.getMessages(selectedChat.room_id)

            if(result) setChatroomMsg(result)

    }



    // const fetchAttachment = async ()=>{
    //     let imageKeys = await Storage.list('')
    //     imageKeys = await Promise.all(imageKeys.map(async k=>{
    //         const signedUrl = await Storage.get(k.key)
    //         return signedUrl
    //     }))
    //     console.log("imgKeys : " , imageKeys)
    //     setAttachment(imageKeys)
    // }
    const filePreviewOldState = {name:"",size:0,type:""}
    const [filePreview,setFilePrevier] = useState(filePreviewOldState)
    useEffect(()=>{
        if(ChatButtonOn!="m3") setFilePrevier(filePreviewOldState)
    },[ChatButtonOn])


    useEffect(async ()=>{
        if(user.token){
          const chan =  await getUserChannel(parseInt(user.user.user_id))
           setWhatsapp(chan)
        }
    },[])


    const getCustomerbyID = async (id)=>{
        const result = await contactInstance.getContactById(id)
        setChatUser(result)
    }




    const fetchContacts = async () =>{
        const data = await contactInstance.getAllContacts()
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
        const gps= agents.filter(d=>{return filter.includes(d.team_id.toString())})
        const gp = contact.filter(c=> {return gps.filter(g=> {return c.agents_id.some(el=>{return el.user_id==g.user_id})   }).length>0  }  )
        return chats.filter(ch=>{;return gp.map(g=>g.customer_id).includes(ch.customer_id);})
    }
    const agentfilter =(agents , filter ,contact, chats)=>{
        const gps= agents.filter(d=>filter.includes( d.user_id.toString() ))
        const gp = contact.filter(c=> {return gps.filter(g=> {return c.agents_id.some(el=>{return el.user_id==g.user_id})   }).length>0  }  )
        return chats.filter(ch=>{;return gp.map(g=>g.customer_id).includes(ch.customer_id);})
    }
    const tagFilter =(contacts , filter , chats)=>{

        const gp= contacts.filter(c=>c.tags_id.filter(d=>{return filter.includes(d.tags_id.toString())}))
        return chats.filter(ch=>{return gp.map(g=>g.customer_id.toString()).includes(ch.customer_id.toString())})
    }
    const messagesSearchRef = useRef()
    const scrollToMSG = () => {messagesSearchRef.current?.scrollIntoView({behavior: "auto", block:"nearest"})}
    //////Chatroom End Point


    ///////



    const RefreshHandle=async()=>{

        await getChatroomMessage();
            // await subChatrooms()
    }

    const confirmReply=()=>{
        setReply(!reply)
        const quote = chatroomMsg.filter(e=>{return replyMsg==(e.timestamp)})
        const m={...quote[0],hasQuotedMsg:true,quote:quote[0].message_id,quote_from:quote.sender}
        setQuotaMsg(m)
        setReplyMsg("")
        setChatButtonOn(ChatButtonOn=="mr"?"":"mr");
        setIsReply(isReply&&ChatButtonOn=="mr"?false:true);

        setTypedMsg({...typedMsg ,message_type: "text",hasQuotedMsg:true,media_url:quote.media_url,is_media:true,sign_name:quote.sign_name})
    }
    const confirmForward = ()=>{
        setIsForward(!isForward)
        setReplyMsg("")
    }


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

    // useEffect(()=>{
    //     document.addEventListener('click', handleClickOutside, true);
    //
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside, true);
    //     };
    // },[])

    const getStickers = async ()=>{
        const {folders , files} = await mediaInstance.getStickers()
        const arrfolders = Array.from(folders)

        setStickerData({folders: arrfolders , files: files})
        console.log("stickers data" , stickerData)

    }

    useEffect(    async () => {
        if(user.token!=null) {
            await getChats()
            await subChatrooms()
            await fetchContacts()
            await getTags()
            await getUsers()
            await getTeams()
            await getStickers()
            setReplyData(replyTemplateList)
        }
    },[]);

    const handleSub = async (chatroom)=>{
        if(subscribe)subscribe.unsubscribe()
        const sub =await API.graphql(graphqlOperation(    subscribeChatroom,{room_id:chatroom.room_id ,channel:selectedChat.channel } ))
            .subscribe({
                next: async (chatmessage)=>{
                    if(router.pathname == "/livechat") await updateSelectedChatroom(chatroom)
                    const newMessage = chatmessage.value.data.subscribeChatroom
                    // let updatedPost = [ ...chatroomMsg,newMessage ]
                    setChatroomMsg(chatroomMsg=>[...chatroomMsg ,newMessage ])
                    if(!newMessage.from_me)setLastMsgFromClient(newMessage.timestamp)
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
        const data = contact.filter(c=>c.agents_id.length==0)
        return chats.filter(chat=>{console.log(chat);return data.includes(parseInt(chat.user_id))})
    }
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

    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) ;
        if(isEditProfileShow) ;
        setIsEditProfileShow(!isEditProfileShow)
    }
    const refreshChatrooms = async ()=>{
        clear()
        // await getChatrooms()
    }
    const updateChatroomPin = async (input)=>{
        await chatHelper.toggleIsPin(input ,(newData)=>{
            // setIsUpdating(true)
        const oldFilter = filteredData.filter(d=> d.name !== newData.name)
        const newPinChat = pinChat.filter(d=>d.name !== newData.name)
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
            setSearchResult(result);
            if(result.length==0)setResultMoreThanOne(false)
            if(result.length>0) {document.getElementById(result[result.length-1].timestamp).scrollIntoView({behavior: "smooth"});}
            if(result.length>1) setResultMoreThanOne(true)
        }

    }



    //record and send audio
    const getAudioFile = async (audioFile) => {

        if(audioFile){
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
            <LiveChatLeftColumn
                filteredData={filteredData}
                chats = {chats}
                searchFilter={searchFilter}
                tags={tags}
                users={users}
                teams={teams}
                updateFilteredData={updateFilteredData}
                clear={clear}
                contacts={contacts}
            />
            <Chatroom
            selectedChat={selectedChat}
            lastMsgFromClient={lastMsgFromClient}
            msg={chatroomMsg}
            handleRobot={null}
            refresh={refreshChatrooms}
            confirmForward={confirmForward}
            confirmReply={confirmReply}
            />
            <ChatroomInfo data={selectedChat} click={toggleEditProfile }/>
        </div>
    )
}
