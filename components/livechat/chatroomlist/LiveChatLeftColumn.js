import ChatroomList from "./ChatroomList";
import ChatroomFilter from "./ChatroomFilter";
import {useState} from "react";

export default function LiveChatLeftColumn(props){

    const {searchFilter, filteredData  , chats , updateFilteredData   , tags, users , teams  , contacts } = props

    const [isFilterOpen,setIsFilterOpen] = useState(false)

    const clear = ()=>{
        updateFilteredData(chats)
    }

    return(<>
        <div className={"chat_list"}>
            <div className={"chatlist_ss"} >
                <div  className={"chatlist_ss_filter"}>
                    <div className={"filter_bar_left"}>
                        <div className={"search_ss"}>
                            <div className="mf_icon_input_block  mf_search_input"  >
                                <div className={"mf_inside_icon mf_search_icon "} > </div>
                                <input
                                    className={"mf_input mf_bg_light_grey"}
                                    onChange={(e)=> {
                                        searchFilter(e.target.value , chats,(new_data)=>{
                                            updateFilteredData(new_data);
                                        })
                                    }}
                                    placeholder={"Search"}
                                />
                                {/* <Livechat/> */}
                            </div>
                        </div>
                    </div>
                    <div className={"filter_box "+(isFilterOpen?"active":"")} onClick={async()=>{ setIsFilterOpen(!isFilterOpen);}}>
                        <div className={"filter_icon"}></div>
                    </div>
                    {/*<div className={"add_button"} onClick={()=>{setChatButtonOn("")}}  style={{display:ChatButtonOn=="m0"?"block":"none"}}>*/}
                    {/*    <AddButtonSVG c={"#D0E9FF"}/>*/}
                    {/*</div>*/}
                    {/*<div className={"add_button"} onClick={()=>{setChatButtonOn("m0"),setIsFilterOpen(false)}}  style={{display:ChatButtonOn!=="m0"?"block":"none"}}>*/}
                    {/*    <AddButtonSVG c={"#f5f6f8"} />*/}
                    {/*</div>*/}
                </div>
                <div className={"chatlist_filter_box"} style={{display:isFilterOpen?"flex":"none",overflowY:"scroll"}}>
                    {isFilterOpen? <ChatroomFilter
                        onClick={()=>setIsFilterOpen(!isFilterOpen)}
                        tags={tags}
                        teams={teams}
                        users={users}
                        confirm={updateFilteredData}
                        clear={clear}
                        chats={chats}
                        contacts={contacts}
                    />:""}
                </div>

                    <ChatroomList
                        chats={filteredData}
                        show={!isFilterOpen}
                    />

            </div>
        </div>
    </>)

}
