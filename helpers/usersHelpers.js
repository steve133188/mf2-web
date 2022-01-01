import axios from "axios"

export default function usersFetcher(token){
    const instance ={}
    instance.token = token
    instance.fetcher= axios.create({
        timeout:5000,
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
        if(res.status == 200) router.push("/dashboard/livechat")
    }
    instance.getAllUser = async ()=>{
        return (await instance.fetcher.get(`/users/all`)).data
    }
    instance.getUserByName = async (name)=>{
        return (await instance.fetcher.get(`/name/${name}`)).data
    }
    instance.getUserByEmail = async (email)=>{
        return (await instance.fetcher.get(`/email/${email}`)).data
    }

    instance.getUserByPhone = async (phone)=>{
        return (await instance.fetcher.get(`/phone/${phone}`)).data
    }

    instance.getUserNameList = async ()=>{
        return (await instance.fetcher.get(`/userlist`)).data
    }

    instance.getUserByNoTeam = async ()=>{
        return (await instance.fetcher.get(`/team`)).data
    }

    instance.getUsersByTeamId = async (team_id)=>{
        return (await instance.fetcher.get(`/team/${team_id}`)).data
    }

    instance.createUser = async (data)=>{
        return (await instance.fetcher.post(`/` ,data)).status
    }


    instance.createManyUser = async (data)=>{
        return (await instance.fetcher.post(`/addMany` ,data)).statusText
    }

    instance.updateUserTeamIdByUserPhone = async (user_phone , team_id) =>{
        return (await instance.fetcher.put(`/change-user-team` ,{user_phone , team_id})).statusText
    }

    instance.updateUserTeam = async (old_id , new_id) =>{
        return (await instance.fetcher.put(`/change-user-team` ,{old_id , new_id})).statusText
    }

    instance.deleteUserTeam = async (team_id)=>{
        return (await instance.fetcher.put(`/delete-user-team/${team_id}` )).statusText
    }
    instance.updateUser = async (phone,data)=>{
        console.log(phone,'hhhh',data,"dataaaa")
        return (await instance.fetcher.put(`/phone4/${phone}` , {...data,data} )).statusText
    }
    instance.updateUserChannelInfo = async (data)=>{
        return (await instance.fetcher.put(`/chanInfo` , data )).statusText
    }

    instance.deleteUserByName = async(name) =>{
        return (await instance.fetcher.delete(`/name/${name}`  )).statusText
    }

    instance.changeUserPassword = async (email , old_password, new_password) =>{
        return(await instance.fetcher.put(`/change-password` ,{email , old_password ,new_password})).status
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