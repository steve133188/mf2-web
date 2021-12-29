import { useEffect, useState } from "react"


export default function ConnectWhatsapp(props){
    const ori = `/channel_SVG/whatsapp.svg`
    const [qrCodeState,setQrCodeState] = useState(ori)
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
        {qrCodeState==ori?<div style={{display:"flex",flexDirection:'column'}}>
            <img src={qrCodeState} style={{width:"100px",margin:"30px auto"}} />
                Waiting for QR Authorization.
        </div>
        :
        " Real Whatsapp QRcode API"
        }
    </div>
    </>)
}