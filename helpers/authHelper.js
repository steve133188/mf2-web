export const checkAuthHelper = ()=>{
    if(getUser == ""||getToken == ""){
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