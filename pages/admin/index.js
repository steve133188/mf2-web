import {useRouter} from "next/router";


export default function Admin() {
    const router = useRouter()
    router.push("/admin/Role")


    return (
        <div>
            <div className="admin_layout">

              </div>
        </div>
    )
}