import Link from "next/link"
import {BlueMenuDropdown, BlueMenuLink} from "./BlueMenuLink";
import {useState} from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function ORGMenu({orgData=null, ...props}) {
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
                {orgData&&orgData.map((data,index)=>{
                    return(

                        data.child != -1?  <li className="blueMenuLink"><span className="blueLink clickableSpan" onClick={toggleIsShow}>data.name<KeyboardArrowDownIcon/></span>
                                {isShow ? (data.child.map((child , index)=>{
                                    <li className="blueMenuLink" key={index}><Link href=""><a className="blueLink">{child.name}</a></Link></li>
                                })):null}
                            </li>:
                    <li className="blueMenuLink" key={index}><Link href=""><a
                        className={"blueLink"}>{data.name}</a></Link></li>

                    )
                })}
                {/*<li className="blueMenuLink blueLinkActive"><Link href=""><a className={"blueLink"}>Dashboard</a></Link></li>*/}
                {/*<li className="blueMenuLink"><span className="blueLink clickableSpan" onClick={toggleIsShow}>Features<KeyboardArrowDownIcon/></span>*/}
                {/*    {isShow ? (<ul className="blueMenuGroup blueMenuDropdownGroup">*/}
                {/*        <li className="blueMenuLink"><Link href=""><a className="blueLink">Page</a></Link></li>*/}
                {/*        <li className="blueMenuLink"><Link href=""><a className="blueLink">Element</a></Link></li>*/}
                {/*    </ul>):null}*/}
                {/*</li>*/}
                {/*<li className="blueMenuLink "><span className="blueLink clickableSpan" onClick={toggleIsShow2}>Services<KeyboardArrowDownIcon/></span>*/}
                {/*    {isShow2 ? ( <ul className="blueMenuGroup blueMenuDropdownGroup">*/}
                {/*        <li className="blueMenuLink"><Link href=""><a className="blueLink">App Design</a></Link></li>*/}
                {/*        <li className="blueMenuLink"><Link href=""><a className="blueLink">Web Design</a></Link></li>*/}
                {/*    </ul>):null}*/}
                {/*</li>*/}
                {/*<li className="blueMenuLink"><Link href=""><a className={"blueLink"}>Portfolio</a></Link></li>*/}
                {/*<li className="blueMenuLink"><Link href=""><a className={"blueLink"}>Overview</a></Link></li>*/}
                {/*<li className="blueMenuLink"><Link href=""><a className={"blueLink"}>Shortcuts</a></Link></li>*/}
                {/*<li className="blueMenuLink"><Link href=""><a className={"blueLink"}>Feedback</a></Link></li>*/}
            </ul>
        </nav>
    )
}

export function BlueMenu2({children, ...props}) {
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