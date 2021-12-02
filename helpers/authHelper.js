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

export const logout = (func)=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    func()
}