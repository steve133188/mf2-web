import {useEffect, createContext, Context, useState} from "react";
import {useRouter} from "next/router";
import {redirect} from "next/dist/server/api-utils";
import AuthService from "../services/auth";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import axios from "axios";

export const GlobalContext = createContext({})

export const GlobalContextProvider = ({children}) =>{
    const [user , setUser] = useState({user:{ },token:null,})
    const [errors , setErrors] = useState("")
    const [chats , setChats] = useState([])
    const [contacts , setContacts] = useState([] )
    const [message , setMessage] = useState([])
    const base_url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api"
    // const client = W3CWebSocket("ws://localhost:8000");
    // JSON.parse(localStorage.getItem("user"))
    // localStorage.getItem("token")
    const router = useRouter()
    useEffect(()=>{
        setUser({
            user:JSON.parse(localStorage.getItem("user")) || {},
            token:localStorage.getItem("token") || null
        })

        // client.onopenn = ()=>{
        //     console.log("WS connected")
        // }
    },[])

    // const axiosInstance = axios.create({
    //     timeout:5000,
    //     headers:{
    //         'Content-Type': 'application/json',
    //         'Authorization':`Bearer ${localStorage.getItem("token")}`
    //     }})
    const login = async (credentials)=>{
        const url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users/login"
        const res = await axios.post(url , credentials)
            .then(response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                const { token, data } = response.data;
                console.log(token , data )
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(data))
                setUser({
                    user: JSON.parse(localStorage.getItem("user")),
                    token:localStorage.getItem("token")
                });
                setErrors(null)
                if (user.token) console.log("user: " , user.user.username, "login success")
                return response;
            }).catch(err=>{
                console.log(err)
                setErrors("Email or password incorrect")
                return err
            })
        console.log(user)
        if(res.status == 200) router.push("/dashboard/livechat")

        // return res
    }

    const get_users = async ()=>{

    }
    const create_user = async (newUser)=>{
        const url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users/login"
        const res = await axios.post(url , newUser)
            .then(response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                const { token, data } = response.data;
                console.log(token , data )
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(data))
                setUser({
                    user: JSON.parse(localStorage.getItem("user")),
                    token:localStorage.getItem("token")
                });
                // console.log(user)
                setErrors(null)
                if (user.token) console.log("user: " , user.user.username, "login success")
                return response;
            }).catch(err=>{
                console.log(err)
                setErrors("Cannot found email or password")
                return err
            })
        console.log(user)
        if(res.status == 200) router.push("/dashboard/livechat")
    }
    const update_user = async(update)=>{

    }
    const get_organisations= async ()=>{

    }
    const create_divisions= async ()=>{

    }
    const update_divisions= async ()=>{

    }
    const delete_divisions= async ()=>{

    }
    const get_teams = async ()=>{

    }
    const set_teams = async ()=>{

    }
    const get_contacts = async ()=>{
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/"
       const res =await axios.get(url , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.data
    }
    const get_contact = async (names)=>{
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/name"
        const res = await axios.get(url , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        },names)
            .then(response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                const  data   = response.data.data;
                console.log(data)
                localStorage.setItem('contacts',JSON.stringify(data))
                setContacts(localStorage.getItem('contacts'))
                setErrors(null)
                return data;
            }).catch(err=>{
                console.log(err)
                setErrors("")
                return err
            })
        setContacts(res)
        console.log(contacts)
        console.log(typeof contacts)
    }
    const create_contact = async (body)=>{
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/add"
        const res = await axios.post(url , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        },body)
            .then(response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                const { data  } = response.data;
                console.log(data)
                // setContacts(...contacts , JSON.stringify(data))
                setErrors(null)
                return data;
            }).catch(err=>{
                console.log(err)
                setErrors("")
                return err
            })
        setContacts(res)
        console.log(contacts)
        console.log(typeof contacts)
    }

    const update_contacts = async (contacts)=>{

    }
    const delete_contacts = async (contacts)=>{

    }
    const get_root_org = async ()=>{
        const url = "https://mf-api-aoc-e7o4q.ondigitalocean.app/api/organization/root"
        const res =await axios.get(url , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.data
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser({user:{ },token:null,})
        router.push("/login")
    }
    return(
        <GlobalContext.Provider value={{user, login , logout , errors ,contacts, get_root_org, get_contacts}}>{children}</GlobalContext.Provider>
    )
}