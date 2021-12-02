import Head from 'next/head'
import Image from 'next/image'
import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {GlobalContext} from "../../context/GlobalContext";
import Link from "next/link";
import styles from "../../styles/Login.module.css";
import LoginPanel from '../../components/login/loginPanel';


export default function Login(){
   
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