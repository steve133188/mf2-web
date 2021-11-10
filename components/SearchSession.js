function SearchSession({type = "text",placeholder="",state ,handleChange ,children}){
    return(
        <>
        <div className={"search_session"}>
            <div className="search">
                    <div className="mf_icon_input_block  mf_search_input">
                        <div className={"mf_inside_icon mf_search_icon "} > </div>
                        <input
                            className={"mf_input mf_bg_light_grey"}
                            type={type}
                            value={state}
                            onChange={handleChange}
                            placeholder={placeholder}
                        />
                    </div>
            </div>
            <div className={"btn_group"}>
                {children}
            </div>
        </div>
        </>
    )
}

export default SearchSession