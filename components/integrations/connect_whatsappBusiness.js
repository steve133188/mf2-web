import { useEffect, useState } from "react";


export default function ConnectWhatsappBiss(props){
const [stellaData,setStellaData] = useState({url:"",namespace:"",accid:"",authCode:"",channelid:"",wsnumber:"",server:"",token:"",serverUsername:"",serverPassword:"",})
const [twilloData,setTwilloData] = useState({url:"",sid:"",token:"",wsnumber:"",})
const [tab,setTab] = useState("stella")

// const stellaQuestion = [url:"URL",namespace:"Namespace",accid:"Account ID",authCode:"Stella Authorization Code",channelid:"Stella Whatsapp Channel ID",wsnumber:"WhatsApp Number",server:"Stella Whatsapp Server",token:"Stella Server Auth Token",serverUsername:"Stella Server Username",serverPassword:"Stella Server Password",]
useEffect(()=>{
    // if(!props.fetchData){return}
    console.log(props.fetchdata,"fetching~");
    fetchData()
},[props.fetchdata])
const fetchData = ()=>{

    console.log("connect whatsapp Business",tab=="stella"?stellaData:twilloData)
}

    return(<>
    <div className="intergra_container">
        <div>
            {/* <img src="intergration/testmedia/qrcode-ws.png"/> */}
            <button className={"tabButton"+(tab=="stella"?"active":"")} onClick={()=>setTab("stella")} >
            Stella API
            </button>
            <button className={"tabButton"+(tab=="twillo"?"active":"")}  onClick={()=>setTab("twillo")}>
            Twillo API
            </button>

        </div>
        <form className="login_form" id="wechat_form" >
            <div className={"stella_login"} style={{display:tab=="stella"?"block":"none"}}>
                    <div className={"form_item"}>
                    <p>Generate Authorization Code from Stella and provide below:</p>
                    </div>
                    <div className={"form_item"}>
                        <label>URL</label>
                        <input type="text" id="s-url" onChange={(e)=>setStellaData({...stellaData, url:e.target.value})}></input>
                    </div>
                    <div className={"form_item"}>
                        <label>Namespace</label>
                        <input type="text" id="s-namespace" onChange={(e)=>setStellaData({...stellaData, namespace:e.target.value})} ></input>
                    </div>
                    <div className={"form_item"}>
                        <label>Account ID</label>
                        <input type="text" id="s-id" onChange={(e)=>setStellaData({...stellaData, accid:e.target.value})} ></input>
                    </div>
                    <div className={"form_item"}>
                        <label>Stella Authorization Code </label>
                        <input type="text" id="s-authcode" onChange={(e)=>setStellaData({...stellaData, authCode:e.target.value})} ></input>
                    </div>
                    <div className={"form_item"}>
                        <label>Stella Whatsapp Channel ID</label>
                        <input type="text" id="s-channelid" onChange={(e)=>setStellaData({...stellaData, channelid:e.target.value})}></input>
                    </div>
                    <div className={"form_item"}>
                        <label>WhatsApp Number</label>
                        <input type="text" id="s-number" onChange={(e)=>setStellaData({...stellaData, wsnumber:e.target.value})} ></input>
                    </div>
                    <div className={"form_item"}>
                        <label>Stella Whatsapp Server</label>
                        <input type="text" id="s-server" onChange={(e)=>setStellaData({...stellaData, server:e.target.value})} ></input>
                    </div>
                    <div className={"form_item"}>
                        <label>Stella Server Auth Token </label>
                        <input type="text" id="s-token" onChange={(e)=>setStellaData({...stellaData, token:e.target.value})} ></input>
                    </div>
                    <div className={"form_item"}>
                        <label>Stella Server Username</label>
                        <input type="text" id="s-sname" onChange={(e)=>setStellaData({...stellaData, serverUsername:e.target.value})}></input>
                    </div>
                    <div className={"form_item"}>
                        <label>Stella Server Password</label>
                        <input type="text" id="s-spassword" onChange={(e)=>setStellaData({...stellaData, serverPassword:e.target.value})} ></input>
                    </div>

            </div>
            <div className="twillo" style={{display:tab=="twillo"?"block":"none"}}>
                <div className={"form_item"}>
                    <p>1. Create twilio account and Buy A Number. <br/>
                2. From “Programmable Sms => WhatsApp” get your whatsapp number. <br/>
                    3. From Dashboard get Account Sid and Auth Token.<br/>
                    4. Copy Callback Url that we have provided and paste it in Sandbox Configuration. <br/>
                    5. Submit your details and can start testing it by initially sending code provided in “Programmable Sms => WhatsApp” screen.</p>
                </div>
                <div className={"form_item"}>
                        <label>URL</label>
                        <input type="text" id="t-url" onChange={(e)=>setTwilloData({...twilloData, url:e.target.value})}></input>
                    </div>
                    <div className={"form_item"}>
                        <label>Account SID</label>
                        <input type="text" id="t-sid" onChange={(e)=>setTwilloData({...twilloData, sid:e.target.value})} ></input>
                    </div>
                    <div className={"form_item"}>
                        <label>Authorization Token </label>
                        <input type="text" id="t-token" onChange={(e)=>setTwilloData({...twilloData, token:e.target.value})} ></input>
                    </div>
                    <div className={"form_item"}>
                        <label>WhatsApp Number</label>
                        <input type="text" id="t-number" onChange={(e)=>setTwilloData({...stellaData, wsnumber:e.target.value})} ></input>
                    </div>
            </div>
                
            </form>
        
    </div>
    </>)
}