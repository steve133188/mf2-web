import {API, graphqlOperation} from "aws-amplify";
import {updateMF2TCOCHATROOM} from "../src/graphql/mutations";

export default function ChatHelper(){


    this.toggleIsPin = async (input)=>{
        const res = API.graphql(graphqlOperation(updateMF2TCOCHATROOM , {input:input}))
        console.log(res)
    }
}