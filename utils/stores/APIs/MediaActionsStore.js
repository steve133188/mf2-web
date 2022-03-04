import {makeObservable , action , observable ,runInAction} from "mobx"
import axios from "axios";
import {Storage} from "aws-amplify";


class MediaActionsStore {

    replyBaseURL="https://kj1j3zbmy4.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin"

    bucketUrl = "https://mf2media00345-dev.s3.ap-southeast-1.amazonaws.com/public/"

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this,{
            objUrl:action.bound,
            getMedia:action.bound,
            putSticker:action.bound,
            putVoice:action.bound,
            getStickers:action.bound,
            putImg:action.bound,
            putVideo:action.bound,
            putDoc:action.bound,
            // processStorageList:action.bound,
            processStorageListSet:action.bound,
            getStandardReplyAll:action.bound,
            getStandardReplyById:action.bound,
            addOneStandardReply:action.bound,
            updateOneStandardReply:action.bound,
            deleteReplyByID:action.bound,
        })
    }
    getStandardReplyAll = async ()=>{
        const d = await axios.get(`${this.replyBaseURL}/replies` ).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    getStandardReplyById = async (id)=>{
        const d = await axios.get(`${this.replyBaseURL}/reply/id/${id}`  ).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    addOneStandardReply = async (data)=>{
        const d = await axios.post(`${this.replyBaseURL}/reply` ,data).then(res=>{
            return res.status
        }).catch(err=>console.log(err))
        return d
    }//name,channels,body,variables

    updateOneStandardReply = async (data)=>{
        const d = await axios.put(`${this.replyBaseURL}/reply` , data).then(res=>res.status).catch(err=>console.log(err))
        return d
    }//id,channels,name,body,varibales

    deleteReplyByID = async (id)=>{
        const d = await axios.delete(`${this.replyBaseURL}/reply/id/${id}` ).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    objUrl = (objKey) =>{
        return this.bucketUrl+objKey
    }
    getMedia= async (key)=>{
        let mediaKey = await Storage.get(key)
        console.log("imgKeys : " , mediaKey)
        return mediaKey
    }

    putSticker = async (file,folder)=>{
        const mine =file.name.slice(-4).replace('.','')
        console.log(file,"sticker is on the way")
        const result = await Storage.put(`${folder}/${Date.now()}.${mine}` , file , {contentType: file.type})
        console.log("result : " , result)
        return this.objUrl(result.key)
    }

    putVoice = async (file )=>{
        const mine =file.name.slice(-4).replace('.','')
        const result = await Storage.put(`voice/${Date.now()}.${mine}` , file, {contentType: file.type} )
        console.log("result : " , result)
        return this.objUrl(result.key)
    }

    putImg = async (file )=>{
        const mine =file.name.slice(-4).replace('.','')
        const result = await Storage.put(`image/${Date.now()}.${mine}` , file, {contentType: file.type} )
        console.log("result : " , result)
        return this.objUrl(result.key)
    }

    putVideo = async (file )=>{
        const mine =file.name.slice(-4).replace('.','')
        const result = await Storage.put(`video/${Date.now()}.${mine}` , file , {contentType: file.type})
        console.log("result : " , result)
        return this.objUrl(result.key)
    }

    putDoc = async (file )=>{
        const mine =file.name.slice(-4).replace('.','')
        const result = await Storage.put(`documents/${Date.now()}.${mine}` , file, {contentType: file.type} )
        console.log("result : " , result)
        return this.objUrl(result.key)
    }


    getStickers = async ()=>{
        let mediaKey = await Storage.list("storage/stickers/All/" )
        const {files, folders} = this.processStorageListSet(mediaKey)
        return {files, folders}
    }
    // processStorageList=async (results)=>{
    //     const filesystem = {}
    //     const add = async (source, target, item) => {
    //         const url = await Storage.get(source)
    //         item.url = url
    //         const elements = source.split("/");
    //         const element = elements.shift();
    //         if (!element) return // blank
    //         target[element] = target[element] || {__data: item}// element;
    //         if (elements.length) {
    //             target[element] = typeof target[element] === "object" ? target[element] : {};
    //             await add(elements.join("/"), target[element], item);
    //         }
    //     };
    //     for (const item of results) {
    //         await add(item.key, filesystem, item);
    //     }
    //     return filesystem
    // }

    processStorageListSet=(result)=> {
        let files = []
        let folders = new Set()
        for (const res of result) {
            if (res.size) {
                // const url = await Storage.get(res.key)
                res.url =this.objUrl(res.key)
                files.push(res)
                // sometimes files declare a folder with a / within then
                let possibleFolder = res.key.split('/').slice(0,-1).join('/')
                if (possibleFolder && possibleFolder[possibleFolder.length-1]=="/") folders.add(possibleFolder)
            } else {
                folders.add(res.key)
            }
        }
        return {files, folders}
    }
    removeSticker= async (fileName)=>{
        const path = `${fileName}`
        const remove = await Storage.remove(path).then(res=>console.log(res)).catch(err=> {
            alert(`${fileName} not found!`)
            console.log(err)
            console.log(remove,"remove result")

        })
    }


}

export default MediaActionsStore
