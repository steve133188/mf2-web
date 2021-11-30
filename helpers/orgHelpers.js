import axios from "axios"

const orgFetcher = axios.create({
    timeout:5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    },
    baseURL:"https://mf-api-aoc-e7o4q.ondigitalocean.app/api/organizations"
})

export const getAllRootORG = async ()=>{
    return (await orgFetcher.get("/")).data
}

export const getOrgById = async (id)=>{
    return (await orgFetcher.get(`/id/${id}`)).data
}

export const getOrgsByParentId = async (parent_id)=>{
    return (await orgFetcher.get(`/parent/${parent_id}`)).data
}

export const createOrg = async  (data)=>{
    return (await orgFetcher.post(`/` ,data)).statusText
}

export const updateOrgName = async (id , new_name)=>{
    return (await orgFetcher.put(`/` ,{id , new_name})).statusText
}

export const deleteOrgById = async (id)=>{
    return (await orgFetcher.delete(`/id/${id}` )).statusText
}