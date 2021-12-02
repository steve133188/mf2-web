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
        baseURL:"https://mf-api-aoc-e7o4q.ondigitalocean.app/api/admin"
    })
    instance.getAllRoles = async ()=>{
        return (await instance.fetcher.get(`/roles`)).data
    }
    instance.getRoleByName = async  (role_name)=>{
        return (await instance.fetcher.get(`/role/name/${role_name}`)).data
    }

    instance.getRolesName = async ()=>{
        return (await instance.fetcher.get(`/roles-name`)).data
    }

    instance.createRole = async (data)=>{
        return (await instance.fetcher.post(`/roles` ,data)).statusText
    }

    instance.updateRole = async (data)=>{
        return (await instance.fetcher.put(`/role`,data)).statusText
    }
    instance.deleteRole = async (role_name)=>{
        return (await instance.fetcher.delete(`/role/name/${role_name}`)).statusText
    }
    instance.getAllTags = async ()=>{
        return (await instance.fetcher.get(`/tags`)).data
    }
    instance.getTagByName = async (data)=>{
        return (await instance.fetcher.get(`/tag/${data}`)).data
    }
    instance.getTagList = async ()=>{
        return (await instance.fetcher.get(`/taglist`)).data
    }
    instance.addTag = async (data) =>{
        return(await instance.fetcher.post(`/tag`,data)).statusText
    }
    instance.updateTag = async (data)=>{
        return (await instance.fetcher.put(`/tag`,data)).statusText
    }
    instance.deleteTag = async (tag_name)=>{
        return (await instance.fetcher.delete(`/role/name/${tag_name}`)).statusText
    }
    instance.createStandardReply = async (data) =>{
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





