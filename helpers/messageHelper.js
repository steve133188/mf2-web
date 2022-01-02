import axios from "axios"


export default function WhatsappFetcher(){
    this.whatsappURL;

    this.setWhatsappURL = (url)=>{
        this.whatsappURL = url
    }

    this.instance = axios.create( {
        headers:{
            'Content-Type': 'application/json',
        },
        timeout:5000,
        baseURL:this.whatsappURL},)

    this.error = null;

    this.errorHandler = (err)=>{
        this.error = err
        return this.error
    }

    this.sendMessage = async (data)=>{
        const result = await this.instance.post("/send-message" , data)
            .then(res=>console.log("Send Message Status : " , res.status))
            .catch(err=> {
                this.errorHandler(err);
                console.log(this.error)
            })
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
}

