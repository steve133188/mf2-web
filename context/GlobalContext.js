import {useEffect, createContext, Context, useState} from "react";
import {useRouter} from "next/router";
import {redirect} from "next/dist/server/api-utils";
import AuthService from "../services/auth";
import webSocket from 'socket.io-client'

import axios from "axios";

export const GlobalContext = createContext({})

export const GlobalContextProvider = ({children}) =>{
    const [user , setUser] = useState({user:{ },token:null,})
    const [errors , setErrors] = useState("")
    const [chats , setChats] = useState([])
    const [message , setMessage] = useState([])

    const client = webSocket('http://localhost:8000')
    // JSON.parse(localStorage.getItem("user"))
    // localStorage.getItem("token")
    const router = useRouter()
    useEffect(()=>{
        setUser({
            user:JSON.parse(localStorage.getItem("user")) || {},
            token:localStorage.getItem("token") || null
        })
        client.on("getMessage",message =>{
            console.log(message)
        })
        // if(!user.token){
        //     console.log("context get token failed")
        //     // router.push("/login")
        // }
    },[])
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
                // console.log(user)
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
    const create_user = async ()=>{

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

    }
    const get_contact = async ()=>{

    }
    const update_contacts = async (contacts)=>{

    }
    const delete_contacts = async (contacts)=>{

    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser({user:{ },token:null,})
        router.push("/login")
    }
    return(
        <GlobalContext.Provider value={{user, login , logout , errors , client}}>{children}</GlobalContext.Provider>
    )
}