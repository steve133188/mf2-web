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
        const d =await instance.fetcher.get(`/roles`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getRoleByName = async  (role_name)=>{
        const d =await instance.fetcher.get(`/role/name/${role_name}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getRoleById = async  (id)=>{
        const d =await instance.fetcher.get(`/role/id/${id}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    instance.getRolesName = async ()=>{
        const d =await instance.fetcher.get(`/roles-name`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.createRole = async (data)=>{
        const d =await instance.fetcher.post(`/role` ,data).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.updateRole = async (data)=>{
        const d =await instance.fetcher.put(`/role`,data).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.deleteRole = async (role_id)=>{
        const d =await instance.fetcher.delete(`/role/id/${role_id}`).then(res=>res.status).catch(err=>console.log(err))
        return d
    }

    return instance
}
