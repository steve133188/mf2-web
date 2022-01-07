 import {Storage , API , graphqlOperation} from "aws-amplify";


function mediaHelper(){
    this.bucketUrl = "https://mf2media00345-dev.s3.ap-southeast-1.amazonaws.com/public/"

    this.objUrl = (objKey) =>{
        return this.bucketUrl+objKey
    }
    this.getMedia= async (key)=>{
        let mediaKey = await Storage.get(key)
        console.log("imgKeys : " , mediaKey)
        return mediaKey
    }

    this.putSticker = async (file , filetype)=>{
        console.log(file,"sticker is on the way")
        const result = await Storage.put(`stickers/${file.name}` , file , {contentType: filetype})
        console.log("result : " , result)
        return this.objUrl(result.key)
    }

    this.putVoice = async (file , filetype)=>{
        const result = await Storage.put(`voice/${file.name}` , file, {contentType: filetype} )
        console.log("result : " , result)
        return this.objUrl(result.key)
    }

    this.putImg = async (file , filetype)=>{
        const result = await Storage.put(`image/${file.name}` , file, {contentType: filetype} )
        console.log("result : " , result)
        return this.objUrl(result.key)

    }

    this.putVideo = async (file , filetype)=>{
        const result = await Storage.put(`video/${file.name}` , file , {contentType: filetype})
        console.log("result : " , result)
        return this.objUrl(result.key)
    }

    this.putDoc = async (file , filetype)=>{
        const result = await Storage.put(`documents/${file.name}` , file, {contentType: filetype} )
        console.log("result : " , result)
        return this.objUrl(result.key)
    }


    this.getStickers = async ()=>{
        let mediaKey = await Storage.list("storage/stickers/All/" )
        const {files, folders} = await this.processStorageListSet(mediaKey)
        console.log("nested res : ", {files, folders})
        return {files, folders}
    }
    this.processStorageList=async (results)=>{
        const filesystem = {}
        const add = async (source, target, item) => {
            const url = await Storage.get(source)
            item.url = url
            const elements = source.split("/");
            const element = elements.shift();
            if (!element) return // blank
            target[element] = target[element] || {__data: item}// element;
            if (elements.length) {
                target[element] = typeof target[element] === "object" ? target[element] : {};
                await add(elements.join("/"), target[element], item);
            }
        };
        for (const item of results) {
            await add(item.key, filesystem, item);
        }
        return filesystem
    }
    this.processStorageListSet=async (result)=> {
        let files = []
        let folders = new Set()
        for (const res of result) {
            if (res.size) {
                // const url = await Storage.get(res.key)
                res.url =this.objUrl(res.key)
                files.push(res)
                // sometimes files declare a folder with a / within then
                let possibleFolder = res.key.split('/').slice(0,-1).join('/')
                if (possibleFolder && possibleFolder[-1]=="/") folders.add(possibleFolder)
            } else {
                folders.add(res.key)
            }
        }
        return {files, folders}
    }
}

export default mediaHelper
