import {useEffect, useRef, useState} from "react";
import Select from "@mui/material/Select";


export default  function MF_Select({children ,head,value=null, handleChange = null}){
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
                <div>
                    <h6 className={"mf_color_text"}>{head}</h6>
                    <button>confirm</button>
                </div>
                <div className="search">
                    <div className="mf_icon_input_block  mf_search_input">
                        <div className={"mf_inside_icon mf_search_icon "} > </div>
                        <input className={"mf_input mf_bg_light_grey"}/>
                    </div>
                </div>
                {children}
            </div>  }

        </div>

        </>
    )
}