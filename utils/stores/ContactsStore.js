import {action, makeAutoObservable, makeObservable, observable, runInAction} from 'mobx';
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";

class ContactsStore {
    //
    contacts=[]

    instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials': true,
            },
            timeout: 10000,
            // baseURL: "https://46bgula199.execute-api.ap-southeast-1.amazonaws.com/prod"
            baseURL: "https://mf2-apis.messagebits.com/"
        },
    )

    userCredential

    targetContact = null

    token=null

    constructor(rootStore) {
        this.rootStore = rootStore
        this.userCredential = rootStore.authStore.user
        makeObservable(this, {
            contacts: observable,
            targetContact: observable,
            init:action.bound,
            getAll:action.bound,
            updateContactAgent:action.bound,
            deleteCustomerAgent:action.bound,
            getById:action.bound,
            deleteContact:action.bound
        });
    }

    init(){
        if(!this.userCredential&&this.rootStore.authStore.isAuth){
            runInAction(()=>{
                console.log("init contacts Store" , this.rootStore.authStore.user)
                this.userCredential = this.rootStore.authStore.user
                this.instance=axios.create({
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.rootStore.authStore.token}`,
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

    }

    async getAll () {
        const {user_id,role_id,team_id} = this.rootStore.authStore.user
        const d = await this.instance.post("/customers/user" ,{user_id,role_id,team_id} ).then(res => res.data).catch(err => console.log(err))
        runInAction(()=>{
            this.contacts =d
        })
    }
    async getById(id){
        await this.instance.get(`/customer/${id}`).then(res=>{
            runInAction(()=>{
                this.targetContact = res.data
            })
        }).catch(err => console.log(err))
    }

    getOwned = async ()=>{}

    getByUsers = async (data)=>{
        const d = await this.instance.get(`/customers/agent?agent=${data}`, data).then(res => res.data).catch(err => console.log(err))
        runInAction(()=>{
            this.contacts =d
        })
    }

    getByChannels = async (data)=>{
        const d = await this.instance.post("/customers/channel", data).then(res => res.data).catch(err => console.log(err))
        runInAction(()=>{
            this.contacts =d
        })
    }
    getByTags = async (data)=>{
        const d = await this.instance.post("/customers/tag", data).then(res => res.data).catch(err => console.log(err))
        runInAction(()=>{
            this.contacts =d
        })
    }

    getByName = async (name)=>{
        const d = await this.instance.get(`/name/${name}`).then(res => res.data).catch(err => console.log(err))

    }

    create = async (data)=>{
        await this.instance.post("/customer", data).then(res => res.data).catch(err => console.log(err))
    }

    async deleteContact(cid){
        await this.instance.delete(`/customer/${cid}`)
            .catch(err => console.log(err))
    }

    async updateContactAgent(customer_id, agents_id) {
        await this.instance.put("/customer/add-agent", {
            customer_id,
            agents_id
        }).then(res => res.status).catch(err => console.log(err))
    }
    async deleteCustomerAgent(customer_id, agents_id){
        await this.instance.put("/customer/del-agent", {
            customer_id,
            agents_id
        }).then(res => res.status).catch(err => console.log(err))
    }

}


export default ContactsStore;
