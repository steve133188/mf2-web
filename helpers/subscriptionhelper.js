import {API, graphqlOperation} from "aws-amplify";
import { allChatSubscribe, multipleSubscribe} from "../src/graphql/subscriptions";


export default  function subscriptionHelper(){

    this.instance;

    this.store = []

    this.multipleChatSub =async (userId)=>{
        // console.log(`userID:${userId} type:${typeof userId}`)
        const s =await API.graphql(graphqlOperation(multipleSubscribe , {user_id: userId}))
            .subscribe({
                next: async (newData)=>{
                    console.log("received new data" ,newData)
                }
            })

        return s
    }

    this.pushNotificationsToList= (state , setState)=>{
        setState(state=>[...this.store])
    }

    this.push=(list)=>{
        if(this.store!==-1){
            list.push(this.store[-1])
        }
    }
    this.allChatSub =async function (){
        if(this.instance) this.instance.unsubscribe()
        const s =await API.graphql(graphqlOperation(allChatSubscribe )).subscribe({
            next: newData=>{
                console.log("received new data" ,newData)
                this.store.push( newData.value.data.AllChatSubscribe)
                // console.log(this.store)
            }
        })

        this.instance = s
        return this.instance
    }

}
