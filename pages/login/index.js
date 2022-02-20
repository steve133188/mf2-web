import React, { useEffect} from "react";
import {useRouter} from "next/router";
import LoginPanel from '../../components/login/loginPanel';
import { observer} from "mobx-react";
import {useRootStore} from "../../utils/provider/RootStoreProvider";


function Login(){

    const {authStore: {checkAuth , isAuth}} = useRootStore()

    const router = useRouter()
    useEffect(()=>{
        if(isAuth){
            console.log("login is ",isAuth)
            router.push("/dashboard/chat")
        }
    },[isAuth])

    return(
        <div className={"login_layout"}>
             <div className={"maincontainer"}>
                <div className={"Panel"}>
                    <LoginPanel/>
                </div>
            </div>
        </div>
    )
}

export default observer(Login)
