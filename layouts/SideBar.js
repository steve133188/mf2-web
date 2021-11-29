import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {Pill} from "../components/Pill";

export default function SideBar(props) {
    const router = useRouter()
    const { navItems } = props
    const [isDashOpen, setIsDashOpen] = useState(false)
    const dropdown = () => {

    }
    const [isTurnUp, setIsTurnUp] = useState(false)

    function dropDownArrowToggle() {
        setIsTurnUp(!isTurnUp);
    }

    const [isCollapse, setIsCollapse] = useState(false)

    function toggleCollapse() {
        setIsCollapse(!isCollapse);
    }
    //handle NotifyBox toggle
    const [isNotifyBoxOpen, setIsNotifyBoxOpen] = useState(false);

    function notifyBoxToggle() {
        setIsNotifyBoxOpen(!isNotifyBoxOpen);
    }

    return (

        <div className={isCollapse ? ("layout-sidebar collapseLayout") : ("layout-sidebar")}>

            <div className={"brand-logo "}>
                <img src="/MS_logo-square (1).svg" alt="MatrixForce" />
            </div>
            <div className={"nav-items"}>
                <div className={router.pathname.includes("/dashboard") ? "active-side-item" : "side-item "}>
                    <span onClick={dropDownArrowToggle}>
                        <div className={router.pathname.includes("/dashboard") ? "active nav-item" : "nav-item "
                        } onClick={e => {
                            setIsDashOpen(!isDashOpen)
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-house-door" viewBox="0 0 16 16">
                                <path
                                    d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                            </svg>
                            <span className="side-item-name">Dashboard</span>
                            {isTurnUp ? (<svg id="expand_more-24px" xmlns="http://www.w3.org/2000/svg" width="16.291"
                                height="16.291" viewBox="0 0 16.291 16.291"
                                style={{ transform: "rotate(180deg)" }}>
                                <path id="Path_3108" data-name="Path 3108" d="M16.291,16.291H0V0H16.291Z" fill="none"
                                    opacity="0.87" />
                                <path id="Path_3109" data-name="Path 3109"
                                    d="M12.841,9.2,10.207,11.83,7.573,9.2a.677.677,0,1,0-.957.957l3.116,3.116a.676.676,0,0,0,.957,0L13.8,10.153a.676.676,0,0,0,0-.957A.691.691,0,0,0,12.841,9.2Z"
                                    transform="translate(-2.065 -3.087)" fill="currentColor" />
                            </svg>) : (
                                <svg id="expand_more-24px" xmlns="http://www.w3.org/2000/svg" width="16.291"
                                    height="16.291" viewBox="0 0 16.291 16.291">
                                    <path id="Path_3108" data-name="Path 3108" d="M16.291,16.291H0V0H16.291Z"
                                        fill="none" opacity="0.87" />
                                    <path id="Path_3109" data-name="Path 3109"
                                        d="M12.841,9.2,10.207,11.83,7.573,9.2a.677.677,0,1,0-.957.957l3.116,3.116a.676.676,0,0,0,.957,0L13.8,10.153a.676.676,0,0,0,0-.957A.691.691,0,0,0,12.841,9.2Z"
                                        transform="translate(-2.065 -3.087)" fill="currentColor" />
                                </svg>)}
                        </div>
                    </span>
                    {isDashOpen ? (
                        <>
                            <Link href={"/dashboard/livechat"}>
                                <div
                                    className={router.pathname.includes("/dashboard/livechat") ? "active_text nav-item sub-nav-item" : "nav-item sub-nav-item"}><span className="side-item-name">Live Chat</span>
                                </div>
                            </Link>
                            <Link href={"/dashboard/agents"}>
                                <div
                                    className={router.pathname.includes("/dashboard/agents") ? "active_text nav-item sub-nav-item" : "nav-item sub-nav-item"}><span className="side-item-name">Agents</span>
                                </div>
                            </Link>
                        </>) : null}


                </div>
                <div className={router.pathname == "/livechat" ? "active-side-item" : "side-item "}>
                    <Link href={"/livechat"}>
                        <div className={router.pathname == "/livechat" ? "active nav-item" : "nav-item "}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-chat-right" viewBox="0 0 16 16">
                                <path
                                    d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                            </svg>
                            <span className="side-item-name">Live Chat</span>
                        </div>
                    </Link>
                </div>
                <div className={router.pathname == "/contacts" ? "active-side-item" : "side-item "}>
                    <Link href={"/contacts"}>
                        <div className={router.pathname == "/contacts" ? "active nav-item" : "nav-item "}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-journal-text" viewBox="0 0 16 16">
                                <path
                                    d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                <path
                                    d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                                <path
                                    d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
                            </svg>
                            <span className="side-item-name">Contacts</span>
                        </div>
                    </Link>
                </div>
                {/*<div className={router.pathname == "/broadcast" ? "active-side-item" : "side-item "}>*/}
                {/*    <Link href={"/broadcast"}>*/}
                {/*        <div className={router.pathname == "/broadcast" ? "active nav-item" : "nav-item "}>*/}
                {/*            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                {/*                 className="bi bi-broadcast-pin" viewBox="0 0 16 16">*/}
                {/*                <path*/}
                {/*                    d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM6 8a2 2 0 1 1 2.5 1.937V15.5a.5.5 0 0 1-1 0V9.937A2 2 0 0 1 6 8z"/>*/}
                {/*            </svg>*/}
                {/*            <span className="side-item-name">Broadcast</span>*/}
                {/*        </div>*/}
                {/*    </Link>*/}
                {/*</div>*/}
                {/*<div className={router.pathname == "/flowbuilder" ? "active-side-item" : "side-item "}>*/}
                {/*    <Link href={"/flowbuilder"}>*/}
                {/*        <div className={router.pathname == "/flowbuilder" ? "active nav-item" : "nav-item "}>*/}
                {/*            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                {/*                 className="bi bi-bar-chart-steps" viewBox="0 0 16 16">*/}
                {/*                <path*/}
                {/*                    d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>*/}
                {/*            </svg>*/}
                {/*            <span className="side-item-name">Flow Builder</span>*/}
                {/*        </div>*/}
                {/*    </Link>*/}
                {/*</div>*/}
                <div className={router.pathname == "/integrations" ? "active-side-item" : "side-item "}>
                    <Link href={"/integrations"}>
                        <div className={router.pathname == "/integrations" ? "active nav-item" : "nav-item "}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-collection" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
                            </svg>
                            <span className="side-item-name">Integrations</span>
                        </div>
                    </Link>
                </div>
                {/*<div className={router.pathname == "/products" ? "active-side-item" : "side-item "}>*/}
                {/*    <Link href={"/products"}>*/}
                {/*        <div className={router.pathname == "/products" ? "active nav-item" : "nav-item "}>*/}
                {/*            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                {/*                 className="bi bi-shop" viewBox="0 0 16 16">*/}
                {/*                <path*/}
                {/*                    d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>*/}
                {/*            </svg>*/}
                {/*            <span className="side-item-name">Product Catalogue</span>*/}
                {/*        </div>*/}
                {/*    </Link>*/}
                {/*</div>*/}
                <div className={router.pathname == "/organization" ? "active-side-item" : "side-item "}>
                    <Link href={"/organization"}>
                        <div className={router.pathname == "/organization" ? "active nav-item" : "nav-item "}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-share" viewBox="0 0 16 16">
                                <path
                                    d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                            </svg>
                            <span className="side-item-name">Organization</span>
                        </div>
                    </Link>
                </div>
                <div className={router.pathname == "/admin" ? "active-side-item" : "side-item "}>
                    <Link href={"/admin"}>
                        <div className={router.pathname == "/admin" ? "active nav-item" : "nav-item "}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-person" viewBox="0 0 16 16">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>
                            <span className="side-item-name">Admin</span>
                        </div>
                    </Link>
                </div>
                {/*{navItems.map((i,index)=>{*/}
                {/*    <Link key={index} href={i.url}>*/}
                {/*        <div className={"nav-item"}><img src={i.icon} alt={i.name}/> {i.name} </div>*/}
                {/*    </Link>*/}
                {/*})}*/}
            </div>

            <div className={"side_bottom"}>
                <div className={"side-item notification"} >
                    <span onClick={notifyBoxToggle}>
                        <div className={"nav-item "}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-person" viewBox="0 0 16 16">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>
                            <span className="side-item-name">Notifications</span>
                            <Pill color="red">1</Pill>
                        </div>

                    </span>
                    {isNotifyBoxOpen ? (
                        <>
                            <div className="notify_box">
                                <div className="notify_box_title">Notification</div>
                                <div className="notify_box_list">

                                    <div className="notify_box_li">

                                        <div className={"notify_icon"}>

                                            <img width="24px" height="24px" src={`./whatsappChannel.svg`} alt=""/>
                                        </div>

                                        <div className="notification_content">
                                            <div className="notification_title">
                                                <b className="notification_from">Tim</b> replied you
                                            </div>
                                            <div className="notification_detail"> Lorem ipsum dolor sit amet. </div>
                                            <div className="notification_time">30 mins</div>
                                        </div>

                                        <div className="notify_box_unread_dot"></div>

                                    </div>



                                </div>



                            </div>
                        </>) : null}

                </div>
                <div className={router.pathname == "/setting" ? "active-side-item" : "side-item "}>
                    <Link href={"/admin"}>
                        <div className={router.pathname == "/setting" ? "active nav-item" : "nav-item "}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-person" viewBox="0 0 16 16">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>
                            <span className="side-item-name">Setting</span>
                        </div>
                    </Link>
                </div>
                <div className={"side-item "}>
                    <div className={"nav-item "}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="bi bi-person" viewBox="0 0 16 16">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        </svg>
                        <span className="side-item-name">Logout</span>
                    </div>
                </div>
            </div>
            {/*<button className={"collapseButton"} onClick={toggleCollapse}>*/}
            {/*    <svg id="expand_more-24px" xmlns="http://www.w3.org/2000/svg" width="16.291" height="16.291"*/}
            {/*         viewBox="0 0 16.291 16.291" className={"collapseIcon"}>*/}
            {/*        <path id="Path_3108" data-name="Path 3108" d="M16.291,16.291H0V0H16.291Z" fill="none"*/}
            {/*              opacity="0.87"/>*/}
            {/*        <path id="Path_3109" data-name="Path 3109"*/}
            {/*              d="M12.841,9.2,10.207,11.83,7.573,9.2a.677.677,0,1,0-.957.957l3.116,3.116a.676.676,0,0,0,.957,0L13.8,10.153a.676.676,0,0,0,0-.957A.691.691,0,0,0,12.841,9.2Z"*/}
            {/*              transform="translate(-2.065 -3.087)" fill="currentColor"/>*/}
            {/*    </svg>*/}
            {/*</button>*/}
        </div>
    )
}

// export async function getStaticProps(context){
//     const res = await fetch(`"../data/nav.json"`)
//     const data = await res.json()
//
//     return{
//         props:{
//             data
//         }
//     }
// }
