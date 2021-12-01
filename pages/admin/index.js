import {useRouter} from "next/router";
import {useEffect} from "react";


export default function admin() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(()=>{
        const router = useRouter()
        router.push("/admin/Role")
    },[])



    return (
        <div>
            <div className="admin_layout">

              </div>
        </div>
    )
}