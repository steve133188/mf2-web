import {CustomerProfileInfo} from "../../../components/CustomerProfileInfo";
import {CustomerProfileCategory} from "../../../components/CustomerProfileCategory"
import {CustomerProfileChannel} from "../../../components/CustomerProfileChannel";
import {CustomerProfileActivityLog} from "../../../components/CustomerProfileActivityLog";
import axios from "axios";
import {useRouter} from "next/router";




export default function Customer_profile() {
    const router =useRouter()
    const {uid} = router.query
    return (
        <div className="customer_profile-layout">
            <h1>{uid}</h1>
            {/*<div className="leftMenu">MENU </div>*/}

            {/*<div className="rightContent">*/}
            {/*    <div className="navbar">NAVBAR</div>*/}
            {/*    <div className="container-fluid">*/}
            {/*        /!*<div className="mainContent">*!/*/}
            {/*            <CustomerProfileInfo/>*/}
            {/*            <div className="right">*/}
            {/*                <div className="right1">*/}
            {/*                    <span className="right1-1"><CustomerProfileCategory/></span>*/}
            {/*                    <span className="right1-2"><CustomerProfileChannel/></span>*/}
            {/*                </div>*/}

            {/*                <CustomerProfileActivityLog/>*/}
            {/*            </div>*/}
            {/*        /!*</div>*!/*/}
            {/*    </div>*/}
            {/*</div>*/}

        </div>
    )
}