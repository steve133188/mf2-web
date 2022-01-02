import axios from "axios"

export default function roleFetcher(token){
    const instance={}
    instance.token =token
    instance.fetcher= axios.create({
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${instance.token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials' : true,
        },
        timeout:5000,
        baseURL:"https://8a516swpa8.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin"
    })
    instance.getAllRoles = async ()=>{
        return (await instance.fetcher.get(`/roles`)).data
    }
    instance.getRoleByName = async  (role_name)=>{
        return (await instance.fetcher.get(`/role/name/${role_name}`)).data
    }
    instance.getRoleById = async  (id)=>{
        return (await instance.fetcher.get(`/role/id/${id}`)).data
    }

    instance.getRolesName = async ()=>{
        return (await instance.fetcher.get(`/roles-name`)).data
    }
    instance.createRole = async (data)=>{
        return (await instance.fetcher.post(`/role` ,data)).statusText
    }
    instance.updateRole = async (data)=>{
        console.log(data,"update role")
        return (await instance.fetcher.put(`/role`,data)).statusText
    }
    instance.deleteRole = async (role_name)=>{
        console.log(role_name,("name to delete server"))
        return (await instance.fetcher.delete(`/role/name/${role_name}`)).statusText
    }

    return instance
}
