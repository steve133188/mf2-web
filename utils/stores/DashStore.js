import {action, makeAutoObservable, makeObservable, observable, runInAction} from 'mobx';
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";

class DashStore{

    dash = null

    instance =axios.create({
        headers:{
            'Access-Control-Allow-Origin' : '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        },
        timeout:10000,
        baseURL: "https://4vribegcfl.execute-api.ap-east-1.amazonaws.com/dbd-api/"
    })

    error=null

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeObservable(this, {
            dash:observable,
            getLiveChatDefaultData:action.bound,
            getLiveChatTimeRangeData:action.bound,
            getAgentRangeData:action.bound,
        })
    }

    init(){
        runInAction(()=>{
            this.instance= axios.create({
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                },
                timeout:10000,
                baseURL: "https://4vribegcfl.execute-api.ap-east-1.amazonaws.com/dbd-api/"
            })
        })
    }

    async getLiveChatDefaultData (){
        await this.instance.get("/default").then(res=>{
            runInAction(()=>{
                this.error = null
                this.dash = res.data
            })
        }).catch(err=>{
            console.log(err)
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async getLiveChatTimeRangeData(start , end){
        await this.instance.get(`/dashboard/livechat` ,{params: {start , end} }).then(res=> {
            runInAction(()=>{
                this.dash = res.data
            })
        }).catch(err=>{
            console.log(err)
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async getAgentRangeData(start ,end){
        await this.instance.get(`/dashboard/agent` ,{params: {start , end} }).then(res=> {
            runInAction(()=>{
                this.error = null
                this.dash = res.data
            })
        }).catch(err=>{
            console.log(err)})
    }
}


export default DashStore
