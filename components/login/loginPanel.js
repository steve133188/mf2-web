
import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GlobalContext} from "../../context/GlobalContext";
import Link from "next/link";

export default function LoginPanel(){
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
            router.push("/dashboard/agents")
        }
    },[])
    return(<>
                    <div className={"logo_container"}>
                            <img className={"login_logo"} src="MS_logo-square.svg" alt=""/>
                    </div>
                        <div className={"welcomeMessage"}>
                            <div className={"login_title"}>Log In</div>
                            {/* {errors?<h4 className={"red-text"}>{errors}</h4>:null} */}
                        </div>
                    {/*<div className={errors?styles.message_row:styles.hide_block}>*/}
                    {/*    <p  className={errors?styles.message_row:styles.hide_block}>{errors}</p>*/}
                    {/*</div>*/}

                <div className={"login-form"}>
                    <form action="" >
                        <div className={"text_box mf_icon_input_block "}>
                            <div className={"text_row mf_icon_input_block mf_input_shadow"}>
                                {/*<span className={""}>Email or Password invalid</span>*/}
                                {/*<label className={"searchSVG emailSVG"}>*/}
                                <div className={"mf_inside_icon mf_email_icon"} > </div>
                                    <input
                                        className={"mf_input "}
                                        type={"email"}
                                        value={credential.email}
                                        onChange={(e)=>{setCredential({...credential, ['email']: e.target.value})}}
                                        placeholder={"Email"}
                                        style={ credential.email.length>0?{border: "1px solid #2385FC",fontSize:"1vw"}:{fontSize:"1vw"}}
                                        // style={ {fontSize:"1vw"}}
                                        // className={invalid}
                                       
                                    />
                                    </div>
                            </div>
                        <div className={"text_box mf_icon_input_block "}>
                            <div className={"text_row mf_icon_input_block mf_input_shadow input_margin"}>
                                <div className={"mf_inside_icon mf_pwd_icon"} > </div>
                                    <input
                                        className={"mf_input "}
                                        type={"password"}
                                        value={credential.password}
                                        onChange={(e)=>{setCredential({...credential, ['password']: e.target.value})}}
                                        placeholder={"Password"}
                                        style={ credential.password.length>0?{border: "1px solid #2385FC",fontSize:"1vw"}:{fontSize:"1vw"}}
                                        // style={ {fontSize:"1vw"}}
                                        // className={invalid}
                                    />

                            </div>
                        </div>
                            <div className={"login_error_box"}>
                            {errors?<h4 className={"login_error"}>{errors}</h4>:null}
                            </div>
                        <div className={"form_bottom"}>
                            <span className={"rememberMe"}><label className="toggleSwitch"><input type="checkbox"/><span className="slider" 
                                    style={{width:"32px",margin:"0 5px"}}></span></label><p>Remember me</p></span>
                            <Link href="/login/recovery">
                                {/*<a style={{font: "normal normal normal 1rem/22px Manrope", color: "var(--unnamed-color-2198fa)",color:"#2198fa"}}className={"forgotPassword"}> color was duplicated*/}
                                <a style={{font: "normal normal normal 1rem/22px Manrope",color:"#2198fa"}}className={"forgotPassword"}>
                                    <span >Forgot Password?</span></a>
                                    </Link>
                        </div>

                        <div className={"submit_row"}>
                            <button className={"login-btn align-self-center"} disabled={!validateForm()} onClick={handleSubmit}>
                                Login
                            </button>
                        </div>
                    </form>
                    </div>
    
    </>


    )
}