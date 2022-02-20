import {action, makeAutoObservable, makeObservable, observable, runInAction} from 'mobx';
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";

class TagStore{

    tags =[]

    tagList = []

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this,{
            tags : observable,
            tagList:observable,
            getTags:action.bound,
            getTagList:action.bound,
            addTag:action.bound,
            updateTag:action.bound,
            deleteTag:action.bound
        })
    }

    instance= axios.create({
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials' : true,
        },
        timeout:10000,
        baseURL:"https://36lmnhe0e8.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin"
    })

    async getTags(){
        await this.instance.get("/tags").then(res=>{
            runInAction(()=>{
                this.error=null
                this.tags=res.data
            })
        }).catch(err=>{
            runInAction(()=>{
                this.error = err
                console.log(err)
            })
        })
    }

    async getTagList(){
        await this.instance.get(`/taglist`).then(res=>{
            runInAction(()=>{
                this.tagList = res.data
            })
        }).catch(err=>console.log(err))
    }

    async addTag(tag){
        await this.instance.post(`/tag`,tag).then((res)=>{
            runInAction(()=>{
                this.error = null
        })
        }).catch(err=>{
            console.log(err)
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async updateTag(data){
        await this.instance.put("/tag",data)
            .then(res=>{
                runInAction(async ()=>{
                    this.error =null
                    await this.getTags()
                })
            }).catch(err=>console.log(err))
    }

    async deleteTag(id){
        await  this.instance.delete(`/tag/${id}`)
            .then(res=>{
                runInAction(async ()=>{
                    this.error =null
                    await this.getTags()
                })
            }).catch(err=>console.log(err))
    }


}


export default TagStore
