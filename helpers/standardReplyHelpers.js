import axios from "axios"

export default function standardReplyFetcher(token){
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
        baseURL:"https://kj1j3zbmy4.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin"
    })
    instance.getStandardReplyAll = async ()=>{
        const d = await instance.fetcher.get(`/replies` ).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    instance.getStandardReplyById = async (id)=>{
        const d = await instance.fetcher.get(`/reply/id/${id}`  ).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    instance.addOneStandardReply = async (data)=>{
        const d = await instance.fetcher.post(`/reply` ,data).then(res=>{
            return res.status
        }).catch(err=>console.log(err))
        return d
    }//name,channels,body,variables

    instance.updateOneStandardReply = async (data)=>{
        const d = await instance.fetcher.put(`/reply` , data).then(res=>res.status).catch(err=>console.log(err))
            return d
}//id,channels,name,body,varibales

    instance.deleteReplyByID = async (id)=>{
        const d = await instance.fetcher.delete(`/reply/id/${id}` ).then(res=>res.status).catch(err=>console.log(err))
        return d
    }


    return instance
}
