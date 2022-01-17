
import { useContext, useEffect, useRef, useState } from "react";
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
import { GlobalContext } from "../../context/GlobalContext";
import ConnectTempMessager from "../../components/integrations/connect_channels_temp";
import Loading from "../../components/Loading";

export default function Integrations() {
    const [isLoading, setIsLoading] = useState(true);
    const channelList = [
        {name:"WhatsApp",channelID:"Whatsapp",connectState:false,token:""},
        {name:"WhatsApp Business API",channelID:"WhatsappB",connectState:false,token:""},
        {name:"WeChat", channelID:"Wechat",connectState:false,token:""},
        {name:"Facebook Messager", channelID:"Messager",connectState:false,token:""},
        {name:"Line", channelID:"line",connectState:false,token:""},
        {name:"Signal", channelID:"signal",connectState:false,token:""},
        {name:"Telegram", channelID:"telegram",connectState:false,token:""},
        {name:"Kakao Talk", channelID:"kakaotalk",connectState:false,token:""},
        // {name:"Telegram", channelID:"",connectState:false,token:""},
    ]

    const {contactInstance , userInstance ,adminInstance ,orgInstance, user} = useContext(GlobalContext)
    const [allChannel,setAllChannel] = useState(channelList)
    const [connectedChannels,setConnectedChannels] = useState([])
    const [activeChannel,setActiveChannel] = useState([])

    const [showMe, setShowMe] = useState(false);
    const [whatsappFetch,setWhatsappFetch] = useState(false);
    const [whatsappBFetch,setWhatsappBFetch] = useState(false);
    const [wechatFetch,setWechatFetch] = useState(false);
    const [messagerFetch,setMessagerFetch] = useState(false);
    const [lineFetch,setLineFetch] = useState(false);
    const [signalFetch,setSignalFetch] = useState(false);
    const [telegramFetch,setTelegramFetch] = useState(false);
    const [kakaotalkFetch,setKakaotalkFetch] = useState(false);

    const toggleHandeler = (e) =>{
        // console.log(e.target)
        // console.log(e.target.id)
        // console.log("activeChannel")
        setActiveChannel(channelList.filter((item)=>{if(!item.connectState){return item.channelID==e.target.id}}))
        setValue(e.target.id)
        
        console.log(activeChannel)    
    }
    const myChannel = async() =>{
        console.log(user) 
        const activedChannel = user.user.channels??[""]
        const unConlist = channelList.filter(item=>{return item.channelID!=activedChannel.filter(e=>{return item.channelID==e})})
        setAllChannel(unConlist )
        const activeList = channelList.filter(item=>{return activedChannel.some(el=>item.channelID==el)})
        setConnectedChannels(activeList.map(item=>{return {...item,connectState:true}}))

    }
    useEffect(()=>{
        if(user.token){
         
            myChannel();
            if(isLoading){
                setTimeout(function() { //Start the timer
                    setIsLoading(false);
                }.bind(this), 100)
            }
        }
    },[])

    useEffect(()=>{
        if( activeChannel.length>0 ){ setShowMe(!showMe) };
        
        },[activeChannel])

    const [value, setValue] = useState(""); 
    const handelSumbit = () =>{
        console.log("send button")
        console.log(value)
        if(value=="Whatsapp"){setWhatsappFetch(!whatsappFetch);}
        if(value=="WhatsappB"){setWhatsappBFetch(!whatsappBFetch)}
        if(value=="Wechat"){setWechatFetch(!wechatFetch)}
        if(value=="Messager"){setMessagerFetch(!messagerFetch)}
        if(value=="line"){setLineFetch(!lineFetch)}
        if(value=="signal"){setSignalFetch(!signalFetch)}
        if(value=="telegram"){setTelegramFetch(!telegramFetch)}
        if(value=="kakaotalk"){setKakaotalkFetch(!kakaotalkFetch)}

        // ()=>setWhatsappBFetch(!whatsappBFetch)   
    }


    const toggleDelete = async (e)=>{
        console.log("disconnet",e.target.id)
        const newChannels =[]
        const newList = connectedChannels.filter(item=>{return(item.channelID!=e.target.id)})
        newList.map(item=>newChannels.push(item.channelID))
        console.log(connectedChannels)
        setConnectedChannels(newList)
        console.log(newList,"new Channel")
        console.log(newChannels,"last Channel")

        const updateuser = await userInstance.updateUser (user.user.phone,{user:{channels:newChannels}})
        console.log(updateuser)
        // !connectState
    }   
  
    const wrapperRef = useRef();
    const handleClickOutside = (event) => {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target.node)
    ) {
        setActiveChannel([])
        setValue("")
        setShowMe(false)
        }
    };
    useEffect(()=>{
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    },[])

    return (
        <div className="integrations-layout">
            {isLoading?(<Loading state={"preloader"}/> ): (<Loading state={"preloader preloaderFadeOut"}/>)}
                <div className="container-fluid cardChannelGroupContainer">
                    <div className="cardChannelGroup">
                        <h1 >My Channels</h1>
                        <div className="row cardContainer" >
                            {connectedChannels.map(item=>{return (
                                <Card_channel src={`/channel_SVG/${item.channelID}.svg`} name={item.name} disabled={!item.connectState} channelID={item.channelID} onclick={toggleHandeler} state={item.connectState} disconnect={toggleDelete}  />

                                )})}
                        </div>
                    </div>
                    <div className="cardChannelGroup" >
                        <h1  >Channels</h1>
                        <div className="row cardContainer">
                            {allChannel.map(item=>{return (
                                 <Card_channel src={`/channel_SVG/${item.channelID}.svg`} name={item.name} disabled={!item.connectState} channelID={item.channelID} onclick={toggleHandeler} state={item.connectState} disconnect={toggleDelete}  />

                            )})}
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
                           {activeChannel.length>0 && activeChannel[0].channelID=="Whatsapp" ?<button id={activeChannel[0].channelID}  onClick={toggleDelete} className={"mf_bg_light_blue mf_color_delete"} style={{font: "normal normal normal 13px/24px Manrope"}}>Stop Server</button>:""}
                        </div>

                    </div>
                    <div className={"broad_content " +(`${activeChannel.channelID}`)}  >
                         <TabContext value={value}  >

                                <TabPanel value="Whatsapp" ><ConnectWhatsapp fetchdata={whatsappFetch}/></TabPanel>
                                <TabPanel value="WhatsappB" ><ConnectWhatsappBiss fetchdata={whatsappBFetch} /></TabPanel>
                                <TabPanel value="Wechat" ><ConnectWeChat fetchdata={wechatFetch}  /></TabPanel>
                                <TabPanel value="Messager" ><ConnectFacebookMessager fetchdata={messagerFetch} /></TabPanel>
                                <TabPanel value="line" ><ConnectTempMessager fetchdata={lineFetch} /></TabPanel>
                                <TabPanel value="signal" ><ConnectTempMessager fetchdata={signalFetch} /></TabPanel>
                                <TabPanel value="telegram" ><ConnectTempMessager fetchdata={telegramFetch} /></TabPanel>
                                <TabPanel value="kakaotalk" ><ConnectTempMessager fetchdata={kakaotalkFetch} /></TabPanel>
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