import {Storage , API , graphqlOperation} from "aws-amplify";


function mediaHelper(){

    this.getMedia= async (key)=>{
        let mediaKey = await Storage.get(key)
        console.log("imgKeys : " , mediaKey)
        return mediaKey
    }

    this.putMedia = async (file)=>{
        const result = await Storage.put(`stickers/${file.name}` , file )
        console.log("result : " , result)
        return result.key
    }

    this.getStickers = async ()=>{
        let mediaKey = await Storage.list("stickers/" )
        console.log("media key : " , mediaKey)
        const {files, folders} = await this.processStorageListSet(mediaKey)
        console.log("nested res : ", {files, folders})
        // mediaKey =await Promise.all(mediaKey.map(async k =>{
        //     const key = await Storage.get(k.key)
        //     return key
        // }))
        // console.log("imgKeys : " , mediaKey)

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
                const url = await Storage.get(res.key)
                res.url =url
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