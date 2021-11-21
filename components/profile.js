
export default function Profile({children, handleClose}){

    return(
        <div className={"pop_up_frame"} >
            <div className={"back_btn"}  onClick={handleClose} ><div className={"icon"} ></div> back</div>
            {children}
        </div>
    )
}