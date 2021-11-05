import Head from 'next/head'
import Image from 'next/image'
import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GlobalContext} from "../../context/GlobalContext";
import {Search2} from "../../components/Input";
import {Switch} from "../../components/Switch";
import Link from "next/link";
import {NormalButton2} from "../../components/Button";



export default function Login(){
    const { login, user , errors } = useContext(GlobalContext);
    const [credential, setCredential] = useState({email:"",password:""});
    const [isInvalid, setInvalid] = useState("");

    function validateForm() {
        return credential.email.length > 0 && credential.password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault()
        validatePassword()
        login(credential)
    }
    function validatePassword() {
        if (errors) {
            console.log("Email or password invalid")
            setInvalid(errors)
        } else {
            console.log("Email and password are valid")
            return ""
        }
    }
    const router = useRouter()
    useEffect(()=>{
        if(user.token){
            router.back()
        }
    },[])
    return(
        <div className={"login-layout"}>
            <div className="container">
                {/*<Alert />*/}
                <div className="loginPanel">
                    <div className="companyLogo">
                        <img src="MS_logo-square.svg" alt=""/>
                    </div>
                    <div className="mainContent">
                        <div className="welcomeMessage">
                            <h1>Log In</h1>
                            <p>Welcome back! Login with your data that <br/> you entered during registration</p>
                        </div>
                        <div className="inputSet">
                            <Search2 type="text" value={credential.email} svg={"emailSVG"} invalid={isInvalid} handleChange={(e)=> {
                                setCredential({...credential, ['email'] :e.target.value})
                            }}>Email or Username</Search2>
                            <Search2 type="password"  value={credential.password} svg={"passwordSVG"} invalid={isInvalid} handleChange={(e)=> {
                                setCredential({...credential, ['password'] :e.target.value});
                            }}>Password</Search2>
                        </div>
                        <div className="passwordSupportSet">
                            <span className="rememberMe"><Switch/>Remember me</span>
                            <Link href="/recovery"><a><span className="forgotPassword">Forgot Password?</span></a></Link>
                        </div>
                        <NormalButton2 disabled={!validateForm()} onClick={handleSubmit}>
                            Login
                        </NormalButton2>
                    </div>
                </div>
            </div>
        </div>
    )
}