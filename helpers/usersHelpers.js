import axios from "axios"

const usersFetcher= axios.create({
        timeout:5000,
        withCredentials:true,
        baseURL:"https://mf-api-user-sj8ek.ondigitalocean.app/mf-2/api/users"
    })

export const getAllUser = async ()=>{
    return (await usersFetcher.get(`/`)).data
}

export const getUserByName = async (name)=>{
    return (await usersFetcher.get(`/name/${name}`)).data
}
export const getUserByEmail = async (email)=>{
    return (await usersFetcher.get(`/email/${email}`)).data
}

export const getUserByPhone = async (phone)=>{
    return (await usersFetcher.get(`/phone/${phone}`)).data
}

export const getUserNameList = async ()=>{
    return (await usersFetcher.get(`/userlist`)).data
}

export const getUserByNoTeam = async ()=>{
    return (await usersFetcher.get(`/team`)).data
}

export const getUsersByTeamId = async (team_id)=>{
    return (await usersFetcher.get(`/team/${team_id}`)).data
}

export const createUser = async (data)=>{
    return (await usersFetcher.post(`/` ,data)).statusText
}


export const createManyUser = async (data)=>{
    return (await usersFetcher.post(`/addMany` ,data)).statusText
}

export const updateUserTeamIdByUserPhone = async (user_phone , team_id) =>{
    return (await usersFetcher.put(`/change-user-team` ,{user_phone , team_id})).statusText
}

export const updateUserTeam = async (old_id , new_id) =>{
    return (await usersFetcher.put(`/change-user-team` ,{old_id , new_id})).statusText
}

export const deleteUserTeam = async (team_id)=>{
    return (await usersFetcher.put(`/delete-user-team/${team_id}` )).statusText
}
export const updateUser = async (data)=>{
    return (await usersFetcher.put(`/name` , data )).statusText
}
export const updateUserChannelInfo = async (data)=>{
    return (await usersFetcher.put(`/chanInfo` , data )).statusText
}

export const deleteUserByName = async(name) =>{
    return (await usersFetcher.delete(`/name${name}`  )).statusText
}

export const changeUserPassword = async (email , old_password, new_password) =>{
    return(await usersFetcher.put(`change-password` ,{email})).status
}