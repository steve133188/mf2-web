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

export default function Integrations() {

    const channelList = [
        {name:"WhatsApp",channelID:"whatsapp",connectState:true,token:""},
        {name:"WhatsApp Business API",channelID:"whatsappB",connectState:false,token:""},
        {name:"WeChat", channelID:"wechat",connectState:true,token:""}]

    const [allChannel,setAllChannel] = useState([ {name:"",channelID:"",connectState:false,token:""}])
    const [activeChannel,setActiveChannel] = useState([])

    const [showMe, setShowMe] = useState(false);
    const toggleHandeler = (e) =>{
        console.log(e.target)
        console.log(e.target.id)
        console.log("activeChannel")
        setActiveChannel(channelList.filter((item)=>{console.log(item);return item.channelID==e.target.id}))
        setValue(e.target.id)
        console.log(activeChannel)
        
    }
    useEffect(()=>{
       if( activeChannel.length>0 ){ setShowMe(!showMe) };
    },[activeChannel])
    useEffect(()=>{
        setAllChannel(channelList)
    },[])
    const connectStateChange = () =>{
            allChannel.map((channel)=>{ 
                if(channel.channelID==e.target.id){
                
                setAllChannel(...channelList,e.target.state)
            }
        })  
    }
     const [value, setValue] = useState("");


  

    return (
        <div className="integrations-layout">
                <div className="container-fluid cardChannelGroupContainer">
                    <div className="cardChannelGroup">
                        <h1 >My Channels</h1>
                        <div className="row cardContainer">
                            <Card_channel src="Group 4965.svg" name="WhatsApp" channelID={allChannel[0].channelID} onclick={toggleHandeler} state={channelList[0].connectState} disconnect={connectStateChange} />
                        </div>
                    </div>
                    <div className="cardChannelGroup">
                        <h1  >Channels</h1>
                        <div className="row cardContainer">
                            <Card_channel src="MF_Channel_Facebook/Group 5165.svg" disabled={true} name="WhatsApp Business API"  channelID={channelList[1].channelID}  onclick={toggleHandeler} />
                            <Card_channel src="Group 5167.svg" disabled={true} name="WeChat"  channelID={channelList[2].channelID}  onclick={toggleHandeler}  />
                            <Card_channel src="Group 4965.svg" disabled={true} name="Facebook Messager"/>
                            <Card_channel src="MF_Channel_Facebook/Mask Group 48.svg" disabled={true} name="Line"/>
                            <Card_channel src="MF_Channel_Facebook/Mask Group 51.svg" disabled={true} name="Signal"/>
                            <Card_channel src="MF_Channel_Facebook/Mask Group 50.svg" disabled={true} name="Telegram"/>
                        </div>
                    </div>
                </div>
            <div className={"container"} style={{display:( showMe?"flex":"none")}}>
                <div className={"connectionBroad"}>
                    <div className={"broad_head"}>
                        <div>
                            {activeChannel.length>0?activeChannel[0].name:""}
                        </div>
                        <div>
                            Disconnect
                        </div>

                    </div>
                    <div className={"broad_content " +(`${activeChannel.channelID}`)}>
                         <TabContext value={value} >
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                </Box>
                                <TabPanel value="whatsapp"><ConnectWhatsapp/></TabPanel>
                                <TabPanel value="whatsappB"><ConnectWhatsappBiss/></TabPanel>
                                <TabPanel value="wechat"><ConnectWeChat/></TabPanel>
                </TabContext>
                    </div>
                    <div className={"confirm_btn_set"}>
                        <LeftButton title={"Save"}/>
                        <RightlButton title={"Cancel"} onclick={()=>{setShowMe(!showMe)}}/>
                    </div>

                </div>
            </div>
        </div>

    )
}