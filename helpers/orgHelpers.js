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
        return (await instance.fetcher.get("/orgs")).data
    }
    instance.getAllRootORG = async ()=>{
        return (await instance.fetcher.get("/root")).data
    }

    instance.getOrgById = async (org_id)=>{
        return (await instance.fetcher.get(`/org/${org_id}`)).data
    }
    instance.getOrgTeams = async ()=>{
        return (await instance.fetcher.get(`/org/team`)).data
    }

    // instance.getOrgsByParentId = async (parent_id)=>{
    //     return (await instance.fetcher.get(`/parent/${parent_id}`)).data
    // }
    //
    // instance.getRootFamilyById = async (root_id)=>{
    //     return (await instance.fetcher.get(`/family/${root_id}`)).data
    // }

    instance.createOrg = async  (data)=>{
        return (await instance.fetcher.post(`/org` ,data)).status
    }

    instance.updateOrgName = async (org_id , name)=>{
        return (await instance.fetcher.put(`/org` ,{org_id , name})).status
    }

    instance.deleteOrgById = async (org_id)=>{
        return (await instance.fetcher.delete(`/org/${org_id}` )).status
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
