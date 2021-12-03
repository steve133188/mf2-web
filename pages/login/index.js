import Head from 'next/head'
import Image from 'next/image'
import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GlobalContext} from "../../context/GlobalContext";
import Link from "next/link";
import styles from "../../styles/Login.module.css";
import LoginPanel from '../../components/login/loginPanel';


export default function Login(){
<<<<<<< HEAD
   
=======
    const { login, user , errors } = useContext(GlobalContext);
    const [credential, setCredential] = useState({email:"",password:""});

    function validateForm() {

        return credential.email.length > 0 && credential.password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault()
        login(credential)
    }

    const router = useRouter()
    useEffect(()=>{
        // if(user.token!=null && router.pathname.includes("/login")) router.back()
    },[])
>>>>>>> 4a7fa4d960d3e5298d6e7690c7045bde36aa777f
    return(
        <div className={"login_layout"}>
             <div className={"maincontainer"}>
                {/*<Alert />*/}
                {/*<div className="Panel container-fluid ">*/}
                <div className={"Panel"}>
                    <LoginPanel/>
                </div>
            </div>
        </div>
    )
}