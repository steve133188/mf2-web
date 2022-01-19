import {useContext, useEffect, useState} from "react"
import {API, graphqlOperation} from "aws-amplify";
import {listWhatsapp_nodes} from "../../src/graphql/queries";
import QRCode from "qrcode.react";
import axios from "axios";
import {onUpdateWhatsapp_node} from "../../src/graphql/subscriptions";
import {GlobalContext} from "../../context/GlobalContext";

export default function ConnectWhatsapp(props){

    const {user} = useContext(GlobalContext)
    const [qrcode , setQrcode] = useState()
    const [subscript , setSubscript] = useState()

    const [subed,setSubed] = useState(false)
    useEffect(async ()=>{
        await selectWAInstance()
    },[])

    const selectWAInstance = async ()=>{
        if(chan.status!=="AVAILABLE"){
            const instance = await API.graphql(graphqlOperation(listWhatsapp_nodes, {filter:{status: {eq:"AVAILABLE"} , init : {eq:false} , user_id:{eq:user.user.user_id}}})).then(res=>res.data.listWhatsapp_nodes.items).catch(err=>console.log(err))
            const selectedInstance = instance[0]
            console.log("selected :" ,selectedInstance )
            console.log(selectedInstance)
            const start = await axios.post(selectedInstance.url+"/connect" , {user_id:user.user.user_id , node_index:selectedInstance.node_index , user_name:user.user.user_name}).then(res=>console.log(res)).catch(err=>console.log(err))
            const sub =await API.graphql(graphqlOperation( onUpdateWhatsapp_node , {node_index:selectedInstance.node_index   })).subscribe({
                next: async (node) => {
                    console.log("qrUpdate" , node)
                    const qr = node.value.data.onUpdateWhatsapp_node.channel_id
                    setQrcode(qr)
                    if(node.status === "CONNECTED") {
                        setSubed(true)
                        subscript.unsubscribe()
                    }
                    // if(node.value.data.onUpdateWhatsapp_node.status ==="CONNECTED"){
                    //
                    //     return
                    // }
                }
            })
            setSubscript(sub)
        }

        // const updatedInstance = await API.graphql(graphqlOperation(updateWhatsapp_node , {input:{
        //         node_index: selectedInstance.node_index,
        //         status: "CONNECTING",
        //         node_name:"Whatsapp"
        //     }})).then(res=>res.data.updateWhatsapp_node).catch(err=>console.log(err))

    }



    return(<>
    <div className="intergra_container">
        <p>Scan the QR code with your phone and keep your phone connected to internet.</p>
        {qrcode?<div style={{display:"flex",flexDirection:'column'}}>
                <QRCode  id="qr-gen"
                         value={qrcode}
                         size={290}
                         level={"H"}
                         includeMargin={true}/>

        </div>

        :null
        }
        {subed&& <p>Whatsapp channel connected</p>}
    </div>
    </>)
}
