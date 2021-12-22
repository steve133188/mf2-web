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


}

export default mediaHelper