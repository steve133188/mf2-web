import { useEffect, useState} from "react";
import {Avatar, AvatarGroup, Tooltip} from "@mui/material";
import ChannelListItem from "../serach_filter/filter.js/channelListItem";
import {Pill} from "../../Pill";
import List from "@mui/material/List";
import DropDown from "../../filter/teamDropDown";
import {inject, observer} from "mobx-react";

function ChatroomFilter( props){

    const {  onClick , users, tags ,confirm  , clear , teams ,chats ,contacts ,chatListStore:{filter , updateFilter ,checkFilter,filterChatList} ,customerStore:{customers}} = props

    const channelData = [
        {name:"Whatsapp",channelID:"Whatsapp",id:1},
        {name:"WABA",channelID:"WhatsappB",id:2},
        {name:"Messager",channelID:"Messager",id:3},
        {name:"WeChat",channelID:"Wechat",id:4},];


    const [selectedUsers ,setSelectedUsers] =useState([]);
    const [agentBarOpen,setAgentBar] = useState(false)



    const toggleStatusFilter =e=>{
        const {name } = e.target

        let newValue = {...filter.status,[name]:!filter.status[name]}

        updateFilter("status",newValue)
    }




    const toggleSelectTags = e => {
        const { id} = e.target;

        if (checkFilter("tags",id ,true)) {
            let newValue = filter.tags.filter(item=>item!==id)
            updateFilter("tags",newValue)
            return
        }
        let newValue = [...filter.tags , id]
        updateFilter("tags",newValue)

    };
    const toggleSelectChannels = e => {
        const {name , checked} = e.target;

        let newValue={...filter.channels, [name]:checked}

        updateFilter("channels" ,newValue)

    };
    const toggleSelectAllChannels = e => {

        let newValue={...filter.channels}

        let val = !filter.channels.All
        for(let v in filter.channels) {
            newValue[v]=val
        }

        updateFilter("channels" ,newValue)

    };

    const handleConfirm = ()=>{
        filterChatList(contacts)
        onClick();
    }

    const handleClear = ()=>{
        clear();
    }

    const handleCancel = ()=>{
        onClick();
    }

    const renderChannels = ()=>{

        return channelData.map((props , index) =>
            <div key={index} className={"channelListitem"} style={{padding:0}}>
            <div className={"left"}>
                <img className={"serachSVG"} src={`/channel_SVG/${props.name}.svg`} />
                <div style={{margin:"0 5px", minWidth:"180px"}}> {props.name}</div>
            </div>
            <div className={"right"} style={{width:"24",height:"24"}}>
                <div className="newCheckboxContainer right" style={{width:"24",height:"24"}}>
                    <label className="newCheckboxLabel">
                        <input type="checkbox"
                               id={props.id}
                               // value={filter.channels[props.name]}
                               name={props.name}
                               checked={filter.channels[props.name]}
                               onChange={()=>{}}
                               onClick={toggleSelectChannels}
                        />
                    </label>
                </div>
            </div>
        </div>)
    }

    const renderUsers = ()=>{
        return<AvatarGroup className={"AvatarGroup"} xs={{flexFlow:"row",justifyContent:"flex-start"}} max={5} spacing={"1"} >
            {selectedUsers.map((agent, index) => {
                return (
                    <Tooltip key={index} className={""} title={agent} placement="top-start">
                        <Avatar className={"mf_bg_warning mf_color_warning text-center"} sx={{
                            width: 25,
                            height: 25,
                            fontSize: 14
                        }}>{agent.substring(0, 2).toUpperCase()}</Avatar>
                    </Tooltip>
                )
            })}
        </AvatarGroup>
    }

    return(
        <div className={""} style={{width:"92%",height: "100%",maxHeight: "97vh"}}><div className={"filter_title"} style={{display:"flex",justifyContent:"space-between" }}><div>Filter</div>
            <div style={{padding:"0 0.5rem", cursor:"pointer",width:"50px",backgroundColor:"#DEF0FF",color:"#2198FA",textAlign:"center",borderRadius:"10px" }} onClick={handleClear} >Clear</div></div>
            <div className={"filter_box_status"}  >
                <div className={"status_box"}>
                    <div className="newCheckboxContainer">
                        <label className="newCheckboxLabel"> <input type="checkbox"  name="unread" onChange={()=>{}}  checked={filter.status.unread} onClick={toggleStatusFilter} />
                        </label>
                    </div>
                    Unread
                </div>
                <div className={"status_box"}>
                    <div className="newCheckboxContainer">
                        <label className="newCheckboxLabel"> <input type="checkbox"  name="unAssigned" onChange={()=>{}} checked={filter.status.unAssigned} onClick={toggleStatusFilter}/>
                        </label>
                    </div>
                    Unassign
                </div>
                <div className={"status_box"}>
                    <div className="newCheckboxContainer">
                        <label className="newCheckboxLabel"> <input type="checkbox"  name="ChatBot" checked={filter.status.ChatBot} onChange={()=>{}} onClick={toggleStatusFilter} />
                        </label>
                    </div>
                    ChatBot Off
                </div>
            </div>
            <div className={"filter_box_channel"}  >
                <div className={"channelList"}>
                    Channels<br/>
                    <ChannelListItem name={"All"}  id={"All"} checked={filter.channels["All"]} onclick={toggleSelectAllChannels } />
                    {renderChannels()}
                    {/*{channelData.map((e,i)=>{ return <ChannelListItem name={e.name} value={filter.channels[e.name]} id={e.id} key={i} checked={filter.channels[e.name]} onclick={toggleSelectChannels } />})}*/}
                </div>
            </div>
            <div >Agents
                <div style={{backgroundColor:"#F8F9FB"}}>
                    <div style={{padding:'15px 15px 0',font:"16px",display:"flex" ,width:"100%",justifyContent:"space-between"}} onClick={()=>{setAgentBar(!agentBarOpen)}} >
                        <div className={"filter_title"} >Choose Agent</div>
                        <div style={{margin:'0 15px 0 0'}}> { !agentBarOpen? (
                            <svg id="expand_more-24px" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 16.291 16.291"
                                 style={{ transform: "rotate(180deg)" }}>
                                <path id="Path_3108" data-name="Path 3108" d="M16.291,16.291H0V0H16.291Z" fill="none"
                                      opacity="0.87" />
                                <path id="Path_3109" data-name="Path 3109"
                                      d="M12.841,9.2,10.207,11.83,7.573,9.2a.677.677,0,1,0-.957.957l3.116,3.116a.676.676,0,0,0,.957,0L13.8,10.153a.676.676,0,0,0,0-.957A.691.691,0,0,0,12.841,9.2Z"
                                      transform="translate(-2.065 -3.087) rotate" fill="currentColor" />
                            </svg>) : (
                            <svg id="expand_more-24px" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 16.291 16.291">
                                <path id="Path_3108" data-name="Path 3108" d="M16.291,16.291H0V0H16.291Z"
                                      fill="none" opacity="0.87" />
                                <path id="Path_3109" data-name="Path 3109"
                                      d="M12.841,9.2,10.207,11.83,7.573,9.2a.677.677,0,1,0-.957.957l3.116,3.116a.676.676,0,0,0,.957,0L13.8,10.153a.676.676,0,0,0,0-.957A.691.691,0,0,0,12.841,9.2Z"
                                      transform="translate(-2.065 -3.087)" fill="currentColor" />
                            </svg>)}</div>

                    </div>

                    <div className={"agentSearchArea"}  style={agentBarOpen?{display:"block"}:{display:"none"}}>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'transparent' ,display:"flex",flexDirection:"column",justifyContent:"flex-start", }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <DropDown
                                teamData={teams}
                                clear={clear}
                                agents={users}
                            />

                            <div style={{display:"flex",justifyContent:"flex-end",}}>

                            </div>
                        </List>
                    </div>
                </div>
            </div>

            <div className={"filter_box_tag"}  >
                <div className={"channelList"}>
                    <div className={"filter_title"}>Tag</div>

                    {tags.map((tag)=>{
                        return(<li className={"channelListitem"}  key={tag.tag_id}><Pill key={tag.tag_id} size="30px" color="vip">{tag.tag_name}</Pill>
                            <div className="newCheckboxContainer">
                                <label className="newCheckboxLabel">
                                    <input
                                        type="checkbox"
                                        id={tag.tag_id}
                                        name="tags"
                                        checked={checkFilter("tags",tag.tag_id.toString(),true)}
                                        onClick={toggleSelectTags}
                                        onChange={()=>{}}
                                    />
                                </label>
                            </div>
                        </li>)
                    })}

                </div>
            </div>

            <div className="confirm_btn_set">

                <button className={"confirmButton"}  onClick={handleConfirm}  color="neutral">Confirm</button>
                <button className={"cancelButton"} onClick={handleCancel} >Cancel</button>
            </div>
        </div>
    )
}
export default inject("chatListStore" ,"chatroomStore" , "customerStore")(observer(ChatroomFilter))
