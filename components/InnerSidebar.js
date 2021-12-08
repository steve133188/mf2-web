import Link from "next/link"
import {BlueMenuDropdown, BlueMenuLink} from "./BlueMenuLink";
import {useState, useContext, useEffect} from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {getOrgsByParentId, getRootFamilyById} from "../helpers/orgHelpers";
import {useRouter} from "next/router";

export function ORGSidebar({orgData=null, selection ,setSelection}) {

    const [isShow, setShow] = useState(false)
    function toggleIsShow() {
        setShow(!isShow);
    }
    const handleClick = async (team)=>{
        setSelection(team)
    }

    useEffect(async ()=>{

    } , [])
    console.log("org_data : " ,orgData)
    return (
        <nav className="blueMenu">
            <ul className="blueMenuGroup">
                <li className={"blueMenuLink "+(selection.name? null:"active")} onClick={()=>handleClick({})}><Link href="">All</Link></li>
                {orgData&&orgData.map((data,index)=>{
                    return(
                        <li className={"blueMenuLink "+(selection.name==data.name?"active" :null)} key={index} onClick={()=>handleClick(data)}>{data.name}</li>
                        // data.children != -1?  <li className="blueMenuLink"><span className="blueLink clickableSpan" onClick={toggleIsShow}>{data.name}<KeyboardArrowDownIcon/></span>
                        //         {isShow ? (data.children.map((child , index)=>{
                        //             <li className="blueMenuLink" key={index}><a className="blueLink">{data.children[index].name}</a></li>
                        //         })):null} </li>:<li className="blueMenuLink" key={index}><Link href=""><a className={"blueLink"}>{data.name}</a></Link></li>

                    )
                })}
            </ul>
        </nav>
    )
}

export function InnerSidebar() {
    const [isSelect, setSelect] = useState(false)
    function toggleIsSelect() {
        setSelect(!isSelect);
    }
    const router = useRouter()
    return (
        <nav className="blueMenu">
            <ul className="blueMenuGroup">
                {/*<li className="blueMenuLink"><span className="blueLink clickableSpan" onClick={toggleIsShow}>Index & Terms<KeyboardArrowDownIcon/></span>*/}
                {/*    {isShow ? (<ul className="blueMenuGroup blueMenuDropdownGroup">*/}
                {/*        <Link href="admin/role"><li className="blueMenuLink"><a className="blueLink">Role</a></li></Link>*/}
                {/*        <Link href=""><li className="blueMenuLink"><a className="blueLink">Index</a></li></Link>*/}
                {/*    </ul>):null}*/}
                {/*</li>*/}
                <Link href={"/admin/Role"}><li className={"blueMenuLink "+(router.pathname.includes("/admin/Role")? "active":null)} >Role</li></Link>
                <Link href={"/admin/Agent"}><li className={"blueMenuLink "+(router.pathname.includes("/admin/Agent")? "active":null)} >Agent</li></Link>
                <Link href={"/admin/StandardReply"}><li className={"blueMenuLink "+(router.pathname.includes("/admin/StandardReply")? "active":null)} >Standard Reply</li></Link>
                <Link href={"/admin/Tags"}><li className={"blueMenuLink "+(router.pathname.includes("/admin/Tags")? "active":null)} >Tags</li></Link>
                <Link href={"/admin/Stickers"}><li className={"blueMenuLink "+(router.pathname.includes("/admin/Stickers")? "active":null)} >Stickers</li></Link>
                <Link href={"/admin/Connection"}><li className={"blueMenuLink "+(router.pathname.includes("/admin/Connection")? "active":null)}>Connection</li></Link>
            </ul>
        </nav>
    )
}