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
            'Authorization':`Bearer ${instance.token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials' : true,
        },
        timeout:5000,
        baseURL:"https://46bgula199.execute-api.ap-southeast-1.amazonaws.com/prod"},
    )
     instance.getAllContacts = async ()=>{
        return (await instance.fetcher.get("/customers")).data
    }
     instance.createContact = async (data)=>{
        return (await instance.fetcher.post("/customer",data)).statusText
    }

     instance.getContactsByUsers = async (data)=>{
        return (await instance.fetcher.get(`/customers/agent?agent=${data}`,data)).data
    }

     instance.getContactsByTags = async (data)=>{
        return (await instance.fetcher.post("/customers/tag",data)).data
    }
     instance.getContactsByChannels = async (data)=>{
        return (await instance.fetcher.post("/customers/channel",data)).data
    }

     instance.getContactByName = async (name)=>{
        return (await instance.fetcher.get(`/name/${name}`)).data
    }

     instance.getContactById = async (id)=>{
        return (await instance.fetcher.get(`/customer/${id}`)).data
    }
     instance.getContactsByTeamId = async (team_id)=>{
        return (await instance.fetcher.get(`/customers/team/${team_id}`)).data
    }

    instance.getContactsByNoTeam = async ()=>{
        return (await instance.fetcher.get(`/team`)).data
    }

    instance.updateContactTags = async(customer_id,tag_id) =>{
        return (await instance.fetcher.put("/customer/add-tag",{customer_id,tag_id})).status
    }
    instance.deleteCustomerTag = async(customer_id,tag_id) =>{
        return (await instance.fetcher.put("/customer/del-tag",{customer_id,tag_id})).status
    }
    instance.updateContactAgent = async(customer_id,agents_id) =>{
        return (await instance.fetcher.put("/customer/add-agent",{customer_id,agents_id})).status
    }
    instance.deleteCustomerAgent = async(customer_id,agents_id) =>{
        return (await instance.fetcher.put("/customer/del-agent",{customer_id,agents_id})).status
    }

    instance.updateContact = async (data)=>{
         console.log(data,"update contacts")
        return (await instance.fetcher.put("/customer",data)).status
    }

     instance.updateContacts = async (data)=>{
        return (await instance.fetcher.put("/many",data)).status
    }
    instance.updateTagsToAllCustomers = async (data)=>{
        return (await instance.fetcher.put("/customers/edit-tags")).status
    }
     instance.deleteAllContactTag = async(data)=>{
        return (await instance.fetcher.put(`/customers/del-tags/${data}`,data)).status
    }

     instance.deleteContactTags = async(data)=>{
        return (await instance.fetcher.put("/customer/del-customer-tag",data)).status
    }

    instance.createContactsByExcel = async (data) =>{
        return (await instance.fetcher.post("/addMany",data)).status
    }

    instance.addTeamToContact = async (data)=>{
        return (await instance.fetcher.put("/customers/add-teams",data)).status
    }
    // instance.deleteOrUpdateTeamToContact = async (data)=>{
    //     return (await instance.fetcher.put("/customers/teams",data)).status
    // }
    instance.UpdateTeamToContact = async (data)=>{
        return (await instance.fetcher.put("/customer/team",data)).status
    }

     instance.deleteContact = async (data)=>{
         console.log(data,"Deleted")
        return (await instance.fetcher.delete(`/customer/${data}`, {data:data})).status
    }
     instance.deleteContacts = async (data)=>{
        return (await instance.fetcher.delete("/customers", {data:data})).status
    }
    return instance
}


