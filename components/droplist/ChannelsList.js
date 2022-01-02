import { useState } from "react";
import ChannelListItem from "../livechat/serach_filter/filter.js/channelListItem";


export default function ChannelsDropList({toggleChannels,toggleAll}){
    const channelList = [
        {name:"WhatsApp",channelID:"whatsapp",value:"whatsapp",connectState:false,token:""},
        {name:"WhatsApp Business API",channelID:"whatsappB",value:"whatsappB",connectState:false,token:""},
        {name:"WeChat", channelID:"wechat", value:"wechat", connectState:false,token:""},
        {name:"Facebook Messager", channelID:"messager",value:"messager",connectState:false,token:""},
        {name:"Line", channelID:"line",value:"line",connectState:false,token:""},
        {name:"Signal", channelID:"signal",value:"signal",connectState:false,token:""},
        {name:"Telegram", channelID:"telegram",value:"telegram",connectState:false,token:""},
        {name:"Kakao Talk", channelID:"kakaotalk",value:"kakaotalk",connectState:false,token:""},
        // {name:"Telegram", channelID:"",connectState:false,token:""},
    ]

    const [open,setOpen] =useState(true);

    const [selectedChannels ,setSelectedChannels] =useState([]);
    const toggleSelectChannels = e => {
        const { checked ,id} = e.target;
        setSelectedChannels([...selectedChannels, id]);
        if (!checked) {
            setSelectedChannels(selectedChannels.filter(item => item !== id));
        }
        toggleChannels(e)
        console.log(selectedChannels)
    };
    const toggleSelectAllChannels = e => {
        const { checked ,id} = e.target;
        setSelectedChannels(["all","whatsapp","whatsappB","wechat","messager","line","signal","telegram","kakaotalk"]);
        if (!checked) {
            setSelectedChannels([]);
        }
        toggleAll(e)
    };
    return(
        <div className={"filter_box_channel"}  >
               {/* <div onClick={()=>{setOpen(!open)}}> Select</div> */}
                <br/>
            <div className={"channelList"} style={open?{display:"block"}:{display:"none"}} >
                  <ChannelListItem name={"All Channels"} value={"all"} id={"all"} key={"all"} checked={selectedChannels.includes("all")} onclick={toggleSelectAllChannels } />
                {channelList.map((e,i)=>{ return <ChannelListItem name={e.name} value={e.value} id={e.value} key={i} checked={selectedChannels.includes(e.value)} onclick={toggleSelectChannels } />})}
            </div>
        </div>
        
    )
}