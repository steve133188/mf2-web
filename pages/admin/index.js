import {useRouter} from "next/router";
import {useEffect} from "react";


export default function Admin() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()

    useEffect(()=>{
        router.push("/admin/Role")
    },[])



    return (
        <div>
            <div className="admin_layout">

              </div>
        </div>
    )
}