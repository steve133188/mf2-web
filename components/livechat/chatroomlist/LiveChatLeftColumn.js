import ChatroomList from "./ChatroomList";
import ChatroomFilter from "./ChatroomFilter";
import {useContext, useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {GlobalContext} from "../../../context/GlobalContext";
import {useRootStore} from "../../../utils/provider/RootStoreProvider";


function LiveChatLeftColumn(props){

    const {tags, users , teams  , contacts } = props

    const {  chatListStore:{ search ,filterChatList ,filteredChatList,clear ,searchByInput} } = useRootStore()


    const [isFilterOpen,setIsFilterOpen] = useState(false)

    // useEffect(async ()=>{
    //     if(user.user.user_id){
    //         const {user:{user_id , team_id , role_id}} = user
    //
    //         console.log("creds :" , {user_id , team_id , role_id})
    //         // await getChatList({user_id , team_id , role_id})
    //         await getChatList({user_id , team_id , role_id} )
    //     }
    //
    // },[user])

    return(<>
        <div className={"chat_list"}>
            <div className={"chatlist_ss"} >
                <div  className={"chatlist_ss_filter"}>
                    <div className={"filter_bar_left"}>
                        <div className={"search_ss"}>
                            <div className="mf_icon_input_block  mf_search_input"  >
                                <div className={"mf_inside_icon mf_search_icon "} > </div>
                                <input
                                    value={search}
                                    className={"mf_input mf_bg_light_grey"}
                                    onChange={searchByInput}
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
                        confirm={filterChatList}
                        clear={clear}
                        chats={filteredChatList}
                        contacts={contacts}
                    />:""}
                </div>

                <ChatroomList
                    show={!isFilterOpen}
                />

            </div>
        </div>
    </>)

}
export default observer(LiveChatLeftColumn)
