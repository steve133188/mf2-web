import axios from "axios"

let adminFetcher;
if (typeof window !== 'undefined') {
    adminFetcher = axios.create({
        timeout:5000,
        withCredentials:true,
        baseURL:"https://mf-api-aoc-e7o4q.ondigitalocean.app/api/admin"
    })
}



export const getAllRoles = async ()=>{
    return (await adminFetcher.get(`/roles`)).data
}
export const getRoleByName = async  (role_name)=>{
    return (await adminFetcher.get(`/role/name/${role_name}`)).data
}

export const getRolesName = async ()=>{
    return (await adminFetcher.get(`/roles-name`)).data
}

export const createRole = async (data)=>{
    return (await adminFetcher.post(`/roles` ,data)).statusText
}

export const updateRole = async (data)=>{
    return (await adminFetcher.put(`/role`,data)).statusText
}

export const deleteRole = async (role_name)=>{
    return (await adminFetcher.delete(`/role/name/${role_name}`)).statusText
}
export const createStandardReply = async (data) =>{
    return(await adminFetcher.post(`/reply`,data)).statusText
}

export const getAllStandardReply = async () =>{
    return (await adminFetcher.get(`/replys`)).data
}

export const getReplyById = async (id)=>{
    return (await adminFetcher.get(`/reply/id/${id}`)).data
}

export const addContentToFolder = async (folder_name , content_body)=>{
    return (await adminFetcher.put(`/add-content` ,{folder_name , content_body})).statusText
}

export const updateContent = async(id, body)=>{
    return (await adminFetcher.put(`/edit-content` ,{id , body})).statusText
}

export const deleteContent = async (folder_name ,content_id , content_body)=>{
    return (await adminFetcher.put(`/del-content` ,{folder_name ,content_id , content_body})).statusText
}
export const getContentByFolderName = async (folder_name)=>{
    return (await adminFetcher.get(`/content/${folder_name}`)).data
}