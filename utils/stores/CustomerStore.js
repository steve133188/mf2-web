import { action, makeObservable, observable, runInAction } from 'mobx';
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";

class CustomerStore {
    //
    customers=[]

    instance = {}



    token=null

    constructor() {
        makeObservable(this, {
            customers: observable,
            getAll:action
        });
    }

    init = ()=>{
       const token = localStorage.getItem("token");
       runInAction(()=>{
           this.token = token
           this.instance=axios.create({
                   headers: {
                       'Content-Type': 'application/json',
                       'Authorization': `Bearer ${this.token}`,
                       'Access-Control-Allow-Origin': '*',
                       'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                       'Access-Control-Allow-Credentials': true,
                   },
                   timeout: 10000,
                   baseURL: "https://46bgula199.execute-api.ap-southeast-1.amazonaws.com/prod"
               },
           )
       })

    }

    getAll = async () =>{
        const d = await this.instance.get("/customers").then(res => res.data).catch(err => console.log(err))
        runInAction(()=>{
            this.customers =d
        })
    }
    getOwned = async ()=>{}

    getByUsers = async (data)=>{
        const d = await this.instance.get(`/customers/agent?agent=${data}`, data).then(res => res.data).catch(err => console.log(err))
        runInAction(()=>{
            this.customers =d
        })
    }

    getByChannels = async (data)=>{
        const d = await this.instance.post("/customers/channel", data).then(res => res.data).catch(err => console.log(err))
        runInAction(()=>{
            this.customers =d
        })
    }
    getByTags = async (data)=>{
        const d = await this.instance.post("/customers/tag", data).then(res => res.data).catch(err => console.log(err))
        runInAction(()=>{
            this.customers =d
        })
    }

    getByName = async (name)=>{
        const d = await this.instance.get(`/name/${name}`).then(res => res.data).catch(err => console.log(err))

    }

    create = async (data)=>{
        const d = await this.instance.post("/customer", data).then(res => res.data).catch(err => console.log(err))
    }

}

const customerStore = new CustomerStore();

export { customerStore };

export default CustomerStore;
