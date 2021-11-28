import Link from "next/link"
import {BlueMenuDropdown, BlueMenuLink} from "./BlueMenuLink";
import {useState, useContext, useEffect} from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function ORGSidebar({orgData=null, ...props}) {
    const [isSelect, setSelect] = useState(false)

    const [isShow, setShow] = useState(false)
    function toggleIsShow() {
        setShow(!isShow);
    }
    useEffect(()=>{

    } , [])
    console.log("org_data : " ,orgData)
    return (
        <nav className="blueMenu">
            <ul className="blueMenuGroup">
                <li className="blueMenuLink"><Link href=""><a className={"blueLink active"}>All</a></Link></li>
                {orgData&&orgData.map((data,index)=>{
                    return(

                        data.child != -1?  <li className="blueMenuLink"><span className="blueLink clickableSpan" onClick={toggleIsShow}>{data.name}<KeyboardArrowDownIcon/></span>
                                {isShow ? (data.child.map((child , index)=>{
                                    <li className="blueMenuLink" key={index}><Link href=""><a className="blueLink">{child.name}</a></Link></li>
                                })):null}
                            </li>:
                    <li className="blueMenuLink" key={index}><Link href=""><a className={"blueLink"}>{data.name}</a></Link></li>

                    )
                })}
            </ul>
        </nav>
    )
}

export function InnerSidebar({children, ...props}) {
    const [isSelect, setSelect] = useState(false)
    function toggleIsSelect() {
        setSelect(!isSelect);
    }
    const [isShow, setShow] = useState(false)
    function toggleIsShow() {
        setShow(!isShow);
    }
    const [isShow2, setShow2] = useState(false)
    function toggleIsShow2() {
        setShow2(!isShow2);
    }
    return (
        <nav className="blueMenu">
            <ul className="blueMenuGroup">
                <li className="blueMenuLink"><span className="blueLink clickableSpan" onClick={toggleIsShow}>Agent & Terms<KeyboardArrowDownIcon/></span>
                    {isShow ? (<ul className="blueMenuGroup blueMenuDropdownGroup">
                        <Link href="admin/role"><li className="blueMenuLink"><a className="blueLink">Role</a></li></Link>
                        <Link href=""><li className="blueMenuLink"><a className="blueLink">Agent</a></li></Link>
                    </ul>):null}
                </li>
                <Link href=""><li className="blueMenuLink"><a className={"blueLink"}>Contact Groups</a></li></Link>
                <Link href=""><li className="blueMenuLink"><a className={"blueLink"}>Standard Reply</a></li></Link>
                <Link href=""><li className="blueMenuLink"><a className={"blueLink"}>Tags</a></li></Link>
                <Link href=""><li className="blueMenuLink"><a className={"blueLink"}>Assignment Role</a></li></Link>
                <Link href=""><li className="blueMenuLink"><a className={"blueLink"}>Message API</a></li></Link>
            </ul>
        </nav>
    )
}