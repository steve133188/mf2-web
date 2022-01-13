import axios from "axios"

export default function usersFetcher(token){
    const instance ={}
    instance.token = token
    instance.fetcher= axios.create({
        timeout:10000,
        headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${instance.token}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials' : true,
        },
        baseURL:"https://4ou47a9qd9.execute-api.ap-southeast-1.amazonaws.com/prod/api"
    })
    instance.login =  async (credentials)=>{
        const url = "https://mbvrwr4a06.execute-api.ap-southeast-1.amazonaws.com/prod/api/users/login"
        const res = await instance.fetcher.post(url , credentials)
            .then(response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                const { token, data } = response.data;
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(data))

                setErrors(null)
            }).catch(err=>{
                console.log(err)
                setErrors("Email or password incorrect")
            })
        setUser({
            user: localStorage.getItem("user"),
            token:localStorage.getItem("token")
        });
        console.log(user)
        if(res.status == 200) router.push("/dashboard/chat")
    }
    instance.createUser = async (credentials)=>{
        const url = "https://mbvrwr4a06.execute-api.ap-southeast-1.amazonaws.com/prod/api/users"
        const res = await instance.fetcher.post(url , credentials)
        .then(response => {
            if(response.status != 200){
                return "something went wrong"
            }
            // const { token, data } = response.data;
            // localStorage.setItem("token", token)
            // localStorage.setItem("user", JSON.stringify(data))
            if(response.status == 200)return 200
            if(response.status == 201)return 201

        }).catch(err=>{
            console.log(err)

        })


        if(res == 200)return 200
        if(res == 201)return 201
    }

    instance.getAllUser = async ()=>{

        const d =await instance.fetcher.get(`/users/all`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getUserByName = async (name)=>{

        const d =await instance.fetcher.get(`/api/users/name/${name}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getUserById = async (id)=>{

        const d =await instance.fetcher.get(`/users/${id}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getUserByEmail = async (email)=>{

        const d =await instance.fetcher.get(`/email/${email}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    instance.getUserByPhone = async (phone)=>{

        const d =await instance.fetcher.get(`/phone/${phone}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    instance.getUserNameList = async ()=>{

        const d =await instance.fetcher.get(`/userlist`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    instance.getUserByNoTeam = async ()=>{

        const d =await instance.fetcher.get(`/team`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }
    instance.getUserByRoleId = async ({role_id})=>{

        const d =await instance.fetcher.get(`/users/role/{role_id}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    instance.getUsersByTeamId = async (team_id)=>{

        const d =await instance.fetcher.get(`/users/team/${team_id}`).then(res=>res.data).catch(err=>console.log(err))
        return d
    }

    // instance.createUser = async (data)=>{
    //     return (await instance.fetcher.post(`/user` ,data)).status
    // }


    instance.createManyUser = async (data)=>{

        const d =await instance.fetcher.post(`/addMany` ,data).then(res=>res.status).catch(err=>console.log(err))
        return d
    }

    instance.updateUser = async (data)=>{

        const d =await instance.fetcher.put(`/users` , data ).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.updateUserTeamIdById = async (user_id , team_id) =>{

        const d =await instance.fetcher.put(`/user/team` ,{user_id , team_id}).then(res=>res.status).catch(err=>console.log(err))
        return d
    }

    instance.updateUserTeam = async (old_id , new_id) =>{

        const d =await instance.fetcher.put(`/users/team` ,{old_id , new_id}).then(res=>res.status).catch(err=>console.log(err))
        return d
    }

    instance.deleteUserTeam = async (team_id)=>{

        const d =await instance.fetcher.put(`/delete-user-team/${team_id}` ).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.updateUserPwd = async (data)=>{

        const d =await instance.fetcher.put(`/users/change-password` , data ).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.updateUserChannel = async (user_id , channels)=>{

        const d =await instance.fetcher.put(`/user/add-channels` , {user_id , channels} ).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.editUserChannel = async (user_id , channels)=>{

        const d =await instance.fetcher.put(`/user/edit-channels` , {user_id , channels} ).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.updateUserRole = async (user_id , role_id)=>{

        const d =await instance.fetcher.put(`/users/role` , {user_id , role_id} ).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.removeUserChannel = async (user_id , channels)=>{

        const d =await instance.fetcher.put(`/user/del-channels` , {user_id , channels} ).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    instance.deleteUserById = async(id) =>{

        const d =await instance.fetcher.delete(`/user/${id}`  ).then(res=>res.status).catch(err=>console.log(err))
        return d
    }

    instance.changeUserPassword = async (email , old_password, new_password) =>{
        const d =await instance.fetcher.put(`/change-password` ,{email , old_password ,new_password}).then(res=>res.status).catch(err=>console.log(err))
        return d
    }
    return instance
}

// const usersFetcher= axios.create({
//         timeout:5000,
//     headers:{
//         'Content-Type': 'application/json',
//         'Authorization':`Bearer ${localStorage.getItem("token")}`
//     },
//         baseURL:"https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users"
//     })
//
// export const getAllUser = async ()=>{
//     return (await usersFetcher.get(`/`)).data
// }
//
// export const getUserByName = async (name)=>{
//     return (await usersFetcher.get(`/name/${name}`)).data
// }
// export const getUserByEmail = async (email)=>{
//     return (await usersFetcher.get(`/email/${email}`)).data
// }
//
// export const getUserByPhone = async (phone)=>{
//     return (await usersFetcher.get(`/phone/${phone}`)).data
// }
//
// export const getUserNameList = async ()=>{
//     return (await usersFetcher.get(`/userlist`)).data
// }
//
// export const getUserByNoTeam = async ()=>{
//     return (await usersFetcher.get(`/team`)).data
// }
//
// export const getUsersByTeamId = async (team_id)=>{
//     return (await usersFetcher.get(`/team/${team_id}`)).data
// }
//
// export const createUser = async (data)=>{
//     return (await usersFetcher.post(`/` ,data)).statusText
// }
//
//
// export const createManyUser = async (data)=>{
//     return (await usersFetcher.post(`/addMany` ,data)).statusText
// }
//
// export const updateUserTeamIdByUserPhone = async (user_phone , team_id) =>{
//     return (await usersFetcher.put(`/change-user-team` ,{user_phone , team_id})).statusText
// }
//
// export const updateUserTeam = async (old_id , new_id) =>{
//     return (await usersFetcher.put(`/change-user-team` ,{old_id , new_id})).statusText
// }
//
// export const deleteUserTeam = async (team_id)=>{
//     return (await usersFetcher.put(`/delete-user-team/${team_id}` )).statusText
// }
// export const updateUser = async (data)=>{
//     return (await usersFetcher.put(`/name` , data )).statusText
// }
// export const updateUserChannelInfo = async (data)=>{
//     return (await usersFetcher.put(`/chanInfo` , data )).statusText
// }
//
// export const deleteUserByName = async(name) =>{
//     return (await usersFetcher.delete(`/name${name}`  )).statusText
// }
//
// export const changeUserPassword = async (email , old_password, new_password) =>{
//     return(await usersFetcher.put(`change-password` ,{email})).status
// }
