import Head from 'next/head'
import Image from 'next/image'
import React, {useContext, useEffect} from "react";
import {LoginPanel} from "../../components/LoginPanel";
import {ForgetPasswordPanel} from "../../components/ForgetPasswordPanel";
import {useRouter} from "next/router";
import {GlobalContext} from "../../context/GlobalContextContext";
import AuthService from "../../services/auth";



export default function Login(){
    const router = useRouter()
    const {user , login} = useContext(GlobalContext)
    useEffect(()=>{
        if(user["userInfo"]){
            router.back()
        }
    },[])
    return(
        <div className={"login-layout"}>
            <LoginPanel />
        </div>
    )
}