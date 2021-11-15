function SelectSession({children , btn=null}){
    return(
        <div className={"select_session mf_bg_light_grey"}>
            <div className={"filter_session"}>
                {children}
            </div>
                {btn}

        </div>
    )
}

export default SelectSession