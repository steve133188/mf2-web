import {makeObservable , action , observable , runInAction} from "mobx";
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

    constructor() {
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
        })
    }

    sort(){
        console.log("sort start")
        if(this.messages.length>25){
            this.currShowStart = this.messages.length-26
            this.currShowEnd = this.messages.length-1
            let shows =this.messages.slice( this.currShowStart , this.currShowEnd)
            console.log("print show message" , shows)
            this.updateShow(shows)
        }else{
            this.updateShow(this.messages)
        }
    }

    getLastMsgFromClient(){
        for(let i = this.messages.length ; !this.lastMsgFromClient ; i--){
            if(this.messages[i].from_me){
                runInAction(()=>{
                    this.lastMsgFromClient = this.messages[i].timestamp
                })
                return
            }
        }
    }

    clear(){
        runInAction(()=>{
            this.messages =[]
        })
    }

    async getMessage(rid){
        console.log("rid : " , rid)
        await axios.get(`https://4vribegcfl.execute-api.ap-east-1.amazonaws.com/api/messages/chatroom/${rid}`)
            .then(res=>{
                runInAction(()=>{
                    this.messages = res.data
                    this.sort()
                    console.log("getMessage :",this.messages.length)
                })
            })
            .catch(err=> {
                runInAction(()=>{
                    this.error = err
                    console.log("fetch Message Error :",err)
                })
            })
    }

    updateMessage(msg){
        runInAction(()=>{
            this.newMessage.push(msg)
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

    async subscription(chat){
        if(this.sub)this.sub.unsubscribe()
        this.sub =await API.graphql(graphqlOperation(    subscribeChatroom,{room_id:chat.room_id ,channel:chat.channel } ))
            .subscribe({
                next: async (chatmessage)=>{
                    if(router.pathname == "/livechat") await updateSelectedChatroom(chat)
                    const newMessage = chatmessage.value.data.subscribeChatroom
                    runInAction(()=>{
                        this.newMessage.push(newMessage)
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

const chatroomStore = new ChatroomStore

export {chatroomStore}

export default ChatroomStore
