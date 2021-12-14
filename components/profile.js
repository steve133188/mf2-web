
export default function Profile({children, handleClose,classname}){

    return(
        <div className={classname?`${classname}`:"pop_up_frame"} >
            <div className={"back_btn"}  onClick={handleClose} ><div className={"icon"} ></div> back</div>
            {children}
        </div>
    )
}