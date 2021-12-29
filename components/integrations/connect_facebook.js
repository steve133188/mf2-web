import { useEffect, useState } from "react"

export default function ConnectFacebookMessager(props){
    useEffect(()=>{
        // if(!props.fetchData){return}
        console.log(props.fetchdata,"fetching~");
        fetchData()
    },[props.fetchdata])
    const fetchData = ()=>{
    
        console.log("connect FB")
    }

    return(<>
    <div className="intergra_container">
        <div style={{display:"flex",justifyContent:"center",alignItems:"center" ,background: "#3D77EA 0% 0% no-repeat padding-box",borderRadius: "10px",width:"70%",minWidth:"400px",height:"60px",
    margin:" 50px 0 10px"}}>
        <img src="intergration/messager.svg"/>
        <p style={{font: "normal normal bold 16px/22px Manrope",letterSpacing: "0px",color:" #FFFFFF",margin:"0 25px"}}>
            Continue with Facebook
        </p>
           
        </div>
    </div>
    </>)
}