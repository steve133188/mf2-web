import {makeObservable , action , observable ,runInAction} from "mobx"
import axios from "axios";


class AdminActionsStore{

    instance;

    standardReplies;

    baseURL="https://8a516swpa8.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin";

    targetFolder;

    targetReplies;

    error

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this,{
            instance:observable,
            standardReplies:observable,
            baseURL:observable,
            targetFolder:observable,
            targetReplies:observable,
            error:observable,
            init:action.bound,
            createStandardReply:action.bound,
            getAllStandardReply:action.bound,
            getReplyById:action.bound,
            addContentToFolder:action.bound,
            updateContent:action.bound,
            deleteContent:action.bound,
            getContentByFolderName:action.bound,
        })

    }

    init(){
        this.instance = axios.create({
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${this.rootStore.authStore.token}`
            },
            timeout:10000,
            baseURL:this.baseURL
        })
    }

    async getAllStandardReply(){
        await this.instance.get(`/replys`).then(result => {
            runInAction(()=>{
                this.standardReplies = result.data
                this.error = null
            })
        }).catch(err => {
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async createStandardReply(data){
        await this.instance.post(`/reply`,data).then(res=>{

            runInAction(async ()=>{
                await this.getAllStandardReply()
                this.error = null
            })

        }).catch(err => {
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async getReplyById(id){
        await this.instance.get(`/reply/id/${id}`).then(res=>{
            runInAction( ()=>{
                this.targetFolder = res.data
                this.error = null
            })
        }).catch(err => {
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async getContentByFolderName(name){
        await this.instance.get(`/content/${name}`).then(res=>{
            runInAction(()=>{
                this.error = null
                this.targetReplies = res.data
            })
        }).catch(err=>{
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async addContentToFolder({folder_name , content_body}){
        await this.instance.put(`/add-content`,{folder_name , content_body}).then(res=>{

            runInAction(async ()=>{
                await this.getAllStandardReply()
                this.error = null
            })

        }).catch(err => {
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async updateContent({id,body}){
        await this.instance.put(`/edit-content`,{id,body}).then(res=>{

            runInAction(async ()=>{
                await this.getAllStandardReply()
                this.error = null
            })

        }).catch(err => {
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async deleteContent({folder_name ,content_id , content_body}){
        await this.instance.put(`/del-content` ,{folder_name ,content_id , content_body})
            .then(res=>{

                runInAction(async ()=>{
                    await this.getAllStandardReply()
                    this.error = null
                })

            })
            .catch(err => {
                runInAction(()=>{
                    this.error = err
                })
            })
    }
}

export default AdminActionsStore
