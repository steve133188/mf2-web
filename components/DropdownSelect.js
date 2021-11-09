import {useState} from "react";

export default function DropDownSelect({value,children}){
    const [isOpen , setIsOpen] = useState(false)

    return(
        <>
            <div className={""} onClick={setIsOpen(!isOpen)}>
                {value}
            </div>
            {isOpen?{children}:null}
        </>

    )
}