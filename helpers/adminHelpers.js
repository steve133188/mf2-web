import axios from "axios"


export default function adminFetcher(token){
    const instance={}
    instance.token= token
    instance.fetcher=  axios.create({
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${instance.token}`
        },
        timeout:10000,
        baseURL:"https://8a516swpa8.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin"
    })

    instance.createStandardReply = async (data) =>{
        console.log(data,"creater reply")
        const d = await instance.fetcher.post(`/reply`,data).then(res=>{
            return res.status
        }).catch(err=>console.log(err))
        return d
    }

    instance.getAllStandardReply = async () =>{
        const d = await instance.fetcher.get(`/replys`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    instance.getReplyById = async (id)=>{
        const d =  await instance.fetcher.get(`/reply/id/${id}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    instance.addContentToFolder = async (folder_name , content_body)=>{
        const d = await instance.fetcher.put(`/add-content` ,{folder_name , content_body}).then(res=>res.status).catch(err=>console.log(err))
        return d
    }

    instance.updateContent = async(id, body)=>{
        const d = await instance.fetcher.put(`/edit-content` ,{id , body}).then(res=>res.status).catch(err=>console.log(err))
        return d
    }

    instance.deleteContent = async (folder_name ,content_id , content_body)=>{
        const d = await instance.fetcher.put(`/del-content` ,{folder_name ,content_id , content_body}).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.getContentByFolderName = async (folder_name)=>{
        const d = await instance.fetcher.get(`/content/${folder_name}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    return instance
}





