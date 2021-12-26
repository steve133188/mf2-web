import {Storage , API , graphqlOperation} from "aws-amplify";


function mediaHelper(){

    this.getMedia= async (key)=>{
        let mediaKey = await Storage.get(key)
        console.log("imgKeys : " , mediaKey)
        return mediaKey
    }

    this.putMedia = async (file)=>{
        const result = await Storage.put(file.name , file )
        console.log("result : " , result)
        return result.key
    }

    this.getStickers = async ()=>{
        let mediaKey = await Storage.list("stickers/")
        console.log("media key : " , mediaKey)
        mediaKey =await Promise.all(mediaKey.map(async k =>{
            const key = await Storage.get(k.key)
            return key
        }))
        console.log("imgKeys : " , mediaKey)

        return mediaKey
    }

}

export default mediaHelper