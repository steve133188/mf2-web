import { action, makeObservable, observable, runInAction } from 'mobx';
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";

class AuthStore {
    //

    is_loading=true

    isAuth=false;

    token = null;

    user = null;

    userAuth = null

    unread=0

    channelInfo = null

    error = null

    constructor(rootStore) {

        this.rootStore = rootStore

        makeObservable(this, {
            token: observable,
            is_loading: observable,
            user: observable,
            userAuth:observable,
            channelInfo:observable,
            isAuth:observable,
            error:observable,
            onLoad: action.bound,
            logout: action.bound,
            login:action.bound,
            checkAuth:action.bound,
            getAuth:action.bound,
            getChannel:action.bound,
            init:action.bound
        });
    }

    async init(){
        const {contactsStore,chatListStore,chatroomStore,orgActionsStore,adminActionsStore,messageActionsStore , usersActionsStore}=this.rootStore
        await this.onLoad()
        await usersActionsStore.init()
        await contactsStore.init()
        await chatListStore.init()
        await chatroomStore.init()
        await orgActionsStore.init()
        await adminActionsStore.init()
        await messageActionsStore.init()
        this.is_loading = false
    }

    async login(data){
        console.log("received login creds : " , data)
        const url = "https://mbvrwr4a06.execute-api.ap-southeast-1.amazonaws.com/prod/api/users/login"
        await axios.post(url , data,{
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials' : true,
            }})
            .then(async response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                const { token, user } = response.data;
                console.log("response : ",token , user)
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                runInAction(()=>{
                    this.token = token
                    this.user = user
                    this.error = null
                })

            }).catch(err=>{
                console.log(err)
                runInAction(()=>{
                    this.error="Invalid email or password or something went wrong, please try again."
                })
            })
        if(!this.error){
            await this.getChannel()
            await this.getAuth()
            this.checkAuth()
        }

    }

    async onLoad() {
        if(!this.isAuth){
            const token = window.localStorage.getItem("token");
            const user = window.localStorage.getItem("user");
            const userAuth = window.localStorage.getItem("auth");
            runInAction(() => {
                this.token = token;
                this.user = JSON.parse(user);
                this.userAuth = JSON.parse(userAuth);
            });
            this.checkAuth()
            if(this.isAuth){
                await this.getChannel()
            }
        }
    };

    async getChannel(user_id=this.user.user_id){
        await axios.get(`https://4ou47a9qd9.execute-api.ap-southeast-1.amazonaws.com/prod/api/user/whatsapp/${user_id}`).then(res=>{
            if(res.data!== null || res.data!==undefined){

                runInAction(()=>{
                    this.error = null
                    this.channelInfo = res.data
                })

            }
        }).catch(err=>{
            runInAction(()=>{
                this.error = err
            })
        })
    }

    async getAuth(role_id=this.user.role_id){
        await axios.get(`https://8a516swpa8.execute-api.ap-southeast-1.amazonaws.com/prod/api/admin/role/id/${role_id}`).then(res=>{
            if(res.data!== null || res.data!==undefined){
                localStorage.setItem("auth",JSON.stringify(res.data))
                runInAction(()=>{
                    this.userAuth = res.data
                })
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    checkAuth(){

        // if(!this.token|| !this.user||!this.userAuth){
        if(window.localStorage.getItem("token")==null){
            console.log("unAuth")
            runInAction(()=>{
                this.isAuth = false
            })
        }else{
            console.log("isAuth")
            runInAction(()=>{
                this.isAuth = true
            })
        }

    }

    logout = async () => {
        await window.localStorage.removeItem('user');
        await window.localStorage.removeItem('token');
        runInAction(() => {
            this.token = null;
            this.user = null;
            this.userAuth=null
            this.isAuth=false
            this.channelInfo = null
        });
    };
}

// const authStore = new AuthStore();
//
// export { authStore };

export default AuthStore;
