import { useEffect, useState } from "react";
import { LeftButton, RightlButton } from "../../components/Button";
import {Card_channel} from "../../components/Cards";

export default function Integrations() {

    const channelList = [{name:"WhatsApp",channelID:"whatsapp"},{name:"WhatsApp Business API",channelID:"whatsappB"},{name:"WeChat", channelID:"wechat"}]

    const [allChannel,setAllChannel] = useState([])
    const [activeChannel,setActiveChannel] = useState([])

    const [showMe, setShowMe] = useState(false);
    const toggleHandeler = (e) =>{
        console.log(e.target)
        console.log(e.target.id)
        
        console.log("activeChannel")
        setActiveChannel(channelList.filter((item)=>{console.log(item);return item.channelID==e.target.id}))
        console.log(activeChannel)
        
        console.log(activeChannel)
    }
    useEffect(()=>{
       if( activeChannel.length>0 ){ setShowMe(!showMe) };
    },[activeChannel])

    return (
        <div className="integrations-layout">
                <div className="container-fluid cardChannelGroupContainer">
                    <div className="cardChannelGroup">
                        <h1 style={{fontSize: "24px", fontWeight: "800", marginBottom: "33px"}}>My Channels</h1>
                        <div className="row cardContainer">
                            <Card_channel src="Group 4965.svg" name="WhatsApp" channelID="whatsapp" onclick={toggleHandeler}/>
                        </div>
                    </div>
                    <div className="cardChannelGroup">
                        <h1 style={{fontSize: "24px", fontWeight: "800", marginBottom: "33px"}}>Channels</h1>
                        <div className="row cardContainer">
                            <Card_channel src="Group 4965.svg" name="WhatsApp Business API" channelID="whatsappB"  onclick={toggleHandeler}/>
                            <Card_channel src="Group 5167.svg" name="WeChat" channelID="wechat"  onclick={toggleHandeler}/>
                            {/*<Card_channel src="Group 4965.svg" name="WeChat"/>*/}
                            {/*<Card_channel src="Group 4965.svg" name="WeChat"/>*/}
                            {/*<Card_channel src="Group 4965.svg" name="WeChat"/>*/}
                            {/*<Card_channel src="Group 4965.svg" name="WeChat"/>*/}
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
                    <div className={"broad_content"}>

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