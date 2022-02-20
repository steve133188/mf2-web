import {makeObservable , action , observable ,runInAction} from "mobx"
import axios from "axios";


class ChannelsActionsStore {

    defaultSettings =  {
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials' : true,
        },
        timeout:10000,
        baseURL:"https://waba-js-666dj.ondigitalocean.app/prod"
    }

    WhatsappUrl = ''

    Whatsapp =  axios.create( {
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials' : true,
            },
            timeout:10000,
        }
    )

    WABA = axios.create( this.defaultSettings)

    error = null;

    constructor(rootStore){
        this.rootStore =rootStore
        makeObservable(this,{
            Whatsapp : observable,
            WABA:observable,
            WhatsappUrl:observable,
            init:action,
            sendMessage:action,
        })
    }

    init (url){
        runInAction(()=>{
            this.WhatsappUrl = url
            this.Whatsapp =  axios.create( {
                    headers:{
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        'Access-Control-Allow-Credentials' : true,
                    },
                    timeout:10000,
                    baseURL:this.WhatsappUrl
                }
            )
        })

        console.log("whatsapp url :" , this.WhatsappUrl)
    }

    async sendMessage(data ){


        switch (data.channel){
            case "WABA" :
                let obj={channelId:"5e4367dd3c660d5d5e541176" , recipientId :data.phone , type:data.message_type.toUpperCase() ,text:data.message , url:data.media_url , sign_name:data.sign_name, hasQuotedMsg:data.hasQuotedMsg, is_forwarded:data.is_forwarded, quote:data.quote,quote_from:data.sender}
                if(data.message_type=="document"){
                    obj.type="FILE"
                }
                // let obj={channelId:"5e4367dd3c660d5d5e541176" , recipientId :data.phone , type:data.message_type.toUpperCase() ,text:data.message , url:data.media_url}
                console.log(`send data :`  ,obj)
                await this.WABA.post("/send-message" ,obj )
                    .then(res=>console.log("Send Message Status : " , res))
                    .catch(err=> {
                        this.errorHandler(err);
                        console.log(this.error)
                    })
                break;
            case "Whatsapp":
                console.log(data,'data inside whatsapp send')
                await axios.post(this.WhatsappUrl+"/send-message", data,{
                    headers:{
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        'Access-Control-Allow-Credentials' : true,
                    },
                    timeout:10000,})
                    .then(res=>console.log("Send Message Status : " , res.status))
                    .catch(err=> {
                        this.errorHandler(err);
                        console.log(this.error)
                    })
                break;
            default:
        }
    }

    mediaTypeHandler(file){
        const mine = file.type

        if(mine.includes("image")){
            return "image"
        }
        if(mine.includes("audio")){
            return "audio"
        }
        if(mine.includes("text")|| mine.includes("application")){
            return "document"
        }
        if(mine.includes("video")){
            return "video"
        }
    }

    errorHandler = (err)=>{
        this.error = err
        return this.error
    }
}

export default ChannelsActionsStore
