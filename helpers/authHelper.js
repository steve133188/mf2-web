export const checkAuthHelper = ()=>{
    if(getUser == ""||getToken == "" || !getUser || !getToken){
        return false
    }else{
        return  true
    }
}

export const getUser = ()=>{
    return localStorage.getItem("user")
}

export const getToken = ()=>{
    return localStorage.getItem("token")
}