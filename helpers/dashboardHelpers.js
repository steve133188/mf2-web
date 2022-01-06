import axios from "axios"

export default function dashboardFetcher(token){
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
        baseURL:"https://mkw892fwn0.execute-api.ap-southeast-1.amazonaws.com/prod/dashboard"
    })
    instance.getLiveChatDefaultData = async (start, end)=>{
        return (await instance.fetcher.get(`/livechat` , {params: {start , end} })).data
    }

    instance.getLiveChatTimeRangeData = async (start , end)=>{
        return (await instance.fetcher.get(`/livechat` ,{params: {start , end} })).data
    }

    instance.getLiveChatTimeChannelData = async (start , end, channel)=>{
        return (await instance.fetcher.get(`/livechat/channel` ,{params: {start , end, channel} })).data
    }

    instance.getAgentDefaultData = async (start , end)=>{
        return (await instance.fetcher.get(`/agent` , {params: {start , end}})).data
    }

    instance.getAgentRangeData = async (start , end)=>{
        return (await instance.fetcher.get(`/agent` ,{params: {start , end} })).data
    }

    instance.getAgentTimeChannelData = async (start , end, channel)=>{
        return (await instance.fetcher.get(`/agent/channel` ,{params: {start , end, channel} })).data
    }

    return instance
}
