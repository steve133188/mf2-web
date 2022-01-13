import axios from "axios"

export default function orgFetcher(token){
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
        baseURL:"https://3ori2m47yh.execute-api.ap-southeast-1.amazonaws.com/prod"
    })
    instance.getAllORG = async () =>{
        const d = await instance.fetcher.get("/orgs").then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getAllRootORG = async ()=>{
        const d = await instance.fetcher.get("/root").then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    instance.getOrgById = async (org_id)=>{
        const d = await instance.fetcher.get(`/org/${org_id}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getOrgTeams = async ()=>{
        const d = await instance.fetcher.get(`/org/team`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    // instance.getOrgsByParentId = async (parent_id)=>{
    //     return (await instance.fetcher.get(`/parent/${parent_id}`)).data
    // }
    //
    // instance.getRootFamilyById = async (root_id)=>{
    //     return (await instance.fetcher.get(`/family/${root_id}`)).data
    // }

    instance.createOrg = async  (data)=>{
        const d = await instance.fetcher.post(`/org` ,data).then(res=>res.status).catch(err=>console.log(err))
        return d
    }

    instance.updateOrgName = async (org_id , name)=>{
        const d = await instance.fetcher.put(`/org` ,{org_id , name}).then(res=>res.status).catch(err=>console.log(err))
        return d
    }

    instance.deleteOrgById = async (org_id)=>{
        const d = await instance.fetcher.delete(`/org/${org_id}` ).then(res=>res.status).catch(err=>console.log(err))
        return d
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
