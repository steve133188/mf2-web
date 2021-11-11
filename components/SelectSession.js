function SelectSession({children , btn=null}){
    return(
        <div className={"select_session mf_bg_light_grey"}>
            <div className={"filter_session"}>
                {children}
            </div>
            <div>
                {btn}
            </div>
        </div>
    )
}

export default SelectSession