import axios from "axios"

// const contactsFetcher = ()=>{
//         return axios.create( {
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization':`Bearer ${localStorage.getItem("token")}`
//             },
//             timeout:5000,
//             baseURL:"https://mf-api-customer-nccrp.ondigitalocean.app/api/customers"},
//         )
//     }
export default function contactsFetcher(token){
    const instance={}
    instance.token = token
    instance.fetcher= axios.create( {
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${instance.token}`
        },
        timeout:5000,
        baseURL:"https://mf-api-customer-nccrp.ondigitalocean.app/api/customers"},
    )
     instance.getAllContacts = async ()=>{
        return (await instance.fetcher.get("/")).data
    }
     instance.createContact = async (data)=>{
        return (await instance.fetcher.post("/",data)).statusText
    }

     instance.getContactsByUsers = async (data)=>{
        return (await instance.fetcher.post("/filter/agent",data)).data
    }

     instance.getContactsByTags = async (data)=>{
        return (await instance.fetcher.post("/filter/tag",data)).data
    }
     instance.getContactsByChannels = async (data)=>{
        return (await instance.fetcher.post("/filter/channel",data)).data
    }

     instance.getContactByName = async (name)=>{
        return (await instance.fetcher.get(`/name/${name}`)).data
    }

     instance.getContactById = async (id)=>{
        return (await instance.fetcher.get(`/id/${id}`)).data
    }

     instance.getContactsByTeamId = async (team_id)=>{
        return (await instance.fetcher.get(`/team/${team_id}`)).data
    }

     instance.getContactsByNoTeam = async ()=>{
        return (await instance.fetcher.get(`/team`)).data
    }

     instance.updateContactTags = async(id,tags) =>{
        return (await instance.fetcher.post("/add-tags",{id,tags})).status
    }

     instance.updateContact = async (data)=>{
        return (await instance.fetcher.put("/id",data)).status
    }

     instance.updateContacts = async (data)=>{
        return (await instance.fetcher.put("/many",data)).status
    }

     instance.deleteAllContactTag = async(data)=>{
        return (await instance.fetcher.put("/del-tag",data)).status
    }

     instance.deleteContactTags = async(data)=>{
        return (await instance.fetcher.put("/del-customer-tag",data)).status
    }

     instance.createContactsByExcel = async (data) =>{
        return (await instance.fetcher.post("/addMany",data)).status
    }

     instance.addTeamToContact = async (data)=>{
        return (await instance.fetcher.put("/add-team-to-customer",data)).status
    }

     instance.deleteContact = async (data)=>{
        return (await instance.fetcher.delete("/id", {data:data})).status
    }
     instance.deleteContacts = async (data)=>{
        return (await instance.fetcher.delete("/many", {data:data})).status
    }
    return instance
}


