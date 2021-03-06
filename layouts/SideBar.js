import Link from "next/link";
import { useRouter } from "next/router";
import {useEffect, useState , useLayoutEffect} from "react";
import {DashboardSVG,CommentsAltSVG,ContactSVG,IntegrationsSVG,OrganizationSVG,AdminSVG,BroadcastSVG,ProductsSVG} from "../public/side_bar_icon_svg/side_bar_icon_svg"
import NotificationList from "../components/NotificationList";
import NavItem from "../components/SideItem";
import {API , graphqlOperation} from "aws-amplify";
import {listMF2TCOMESSAGGES,listMF2TCOCHATROOMS} from "../src/graphql/queries";
import {subscribeToChatroom, subscribeToNewMessage} from "../src/graphql/subscriptions"

import {Avatar } from "@mui/material";
import {observer} from "mobx-react";
import {useRootStore} from "../utils/provider/RootStoreProvider";


function SideBar({setNotificationList , openNoteList , toggleNoteList,...props}  ) {

    const {  authStore:{logout ,userAuth} } = useRootStore()
    const router = useRouter()
    const [isDashOpen, setIsDashOpen] = useState(false)
    const [isTurnUp, setIsTurnUp] = useState(false)

    function dropDownArrowToggle() {
        setIsTurnUp(!isTurnUp);
    }

    const [isCollapse, setIsCollapse] = useState(false)

    function toggleCollapse() {
        setIsCollapse(!isCollapse);
    }
    //when click the notification, set unreadCount to 0
    function isActiveURL(url){
        const n = router.pathname
        return n.includes(url)
    }
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const [size, setSize] = useState([0, 0]);



        useLayoutEffect(() => {
            function updateSize() {
              setSize({width, height});
            }
            if(window) {
                updateSize();
                window.addEventListener('resize', updateSize);
                return () => window.removeEventListener('resize', updateSize);
            }
        }, []);
        // return size;


    useEffect(()=>{
          size.width<1500?setIsCollapse(true):setIsCollapse(false)
      },[size])


    return (
        <div className={(isCollapse ? "collapseLayout" :null)} >
            <div className={"layout-sidebar "}>
                <div className="sidebar-top">
                    <div className={"brand-logo "}>
                        <img src="/MS_logo-square (1).svg" alt="MatrixForce" />
                    </div>
                    <div className={"nav-items"}>

                        { isCollapse ? (
                            <Link href={"/dashboard/chat"}>
                                <div className={isActiveURL("/dashboard") ? "active-side-item" : "side-item "}>
                                    <span onClick={dropDownArrowToggle}>
                                        {/* parent path cannot approach func isActiveURL()*/}
                                        <div className={isActiveURL("/dashboard")? "active nav-item" : "nav-item "}>
                                            <DashboardSVG size="16"/>
                                            <span className="side-item-name">Dashboard </span>
                                        </div>
                                    </span>
                                </div>
                            </Link>) : (<div className={isActiveURL("/dashboard") ? "active-side-item" : "side-item "}>
                            <span onClick={dropDownArrowToggle}>
                                {/* parent path cannot approach func isActiveURL()*/}
                                <div className={isActiveURL("/dashboard")? "active nav-item" : "nav-item "
                                } onClick={e => {
                                    setIsDashOpen(!isDashOpen)
                                }}>

                                    <DashboardSVG size="16"/>

                                    {/* parent path cannot approach func isActiveURL()*/}

                                    <span className="side-item-name">Dashboard </span>
                                    { isCollapse?null: (
                                        isTurnUp ? (
                                            <svg id="expand_more-24px" xmlns="http://www.w3.org/2000/svg" width="16.291"
                                                 height="16.291" viewBox="0 0 16.291 16.291"
                                                 style={{ transform: "rotate(180deg)" }}>
                                                <path id="Path_3108" data-name="Path 3108" d="M16.291,16.291H0V0H16.291Z" fill="none"
                                                      opacity="0.87" />
                                                <path id="Path_3109" data-name="Path 3109"
                                                      d="M12.841,9.2,10.207,11.83,7.573,9.2a.677.677,0,1,0-.957.957l3.116,3.116a.676.676,0,0,0,.957,0L13.8,10.153a.676.676,0,0,0,0-.957A.691.691,0,0,0,12.841,9.2Z"
                                                      transform="translate(-2.065 -3.087) rotate" fill="currentColor" />
                                            </svg>) : (
                                            <svg id="expand_more-24px" xmlns="http://www.w3.org/2000/svg" width="16.291"
                                                 height="16.291" viewBox="0 0 16.291 16.291">
                                                <path id="Path_3108" data-name="Path 3108" d="M16.291,16.291H0V0H16.291Z"
                                                      fill="none" opacity="0.87" />
                                                <path id="Path_3109" data-name="Path 3109"
                                                      d="M12.841,9.2,10.207,11.83,7.573,9.2a.677.677,0,1,0-.957.957l3.116,3.116a.676.676,0,0,0,.957,0L13.8,10.153a.676.676,0,0,0,0-.957A.691.691,0,0,0,12.841,9.2Z"
                                                      transform="translate(-2.065 -3.087)" fill="currentColor" />
                                            </svg>))}

                                </div>
                            </span>
                            { isDashOpen&&!isCollapse ? (
                                <>
                                    <Link href={"/dashboard/chat"}>
                                        <div
                                            className={isActiveURL("/dashboard/chat") ? "active_text nav-item sub-nav-item" : "nav-item sub-nav-item"}><span className="side-item-name">Live Chat</span>
                                         {/* <NavItem url={"/livechat"} /> */}
                                        </div>
                                    </Link>
                                    <Link href={"/dashboard/agents"}>
                                        <div
                                            className={isActiveURL("/dashboard/agents") ? "active_text nav-item sub-nav-item" : "nav-item sub-nav-item"}><span className="side-item-name">Agents</span>
                                        </div>
                                    </Link>
                                </>) : null}
                        </div>)}
                        {userAuth&&userAuth.authority.livechat? <NavItem url={"/livechat"} name={"Live Chat"} icon={(<CommentsAltSVG size="16"/>)} active={isActiveURL("/livechat")} />:""}
                        {userAuth&&userAuth.authority.contact? <NavItem url={"/contacts"} name={"Contacts"} icon={(<ContactSVG size="16"/>)} active={isActiveURL("/contacts")}/>:""}
                        {/* <NavItem url={"/broadcast"} name={"Broadcast"} icon={(<BroadcastSVG size="16"/>)} active={isActiveURL("/broadcast")}/> */}
                       {userAuth&&userAuth.authority.integrations?  <NavItem url={"/integrations"} name={"Integrations"} icon={(<IntegrationsSVG size="16"/>)} active={isActiveURL("/integrations")}/>:""}
                        {/* <NavItem url={"/products"} name={"Products"} icon={(<ProductsSVG size="16"/>)} active={isActiveURL("/products")}/> */}
                        {userAuth&&userAuth.authority.organization? <NavItem url={"/organization"} name={"Organization"} icon={(<OrganizationSVG size="16"/>)} active={isActiveURL("/organization")}/>:""}
                        {userAuth&&userAuth.authority.admin? <NavItem url={"/admin"} name={"Admin"} icon={(<AdminSVG size="16"/>)} active={isActiveURL("/admin")}/>:""}


                        {/*{navItems.map((i,index)=>{*/}
                        {/*    <Link key={index} href={i.url}>*/}
                        {/*        <div className={"nav-item"}><img src={i.icon} alt={i.name}/> {i.name} </div>*/}
                        {/*    </Link>*/}
                        {/*})}*/}

                        <div  className="sidebarToggle" onClick={toggleCollapse}> {/*not need to use callback ()=>toggleCollapse() to spend memory if no params in func and  */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="47" viewBox="0 0 21 47"  >
                            <g id="Group_6687" data-name="Group 6687" transform="translate(-93 -129)">
                                <path id="Rectangle_4378" data-name="Rectangle 4378" d="M10,0H21a0,0,0,0,1,0,0V47a0,0,0,0,1,0,0H10A10,10,0,0,1,0,37V10A10,10,0,0,1,10,0Z" transform="translate(93 129)"
                                    fill="#d0e9ff" />
                                <g id="expand_more-24px" transform={isCollapse?"translate(97 160) rotate(270)":"translate(112.645 144.355) rotate(90)"}>
                                <path id="Path_3108" data-name="Path 3108" d="M16.291,16.291H0V0H16.291Z" fill="none" opacity="0.87"/>
                                <path id="Path_3109" data-name="Path 3109" d="M6.423.2,3.789,2.832,1.156.2A.677.677,0,0,0,.2,1.156L3.314,4.271a.676.676,0,0,0,.957,0L7.387,1.156a.676.676,0,0,0,0-.957A.691.691,0,0,0,6.423.2Z" transform="translate(4.353 5.91)"
                                    fill="#2198fa"/>
                                </g>
                            </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="sidebar-bottom">


                    <div className={"side_bottom"}>
                        {/*<div className={openNoteList? "side-item notify_activate":"side-item"} >*/}

                        <div className={openNoteList? "active-side-item ":"side-item"} >
                            <span onClick={toggleNoteList}>
                                <div className={openNoteList?"active nav-item":"nav-item "}>

                                        <svg xmlns="http://www.w3.org/2000/svg"  width="16.8" height="16.8"  fill="currentColor"
                                            className="bi bi-person" viewBox="0 0 16 16">
                                            <g id="bell" transform="translate(0 0.223)"  >
                                                <path id="Shape" d="M5.664,13.818a2.829,2.829,0,0,1-2.733-2.044H.708A.7.7,0,0,1,0,11.082V9.7A2.087,2.087,0,0,1,1.416,7.743V5.54a4.173,4.173,0,0,1,3.54-4.093V.693a.708.708,0,0,1,1.416,0v.755A4.175,4.175,0,0,1,9.913,5.54v2.2A2.086,2.086,0,0,1,11.328,9.7v1.385a.7.7,0,0,1-.708.693H8.4A2.828,2.828,0,0,1,5.664,13.818ZM4.447,11.774a1.417,1.417,0,0,0,2.436,0ZM2.124,9a.7.7,0,0,0-.708.693v.693h8.5V9.7A.7.7,0,0,0,9.2,9Zm3.54-6.233A2.8,2.8,0,0,0,2.832,5.54V7.618H8.5V5.54A2.8,2.8,0,0,0,5.664,2.771Z" transform="translate(2.832 1.341)" fill="currentColor"/>
                                            </g>
                                        </svg>
                                    <span className="side-item-name" style={{margin:"0 5px 0 0"}}>Notifications</span>
                                    {props.notices.length &&props.unread>0?<Avatar  className={"text-cente"}  sx={{width:20 , height:20 ,fontSize:13 ,backgroundColor:"#FC736A"}}  >{props.unread}</Avatar>
                                    : props.unread>0? <Avatar  className={"text-cente"}  sx={{width:20 , height:20 ,fontSize:13 ,backgroundColor:"#FC736A"}}  >{props.notices.length}</Avatar>: "" }
                                </div>
                            </span>
                            {openNoteList ? (
                                <div className="notification_activate">
                                    <div className="notify_box">
                                        <div className="notify_box_title" >Notification</div>
                                        <div className="notification_content">
                                                {/*<div className="notification_title" style={{display:"flex",justifyContent:"space-evenly",padding:"5%"}}>*/}
                                                    {/*<b className="notification_from">Unread Message :</b>*/}
                                                    {/*<Avatar  className={"text-cente"}  sx={{width:24, height:24 ,fontSize:15 ,backgroundColor:"#D0E9FF",color:"#2198FA"}} >{totalUnread} </Avatar>*/}
                                                    {/* <div className="notification_detail"> {"total number"} </div> */}
                                                {/*</div>*/}
                                                {/* <div className="notification_time"> {notification.receive_time} </div> */}
                                            </div>
                                        <div className="notify_box_list">
                                            {(props.notices.length>0)&&props.notices.map((d , index )=>{
                                                return(<NotificationList setNotificationList={setNotificationList} notification={d} key={index} className={+(index==0&&"active")} />)
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className={router.pathname == "/setting" ? "active-side-item" : "side-item"}>
                            <Link href={"/setting"}>
                                <div className={router.pathname == "/setting" ? "active nav-item" : "nav-item"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-person" viewBox="0 0 16 16">
                                        <g id="cog" transform="translate(0 -0.102)"  >
                                            <path id="Shape" d="M7.9,13.73H5.842a.687.687,0,0,1-.652-.466l-.433-1.3-1.222.611a.69.69,0,0,1-.3.071.682.682,0,0,1-.485-.2L1.284,10.984a.687.687,0,0,1-.131-.783l.611-1.222-1.3-.432A.687.687,0,0,1,0,7.895V5.835A.686.686,0,0,1,.467,5.19l1.3-.433L1.153,3.535a.686.686,0,0,1,.131-.789L2.746,1.284a.686.686,0,0,1,.783-.131l1.222.611.433-1.3A.686.686,0,0,1,5.833,0H7.895A.686.686,0,0,1,8.54.467l.433,1.3,1.222-.611a.691.691,0,0,1,.3-.071.681.681,0,0,1,.486.2l1.463,1.462a.687.687,0,0,1,.13.783L11.966,4.75l1.3.433a.684.684,0,0,1,.466.652v2.06a.686.686,0,0,1-.466.645l-1.3.433.611,1.222a.686.686,0,0,1-.13.789l-1.463,1.463a.686.686,0,0,1-.776.13l-1.222-.611-.432,1.3A.685.685,0,0,1,7.9,13.73ZM4.749,10.584a1.373,1.373,0,0,1,1.306.949l.275.824H7.421l.275-.824a1.372,1.372,0,0,1,1.915-.8l.762.412.755-.756-.391-.783a1.373,1.373,0,0,1,.8-1.936l.824-.274V6.309l-.824-.274a1.373,1.373,0,0,1-.8-1.916l.412-.762L10.393,2.6l-.783.392a1.373,1.373,0,0,1-1.936-.8L7.4,1.373H6.33L6.055,2.2a1.373,1.373,0,0,1-1.936.8L3.357,2.6,2.6,3.357l.392.762a1.372,1.372,0,0,1-.8,1.936l-.824.275V7.4l.824.274a1.373,1.373,0,0,1,.8,1.936l-.412.762.755.755.783-.391A1.378,1.378,0,0,1,4.749,10.584Zm2.116-.973A2.746,2.746,0,1,1,9.611,6.865,2.749,2.749,0,0,1,6.865,9.611Zm0-4.119A1.373,1.373,0,1,0,8.238,6.865,1.375,1.375,0,0,0,6.865,5.492Z" transform="translate(1.373 1.362)" fill="currentColor"/>
                                        </g>
                                    </svg>
                                    <span className="side-item-name">Setting</span>
                                </div>
                            </Link>
                        </div>
                        <div className={"side-item "} onClick={logout}>
                            <div className={"nav-item "}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-person" viewBox="0 0 16 16">
                                <g id="cog"  >
                                    <g id="noun_Log_Out_1364372" data-name="noun_Log Out_1364372" transform="translate(1.532 1.637)">
                                    <path id="Path_36658" data-name="Path 36658" d="M33.148,31.387a.382.382,0,0,0,.026-.051.63.63,0,0,0,.022-.07.307.307,0,0,1,.013-.048.641.641,0,0,0,0-.247.251.251,0,0,0-.013-.046.63.63,0,0,0-.022-.07c0-.018-.016-.034-.026-.05a.629.629,0,0,0-.032-.058.587.587,0,0,0-.038-.05c-.013-.016-.019-.027-.03-.04L30.26,27.691a.641.641,0,0,0-.934.878L31.1,30.455H22.961a.641.641,0,1,0,0,1.282H31.1l-1.773,1.884a.641.641,0,1,0,.934.878l2.789-2.964c.011-.013.019-.026.03-.038a.64.64,0,0,0,.04-.051A.631.631,0,0,0,33.148,31.387Z" transform="translate(-20.287 -24.732)" fill="currentColor"/>
                                    <path id="Path_36659" data-name="Path 36659" d="M11.873,23.007h2.591a2.243,2.243,0,0,0,2.243-2.243V19.687a.641.641,0,1,0-1.282,0v1.081a.961.961,0,0,1-.961.961H11.873a.961.961,0,0,1-.961-.961V12.523a.961.961,0,0,1,.961-.961h2.591a.961.961,0,0,1,.961.961V13.6a.641.641,0,0,0,1.282,0V12.523a2.243,2.243,0,0,0-2.243-2.243H11.873A2.243,2.243,0,0,0,9.63,12.523v8.241A2.243,2.243,0,0,0,11.873,23.007Z" transform="translate(-9.63 -10.28)" fill="currentColor"/>
                                    </g>
                                </g>
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

            </div>
        </div>
    )
}
export default observer(SideBar)
