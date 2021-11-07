import Head from 'next/head'
import Image from 'next/image'
import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GlobalContext} from "../../context/GlobalContext";
import Link from "next/link";
import {NormalButton2} from "../../components/Button";



export default function Login(){
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
        if(user.token){
            router.back()
        }
    },[])
    return(
        <div className={"login-layout"}>
            <div className="container">
                {/*<Alert />*/}
                <div className="Panel container-fluid ">
                    <div className="panel-top">
                            <img className={"login-logo"} src="MS_logo-square.svg" alt=""/>
                        <div className="welcomeMessage">
                            {errors?<h4 className={"red-text"}>{errors}</h4>:null}
                            <h4 className={"login-title"}>Log In</h4>
                            <p>Welcome back! Login with your data that <br/> you entered during registration</p>
                        </div>
                    </div>
                    <div className={"login-form"}>
                    <form action="" >
                        <div className="mf_icon_input_block mf_input_shadow">
                                {/*<span className={""}>Email or Password invalid</span>*/}
                                {/*<label className={"searchSVG emailSVG"}>*/}
                                <div className={"mf_inside_icon mf_email_icon"} > </div>
                                    <input
                                        className={"mf_input"}
                                        type={"email"}
                                        value={credential.email}
                                        onChange={(e)=>{setCredential({...credential, ['email']: e.target.value})}}
                                        placeholder={"Email"}
                                        // className={invalid}
                                    />
                            </div>
                        <div className="logoInputContainer">
                                <label className={"searchSVG passwordSVG"}>
                                    <input
                                        type={"password"}
                                        value={credential.password}
                                        onChange={(e)=>{setCredential({...credential, ['password']: e.target.value})}}
                                        placeholder={"Password"}
                                        // className={invalid}
                                    />
                                </label>
                            </div>
                        <div className={"form-bottom"}>
                            <span className="rememberMe"><label className="toggleSwitch"><input type="checkbox"/><span className="slider"></span></label>Remember me</span>
                            <Link href="/login/recovery"><a><span className="forgotPassword">Forgot Password?</span></a></Link>
                        </div>

                        <div className={"submit-row"}>
                            <button className={"login-btn align-self-center"} disabled={!validateForm()} onClick={handleSubmit}>
                                Login
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}