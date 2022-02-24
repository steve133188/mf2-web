import {useContext,useState , useEffect, useRef,createRef} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import 'emoji-mart-next/css/emoji-mart.css'
import ChatroomInfo from "../../components/livechat/chatroom_info";
import {Storage , API , graphqlOperation} from "aws-amplify";
import {  observer } from 'mobx-react';

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
import {useRootStore} from "../../utils/provider/RootStoreProvider";


function Live_chat(props) {

    const {messageActionsStore ,chatListStore:{selectedChat } , authStore:{user , isAuth} , contactsStore , tagStore , orgActionsStore ,chatroomStore, usersActionsStore} = useRootStore()

        const router = useRouter()
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

        const node = await axios.get(`https://4ou47a9qd9.execute-api.ap-southeast-1.amazonaws.com/prod/api/user/whatsapp/${user.user_id}`).then(res=>{
            return res.data
        }).catch(err=>{
            console.log(err)
            return null
        })

        return node
    }


    const subChatrooms= async ()=>{
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
        await getChatroomMessage()
    }

    const getChatroomMessage = async()=>{

        let lastTime;

        setFetchingMsg(true)

        const result = await chatroomStore.getMessage()

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
        // const data = await contactInstance.getAllContacts()

        await contactsStore.getAll()
        setContacts(contactsStore.contacts)
    }

    const getUsers = async ()=>{
        // const data = await userInstance.getAllUser()
        await usersActionsStore.init()
        await usersActionsStore.getAll()
        setUsers(usersActionsStore.users)
    }
    const getTeams = async ()=>{
        // const data = await orgInstance.getOrgTeams()
        await orgActionsStore.getOrgTeams()
        setTeams(orgActionsStore.teams)

    }

    const getTags = async ()=>{
        await tagStore.getTags()
        setTags(tagStore.tags)
    }

    // const getStickers = async ()=>{
    //     const {folders , files} = await mediaInstance.getStickers()
    //     const arrfolders = Array.from(folders)
    //
    //     setStickerData({folders: arrfolders , files: files})
    //
    // }

    useEffect(    async () => {
        if(isAuth) {
            await subChatrooms()
            await chatroomStore.subscription()
            await fetchContacts()
            await getTags()
            await getUsers()
            await getTeams()
            // await getStickers()
        }
    },[]);

    const handleSub = async (chatroom)=>{
        if(subscribe)subscribe.unsubscribe()
        const sub =await API.graphql(graphqlOperation(    subscribeChatroom,{room_id:chatroom.room_id ,channel:selectedChat.channel } ))
            .subscribe({
                next: async (chatmessage)=>{
                    await chatroomStore.updateSelectedChatroom(chatroom)
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
        // if(selectedChat)  await getChatroomMessage() ;
        await chatroomStore.subscription()

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
        }

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
                user={user}
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
            <ChatroomInfo users={users} tags={tags} handleEdit={toggleEditProfile }/>
        </div>
    )
}

export default observer(Live_chat)
