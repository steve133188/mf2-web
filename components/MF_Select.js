import {useEffect, useRef, useState} from "react";
import Select from "@mui/material/Select";


export default  function MF_Select({children ,head,value=null, handleChange = null , customButton = null}){
    const [isShow , setIsShow] =useState(false)
    const wrapperRef = useRef();
    const handleClickOutside = (event) => {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target)
    ) {
            setIsShow(false);
        }
    };
    if (customButton == null){
        customButton = (
            <button onClick={()=>setIsShow(!isShow)}>
                Confirm
            </button>
        )
    }
    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[])

    return(
        <>
        <div className={"mf_dropdown"} value = {value}>
            <div onClick={(e)=>{setIsShow(!isShow);}}>
            <div className={"mf_dropdown_header "}>{head}</div><div className={"mf_down_arrow"}></div>
            </div>

            {isShow&& <div className={"dropdown_items"} ref={wrapperRef} onClick={null}>
                <div className={"model_head"}>
                        <h6 className={"model_head_title"}>{head}</h6>
                    {customButton}
                </div>
                <div className="search mf_dropdown_search">
                    <div className="mf_icon_input_block  mf_search_input">
                        <div className={"mf_inside_icon mf_search_icon "} > </div>
                        <input className={"mf_input mf_bg_light_grey"} value={value} onChange={(e)=>{
                            console.log(`filter ${head}  search by ${e.target.value}`)}} placeholder={"Search"} />
                    </div>
                </div>
                <div className={"mf_dropdown_content"}>
                    {children}
                </div>
            </div>  }

        </div>

        </>
    )
}