import Link from "next/link"
import {BlueMenuDropdown, BlueMenuLink} from "./BlueMenuLink";
import {useState, useContext, useEffect} from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {useRouter} from "next/router";
import {GlobalContext} from "../context/GlobalContext";
import {Skeleton} from "@mui/material";

export function ORGSidebar({orgData=null, selection ,setSelection}) {

    const {orgInstance } = useContext(GlobalContext)
    const [isLoading, setIsLoading] = useState(true)
    const [isShow, setShow] = useState(false)
    const [data, setData] = useState([])
    function toggleIsShow() {
        setShow(!isShow);
    }
    const handleClick = async (team)=>{
        setSelection(team)
    }
    let family = []

    const fetch_org_family = async () => {
      for(let i = 0 ; i<orgData.length ; i ++ ){
          try {
              const res = await orgInstance.getRootFamilyById(orgData[i].id)

              family.push(res)
              console.log(res)

          }catch (err){
              alert(err)
          }
      }

        console.log("family : " , family)
        setData(family)
        console.log("Data:" , data)
    }

    useEffect(async ()=>{
        if(orgData.length>0 ){
            // await fetch_org_family()
            if (data.length!==0)setIsLoading(false)

        }
    },[])


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
            {isLoading && ske}
            {!isLoading && <ul className="blueMenuGroup">
                <li className={"blueMenuLink "+(selection.name? null:"active")} onClick={()=>handleClick({})}>All</li>
                {/*{*/}
                {/*    orgData.map((org)=>{*/}
                <Tree data={orgData}/>
                {/*})*/}
                {/*}*/}
                {/*{orgData&&orgData.map(async (data, index) => {*/}
                {/*    return (*/}
                {/*        // <li className={"blueMenuLink "+(selection.name==data.name?"active" :null)} key={index} onClick={()=>handleClick(data)}>{data.name}</li>*/}
                {/*        data.parent_id != -1 ?*/}
                {/*            <li className="blueMenuLink" onClick={toggleIsShow}>{data.name}<KeyboardArrowDownIcon/>*/}
                {/*                /!*{isShow ? (handleExpand(data.id).map((child, index) => {<li className="blueMenuLink" key={index}>{data.children[index].name}</li>})) : null} </li> : <li className={"blueMenuLink "+(selection.name==data.name?"active" :null)} key={index} onClick={()=>handleClick(data)}>{data.name}</li>*!/*/}
                {/*                {isShow ? (await handleExpand(data.id)) : null} </li> :*/}
                {/*            <li className={"blueMenuLink " + (selection.name == data.name ? "active" : null)}*/}
                {/*                key={index} onClick={() => handleClick(data)}>{data.name}</li>*/}
                {/*    )*/}
                {/*})}*/}
            </ul>}

        </nav>
    )
}
function TreeNode ({node}){
    const [childVisible , setChildVisible] = useState(false)

    const hasChild = node.children ? true : false ;
    useEffect(()=>{
        console.log("node: ",node)},[])
    return(
        <li className="blueMenuLink" onClick={()=>setChildVisible(v => !v)}>
            {node.name}

            {hasChild &&(
                <KeyboardArrowDownIcon/>
            )}

            {
                hasChild && childVisible && (
                    <Tree data={node.children} />
                )
            }
        </li>
    )


}

export const Tree = ({data = []})=>{
    return(
        <ul className="blueMenuGroup">
            {data.map( (d, index) => {
                    // <li className={"blueMenuLink "+(selection.name==data.name?"active" :null)} key={index} onClick={()=>handleClick(data)}>{data.name}</li>
                       return (<TreeNode key={index} node={d}/>)
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