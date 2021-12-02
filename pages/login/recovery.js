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
import axios from "axios";

export default function Recovery() {
    const r = useRouter()

    const [address , setAddress] = useState("")
    const [isSubmit , setIsSubmit] = useState(false)
    const [emailType, setEmailType] = useState("")
    const [errors, setError] = useState(false)
    function validateForm() {
        return address.length > 0;
    }
    const handleSubmit = async ()=>{
        // const url = "https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users/forgot-password"
        // const res = await axios.post(url , {address})
        
        if(address.length<5){setEmailType("This is not a valid E-mail address." ) ;setError(true);
            console.log(address);
        return  }

        // if (res.status ==200) 
        setIsSubmit(true)
    }

    const backToLogin =()=>{
        r.push("/login")
    }
    let p = ( <div >
               <div className={"recovery_panel"}>
                    <div className={"logo_container"}>
                        <img className={"login_logo"} src="../MS_logo-square.svg" alt=""/>
                    </div>
                        <div className={"welcomeMessage"}>
                            <h4 className={"login_title"}>Success</h4>
                            <p className={"login_message"}>If you have an account with this email, <br/> You will receive an email with further instructions.</p>
                    
                    </div>
                    <div className={"submit_row"}>
                        <button className={"send_button align-self-center"}  onClick={backToLogin}>
                        <p className={"bottomName"}style={ {color: "#FFF"}}>Confirm</p> 
                        </button>
                    </div>
                </div>
            </div>)
    let pp = (

        <div >
            {/*<Alert />*/}
            <div className={"recovery_panel"}>
                    <div className={"logo_container"}>
                        <img className={"login_logo"} src="../MS_logo-square.svg" alt=""/>
                    </div>
                <div className={'input_area'}>
                    <div className={"welcomeMessage"}>
                        {/*{errors?<h4 className={"red-text"}>{errors}</h4>:null}*/}
                        {/*<h4 className={"title_text"}>Log In</h4>*/}
                        <h4 className={"login_title"}>Forget Password</h4>
                        <p className={"login_message"} >Enter the email address associated with <br/>your account and we’ll send you a link <br/> to reset your password.</p>

                    </div>

                    <div className={"text_box mf_icon_input_block "}>
                        <div className={"text_row mf_icon_input_block mf_input_shadow input_margin input_margin"}>

                            <div className={"mf_inside_icon mf_email_icon"} > </div>
                            <input
                                className={"mf_input"}
                                type={"email"}
                                value={address}
                                onChange={(e)=> {
                                    setAddress(e.target.value);
                                }}
                                placeholder={"Email"}
                                style={{ font:" normal normal normal 16px/22px Manrope"}}
                                style={ {fontSize:"1vw"}}
                                // className={invalid}
                            />
                        </div>
                    </div>
                                <div className={"login_error_box"}>
                                {errors?<h4 className={"login_error"}>{emailType}</h4>:null}
                                </div>
                    </div>
                            <div className={"submit_row"}>
                                <button className={"send_button align-self-center"} disabled={!validateForm()} onClick={handleSubmit}>
                                    <p className={"bottomName"}style={ {color: "#FFF"}}>Request Reset</p>

                                </button>
                                    <button className={"send_button align-self-center"}  onClick={backToLogin}>
                                    <p className={"bottomName"}style={ {color: "#FFF"}}>Back </p> 
                                    </button>
                            </div>
            </div>
        </div>
    )
    return (
        <div className={"login_layout "}>
            <div className={"maincontainer"}>


                {isSubmit ? p : pp}



            </div>
        </div>
    )
}