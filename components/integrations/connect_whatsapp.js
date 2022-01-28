import {useContext, useEffect, useState} from "react"
import {API, graphqlOperation} from "aws-amplify";
import {listWhatsapp_nodes} from "../../src/graphql/queries";
import QRCode from "qrcode.react";
import axios from "axios";
import {onUpdateWhatsapp_node} from "../../src/graphql/subscriptions";
import {GlobalContext} from "../../context/GlobalContext";

export default function ConnectWhatsapp({...props}){
    const {user , getUserChannel} = useContext(GlobalContext)
    const [qrcode , setQrcode] = useState()
    const [subscript , setSubscript] = useState()
    const [status , setStatus] = useState("")
    const [chan , setChan] = useState()
    const [subed,setSubed] = useState(false)

    useEffect(async ()=>{
        if(user.token){
            const data = await getUserChannel(user.user.user_id)
            setChan(data)
            console.log("channel info : " ,data.status)
            setStatus(prev=>data.status)
            await selectWAInstance(data)
        }

    },[])


    const selectWAInstance = async (data)=>{
        console.log("status : " , status)
        if(data.status=="AVAILABLE"||data.status=="CONNECTING"){
            console.log({user_id:user.user.user_id , node_index:data.node_index , user_name:user.user.username , team_id:user.user.team_id})
            const start = await axios.post(data.url+"/connect" , {user_id:user.user.user_id , node_index:data.node_index , user_name:user.user.username , team_id:user.user.team_id},{ headers:{
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Credentials' : true,
                }}).then(res=>console.log(res)).catch(err=>console.log(err))
            const sub =API.graphql(graphqlOperation(onUpdateWhatsapp_node, {node_index: data.node_index})).subscribe({
                next: async (node) => {

                    console.log("qrUpdate", node)
                    const qr = node.value.data.onUpdateWhatsapp_node.channel_id
                    setQrcode(qr)
                    if (node.status === "CONNECTED") {
                        setStatus(node.value.data.onUpdateWhatsapp_node.status)
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
