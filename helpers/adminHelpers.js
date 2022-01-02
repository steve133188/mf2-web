import axios from "axios"


export default function adminFetcher(token){
    const instance={}
    instance.token= token
    instance.fetcher=  axios.create({
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${instance.token}`
        },
        timeout:5000,
        baseURL:"https://8a516swpa8.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin"
    })

    instance.createStandardReply = async (data) =>{
        console.log(data,"creater reply")
        return(await instance.fetcher.post(`/reply`,data)).statusText
    }

    instance.getAllStandardReply = async () =>{
        return (await instance.fetcher.get(`/replys`)).data
    }

    instance.getReplyById = async (id)=>{
        return (await instance.fetcher.get(`/reply/id/${id}`)).data
    }

    instance.addContentToFolder = async (folder_name , content_body)=>{
        return (await instance.fetcher.put(`/add-content` ,{folder_name , content_body})).statusText
    }

    instance.updateContent = async(id, body)=>{
        return (await instance.fetcher.put(`/edit-content` ,{id , body})).statusText
    }

    instance.deleteContent = async (folder_name ,content_id , content_body)=>{
        return (await instance.fetcher.put(`/del-content` ,{folder_name ,content_id , content_body})).statusText
    }
    instance.getContentByFolderName = async (folder_name)=>{
        return (await instance.fetcher.get(`/content/${folder_name}`)).data
    }
    return instance
}





