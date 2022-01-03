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

export const GlobalContext = createContext({})

export const GlobalContextProvider = ({children}) =>{
    const [user , setUser] = useState({user:{ },token:null,})
    const [errors , setErrors] = useState("")
    const [chats , setChats] = useState([])
    const [contacts , setContacts] = useState([] )
    const [message , setMessage] = useState([])
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

    useEffect(()=>{
        setUser({
            user:JSON.parse(window.localStorage.getItem("user")) || {},
            token:window.localStorage.getItem("token") || null
        })
        console.log(user)
    },[])


    const login = async (credentials)=>{
        const url = "https://mbvrwr4a06.execute-api.ap-southeast-1.amazonaws.com/prod/api/users/login"
        const res = await axios.post(url , credentials,{
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials' : true,

            }})
            .then(response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                const { token, user } = response.data;
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                console.log("login data ",response.data.data)
                setErrors(null)
                userInstance.token = user.token
                orgInstance.token = user.token
                adminInstance.token = user.token
                contactInstance.token = user.token
                tagInstance.token = user.token
                roleInstance.token = user.token
                messageInstance.setWhatsappURL("https://f125-118-140-233-2.ngrok.io")
                router.push("/dashboard/chat")
            }).catch(err=>{
                console.log(err)
                setErrors("Invaild email or password, please try again.")
                return err
            })
        console.log(user)
        if(res.status == 200) router.push("/dashboard/chat")
    }



    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser({user:{ },token:null,})
        router.push("/login")
    }
    return(
        <GlobalContext.Provider value={{user, login , logout , errors ,contacts , userInstance,adminInstance,contactInstance,orgInstance , messageInstance , mediaInstance ,chatHelper ,tagInstance , roleInstance , dashboardInstance}}>{children}</GlobalContext.Provider>
    )
}
