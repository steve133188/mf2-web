import {useState} from "react";
import Select from "@mui/material/Select";


export default  function MF_Select({children ,head,value=null, handleChange = null}){
    const [isShow , setIsShow] =useState(false)

    return(
        <>
        <div
            className={"mf_dropdown"}
            value = {value}
        >
            <div onClick={(e)=>{setIsShow(!isShow);}}>
            <div className={"mf_dropdown_header "}>{head}</div><div className={"mf_down_arrow"}></div>
            </div>

            {isShow&& <div className={"dropdown_items"} onClick={null}>{children}</div>  }

        </div>

        </>
    )
}