export const checkAuthHelper = ()=>{
    if(!localStorage.getItem("user")||!localStorage.getItem("token")){
        return false
    }
    return  true
}

export const getUser = ()=>{
    return localStorage.getItem("user")
}

export const getToken = ()=>{
    return localStorage.getItem("token")
}