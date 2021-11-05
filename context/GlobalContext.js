import {useEffect, createContext, Context, useState} from "react";
import {useRouter} from "next/router";
import {redirect} from "next/dist/server/api-utils";
import AuthService from "../services/auth";
import axios from "axios";

export const GlobalContext = createContext({})

export const GlobalContextProvider = ({children}) =>{
    const [user , setUser] = useState({user:{ },token:null,})
    const {errors , setErrors} = useState()
    // JSON.parse(localStorage.getItem("user"))
    // localStorage.getItem("token")
    const router = useRouter()
    useEffect(()=>{
        setUser({
            user:JSON.parse(localStorage.getItem("user")) || {},
            token:localStorage.getItem("token") || null
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
                const { token, data } = response.data;
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(data))
                setUser({
                    user: localStorage.getItem("user"),
                    token
                });
                if (user.token) console.log("user: " , user.user.username, "login success")
                return response;
            }).catch(err=>{
                console.log(err)
                return err
            })
        router.push("/dashboard/livechat")
        return res
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser({user:{ },token:null,})
        router.push("/login")
    }
    return(
        <GlobalContext.Provider value={{user, login , logout , errors}}>{children}</GlobalContext.Provider>
    )
}