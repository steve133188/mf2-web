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
        timeout:5000,
        baseURL:"https://36lmnhe0e8.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin"
    })
    instance.getAllTags = async ()=>{
        return (await instance.fetcher.get(`/tags`)).data
    }
    instance.getTagByName = async (data)=>{
        return (await instance.fetcher.get(`/tag/id/${data}`)).data
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
    instance.deleteTag = async (id)=>{
        return (await instance.fetcher.delete(`/tag/id/${id}`)).statusText
    }
    instance.deleteManyTag = async (id)=>{
        return (await instance.fetcher.delete(`/tags` , data)).statusText
    }
    return instance
}
