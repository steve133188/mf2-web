import { useEffect, useState } from "react";
import { LeftButton, RightlButton } from "../../components/Button";
import {Card_channel} from "../../components/Cards";
import Tabs from '@mui/material/Tabs';
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box  from "@mui/material/Box";
import ConnectWhatsapp from "../../components/integrations/connect_whatsapp";
import ConnectWhatsappBiss from "../../components/integrations/connect_whatsappBusiness";
import ConnectWeChat from "../../components/integrations/connect_wechat";
import ConnectFacebookMessager from "../../components/integrations/connect_facebook";

export default function Integrations() {

    const channelList = [
        {name:"WhatsApp",channelID:"whatsapp",connectState:false,token:""},
        {name:"WhatsApp Business API",channelID:"whatsappB",connectState:false,token:""},
        {name:"WeChat", channelID:"wechat",connectState:false,token:""},
        {name:"Facebook Messager", channelID:"messager",connectState:false,token:""},
    ]

    const [allChannel,setAllChannel] = useState([ {name:"",channelID:"",connectState:false,token:""}])
    const [activeChannel,setActiveChannel] = useState([])

    const [showMe, setShowMe] = useState(false);
    const [whatsappFetch,setWhatsappFetch] = useState(false);
    const [whatsappBFetch,setWhatsappBFetch] = useState(false);
    const [wechatFetch,setWechatFetch] = useState(false);
    const [messagerFetch,setMessagerFetch] = useState(false);

    const toggleHandeler = (e) =>{
        // console.log(e.target)
        // console.log(e.target.id)
        // console.log("activeChannel")
        setActiveChannel(channelList.filter((item)=>{if(!item.connectState){return item.channelID==e.target.id}}))
        setValue(e.target.id)
        console.log(activeChannel)
        
        
    }
    useEffect(()=>{
        setAllChannel(channelList)
        },[])
    useEffect(()=>{
        if( activeChannel.length>0 ){ setShowMe(!showMe) };
        },[activeChannel])
    const connectStateChange = () =>{
            allChannel.map((channel)=>{ 
                if(channel.channelID==e.target.id){
                
                setAllChannel(...channelList,e.target.state)
            }
        })  
    }
    const [value, setValue] = useState("");
    const handelSumbit = () =>{
        console.log("send button")
        console.log(value)
        if(value=="whatsapp"){setWhatsappFetch(!whatsappFetch);}
        if(value=="whatsappB"){tWGF();console.log(whatsappBFetch)}
        if(value=="wechat"){setWechatFetch(!wechatFetch)}
        if(value=="messager"){setMessagerFetch(!messagerFetch)}
        // ()=>setWhatsappBFetch(!whatsappBFetch)   
    }


    const toggleDelete =(e)=>{
        console.log("disconnet",e.target.id)
        // !connectState
    }
  

    return (
        <div className="integrations-layout">
                <div className="container-fluid cardChannelGroupContainer">
                    <div className="cardChannelGroup">
                        <h1 >My Channels</h1>
                        <div className="row cardContainer" >
                            <Card_channel src={`/channel_SVG/${allChannel[0].channelID}.svg`} name="WhatsApp"disabled={!allChannel[0].connectState} fetchdata={whatsappFetch} channelID={allChannel[0].channelID} onclick={toggleHandeler} state={channelList[0].connectState} disconnect={toggleDelete}  />
                        </div>
                    </div>
                    <div className="cardChannelGroup">
                        <h1  >Channels</h1>
                        <div className="row cardContainer">
                            <Card_channel src="/channel_SVG/WhatsappB.svg"  disabled={true} name="WhatsApp Business API"  channelID={channelList[1].channelID}  onclick={toggleHandeler}  disconnect={toggleDelete} />
                            <Card_channel src="/channel_SVG/Wechat.svg" disabled={!channelList[2].connectState} name="WeChat"  channelID={channelList[2].channelID}  onclick={toggleHandeler} state={channelList[2].connectState}  disconnect={toggleDelete}  />
                            <Card_channel src="/channel_SVG/Messager.svg"   disabled={true} name="Facebook Messager" channelID="messager" onclick={toggleHandeler}  disconnect={toggleDelete}  />
                            <Card_channel src="MF_Channel_Facebook/Mask Group 48.svg" disabled={true} name="Line"/>
                            <Card_channel src="MF_Channel_Facebook/Mask Group 51.svg" disabled={true} name="Signal"/>
                            <Card_channel src="MF_Channel_Facebook/Mask Group 50.svg" disabled={true} name="Telegram"/>
                        </div>
                    </div>
                </div>
            <div className={"container"} style={{display:( showMe?"flex":"none")}}>
                <div className={"connectionBroad"}>
                    <div className={"board_head"}>
                        <div  style={{font: "normal normal bold 15px/24px Manrope",color:"#000"}} >
                            {activeChannel.length>0?activeChannel[0].name:""}
                        </div>
                        <div>
                           {activeChannel[0].channelID=="whatsapp" ?<button  onClick={toggleDelete} className={"mf_bg_light_blue mf_color_delete"} style={{font: "normal normal normal 13px/24px Manrope"}}>Stop Server</button>:""}
                        </div>

                    </div>
                    <div className={"broad_content " +(`${activeChannel.channelID}`)}>
                         <TabContext value={value} >

                                <TabPanel value="whatsapp"><ConnectWhatsapp fetchdata={whatsappFetch}/></TabPanel>
                                <TabPanel value="whatsappB"><ConnectWhatsappBiss fetchdata={whatsappBFetch} /></TabPanel>
                                <TabPanel value="wechat"><ConnectWeChat fetchdata={wechatFetch}  /></TabPanel>
                                <TabPanel value="messager"><ConnectFacebookMessager fetchdata={messagerFetch} /></TabPanel>
                </TabContext>
                    </div>
                    <div className={"confirm_btn_set"}>
                        <LeftButton size={12} title={"Save"} onclick={handelSumbit}/>
                        <RightlButton size={12}  title={"Cancel"} onclick={()=>{setShowMe(!showMe)}}/>
                    </div>

                </div>
            </div>
        </div>

    )
}