import {API, graphqlOperation} from "aws-amplify";
import {updateMF2TCOCHATROOM} from "../src/graphql/mutations";
import {listMF2TCOCHATROOMS} from "../src/graphql/queries";

export default function ChatHelper(){

    this.filter = {}

    this.user_id;

    this.ownedPinChatFilter ={user_id:{eq:this.user_id} ,is_pin:{eq:true} }

    this.ownedChatFilter = {
        user_id:{eq:this.user_id}
    }

    this.setFilter = (data) =>{
        this.filter=data
    }

    this.setUserId=(num)=>{
        this.user_id=parseInt(num)
    }

    this.getAllChatrooms = async ()=>{
        return await API.graphql(graphqlOperation(listMF2TCOCHATROOMS , {limit:1000}))
    }

    this.getFilteredChatrooms = async (filterType)=>{
        if (filterType == "OWNPIN")return  await API.graphql(graphqlOperation(listMF2TCOCHATROOMS , {limit:1000 , filter:this.ownedPinChatFilter}))
        if (filterType == "OWN")return  await API.graphql(graphqlOperation(listMF2TCOCHATROOMS , {limit:1000 , filter:this.ownedChatFilter}))
    }

    this.toggleIsPin = async (input , callback)=>{
        const res =await API.graphql(graphqlOperation(updateMF2TCOCHATROOM , {input:input}))
        callback(res.data.updateMF2TCOCHATROOM)
    }
}
