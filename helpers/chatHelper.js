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

        const chats = await axios.get(`http://ec2-18-162-45-91.ap-east-1.compute.amazonaws.com:30310/api/chatrooms/user/${uid}`)
            .then(res=>res.data)
            .catch(err=> {
                console.log(err)
                return null
            })

        if(chats) return chats

    }

    this.getMessages = async (rid)=>{
        const chats = await axios.get(`http://ec2-18-167-59-56.ap-east-1.compute.amazonaws.com:30311/api/messages/chatroom/${rid}`)
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
