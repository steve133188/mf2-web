import {makeObservable ,autorun, action , observable ,runInAction} from "mobx"
import axios from "axios";

class UsersActionsStore {

    baseURL="https://4ou47a9qd9.execute-api.ap-southeast-1.amazonaws.com/prod/api"

    error;

    users=[]

    targetUser=null

    constructor(rootStore){
        this.rootStore =rootStore
        makeObservable(this,{
            instance : observable,
            users:observable,
            targetUser:observable,
            error:observable,
            baseURL:observable,
            init:action.bound,
            createUser:action.bound,
            getAll:action.bound,
            getByName:action.bound,
            getById:action.bound,
            getByEmail:action.bound,
            getByPhone:action.bound,
            getByByNoTeam:action.bound,
            getByRoleId:action.bound,
            getByTeamId:action.bound,
            updateUser:action.bound,
            updateUserTeamIdById:action.bound,
            updateUserPwd:action.bound,
            changeUserPassword:action.bound,
            deleteUserById:action.bound,
        })
    }
    instance = axios.create({
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',

        },
    })
    init(){
        runInAction(()=>{
            this.instance =axios.create({
                headers:{
                    'Content-Type': 'application/json',
                    // 'Authorization':`Bearer ${this.rootStore.authStore.token}`,
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',

                },
                baseURL:"https://4ou47a9qd9.execute-api.ap-southeast-1.amazonaws.com/prod/api"
            })
        })

    }

    async createUser(credentials){
        const url = "https://mbvrwr4a06.execute-api.ap-southeast-1.amazonaws.com/prod/api/users"
        await axios.post(url , credentials)
            .then(response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                if(response.status == 200)return 200
                if(response.status == 201)return 201

            }).catch(err=>{
                console.log(err)
                runInAction(()=>{
                    this.error = err
                })
            })
    }

    async getAll(){
        await axios.get(`${this.baseURL}/users/all`).then(res=>{
            runInAction(()=>{
                this.users = res.data
            })
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }
    async getByName(name){
        await axios.get(`${this.baseURL}/api/users/name/${name}`).then(res=>{
            runInAction(()=>{
                this.targetUser = res.data
            })
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }
    async getById(id){
        await axios.get(`${this.baseURL}/users/${id}`).then(res=>{
            runInAction(()=>{
                this.targetUser = res.data
            })
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }
    async getByEmail(email){
        await this.instance.get(`${this.baseURL}/email/${email}`).then(res=>{
            runInAction(()=>{
                this.targetUser = res.data
            })
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async getByPhone(phone){
        await axios.get(`${this.baseURL}/phone/${phone}`).then(res=>{
            runInAction(()=>{
                this.targetUser = res.data
            })
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async getByByNoTeam(){
        await axios.get(`${this.baseURL}/team`).then(res=>{
            runInAction(()=>{
                this.users = res.data
            })
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async getByRoleId(role_id){
        await axios.get(`${this.baseURL}/users/role/${role_id}`).then(res=>{
            runInAction(()=>{
                this.users = res.data
            })
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }
    async getByTeamId(team_id){
        await axios.get(`${this.baseURL}/users/team/${team_id}`).then(res=>{
            runInAction(()=>{
                this.users = res.data
            })
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async updateUser(data){
        await axios.put(`${this.baseURL}/users/` , data).then(async(res)=>{
            if(res.status ==200){
                await this.getAll()
            }
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }
    async updateUserTeamIdById(user_id ,team_id){
        await axios.put(`${this.baseURL}/user/team` ,{user_id , team_id}).then(async(res)=>{
            if(res.status ==200){
                await this.getAll()
                await this.getById(user_id)
            }
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }
    async updateUserPwd(data) {
        await axios.put(`${this.baseURL}/users/change-password`, data).then((res) => {
            if (res.status == 200) return
        }).catch(err => {
            runInAction(() => {
                this.error = err
            })
        })
    }
    async changeUserPassword({user_id, old_password, new_password}){
        await axios.put(`${this.baseURL}/users/change-password` , {user_id, old_password, new_password}).then((res)=>{
            if(res.status ==200) return
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async deleteUserById(user_id){
        await axios.delete(`${this.baseURL}/user/${user_id}` ).then(async(res)=>{
            if(res.status ==200){
                await this.getAll()
            }
        }).catch(err=> {
            runInAction(()=>{
                this.error = err
            })
        })
    }
}


export default UsersActionsStore
