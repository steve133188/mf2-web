import {navItems} from "./nav-item";
import {useRouter} from "next/router";
import {useEffect, useContext, useState,useLayoutEffect} from "react";
import {GlobalContext} from "../context/GlobalContext"
import SideBar from "./SideBar";
import {MultipleSelectPlaceholder, SingleSelect, SingleSelect2} from "../components/Select";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";




export default function Layout({children}) {
    const [userSelect , setUserSelect] = useState("")
    const [isAuth , setIsAuth] = useState(false)
    const router = useRouter()
    const {user , logout} = useContext(GlobalContext)

    const layout = (
        <div className={"layout"}><SideBar navItems={navItems} />
            <div className={"layout-main"}>

                {children}</div>

        </div>
    )



    const unAuth = (<div className={"unauth"}>{children}</div>)

    useEffect(()=>{
        if(user.token != null){
            setIsAuth(true)
        }else {
            setIsAuth(false)
        }
        console.log(user)
    },[user])

    return (
        isAuth ? layout : unAuth
    )
}
