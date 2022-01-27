import {useContext, useEffect, useState} from "react"
import {API, graphqlOperation} from "aws-amplify";
import {listWhatsapp_nodes} from "../../src/graphql/queries";
import QRCode from "qrcode.react";
import axios from "axios";
import {onUpdateWhatsapp_node} from "../../src/graphql/subscriptions";
import {GlobalContext} from "../../context/GlobalContext";

export default function ConnectWhatsapp(props){
    const {chan} = props
    const {user} = useContext(GlobalContext)
    const [qrcode , setQrcode] = useState()
    const [subscript , setSubscript] = useState()
    const [status , setStatus] = useState()
    const [subed,setSubed] = useState(false)

    useEffect(async ()=>{
        if(user.token){
            setStatus(chan.status)
            await selectWAInstance()
        }
    },[])

    const selectWAInstance = async ()=>{
        if(chan.status=="AVAILABLE"||chan.status=="CONNECTING"){
            console.log(chan)
            const start = await axios.post(chan.url+"/connect" , {user_id:user.user.user_id , node_index:chan.node_index , user_name:user.user.user_name , team_id:user.team_id}).then(res=>console.log(res)).catch(err=>console.log(err))
            const sub =API.graphql(graphqlOperation(onUpdateWhatsapp_node, {node_index: chan.node_index})).subscribe({
                next: async (node) => {
                    setStatus(node.value.data.onUpdateWhatsapp_node.status)
                    console.log("qrUpdate", node)
                    const qr = node.value.data.onUpdateWhatsapp_node.channel_id
                    setQrcode(qr)
                    if (node.status === "CONNECTED") {
                        setSubed(true)
                        subscript.unsubscribe()
                    }
                }
            })
            setSubscript(sub)
        }
    }

    const restartWhatsapp = async ()=>{
        const start = await axios.get(chan.url+"/restart").then(res=>console.log(res)).catch(err=>console.log(err))
    }


    return(<>
    <div className="intergra_container">
        {status == "CONNECTING"&&(<p>Scan the QR code with your phone and keep your phone connected to internet.</p>)}
        {status == "AVAILABLE"&&(<p>Your Whatsapp is available now ! please ready to scan the QR code to connect and synchronize the data. </p>)}
            {qrcode?<div style={{display:"flex",flexDirection:'column'}}>
            <QRCode  id="qr-gen"
            value={qrcode}
            size={290}
            level={"H"}
            includeMargin={true}/>
            </div>
            :null
            }

        {status == "CONNECTED"&& <p>Whatsapp channel connected</p>}
        {status == "DISCONNECTED"&&(<><p> </p> <button onClick={async ()=>{await restartWhatsapp()}}>restart server</button></> )}
    </div>
    </>)
}
