import Head from 'next/head'
import Image from 'next/image'
import {Alert, AlertTitle} from "@mui/material";
import {Search2} from "../../components/Input";
import {Switch} from "../../components/Switch";
import Link from "next/link";
import {NormalButton2} from "../../components/Button";
import {ForgetPasswordPanel} from "../../components/ForgetPasswordPanel";
// import {SuccessPanel} from "../../components/SuccessPanel"
import React, {useState} from "react";
import styles from '../../styles/Login.module.css'
import {useRouter} from "next/router";

export default function Recovery() {
    const r = useRouter()

    const [email , setEmail] = useState("")
    const [isSubmit , setIsSubmit] = useState(false)
    function validateForm() {
        return email.length > 0;
    }
    const handleSubmit = ()=>{
        setIsSubmit(true)
    }
    const backToLogin =()=>{
        r.push("/login")
    }
    let p = ( <div className="container">
        <div className={styles.recovery_panel}>
            <div className={''}>
                <img className={styles.login_logo} src="../MS_logo-square.svg" alt=""/>
                <div className={styles.welcomeMessage}>
                    <h1 className={styles.login_title}>Success</h1>
                    <p className={styles.login_message}>If you have an account with this email, <br/> You will receive an email with further instructions.</p>

                </div>
            </div>
            <div className={styles.submit_row}>
                <button className={"login-btn align-self-center"}  onClick={backToLogin}>
                    Confirm
                </button>
            </div>
            {/*</form>*/}
            {/*</div>*/}
        </div>
    </div>)
    let pp = (

        <div className="container">
            {/*<Alert />*/}
            {/*<div className="Panel container-fluid ">*/}
            <div className={styles.recovery_panel}>
                <div className={''}>
                    <img className={styles.login_logo} src="../MS_logo-square.svg" alt=""/>
                    <div className={styles.welcomeMessage}>
                        {/*{errors?<h4 className={"red-text"}>{errors}</h4>:null}*/}
                        {/*<h4 className={"title_text"}>Log In</h4>*/}
                        <h1 className={styles.login_title}>Forget Password</h1>
                        <p className={styles.login_message}>Enter the email address associated with <br/>your account and we’ll send you a link <br/> to reset your password.</p>

                        {/*<h4 className={styles.login_title}>Log In</h4>*/}
                        {/*<p className={"regular_text "}>Welcome back! Login with your data that <br/> you entered during registration</p>*/}
                        {/*<p className={styles.login_message}>Welcome back! Login with your data that <br/> you entered during registration</p>*/}
                    </div>
                </div>
                {/*<div className={styles.message_row}>*/}
                {/*    <p className={styles.login_message} >Enter the email address associated with <br/>your account and we’ll send you a link <br/> to reset your password.</p>*/}

                {/*</div>*/}
                {/*<div className={"login-form"}>*/}
                    {/*<form action="" >*/}

                        <div className={"mf_icon_input_block mf_input_shadow "+styles.mx_auto + " " + styles.input_margin}>
                            {/*<span className={""}>Email or Password invalid</span>*/}
                            {/*<label className={"searchSVG emailSVG"}>*/}
                            <div className={"mf_inside_icon mf_email_icon"} > </div>
                            <input
                                className={"mf_input"}
                                type={"email"}
                                value={email}
                                onChange={(e)=> {
                                    setEmail(e.target.value);
                                }}
                                placeholder={"Email"}
                                // className={invalid}
                            />
                        </div>
                        <div className={styles.submit_row}>
                            <button className={"login-btn align-self-center"} disabled={!validateForm()} onClick={handleSubmit}>
                                Reset Password
                            </button>
                        </div>
                    {/*</form>*/}
                {/*</div>*/}
            </div>
        </div>
    )
    return (
        <div className={"login-layout "}>
            <div className={"container"}>
                {isSubmit ? p : pp}
            </div>
        </div>
    )
}