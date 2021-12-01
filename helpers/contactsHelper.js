import axios from "axios"
import {getToken} from "./authHelper";
let contactsFetcher ;
if (typeof window !== 'undefined') {
    contactsFetcher = axios.create({
        timeout:5000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken}`
        },
        baseURL:"https://mf-api-customer-nccrp.ondigitalocean.app/api/customers"
    })
}

export const getAllContacts = async ()=>{
    return (await contactsFetcher.get("/")).data
}
export const createContact = async (data)=>{
    return (await contactsFetcher.post("/",data)).statusText
}

export const getContactsByUsers = async (data)=>{
    return (await contactsFetcher.post("/filter/agent",data)).data
}

export const getContactsByTags = async (data)=>{
    return (await contactsFetcher.post("/filter/tag",data)).data
}
export const getContactsByChannels = async (data)=>{
    return (await contactsFetcher.post("/filter/channel",data)).data
}

export const getContactByName = async (name)=>{
    return (await contactsFetcher.get(`/name/${name}`)).data
}

export const getContactById = async (id)=>{
    return (await contactsFetcher.get(`/id/${id}`)).data
}

export const getContactsByTeamId = async (team_id)=>{
    return (await contactsFetcher.get(`/team/${team_id}`)).data
}

export const getContactsByNoTeam = async ()=>{
    return (await contactsFetcher.get(`/team`)).data
}

export const updateContactTags = async(id,tags) =>{
    return (await contactsFetcher.post("/add-tags",{id,tags})).statusText
}

export const updateContact = async (data)=>{
    return (await contactsFetcher.put("/id",data)).statusText
}

export const updateContacts = async (data)=>{
    return (await contactsFetcher.put("/many",data)).statusText
}

export const deleteAllContactTag = async(data)=>{
    return (await contactsFetcher.put("/del-tag",data)).statusText
}

export const deleteContactTags = async(data)=>{
    return (await contactsFetcher.put("/del-customer-tag",data)).statusText
}

export const createContactsByExcel = async (data) =>{
    return (await contactsFetcher.post("/addMany",data)).statusText
}

export const addTeamToContact = async (data)=>{
    return (await contactsFetcher.put("/add-team-to-customer",data)).statusText
}

export const deleteContact = async (data)=>{
    return (await contactsFetcher.delete("/id", {data})).statusText
}
export const deleteContacts = async (data)=>{
    return (await contactsFetcher.delete("/many", {data})).statusText
}