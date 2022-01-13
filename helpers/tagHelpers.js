import axios from "axios"

export default function tagFetcher(token){
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
        timeout:10000,
        baseURL:"https://36lmnhe0e8.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin"
    })
    instance.getAllTags = async ()=>{
        const d =await instance.fetcher.get(`/tags`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getTagByName = async (data)=>{

        const d =await instance.fetcher.get(`/tag/id/${data}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getTagById = async (tag_id)=>{

        const d =await instance.fetcher.get(`/tag/id/${tag_id}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getTagList = async ()=>{

        const d =await instance.fetcher.get(`/taglist`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.addTag = async (data) =>{
        const d =await instance.fetcher.post(`/tag`,data).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.updateTag = async (data)=>{

        const d =await instance.fetcher.put(`/tag`,data).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.deleteTag = async (id)=>{

        const d =await instance.fetcher.delete(`/tag/id/${id}`).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.deleteManyTag = async (id)=>{

        const d =await instance.fetcher.delete(`/tags` , data).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    return instance
}
