import Link from "next/link"
import {BlueMenuDropdown, BlueMenuLink} from "./BlueMenuLink";
import {useState, useContext, useEffect} from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {useRouter} from "next/router";
import {GlobalContext} from "../context/GlobalContext";
import {Skeleton} from "@mui/material";
import DivisionDropDown from "./filter/divisionDropDown";

export function ORGSidebar({orgData=null, selection ,setSelection}) {

    const {orgInstance } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(true)
    const [isShow, setShow] = useState(false)
    const [data, setData] = useState([])
    function toggleIsShow() {
        setShow(!isShow);
    }
    const handleClick =  (team)=>{
        setSelection(team)
    }



    useEffect(async ()=>{
        if(orgData.length>0 ){
            // await fetch_org_family()
            if (orgData.length!==0)setIsLoading(false)
            setData(orgData)
        }
    },[orgData])


    const ske = (
        <h1>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        </h1>
    )
    return (
        <nav className="blueMenu">
        {/*<DivisionDropDown data={data} setSelection={setSelection} />*/}

            {isLoading ?ske: <ul className="blueMenuGroup">
                <li className={"blueMenuLink "+(selection.name? null:"active")} onClick={()=>handleClick({})}>All</li>
                <Tree data={orgData} handleClick={handleClick}/>

            </ul>}

        </nav>
    )
}
function TreeNode ({node ,handleClick}){
    const [childVisible , setChildVisible] = useState(false)

    const hasChild = node.children ? true : false ;

    return(
        <li className="blueMenuLink" onClick={()=> {
            setChildVisible(v => !v);
            handleClick()
        }}>
            {node.name}

            {hasChild &&(
                <KeyboardArrowDownIcon/>
            )}

            {
                hasChild && childVisible && (
                    <Tree data={node.children} handleClick={handleClick}/>
                )
            }
        </li>
    )


}

export const Tree = ({data = [], handleClick})=>{
    return(
        <ul className="blueMenuGroup">
            {data.map( (d, index) => {
                    // <li className={"blueMenuLink "+(selection.name==data.name?"active" :null)} key={index} onClick={()=>handleClick(data)}>{data.name}</li>
                       return (<TreeNode key={index} node={d} handleClick={handleClick}/>)
            })}
        </ul>
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
                {/* <Link href={"/admin/Connection"}><li className={"blueMenuLink "+(router.pathname.includes("/admin/Connection")? "active":null)}>Connection</li></Link> */}
            </ul>
        </nav>
    )
}