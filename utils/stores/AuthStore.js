import { action, makeObservable, observable, runInAction } from 'mobx';
import {API, graphqlOperation} from "aws-amplify";
import axios from "axios";

class AuthStore {
    //
    token = null;

    user = {};

    notifications = [];

    unread=0


    constructor() {
        // makeAutoObservable(this);
        this.onLoad();
        makeObservable(this, {
            token: observable,
            user: observable,
            onLoad: action,
            logout: action,
            login:action
        });
    }

    login = async (data) =>{
        const url = "https://mbvrwr4a06.execute-api.ap-southeast-1.amazonaws.com/prod/api/users/login"
        const res = await axios.post(url , data,{
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Credentials' : true,

            }})
            .then(async response => {
                console.log(response,"respone")
                if(response.status != 200){
                    return "something went wrong"
                }
                const { token, user } = response.data;
                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(user))
                console.log("login data ",response.data.data)
                return response.status
            }).catch(err=>{
                console.log(err)
                return err
            })
        console.log(res)
        if(res ==200 ) {
            this.onLoad()
            // await router.push("/dashboard/chat")
            // router.reload()

            // window.location.reload(true)
            // router.push("/dashboard/chat")
            // setTimeout(()=>window.location.reload(true) , 100)
        }
    }


    onLoad = async () => {
        if(typeof window !== 'undefined'){
            const token = window.localStorage.getItem("token");
            const user = window.localStorage.getItem("user");
            runInAction(() => {
                this.token = token;
                this.user = JSON.parse(user);
            });
        }

    };


    logout = async () => {
        await window.localStorage.removeItem('user');
        await window.localStorage.removeItem('token');
        runInAction(() => {
            this.token = null;
            this.user = {};
        });
    };
}

const authStore = new AuthStore();

export { authStore };

export default AuthStore;
