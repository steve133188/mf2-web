import {API, graphqlOperation} from "aws-amplify";
import { allChatSubscribe, multipleSubscribe} from "../src/graphql/subscriptions";


export default  function subscriptionHelper(){

    this.instance;

    // this.sub = async (label , callback)=>{
    //     const s =await API.graphql(graphqlOperation(label))
    //         .subscribe({
    //             next: async (newData)=>{
    //                callback(newData)
    //             }
    //         })
    //     return s
    // }

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
    this.allChatSub =async ()=>{
        if(this.instance) this.instance.unsubscribe()
        // console.log(`userID:${userId} type:${typeof userId}`) d
        const s =await API.graphql(graphqlOperation(allChatSubscribe ))
            .subscribe({
                next: async (newData)=>{
                    console.log("received new data" ,newData)
                }
            })
        this.instance = s
        return this.instance
    }

}
