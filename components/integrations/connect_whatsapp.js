import { useEffect, useState } from "react"


export default function ConnectWhatsapp(){
    useEffect(()=>{
        // if(!props.fetchData){return}
        console.log(props.fetchdata,"fetching~");
        fetchData()
    },[props.fetchdata])

    const fetchData = ()=>{
    
        console.log("connect whatsapp ")
    }

    return(<>
    <div className="intergra_container">
        <p>Scan the QR code with your phone and keep your phone connected to internet.</p>
        <div>
            <img src="intergration/testmedia/qrcode-ws.png"/>
        </div>
    </div>
    </>)
}