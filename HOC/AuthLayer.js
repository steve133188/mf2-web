import {useContext , useState , useEffect} from 'react'
import {GlobalContext} from "../context/GlobalContext";
import {checkAuthHelper} from "../helpers/authHelper";
import {useRouter} from "next/router";

export default function AuthLayer({children}){
    const router = useRouter()
    const {user} = useContext(GlobalContext)
    // const [isAuth , setIsAuth] = useState(false)

    useEffect(async()=>{
        const res = await checkAuthHelper()

        if (!res){
            console.log("please log in ")
            router.push('/login' ,"/")
        }
        // setIsAuth(true)
    },[])

    return (<div>{children}</div>)
}