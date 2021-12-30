import {useEffect, useRef, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";

export default  function Mf_circle_btn({ children ,value=null, handleChange = null , customButton = null,svg,switchs,}){
    const [isShow , setIsShow] =useState(false)
    const wrapperRef = useRef();
    const handleClickOutside = (event) => {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target)
        ) {
            setIsShow(false);
            !isShow&&switchs&&switchs();
        }
    };
    if (customButton){
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
            <div className={"mf_circle_dropdown_div"} value = {value}>
                <button className={"mf_circle_btn "} onClick={()=>setIsShow(!isShow)}>
                    {svg!=null? <img src={`side_bar_icon_svg/${svg}.svg`} />:<AddIcon />}
                </button>
                 
                {isShow&& <div className={"mf_circle_dropdown"} ref={wrapperRef} onClick={null}>
                    <div className="search mf_dropdown_search">
                        <div className="mf_icon_input_block  mf_search_input">
                            <div className={"mf_inside_icon mf_search_icon "} > </div>
                            <input className={"mf_input mf_bg_light_grey"} value={value}  onChange={handleChange} placeholder={"Search"} />
                        </div>
                    </div>
                    <div className={"mf_circle_dropdown_content"}>
                        {children}
                    </div>
                </div>  }

            </div>

        </>
    )
}