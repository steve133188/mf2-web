import { useEffect, useState } from "react"
import QRCode from "qrcode.react";

export default function ConnectWhatsapp(props){
    // const oriData = `1@ELVX50MU59V6dKw/y/42AEyetp2qdA8xzKXqteOtTIghzwizzMlLuwADOHpWTt5ve0Hr7l/GCmddeg==,RIK+NqFiHRAeb/sd2bwqjunNCzlMBvCcN9iCdF0pkSM=,EGkQKkTo0rQzBF/vbuxhfg==`
    const oriData = ""
    const [qrCodeState,setQrCodeState] = useState(oriData)
    const [refresh,setStateRefresh] = useState(false)
    useEffect(()=>{
        // if(!props.fetchData){return}
        console.log(props.fetchdata,"fetching~");
        fetchData()
    },[props.fetchdata])
    useEffect(()=>{

        setQrCodeState(oriData)
        setStateRefresh(!refresh)
    },[oriData])

    const fetchData = ()=>{
        console.log("connect whatsapp ")
    }



    return(<>
    <div className="intergra_container">
        <p>Scan the QR code with your phone and keep your phone connected to internet.</p>
        { oriData ==""?<div style={{display:"flex",flexDirection:'column'}}>
            <img src={"/channel_SVG/Whatsapp.svg"} style={{width:"100px",margin:"30px auto"}} />

                Waiting for QR Authorization.
        </div>
        :
           <QRCode
                id="qr-gen"
                value={qrCodeState}
                size={290}
                level={"H"}
                includeMargin={true}
            />
        }
    </div>
    </>)
}