import {makeObservable, action, observable, runInAction, makeAutoObservable} from "mobx";
import axios from "axios";
import {API, graphqlOperation} from "aws-amplify";
import {subscribeChatroom} from "../../src/graphql/subscriptions";


class ChatroomStore{

    isLoading=false

    messages =[]

    newMessage=[]

    showMessage=[]

    numOfShow = 25

    currShowStart;

    currShowEnd ;

    error = null;

    lastMsgFromClient = null

    sub=null

    userCredential = null

    constructor(rootStore) {
        this.rootStore = rootStore

        makeObservable(this,{
            currShowStart:observable,
            currShowEnd:observable,
            messages:observable,
            showMessage:observable,
            sub:observable,
            error:observable,
            lastMsgFromClient:observable,
            newMessage:observable,
            getMessage:action.bound,
            updateMessage:action,
            subscription:action,
            updateShow:action,
            renderMore:action.bound,
            clear:action.bound,
            sort:action.bound,
            // getLastMsgFromClient:action.bound,
        })
    }

    init(){
        if(!this.userCredential){
            runInAction(()=>{
                this.userCredential =this.rootStore.authStore.user
            })
        }
    }

    sort(){
        if(this.messages.length>25){
            this.currShowStart = this.messages.length-26
            this.currShowEnd = this.messages.length-1
            let shows =this.messages.slice( this.currShowStart , this.currShowEnd)
            this.updateShow(shows)
        }else{
            this.updateShow(this.messages)
        }
    }

    // getLastMsgFromClient(){
    //     for(let i = this.messages.length ; !this.lastMsgFromClient ; i--){
    //         if(this.messages[i].from_me){
    //             runInAction(()=>{
    //                 this.lastMsgFromClient = this.messages[i].timestamp
    //             })
    //             return
    //         }
    //     }
    // }

    clear(){
        runInAction(()=>{
            this.showMessage=[]
            this.messages =[]
        })
    }

    async getMessage(){
        const {room_id} = this.rootStore.chatListStore.selectedChat
        await axios.get(`https://4vribegcfl.execute-api.ap-east-1.amazonaws.com/api/messages/chatroom/${room_id}`)
            .then(res=>{
                runInAction(()=>{
                    this.messages = res.data
                    this.sort()
                })
            })
            .catch(err=> {
                runInAction(()=>{
                    this.error = err
                })
            })
    }

    updateMessage(msg){
        runInAction(()=>{
            this.messages.push(msg)
            this.showMessage.push(msg)
        })
    }

    updateShow(show){
        runInAction(()=>{
            this.showMessage = show
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
        let more = this.messages.slice(this.currShowStart,this.currShowEnd)
        runInAction(()=>{
            this.showMessage =  [...more , ...this.showMessage]
        })
    }

    async subscription(){
        if(this.sub)this.sub.unsubscribe()
        this.sub =await API.graphql(graphqlOperation(    subscribeChatroom,{room_id:this.rootStore.chatListStore.selectedChat.room_id ,channel:this.rootStore.chatListStore.selectedChat.channel } ))
            .subscribe({
                next: async (chatmessage)=>{
                    // if(router.pathname == "/livechat") await updateSelectedChatroom(chat)
                    const newMessage = chatmessage.value.data.subscribeChatroom
                    runInAction(()=>{
                        this.messages.push(newMessage)
                        this.sort()
                        if(!newMessage.from_me)this.lastMsgFromClient = newMessage.timestamp
                    })
                    console.log("new message: " , newMessage)
                    // setNotis({type:"newMsg",channel:newMessage.channel??"whatsapp",content:newMessage.body,sender:newMessage.sender})
                },
                error: error => console.log(error)
            })

    }

}


export default ChatroomStore
