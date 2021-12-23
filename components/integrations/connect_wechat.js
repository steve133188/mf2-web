import { useEffect, useState } from "react"

export default function ConnectWeChat(props){
    const [wechatData,setWechatData] = useState({developerAcc:"",id:"",secret:"",token:""})
useEffect(()=>{
    console.log(wechatData)
},[wechatData])
useEffect(()=>{
    console.log(props.fetchdata,"fetching~");
    fetchData()
},[props.fetchdata])
const fetchData = ()=>{

    console.log("connect wechat",wechatData)
}

    return(<>
    <div className="intergra_container">
        <div>
        </div>

            <form className="login_form" id="wechat_form">
        <p>Get pageAccessToken and verification code with following steps:</p>
                <div className={"form_item"}>

                <label>Create a WeChat Developer Account.</label>
                    <input type="text" id="dacc" onChange={(e)=>setWechatData({...wechatData, developerAcc:e.target.value})}></input>
                </div>
                <div className={"form_item"}>

                <label>Application ID</label>
                    <input type="text" id="appid" onChange={(e)=>setWechatData({...wechatData, id:e.target.value})} ></input>
                </div>
                <div className={"form_item"}>

                <label>Application Secret</label>
                    <input type="text" id="appSecret" onChange={(e)=>setWechatData({...wechatData, secret:e.target.value})} ></input>
                </div>
                <div className={"form_item"}>

                <label>Verify Token </label>
                    <input type="text" id="token" onChange={(e)=>setWechatData({...wechatData, token:e.target.value})} ></input>
                </div>
                
            </form>
            {/* <label>{title}</label>
                    <input type="text" id="dacc" onChange={(e)=>setWechatData({...wechatData, Object.key(data):e.target.value})} style={{width:"80%"}}></input> */}
                

    </div>
    </>)
}