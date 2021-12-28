import { InnerSidebar } from "../../../components/InnerSidebar"

export default function ReplyFolder() {

    return(
        <div className={"admin_layout"}>
        <InnerSidebar />
            <div className="rightContent">
                    <CreateReplyFolder  show={isCreate} reload={fetchStandardReply} toggle={toggleCreate} filteredAgents={filteredAgents} selectedAgents={selectedAgents} toggleSelectAgents={toggleSelectAgents}  />
                    <DeletePad show={isDelete} reload={fetchStandardReply} toggle={toggleDelete } submit={"removeManyContact"} data={selectedReply} title={"Folders"}/>
                    <div className={"search_session"}>
                        <div className="search">
                            <div className="mf_icon_input_block  mf_search_input">
                                <div className={"mf_inside_icon mf_search_icon "} > </div>
                                <input
                                    className={"mf_input mf_bg_light_grey"}
                                    type="search"
                                    name={"keyword"}
                                    onChange={(e)=> {
                                        searchFilter(e.target.value , standardReply,(new_data)=>{
                                            setFilteredData(new_data)
                                            setCurrentPage(1)
                                        })
                                    }}
                                    placeholder={"Search"}
                                />
                            </div>
                        </div>
                        <div className={"btn_group"}>
                            {!isSelectRow ? (
                                <button onClick={toggleSelectRow} className={"mf_bg_light_blue mf_color_blue"}> Select </button>
                            ) : (
                                <><button  onClick={toggleSelectRow} className={"mf_bg_light_grey mf_color_text"}> Cancel</button>
                                <button  onClick={()=>toggleDelete(selectedReply)} className={"mf_bg_light_blue mf_color_delete"}> Delete</button></>
                            )}
                            <button onClick={toggleCreate }>+ New Templete</button>
                        </div>
                    </div>




            </div>

        </div>
    )
}