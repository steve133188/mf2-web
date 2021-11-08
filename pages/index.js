import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {GlobalContext} from "../context/GlobalContext";

export default function Home() {
    const {user} = useContext(GlobalContext)
    const router = useRouter()
    useEffect(()=>{ if(user.token==''|| !user.token) {
        router.push("/login")
    }else{
        router.push("/dashboard/livechat")
    } } , [])

    return (
        <div className={styles.container}>
            <Head>
                <title>MatrixForce 2.0</title>
                <meta name="description" content="The best social commerce solution"/>
                <link rel="icon" href="/MS_logo-square.svg"/>
                <link href='https://fonts.googleapis.com/css?family=Manrope' rel='stylesheet'/>
            </Head>
            <main>
                <div className={"loading"}>

                </div>
            </main>
        </div>
    )
}
