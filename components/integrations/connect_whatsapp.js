import { useEffect, useState } from "react"
import {API, graphqlOperation} from "aws-amplify";
import {listWhatsapp_nodes} from "../../src/graphql/queries";
import QRCode from "react-qr-code";

export default function ConnectWhatsapp(props){
    // const ori = `/channel_SVG/whatsapp.svg`
    const [qrCodeState,setQrCodeState] = useState(props.qrcode)
    useEffect(async ()=>{
        // if(!props.fetchData){return}
        await props.connect()
    },[props.connect])





    return(<>
    <div className="intergra_container">
        <p>Scan the QR code with your phone and keep your phone connected to internet.</p>
        {props.qrcode.length>0?<div style={{display:"flex",flexDirection:'column'}}>
                <QRCode value={props.qrcode}/>
        </div>
        :
        " Real Whatsapp QRcode API"
        }
    </div>
    </>)
}
