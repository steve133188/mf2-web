import {makeObservable, observable, action, runInAction} from 'mobx'
import axios from "axios";


class ChatListStore {

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

    constructor() {
        makeObservable(this,{
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
            updateChatList:action,
            filterChatList:action.bound,
            updateFilter: action.bound,
            init:action,
            clear:action.bound,
            subscription:action,
            sort:action,
            searchByInput:action.bound,
            selectChat:action.bound,
            checkFilter:action.bound,
        })
    }

    toggleIsLoading(){

        let newVal = !this.isLoading

        runInAction(()=>{
            this.isLoading = newVal
        })
    }

    async init(uid){
        await this.getChatList(uid)
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

    sort(){
        if(this.filteredChatList.length>25){
            this.currShowStart = this.filteredChatList.length-26
            this.currShowEnd = this.filteredChatList.length-1
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

    async getChatList(data){
        console.log("post creds :" , data)
        await axios.get(`https://4vribegcfl.execute-api.ap-east-1.amazonaws.com/api/chatrooms/user/${data.user_id}`)
        // await axios.post(`https://4vribegcfl.execute-api.ap-east-1.amazonaws.com/api/chatrooms/user`, data,{headers: {
        //         'Content-Type': 'application/json',
        //
        //     }})
            .then(res=>{
                runInAction(()=>{
                    this.chatList = res.data
                    this.filteredChatList = res.data
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
            newData = newData.filter(d=>teams.includes(d.org_id))
        }
        if(newData.length&&users.length>0){
            newData = newData.filter(d=>users.includes(d.user_id))
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
        if(this.currShowStart-this.numOfShow <0){
            this.currShowEnd=this.currShowStart
            this.currShowStart = 0
        }else{
            this.currShowStart -=this.numOfShow
            this.currShowEnd -=this.numOfShow
        }
        let more = this.filteredChatList.slice(this.currShowStart,this.currShowEnd)
        runInAction(()=>{
            this.showMessage =  [...more , ...this.showMessage]
        })
    }

    checkFilter( field ,data , list = true){

        if(list)return this.filter[field].includes(data)

        return this.filter[field] === data

    }

}

const chatListStore = new ChatListStore();

export {chatListStore}

export default ChatListStore
