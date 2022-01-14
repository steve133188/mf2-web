import {useEffect, useRef, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import QuickReply from "./quickReply/quickreply";

export default function Forward({open,children ,value="",isDisable, handleChange = null , customButton = null,svg,switchs,style,ref,...props}){
    
const [searchValue,setSearch]=useState("")
        const [isShow , setIsShow] =useState(false)
        const wrapperRef = useRef();
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsShow(false);
                switchs()
                !open&&switchs&&switchs();
                // !isShow&&switchs&&switchs();
            }
        };
        // if (customButton){
        //     customButton = (
        //         <button onClick={()=>setIsShow(!isShow)}>
        //             Confirm
        //         </button>
        //     )
        //     }
        useEffect(()=>{
            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);QuickReply                                                                                                                                                                                                                                                      
            };
        },[])
        
    
        return(
            <>
                <div className={"mf_circle_dropdown_div"} style={{}} value={value}>
                    {/* <button className={"mf_circle_btn "} onClick={()=>{if(!isDisable)setIsShow(!isShow)}}>
                        {svg!=null? <img src={`side_bar_icon_svg/${svg}.svg`} />:<AddIcon />}
                    </button> */}
                    {/* <button onClick={()=>setIsShow(!isShow)}>
                    Confirm
                </button> */}
                    {open&& <div className={"mf_circle_dropdown"}  style={style} ref={wrapperRef} onClick={null}>
                    <div className={"top_row" } style={{display:"flex",justifyContent:"space-between"}}>

                    <div style={{font:"normal normal bold 16px/22px Manrope",padding:"3%"}}>Forward</div>
                    <button onClick={switchs}>Confirm</button>
                    </div>
                        <div className="search mf_dropdown_search">
                            <div className="mf_icon_input_block  mf_search_input">
                                <div className={"mf_inside_icon mf_search_icon "} > </div>
                                <input className={"mf_input mf_bg_light_grey"} value={searchValue}  onChange={(e)=>{handleChange;setSearch(e.target.value)}} placeholder={"Search"} />
                            </div>
                        </div>
                        <div className={"mf_circle_dropdown_content"} style={{height:"fit-content",maxHeight:"600px"}}>
                            {children}
                        </div>
                    </div>  }
    
                </div>
    
            </>
        )
    }
    