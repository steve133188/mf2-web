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
export default function contactsFetcher(token) {
    const instance = {}
    instance.token = token
    instance.fetcher = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${instance.token}`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials': true,
            },
            timeout: 10000,
            baseURL: "https://46bgula199.execute-api.ap-southeast-1.amazonaws.com/prod"
        },
    )
    instance.getAllContacts = async () => {
        const d = await instance.fetcher.get("/customers").then(res => res.data).catch(err => console.log(err))
        return d
    }
    instance.createContact = async (data) => {
        const d = await instance.fetcher.post("/customer", data).then(res => res.data).catch(err => console.log(err))
        return d
    }

    instance.getContactsByUsers = async (data) => {
        const d = await instance.fetcher.get(`/customers/agent?agent=${data}`, data).then(res => res.data).catch(err => console.log(err))
        return d
    }

    instance.getContactsByTags = async (data) => {
        const d = await instance.fetcher.post("/customers/tag", data).then(res => res.data).catch(err => console.log(err))
        return d
    }
    instance.getContactsByChannels = async (data) => {
        const d = await instance.fetcher.post("/customers/channel", data).then(res => res.data).catch(err => console.log(err))
        return d
    }

    instance.getContactByName = async (name) => {
        const d = await instance.fetcher.get(`/name/${name}`).then(res => res.data).catch(err => console.log(err))
        return d
    }

    instance.getContactById = async (id) => {
        const d = await instance.fetcher.get(`/customer/${id}`).then(res => res.data).catch(err => console.log(err))
        return d
    }
    instance.getContactsByTeamId = async (team_id) => {
        const d = await instance.fetcher.get(`/customers/team/${team_id}`).then(res => res.data).catch(err => console.log(err))
        return d
    }

    instance.getContactsByNoTeam = async () => {
        const d = await instance.fetcher.get(`/team`).then(res => res.data).catch(err => console.log(err))
        return d
    }

    instance.updateContactTags = async (customer_id, tag_id) => {
        const d = await instance.fetcher.put("/customer/add-tag", {
            customer_id,
            tag_id
        }).then(res => res.status).catch(err => console.log(err))
        return d
    }
    instance.deleteCustomerTag = async (customer_id, tag_id) => {
        const d = await instance.fetcher.put("/customer/del-tag", {
            customer_id,
            tag_id
        }).then(res => res.status).catch(err => console.log(err))
        return d
    }
    instance.updateContactAgent = async (customer_id, agents_id) => {
        const d = await instance.fetcher.put("/customer/add-agent", {
            customer_id,
            agents_id
        }).then(res => res.status).catch(err => console.log(err))
        return d
    }
    instance.deleteCustomerAgent = async (customer_id, agents_id) => {
        const d = await instance.fetcher.put("/customer/del-agent", {
            customer_id,
            agents_id
        }).then(res => res.status).catch(err => console.log(err))
        return d
    }

    instance.updateContact = async (data) => {
        const d = await instance.fetcher.put("/customer", data).then(res => res.status).catch(err => console.log(err))
        return d
    }
        instance.updateContacts = async (data) => {
            const d = await instance.fetcher.put("/many", data).then(res => res.status).catch(err => console.log(err))
            return d
        }
        instance.updateTagsToAllCustomers = async (data) => {
            const d = await instance.fetcher.put("/customers/edit-tags").then(res => res.status).catch(err => console.log(err))
            return d
        }
        instance.deleteAllContactTag = async (data) => {
            const d = await instance.fetcher.put(`/customers/del-tags/${data}`, data).then(res => res.status).catch(err => console.log(err))
            return d
        }

        instance.deleteContactTags = async (data) => {
            const d = await instance.fetcher.put("/customer/del-customer-tag", data).then(res => res.status).catch(err => console.log(err))
            return d
        }

        instance.createContactsByExcel = async (data) => {
            const d = await instance.fetcher.post("/addMany", data).then(res => res.status).catch(err => console.log(err))
            return d
        }

        instance.addTeamToContact = async (data) => {
            const d = await instance.fetcher.put("/customers/add-teams", data).then(res => res.status).catch(err => console.log(err))
            return d
        }
        // instance.deleteOrUpdateTeamToContact = async (data)=>{
        //     return (await instance.fetcher.put("/customers/teams",data)).status
        // }
        instance.UpdateTeamToContact = async (data) => {
            const d = await instance.fetcher.put("/customer/team", data).then(res => res.status).catch(err => console.log(err))
            return d
        }

        instance.deleteContact = async (data) => {
            const d = await instance.fetcher.delete(`/customer/${data}`, {data: data}).then(res => res.status).catch(err => console.log(err))
            return d
        }
        instance.deleteContacts = async (data) => {
            const d = await instance.fetcher.delete("/customers", {data: data}).then(res => res.status).catch(err => console.log(err))
            return d
        }

        return instance

}
