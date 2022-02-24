import {makeObservable, observable, action, runInAction, makeAutoObservable} from 'mobx'
import axios from "axios";


class ChatListStore {

    userCredential = null

    init_filter = {
        channels:{
            All:true,
            WABA:true,
            Whatsapp:true,
            Messager:true,
            WeChat:true
        },
        users:[],
        teams:[],
        status:{
            unread:false,
            unAssigned:false,
            ChatBot:false
        },
        tags:[]
    }

    chatList =[]

    filteredChatList = []

    showChatList = []

    newChatList=[]

    numOfShow = 25

    currShowStart;

    search='';

    currShowEnd ;

    error=null

    isLoading

    selectedChat ={}

    filter=this.init_filter

    sub=null

    constructor(rootStore) {
        this.rootStore = rootStore
        makeObservable(this,{
            userCredential:observable,
            isLoading:observable,
            search:observable,
            sub:observable,
            chatList:observable,
            showChatList:observable,
            newChatList:observable,
            filteredChatList:observable,
            filter:observable,
            selectedChat:observable,
            error:observable,
            getChatList:action.bound,
            updateChatList:action.bound,
            filterChatList:action.bound,
            updateFilter: action.bound,
            init:action.bound,
            clear:action.bound,
            subscription:action.bound,
            sort:action.bound,
            searchByInput:action.bound,
            selectChat:action.bound,
            checkFilter:action.bound,
            renderMore:action.bound,
            sortLatest:action.bound,
        })
    }

    toggleIsLoading(){

        let newVal = !this.isLoading

        runInAction(()=>{
            this.isLoading = newVal
        })
    }

    async init(){
        if(this.rootStore.authStore.user){
            console.log("init chatList")

            // let cred = JSON.parse(localStorage.getItem("user"))
            runInAction(()=>{
                this.userCredential = this.rootStore.authStore.user
            })

            // await this.getChatList()

        }
    }

    selectChat(chat){
        runInAction(()=>{
            this.selectedChat = chat
        })
    }

    clear(){
        runInAction(()=>{
            this.filter= this.init_filter
            this.sort()
        })

    }

    sortLatest(){
        runInAction(()=>{
            this.chatList= this.chatList.sort((a,b)=>parseInt(b.last_msg_time)-parseInt(a.last_msg_time))
        })
    }

    sort(){

        if(this.filteredChatList.length>25){
            this.currShowStart = 0
            this.currShowEnd = this.currShowStart+this.numOfShow-1
            let shows =this.filteredChatList.slice( this.currShowStart , this.currShowEnd)
            runInAction(()=>{
                this.updateShow(shows)
            })
        }else{
            runInAction(()=>{
                this.updateShow(this.filteredChatList)
            })
        }
    }

    async getChatList(){
        console.log("post creds :" , this.userCredential)
        const {user_id , team_id , role_id} = this.userCredential
        // await axios.get(`https://4vribegcfl.execute-api.ap-east-1.amazonaws.com/api/chatrooms/user/${data.user_id}`)
        await axios.post(`https://4vribegcfl.execute-api.ap-east-1.amazonaws.com/api/chatrooms/user`, {user_id , team_id , role_id},{headers: {
                'Content-Type': 'application/json',

            }})
            .then(res=>{
                console.log("get chats : " , res.data.length)
                runInAction(()=>{
                    this.chatList = res.data
                    this.sortLatest()
                    this.filteredChatList = this.chatList
                    this.sort()
                })
            })
            .catch(err=> {
                runInAction(()=>{
                    this.error= err
                })
                console.log(err)
            })
    }

    async updateChatList(newChat){
        runInAction(()=>{
            this.chatList.unshift(newChat)
        })
    }

    async subscription(){

    }

    searchByInput(e){
        let word = e.target.value.toLowerCase()
        if(e.target.value.trim()==" ") {
            runInAction(()=>{
                this.filteredChatList = this.chatList
            })
            return
        }
        let result = this.chatList.filter(ch=>ch.customer_id.toString().toLowerCase().includes(word)||ch.name.toLowerCase().includes(e.target.value))

        runInAction(()=>{
            this.search = e.target.value
            this.filteredChatList = result
            this.sort()
        })
    }

    filterChatList(customers){

        this.toggleIsLoading()

        const {channels , status , tags , teams , users} = this.filter

        let newData = [...this.chatList]

        if(newData.length&&tags.length>0){
            let cus = customers.filter(con =>con.tags_id&&con.tags_id.find(id=> tags.includes(id.toString())))

            if(cus.length==0 ||!cus)  newData = []
            newData =  newData.filter(ch=>{return cus.find(d=>d.customer_id== ch.customer_id ).customer_id==ch.customer_id })
        }
        if(newData.length&&status.unAssigned) {
            newData = newData.filter(d=>!d.user_id||d.user_id==undefined||d.user_id==0)
        }
        if(newData.length&&status.unread){
            newData = newData.filter(d=>d.unread>0)
        }
        if(newData.length&&teams.length>0){
            newData = newData.filter(d=>teams.includes(d.org_id.toString()))
        }
        if(newData.length&&users.length>0){
            newData = newData.filter(d=>users.includes(d.user_id.toString()))
        }
        if(channels.All){
            runInAction(()=>{
                this.filteredChatList = newData
                this.sort()
                this.toggleIsLoading()
            })
            return
        }

        if(newData.length&&!channels.All){

            for(let val in channels){
                if(!channels[val]) continue

                newData = newData.filter(d=>d.channel ==val)

            }
        }

        runInAction(()=>{
            this.filteredChatList = newData
            this.sort()
        })
        this.toggleIsLoading()
    }

    updateFilter(name , value){

        let update = {
            ...this.filter,
            [name]:value
        }
        runInAction(()=>{
            this.filter = update
        })

        console.log("updateFilter :",value)
    }

    updateShow(show){
        runInAction(()=>{
            this.showChatList = show
        })
    }



    renderMore(){
        if(this.currShowStart+this.numOfShow-1 >this.chatList.length-1){
            this.currShowEnd=this.chatList.length-1
            this.currShowStart =this.currShowStart+this.numOfShow- this.chatList.length-1
        }else{
            this.currShowStart +=this.numOfShow
            this.currShowEnd +=this.numOfShow
        }
        let more = this.filteredChatList.slice(this.currShowStart,this.currShowEnd)
        runInAction(()=>{
            this.showChatList =  [ ...this.showChatList ,...more ]
        })
    }

    checkFilter( field ,data , list = true){

        if(list)return this.filter[field].includes(data)

        return this.filter[field] === data

    }

}


export default ChatListStore
