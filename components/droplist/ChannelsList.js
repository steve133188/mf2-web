import { useEffect, useState } from "react";
import ChannelListItem from "../livechat/serach_filter/filter.js/channelListItem";


export default function ChannelsDropList({toggleChannels,toggleAll,data}){
    const channelList = [
        {name:"WhatsApp",channelID:"Whatsapp",value:"Whatsapp",connectState:false,token:""},
        {name:"WhatsApp Business API",channelID:"WABA",value:"WABA",connectState:false,token:""},
        {name:"WeChat", channelID:"Wechat", value:"Wechat", connectState:false,token:""},
        {name:"Facebook Messager", channelID:"Messager",value:"Messager",connectState:false,token:""},
        // {name:"Line", channelID:"line",value:"line",connectState:false,token:""},
        // {name:"Signal", channelID:"signal",value:"signal",connectState:false,token:""},
        // {name:"Telegram", channelID:"telegram",value:"telegram",connectState:false,token:""},
        // {name:"Kakao Talk", channelID:"kakaotalk",value:"kakaotalk",connectState:false,token:""},
        // {name:"Telegram", channelID:"",connectState:false,token:""},
    ]

    const [open,setOpen] =useState(true);
    useEffect(()=>{
        data&&setSelectedChannels(data)
    },[data])
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
        setSelectedChannels(["All","Whatsapp","WABA","Wechat","Messager",
        // "messager","line","signal","telegram","kakaotalk"
    ]);
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
                  <ChannelListItem name={"All Channels"} value={"All"} id={"All"} key={"All"} checked={selectedChannels.includes("All")} onclick={toggleSelectAllChannels } />
                {channelList.map((e,i)=>{ return <ChannelListItem name={e.name} value={e.value} id={e.value} key={i} checked={selectedChannels.includes(e.value)} onclick={toggleSelectChannels } />})}
            </div>
        </div>
        
    )
}