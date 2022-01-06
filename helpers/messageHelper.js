import axios from "axios"


export default function WhatsappFetcher(){
    this.whatsappURL = "https://f125-118-140-233-2.ngrok.io"
    // this.whatsappURL = "https://whatsapp-js-dp6tp.ondigitalocean.app"
    this.WABAURL ="https://jjzehbik6b.execute-api.ap-southeast-1.amazonaws.com/prod"

    this.WABAID = "5e4367dd3c660d5d5e541176"

    this.setWhatsappURL = (url)=>{
        this.whatsappURL = url
    }

    this.setWABAURL = (url)=>{
        this.WABAURL = url
    }

    this.whatsappInstance = axios.create( {
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials' : true,
        },
        timeout:5000,
        baseURL:this.whatsappURL},)


    this.WABAInstance = axios.create( {
        headers:{
            'Content-Type': 'application/json',
        },
        timeout:5000,
        baseURL:this.WABAURL},)


    this.error = null;

    this.errorHandler = (err)=>{
        this.error = err
        return this.error
    }

    this.sendMessage = async (data)=>{

        switch (data.channel){
            case "WABA" :
                if(data.message_type=="documet")data.message_type="FILE"
                let obj={channelId:"5e4367dd3c660d5d5e541176" , recipientId :data.phone , type:data.message_type.toUpperCase() ,text:data.message , url:data.media_url}
                console.log(`send data :`  ,obj)
                 await this.WABAInstance.post("/send-message" ,obj )
                    .then(res=>console.log("Send Message Status : " , res))
                    .catch(err=> {
                        this.errorHandler(err);
                        console.log(this.error)
                    })
                break;
            case "Whatsapp":
                default:
                    await this.whatsappInstance.post("/send-message" , data)
                        .then(res=>console.log("Send Message Status : " , res.status))
                        .catch(err=> {
                            this.errorHandler(err);
                            console.log(this.error)
                        })
                break;
        }

    }

    this.mediaTypeHandler  = (file)=>{
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

    this.getProfilePic = async (phone , room_id)=>{
        const result = await this.whatsappInstance.post("/profile_pic",{phone , room_id}).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
}

