import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useContext, useEffect} from "react";
import {useRouter} from "next/router";
import {GlobalContext} from "../context/GlobalContext";
import {useRootStore} from "../utils/provider/RootStoreProvider";

export default function Home() {
    const {authStore:{token}} = useRootStore()
    const router = useRouter()
    useEffect(()=>{ if( !token) {
        router.push("/login")
    }else{
        router.push("/dashboard/chat")
    } } , [])

    return (
        <div className={styles.container}>
            <Head>
                <title>MatrixForce 2.0</title>
                <meta name="description" content="The best social commerce solution"/>
                <link rel="icon" href="/MS_logo-square (1)"/>
                <link rel="manifest" href="/manifest.json" />
                <link href='https://fonts.googleapis.com/css?family=Manrope' rel='stylesheet'/>
            </Head>
            <main>
                <div className={"loading"}>

                </div>
            </main>
        </div>
    )
}
