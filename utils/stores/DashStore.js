import {action, makeAutoObservable, makeObservable, observable, runInAction} from 'mobx';
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";

class DashStore{

    dash = null

    instance =axios.create({
        headers:{
            'Access-Control-Allow-Origin' : '*',
            "Accept":"*/*",
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Credentials': true,
        },
        timeout:10000,
        baseURL:"https://mf2-tco-dashboard-python-bfymj.ondigitalocean.app"
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
                    "Accept":"*/*",
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Credentials': true,
                },
                timeout:10000,
                baseURL:"https://mf2-tco-dashboard-python-bfymj.ondigitalocean.app"
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
