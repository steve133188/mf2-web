import {useContext,useState , useEffect, useRef,createRef} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import 'emoji-mart-next/css/emoji-mart.css'
import ChatroomInfo from "../../components/livechat/chatroom_info";
import {Storage , API , graphqlOperation} from "aws-amplify";
import { inject, observer } from 'mobx-react';

import {
    subscribeChatroom,
    suballChatroom,
} from "../../src/graphql/subscriptions"
import Profile from "../../components/profile";
import EditProfileForm from "../../components/pageComponents/EditProfileForm";
import {useRouter} from "next/router";
import Chatroom from "../../components/livechat/chatroom/Chatroom";
import LiveChatLeftColumn from "../../components/livechat/chatroomlist/LiveChatLeftColumn";
import axios from "axios";


function Live_chat(props) {
        const {messageActionsStore , chatListStore:{selectedChat}} = props
        const router = useRouter()
        const {   contactInstance ,mediaInstance, userInstance ,tagInstance ,orgInstance, user  , chatHelper    } = useContext(GlobalContext)
        const [chatroomMsg , setChatroomMsg]  = useState([])
        const [chats , setChats]  = useState([])
        const [contacts, setContacts] = useState([]);
        const [ChatButtonOn,setChatButtonOn] = useState(false)
        const [subscribe,setSubscribe] = useState()
        const [stickerData ,setStickerData] = useState({folders:[] , files:[]})


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
        const [chatUser , setChatUser] = useState({})
        const [mediaUrl , setMediaUrl] = useState('')
        const [isMedia , setIsMedia ] = useState(false)
        const [lastMsgFromClient , setLastMsgFromClient] = useState("")
        const [fetchingMsg , setFetchingMsg] = useState(false);


    const getUserChannel = async ()=>{

        const node = await axios.get(`https://4ou47a9qd9.execute-api.ap-southeast-1.amazonaws.com/prod/api/user/whatsapp/${user.user.user_id}`).then(res=>{
            return res.data
        }).catch(err=>{
            console.log(err)
            return null
        })

        return node
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



    const refreshChatrooms = async e=>{
        await getChatroomMessage(selectedChat.room_id)
    }

    const getChats = async () =>{
        const data = await chatHelper.getOwnedChatrooms(user.user.user_id)
        setChats([...data])
    }

    const getChatroomMessage = async()=>{

        let lastTime;

        setFetchingMsg(true)

        setChatroomMsg([])

        const result = await chatHelper.getMessages(selectedChat.room_id)

        if(!result) return

        setChatroomMsg(result)

        if(selectedChat.channel =="WABA"){
            lastTime =result[result.length-1].timestamp
            setLastMsgFromClient(lastTime)
        }

        setFetchingMsg(false)

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

    const fetchContacts = async () =>{
        const data = await contactInstance.getAllContacts()
        setContacts(data)
    }

    const getUsers = async ()=>{
        const data = await userInstance.getAllUser()
        setUsers(data)
    }
    const getTeams = async ()=>{
        const data = await orgInstance.getOrgTeams()
        setTeams(data)

    }

    const getTags = async ()=>{
        const data = await tagInstance.getAllTags()
        setTags(data)
    }

    const getStickers = async ()=>{
        const {folders , files} = await mediaInstance.getStickers()
        const arrfolders = Array.from(folders)

        setStickerData({folders: arrfolders , files: files})

    }

    useEffect(    async () => {
        if(user.token!=null) {
            // await getChats()
            await subChatrooms()
            await fetchContacts()
            await getTags()
            await getUsers()
            await getTeams()
            await getStickers()
            const node =await getUserChannel()
            messageActionsStore.init(node.url)
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

    const toggleEditProfile =async (key) =>{
        if(!isEditProfileShow) ;
        if(isEditProfileShow) ;
        setIsEditProfileShow(!isEditProfileShow)
    }

    const getAudioFile = async (audioFile) => {

        if(audioFile){
            const path =URL.createObjectURL(audioFile)
            setIsMedia(true)
            setIsExpand(true);

        setChatButtonOn("m3");
        var file = new File([audioFile], new Date().toISOString().replace(/:/g,"_").replace(/\./g,"_") +'.oga')
        const result = await mediaInstance.putVoice(file)
        setMediaUrl(result)
            setFilePreview({name:(new Date().toISOString().replace(/:/g,"_").replace(/\./g,"_")),size:audioFile.size,type:"AUDIO",path:path})
        setTypedMsg({...typedMsg ,message_type: "AUDIO"})
        console.log(result,"audioFile")}

    }
    return (
        <div className="live_chat_layout">
            <div style={{position:"absolute",backgroundColor:isEditProfileShow? "white":"",width:isEditProfileShow?"100vw":"0",height:"100%",    zIndex: 136}}>

            {isEditProfileShow?  (<Profile handleClose={toggleEditProfile}><EditProfileForm data={chatUser } toggle={toggleEditProfile}/></Profile>):null}
            </div>
            <LiveChatLeftColumn
                tags={tags}
                users={users}
                teams={teams}
                contacts={contacts}
                user={user.user}
            />
            <Chatroom
            selectedChat={selectedChat}
            lastMsgFromClient={lastMsgFromClient}
            msg={chatroomMsg}
            handleRobot={null}
            refresh={refreshChatrooms}
            stickers={stickerData}
            fetchingMsg={fetchingMsg}
            fetchingContact
            sendMessage={messageActionsStore.sendMessage}
            />
            <ChatroomInfo  handleEdit={toggleEditProfile }/>
        </div>
    )
}

export default inject("messageActionsStore" , "chatListStore")(observer(Live_chat))
