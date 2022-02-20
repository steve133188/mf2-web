import {makeObservable, action, observable, runInAction, makeAutoObservable} from "mobx"
import axios from "axios";


class ORGActionsStore {
    orgUrl ="https://3ori2m47yh.execute-api.ap-southeast-1.amazonaws.com/prod"

    roleUrl = "https://8a516swpa8.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin"


    roles=[];

    selectedRole=null


    teams=[]

    root_orgs=[]

    orgs=[]

    targetOrg=null

    selectedOrg = null;

    error=null


    constructor(rootStore){
        this.rootStore = rootStore

        makeObservable(this,{
            error:observable,
            targetOrg:observable,
            roles:observable,
            orgs:observable,
            teams:observable,
            root_orgs:observable,
            selectedRole:observable,
            selectedOrg:observable,
            getAllRoles:action.bound,
            getRoleByName:action.bound,
            getRoleById:action.bound,
            getRolesName:action.bound,
            createRole:action.bound,
            updateRole:action.bound,
            deleteRole:action.bound,
            getAllORG:action.bound,
            getAllRootORG:action.bound,
            getOrgById:action.bound,
            getOrgTeams:action.bound,
            createOrg:action.bound,
            updateOrgName:action.bound,
            deleteOrgById:action.bound,
        })
    }

    init(){
        // runInAction(()=>{
        //     this.roleInstance = axios.create({
        //         headers:{
        //             'Content-Type': 'application/json',
        //             // 'Authorization':`Bearer ${this.rootStore.authStore.token}`,
        //             'Access-Control-Allow-Origin' : '*',
        //             'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        //             'Access-Control-Allow-Credentials' : true,
        //         },
        //         timeout:5000,
        //         baseURL:"https://8a516swpa8.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin"
        //     })
        //     this.orgInstance = axios.create({
        //         headers:{
        //             'Content-Type': 'application/json',
        //             // 'Authorization':`Bearer ${this.rootStore.authStore.token}`,
        //             'Access-Control-Allow-Origin' : '*',
        //             'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        //             'Access-Control-Allow-Credentials' : true,
        //         },
        //         timeout:5000,
        //         baseURL:"https://3ori2m47yh.execute-api.ap-southeast-1.amazonaws.com/prod"
        //     })
        // })
    }

    async getAllRoles(){
        await axios.get(`${this.roleUrl}/roles`)
            .then(res=>{
                runInAction(()=>{
                    this.error=null
                    this.roles = res.data
                })}).catch(err=>console.log(err))

    }
    async getRoleByName (role_name){
        await axios.get(`${this.roleUrl}/role/name/${role_name}`)
            .then(res=>{
                runInAction(()=>{
                    this.error=null
                    this.selectedRole = res.data
                })}).catch(err=>console.log(err))

    }
    async getRoleById (id){
        await axios.get(`${this.roleUrl}/role/id/${id}`)
            .then(res=>{
                runInAction(()=>{
                    this.error=null
                    this.selectedRole = res.data
                })}).catch(err=> {
                console.log(err)
        })
    }

    async getRolesName(){
        await axios.get(`${this.roleUrl}/roles-name`)
            .then(res=>{
                runInAction(()=>{
                    this.error=null
                    this.roles = res.data
                })}).catch(err=>console.log(err))

    }

    async createRole(data){
        await axios.post(`${this.roleUrl}/role` ,data)
            .then(res=>{
                runInAction(async ()=>{
                    this.error=null
                    await this.getAllRoles()
                })}).catch(err=>console.log(err))
    }

    async updateRole(data){
        await axios.put(`${this.roleUrl}/role`,data)
            .then(res=>{
                runInAction(async ()=>{
                    this.error=null
                    await this.getAllRoles()
                })}).catch(err=>console.log(err))

    }

    async deleteRole(role_id){
        await axios.delete(`${this.roleUrl}/role/id/${role_id}`)
            .then(res=>{
                runInAction(()=>{
                    this.error=null
                })}).catch(err=>console.log(err))

    }

    async getAllORG () {
         await axios.get(`${this.orgUrl}/orgs`)
            .then(res=>{
                runInAction(()=>{
                    this.error=null
                    this.orgs=res.data
                })}).catch(err=>console.log(err))

    }
    async getAllRootORG (){
        await axios.get(`${this.orgUrl}/root`)
            .then(res=>{
                runInAction(()=>{
                    this.error=null
                    this.root_orgs = res.data
                })}).catch(err=>console.log(err))

    }

    async getOrgById (org_id){
        await axios.get(`${this.orgUrl}/org/${org_id}`)
            .then(res=>{
                runInAction(()=>{
                    this.error=null
                    this.selectedOrg=res.data
                })}).catch(err=>console.log(err))

    }
    async getOrgTeams (){
        await axios.get(`${this.orgUrl}/org/team`)
            .then(res=>{
                runInAction(()=>{
                    this.teams = res.data
                    this.error=null
                })}).catch(err=>console.log(err))

    }

    async createOrg  (data){
        await axios.post(`${this.orgUrl}/org` ,data).then(res=>{
            runInAction(async ()=>{
                this.error=null
                await this.getAllORG()
            })}).catch(err=>console.log(err))

    }

    async updateOrgName (org_id , name){
        await axios.put(`${this.orgUrl}/org` ,{org_id , name}).then(res=>{
             runInAction(async ()=>{
                 this.error=null
                 await this.getAllORG()
             })}).catch(err=>console.log(err))

    }

    async deleteOrgById (org_id){
        await axios.delete(`${this.orgUrl}/org/${org_id}` ).then(res=>{
            runInAction(async ()=>{
                 this.error=null
                 await this.getAllORG()
             })
         }
         ).catch(err=>console.log(err))

    }
}

export default  ORGActionsStore
