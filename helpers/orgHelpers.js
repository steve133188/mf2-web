import axios from "axios"
import {getToken} from "./authHelper";

export default function orgFetcher(token){
    const instance={}
    instance.token =token
    instance.fetcher= axios.create({
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${instance.token}`
        },
        timeout:5000,
        baseURL:"https://mf-api-aoc-e7o4q.ondigitalocean.app/api/organization"
    })
    instance.getAllORG = async () =>{
        return (await instance.fetcher.get("/")).data
    }
    instance.getAllRootORG = async ()=>{
        return (await instance.fetcher.get("/root")).data
    }

    instance.getOrgById = async (id)=>{
        return (await instance.fetcher.get(`/id/${id}`)).data
    }
    instance.getOrgTeams = async ()=>{
        return (await instance.fetcher.get(`/team`)).data
    }

    instance.getOrgsByParentId = async (parent_id)=>{
        return (await instance.fetcher.get(`/parent/${parent_id}`)).data
    }

    instance.getRootFamilyById = async (root_id)=>{
        return (await instance.fetcher.get(`/family/${root_id}`)).data
    }

    instance.createOrg = async  (data)=>{
        return (await instance.fetcher.post(`/` ,data)).status
    }

    instance.updateOrgName = async (id , new_name)=>{
        return (await instance.fetcher.put(`/` ,{id , new_name})).status
    }

    instance.deleteOrgById = async (id)=>{
        return (await instance.fetcher.delete(`/id/${id}` )).status
    }
    return instance
}
// const orgFetcher = axios.create({
//     headers:{
//         'Content-Type': 'application/json',
//         'Authorization':`Bearer ${localStorage.getItem("token")}`
//     },
//         timeout:5000,
//         baseURL:"https://mf-api-aoc-e7o4q.ondigitalocean.app/api/organization"
//     })
//

//