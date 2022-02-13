import {API, graphqlOperation} from "aws-amplify";
import {updateChatroom} from "../src/graphql/mutations";
import {listChatrooms} from "../src/graphql/queries";
import axios from "axios";

export default function ChatHelper(){

    this.filter = {}

    this.user_id;

    this.ownedPinChatFilter ={user_id:{eq:this.user_id} ,is_pin:{eq:true} }

    this.ownedChatFilter = {

        user_id:{eq:this.user_id}

    }

    this.getOwnedChatrooms = async (uid) =>{

        const chats = await axios.get(`https://4vribegcfl.execute-api.ap-east-1.amazonaws.com/api/chatrooms/user/${uid}`)
            .then(res=>res.data)
            .catch(err=> {
                console.log(err)
                return null
            })

        if(chats) return chats

    }

    this.getMessages = async (rid)=>{
        const chats = await axios.get(`https://4vribegcfl.execute-api.ap-east-1.amazonaws.com/api/messages/chatroom/${rid}`)
            .then(res=>res.data)
            .catch(err=> {
                console.log(err)
                return null
            })

        if(chats) return chats
    }

    this.setFilter = (data) =>{
        this.filter=data
    }

    this.toggleIsPin = async (input , callback)=>{
        const res =await API.graphql(graphqlOperation(updateChatroom , {input:input}))
        callback(res.data.updateChatroom)
    }
}
