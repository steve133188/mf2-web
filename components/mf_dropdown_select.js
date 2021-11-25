import {useEffect, useRef, useState} from "react";

export default function Mf_icon_dropdown_select_btn({btn ,children  }){
    const [isShow, setIsShow] = useState(false)
    const [isSelected, setIsSelected] = useState(isSelected)
    const wrapperRef = useRef();
    const handleClickOutside = (event) => {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target)
        ) {
            setIsShow(false);
        }else if(wrapperRef.current &&
            wrapperRef.current.contains(event.target)){
            setTimeout(()=>{            setIsShow(false);
            },100)
        }
    };
    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[])
    return(
        <div className={"mf_dropdown_select"} >
            <div onClick={(e)=>{e.stopPropagation();setIsShow(!isShow);}}>
                {btn}
            </div>
            {isShow&&!isSelected&&<div className={"mf_dropdown_select_items"} ref={wrapperRef} onClick={null}>
                    {children}
            </div>  }
        </div>
    )
}