 import axios from "axios"

export default function dashboardFetcher(token){
    const instance={}
    instance.token =token
    instance.fetcher= axios.create({
        headers:{
            'Access-Control-Allow-Origin' : '*',
            "Accept":"*/*",
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials': true,
        },
        timeout:10000,
        baseURL:"https://mf2-tco-dashboard-python-bfymj.ondigitalocean.app"
    })
    instance.getLiveChatDefaultData = async ()=>{
        return await instance.fetcher.get(`/default` ).then(res=>res.data).catch(err=>{
            console.log(err)})
    }

    instance.getLiveChatTimeRangeData = async (start , end)=>{
        return await instance.fetcher.get(`/livechat` ,{params: {start , end} }).then(res=>res.data).catch(err=>{
            console.log(err)})
    }

    instance.getLiveChatTimeChannelData = async (start , end, channel)=>{
        return await instance.fetcher.get(`/livechat/channel` ,{params: {start , end, channel} }).then(res=>res.data).catch(err=>{
            console.log(err)})
    }

    instance.getAgentDefaultData = async (start , end)=>{
        return await instance.fetcher.get(`/agent` , {params: {start , end}}).then(res=>res.data).catch(err=>{
            console.log(err)})
    }

    instance.getAgentRangeData = async (start , end)=>{
        return await instance.fetcher.get(`/agent` ,{params: {start , end} }).then(res=>res.data).catch(err=>{
            console.log(err)})
    }

    instance.getAgentTimeChannelData = async (start , end, channel)=>{
        return await instance.fetcher.get(`/agent/channel` ,{params: {start , end, channel} }).then(res=>res.data).catch(err=>{
            console.log(err)})
    }

    return instance
}
