import {useContext , useState , useEffect} from 'react'
import {GlobalContext} from "../context/GlobalContext";
import {checkAuthHelper} from "../helpers/authHelper";
import {useRouter} from "next/router";
import {useRootStore} from "../utils/provider/RootStoreProvider";

export default function AuthLayer({children}){
    const router = useRouter()
    const {authStore} = useRootStore()

    useEffect(()=>{
        // const res = await checkAuthHelper()
        if (localStorage.getItem("token")==null){
            console.log("please log in ")
            router.replace('/login' )
        }
        if(user.token&&router.pathname.includes("login")) router.replace("/")
    },[authStore.isAuth])

    return (<div>{children}</div>)
}

// import { useRouter } from "next/router";
//
// const AuthLayer = (WrappedComponent) => {
//     return (props) => {
//         if (typeof window !== "undefined") {
//             const Router = useRouter();
//
//             const accessToken = localStorage.getItem("token");
//
//             // If there is no access token we redirect to "/" page.
//             if (!accessToken) {
//                 Router.replace("/");
//                 return null;
//             }
//
//             // If this is an accessToken we just render the component that was passed with all its props
//
//             return <WrappedComponent {...props} />;
//         }
//
//         // If we are on server, return null
//         return null;
//     };
// };
//
// export default AuthLayer;
