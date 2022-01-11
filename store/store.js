import {useRouter} from "next/router";


export default function ChatStore (){

    this.router = useRouter()

    this.store ={}

    this.selectChatById=async(id) =>{

    }

    this.setChat = (chat)=>{
        return this.store = chat
    }

    this.removeChat =()=>{
        return this.store ={}
    }

    this.getSelectedChat = ()=>{
        return this.store
    }

    this.pushToChat =(chat)=>{
        this.setChat(chat)
        this.router.push("/livechat")
    }
}
