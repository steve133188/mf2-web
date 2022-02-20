import {useEffect, createContext, Context, useState} from "react";
import {useRouter} from "next/router";
import {redirect} from "next/dist/server/api-utils";
import axios from "axios";
import adminFetcher from "../helpers/adminHelpers";
import contactsFetcher from "../helpers/contactsHelper";
import orgFetcher from "../helpers/orgHelpers";
import usersFetcher from "../helpers/usersHelpers";
import WhatsappFetcher from "../helpers/messageHelper";
import mediaHelper from "../helpers/mediaHelper";
import ChatHelper from "../helpers/chatHelper";
import tagFetcher from "../helpers/tagHelpers";
import roleFetcher from "../helpers/roleHelpers";
import dashboardFetcher from "../helpers/dashboardHelpers";
import standardReplyFetcher from "../helpers/standardReplyHelpers";
import {API, graphqlOperation} from "aws-amplify";
import {getWhatsapp_node, listWhatsapp_nodes} from "../src/graphql/queries";

export const GlobalContext = createContext({})

export const GlobalContextProvider = ({children}) =>{

    const [user , setUser] = useState({user:{ },token:null,channels:[]})
    const [userAuth , setUserAuth] = useState()
    const [errors , setErrors] = useState("")
    const [selectedChat , setSelectedChat] = useState({})
    const [chats , setChats] = useState([] )
    const router = useRouter()
    const userInstance = usersFetcher(user.token)
    const mediaInstance =new mediaHelper()
    const orgInstance= orgFetcher(user.token)
    const adminInstance = adminFetcher(user.token)
    const contactInstance = contactsFetcher(user.token)
    const tagInstance = tagFetcher(user.token)
    const roleInstance = roleFetcher(user.token)
    const messageInstance =new WhatsappFetcher()
    const chatHelper =new ChatHelper()
    const dashboardInstance = dashboardFetcher(user.token)
    const replyInstance = standardReplyFetcher(user.token)



    const getUserChannel = async (user_id=user.user.user_id) => {
        console.log("get chan start")
        const node = await axios.get(`https://4ou47a9qd9.execute-api.ap-southeast-1.amazonaws.com/prod/api/user/whatsapp/${user_id}`).then(res=>{
            if(res.data!== null || res.data!==undefined) return res.data
            return null

        }).catch(err=>{
            console.log(err)
            return null
        })
        console.log("get chan " ,node)
        messageInstance.setWhatsappURL(node.url)
        return node
    }
    const login = async (credentials)=>{
        const url = "https://mbvrwr4a06.execute-api.ap-southeast-1.amazonaws.com/prod/api/users/login"
        const res = await axios.post(url , credentials,{
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials' : true,

            }})
            .then(async response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                const { token, user } = response.data;
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                setErrors(null)
                userInstance.token = token
                orgInstance.token = token
                adminInstance.token = token
                contactInstance.token = token
                tagInstance.token = token
                roleInstance.token = token
                await getUserChannel(user.user_id)
                return response.status
            }).catch(err=>{
                console.log(err)
                setErrors("Invalid email or password, please try again.")
                return err
            })

        if(res ==200 ) {
            await router.push("/dashboard/chat")
            router.reload()
        }
    }

    const cleanChatroomUnread = async (chat)=>{

        if(userAuth.authority.all && chat.user_id !== user.user_id) return

        const update =  await axios.put(`http://ec2-18-162-45-91.ap-east-1.compute.amazonaws.com:30310/api/chatroom/channel/${chat.channel}/room/${chat.room_id}`)
            .then(res=>res.data).catch(err=> {
                console.log(err)
                return null
            })

        if(update) {
            setSelectedChat(update)
            let newchats = chats.map(chat=>(chat.room_id === update.room_id || chat))
            setChats([...newchats , ...chats])
        }

    }

    const getChats = async () =>{
        const data = await chatHelper.getOwnedChatrooms(user.user.user_id)
        setChats([...data])


    }

    const updateSelectedChatroom = async (chat)=>{
        setSelectedChat(prevState =>chat )
        if(chat.unread!==0) await cleanChatroomUnread(chat.room_id)
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser({user:null,token:null,})
        router.push("/login")
    }
    return(
        <GlobalContext.Provider value={{
            user,
            userAuth,
            login ,
            logout ,
            errors  ,
            getUserChannel,
            userInstance,
            adminInstance,
            contactInstance,
            orgInstance ,
            messageInstance ,
            mediaInstance ,
            chatHelper ,
            tagInstance ,
            roleInstance ,
            dashboardInstance ,
            replyInstance ,
            selectedChat ,
            setSelectedChat ,
            updateSelectedChatroom ,
            chats
        }}>{children}</GlobalContext.Provider>
    )

}
