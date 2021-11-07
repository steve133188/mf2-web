import Head from 'next/head'
import Image from 'next/image'
import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GlobalContext} from "../../context/GlobalContext";
import Link from "next/link";
import styles from "../../styles/Login.module.css";


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
        <div className={styles.login_layout}>
            <div className="container">
                {/*<Alert />*/}
                {/*<div className="Panel container-fluid ">*/}
                <div className={styles.Panel}>
                    <div className={styles.panel_top}>
                            <img className={styles.login_logo} src="MS_logo-square.svg" alt=""/>
                        <div className={styles.welcomeMessage}>
                            {errors?<h4 className={"red-text"}>{errors}</h4>:null}
                            <h4 className={styles.login_title}>Log In</h4>
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
                        <div className="mf_icon_input_block mf_input_shadow">
                                <div className={"mf_inside_icon mf_pwd_icon"} > </div>
                                    <input
                                        className={"mf_input"}
                                        type={"password"}
                                        value={credential.password}
                                        onChange={(e)=>{setCredential({...credential, ['password']: e.target.value})}}
                                        placeholder={"Password"}
                                        // className={invalid}
                                    />

                            </div>
                        <div className={styles.form_bottom}>
                            <span className={styles.rememberMe}><label className="toggleSwitch"><input type="checkbox"/><span className="slider"></span></label>Remember me</span>
                            <Link href="/login/recovery"><a><span className={styles.forgotPassword}>Forgot Password?</span></a></Link>
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