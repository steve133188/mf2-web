import {API, graphqlOperation} from "aws-amplify";
import {updateMF2TCOCHATROOM} from "../src/graphql/mutations";

export default function ChatHelper(){


    this.toggleIsPin = async (input , callback)=>{
        const res =await API.graphql(graphqlOperation(updateMF2TCOCHATROOM , {input:input}))
        callback(res.data.updateMF2TCOCHATROOM)
    }
}
