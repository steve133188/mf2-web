import {useEffect, createContext, Context, useState} from "react";
import {useRouter} from "next/router";
import {redirect} from "next/dist/server/api-utils";
import axios from "axios";
import adminFetcher from "../helpers/adminHelpers";
import contactsFetcher from "../helpers/contactsHelper";
import orgFetcher from "../helpers/orgHelpers";
import usersFetcher from "../helpers/usersHelpers";
import WhatsappFetcher from "../helpers/messageHelper";

export const GlobalContext = createContext({})

export const GlobalContextProvider = ({children}) =>{
    const [user , setUser] = useState({user:{ },token:null,})
    const [errors , setErrors] = useState("")
    const [chats , setChats] = useState([])
    const [contacts , setContacts] = useState([] )
    const [message , setMessage] = useState([])
    const router = useRouter()
    const userInstance = usersFetcher(user.token)
    const orgInstance= orgFetcher(user.token)
    const adminInstance = adminFetcher(user.token)
    const contactInstance = contactsFetcher(user.token)
    const messageInstance =new WhatsappFetcher("https://773f-118-140-230-94.ngrok.io")

    useEffect(()=>{
        setUser({
            user:JSON.parse(window.localStorage.getItem("user")) || {},
            token:window.localStorage.getItem("token") || null
        })
    },[])


    const login = async (credentials)=>{
        const url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users/login"
        const res = await axios.post(url , credentials)
            .then(response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                const { token, data } = response.data;
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(data))

                setErrors(null)
                userInstance.token = user.token
                orgInstance.token = user.token
                adminInstance.token = user.token
                contactInstance.token = user.token
                router.push("/dashboard/livechat")
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
        <GlobalContext.Provider value={{user, login , logout , errors ,contacts , userInstance,adminInstance,contactInstance,orgInstance , messageInstance}}>{children}</GlobalContext.Provider>
    )
}