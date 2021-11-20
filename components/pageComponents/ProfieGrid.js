export default function ProfileGrid({data}){
    return(<div className={"profile_grid"}>
        <div className={"info_col grid_box"}>
            <div className={"ava_block"}>
                <img className={"ava"} src={data.img_url} alt="profile pic"/>
                <span className={"title"}>{data.name}</span>
                <button className={"chat_btn"}>chat</button>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>CustomerID</span>
                <span className={"info_content"}>{data.id}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Phone Number</span>
                <span className={"info_content"}>{data.phone}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Email</span>
                <span className={"info_content"}>{data.email}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Birthday</span>
                <span className={"info_content"}>{data.bod}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Gender</span>
                <span className={"info_content"}>{data.gender}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Address</span>
                <span className={"info_content"}>{data.address}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Created Date</span>
                <span className={"info_content"}>{data.createDate}</span>
            </div>
            <div className={"info_row"}>
                <span className={"info_label"}>Contact Owner</span>
                <span className={"info_content"}>{data.user}</span>
            </div>
        </div>
        <div className={"main_col"}>
            <div className={"two_block half_session"}>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Assignee</span></div>
                        <div className={"session_content"}></div>
                    </div>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Assignee</span></div>
                        <div className={"session_content"}></div>
                    </div>
                </div>
                <div className={"block_session grid_box block"}>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Assignee</span></div>
                        <div className={"session_content"}></div>
                    </div>
                    <div className={"half_session block_session"}>
                        <div className={"top_row"}><span className={"title"}>Assignee</span></div>
                        <div className={"session_content"}></div>
                    </div>
                </div>
            </div>
            <div className={"log_input half_session grid_box"}>
                <div className={"block_session"}>
                    <div className={"top_row"}><span className={"title"}>Activity</span></div>
                </div>
            </div>
        </div>
    </div>)
}