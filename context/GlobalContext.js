import {useEffect, createContext, Context, useState} from "react";
import {useRouter} from "next/router";
import {redirect} from "next/dist/server/api-utils";
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
        const url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users"
        const res = await axios.get(url , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.data
    }
    const create_user = async (newUser)=>{
        const url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users"
        const res = await axios.post(url , newUser ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => {
                console.log("create user status:",response.statusText)
            }).catch(err=>{
                console.log(err)
            })
        return res.statusText
    }
    const create_many_user = async (newUsers)=>{
        const url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users/addMany"
        const res = await axios.post(url , newUsers ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => {
                console.log("create user status:",response.statusText)
            }).catch(err=>{
                console.log(err)
            })
        return res.statusText
    }
    const update_user = async(update)=>{
        const url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users/name"
        const res = await axios.put(url , update ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => {
                console.log("create user status:",response.statusText)
            }).catch(err=>{
                console.log(err)
            })
        return res.statusText
    }
    const get_organisations= async ()=>{
        const url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/organization"
        //TODO add params
        const res = await axios.get(url  ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => {
                console.log("create user status:",response.statusText)
            }).catch(err=>{
                console.log(err)
            })
        return res.statusText
    }
    const create_division= async ()=>{
        const url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/organization"
        const res = await axios.post(url , update ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => {
                console.log("create user status:",response.statusText)
            }).catch(err=>{
                console.log(err)
            })
        return res.statusText

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
        return res.data
    }
    const create_contact = async (body)=>{
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers/add"
        const res = await axios.post(url , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        },body)
        return res.data
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

    const get_user_by_team = async (id)=>{
        const url =`https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users/team/${id}`
        const res =await axios.get(url  , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.statusText
    }

    const add_user_to_team = async (user_phone ,team_id)=>{
        const url =`"https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users/add-team-to-user`
        const res =await axios.put(url  ,{user_phone,id},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.statusText
    }

    const delete_user_team = async (id)=>{
        const url =`https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users/delete-user-team/${id}`
        const res =await axios.get(url  , {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.statusText
    }
    const update_user_team = async(old_id ,new_id)=>{
        const url =`https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users/change-user-team`
        const res =await axios.put(url  ,{old_id ,new_id},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
        return res.statusText
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser({user:{ },token:null,})
        router.push("/login")
    }
    return(
        <GlobalContext.Provider value={{user, login , logout , errors ,contacts, get_root_org, get_contacts,get_users}}>{children}</GlobalContext.Provider>
    )
}