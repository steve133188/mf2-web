import {useEffect, useRef, useState} from "react";
import Select from "@mui/material/Select";
import * as React from "react";


export default  function Team_Select({children ,head,top_head,value=null, handleChange = null , customButton = null , submit ,customeDropdown=false}){
    const [isShow , setIsShow] =useState(false)
    const wrapperRef = useRef();
    let dropdown;
    const handleClickOutside = (event) => {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target)
    ) {
            setIsShow(false);
        }
    };
    if (customButton ==null){
        customButton = (
            <button onClick={()=> {
                submit();
                setIsShow(!isShow)
            }}>
                Confirm
            </button>
        )
    }

    if(!customeDropdown){
        dropdown = (<div className={"dropdown_items"} ref={wrapperRef} onClick={null}>
            <div className={"model_head"}>
                <h6 className={"model_head_title"}>{head}</h6>
                {customButton}
            </div>
            <div className="search mf_dropdown_search">
                <div className="mf_icon_input_block  mf_search_input">
                    <div className={"mf_inside_icon mf_search_icon "} > </div>
                    <input className={"mf_input mf_bg_light_grey"} value={value} onChange={handleChange} placeholder={"Search"} />
                </div>
            </div>
            <div className={"mf_dropdown_content"}>
                {children}
            </div>
        </div>)
    }else{
        function closeDropdown(){
            setTimeout(
                setIsShow(!isShow)
            ,1000)
        }
        dropdown=(
            <div className={"dropdown_select_items"} ref={wrapperRef} onClick={closeDropdown}>

                <div className={"select_item_content"}>
                    {children}
                </div>
            </div>
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
        <div className={"dropDownBox"} value = {value}>
            <div onClick={(e)=>{setIsShow(!isShow);}}>
            <div className={"mf_dropdown_header  dropDownBox"}>{top_head}</div><div className={"arrow_icon"} ></div> 
            </div>

            {isShow&& dropdown   }

        </div>

        </>
    )
}