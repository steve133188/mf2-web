function SelectSession({children}){
    return(
        <div className={"select_session mf_bg_light_grey"}>
            <div className={"filter_session"}>
                {children}
            </div>
        </div>
    )
}

export default SelectSession