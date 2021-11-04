import {useEffect, createContext, Context, useState} from "react";
import {useRouter} from "next/router";
import {redirect} from "next/dist/server/api-utils";
import AuthService from "../services/auth";

export const GlobalContext = createContext({
    userInfo:null,
    // authReady : false,
})

export const GlobalContextProvider = ({children}) =>{
    const [user , setUser] = useState({
        userInfo: {
            name:null ,
            email:null ,
            role:null,
            organization:{},
            authority:[],
            phone:null,
            status:"online",
            notification:0,
        } ,
        // authReady : false,
    })

    const router = useRouter()
    useEffect(()=>{
        if(!user){
            router.push("/login")
        }
    },[])
    const login = (email , pwd)=>{
        if(email == "wiva.wei@matrixsense.tech" && pwd == "1234"){
            console.log("login success")
            setUser({userInfo:{name:"Wiva " , email: email , role:"super admin" , organization: {"Matrixsense":"CEO"}}, authReady: true})
            router.push("/dashboard/livechat")
        }else if (email == "steve.chak@matrixsense.tech" && pwd =="1234"){
            setUser({userInfo:{name:"Steve.Chak ",email: email , role:"super admin" , organization: {"Matrixsense":"CTO"}}, authReady: true})
            router.push("/dashboard/livechat")

        }else if(email =="ben.cheng@matrixsense.tech" && pwd == "1234"){
            setUser({userInfo:{name:"Ben.cheng " , email: email , role:"admin" , organization: {"Matrixsense":"Developer"}}, authReady: true})
            router.push("/dashboard/livechat")

        }else if(email =="lewis.chan@matrixsense.tech"  && pwd == "1234"){
            setUser({userInfo:{name:"Lewis.chan " , email: email , role:"admin" , organization: {"Matrixsense":"Developer"}}, authReady: true})
            router.push("/contacts/testing")

        }else if(email =="test@test.tech"  && pwd == "1234"){
            setUser({userInfo:{name:"test.tech " , email: email , role:"admin" , organization: {"Matrixsense":"Developer"}}, authReady: true})
            router.push("/dashboard/livechat")

        }else {
            console.log("Something went Wrong")
            return "Something went Wrong"
        }
    }
    return(
        <GlobalContext.Provider value={{user, login}}>{children}</GlobalContext.Provider>
    )
}