import { ApolloClient, InMemoryCache } from "@apollo/client";
import {WebSocketLink} from "@apollo/client/link/ws";

const link =process.browser ? new WebSocketLink({
    uri:'wss://fgjb7tuc6jejvgk3ra3c5us6ay.appsync-realtime-api.ap-east-1.amazonaws.com/graphql?header=da2-tspz4ofjrbcstaytcllg66rxeu',
    options: {
        reconnect: true,
    },
}):null ;

const client = new ApolloClient({
    link,
    uri: "https://fgjb7tuc6jejvgk3ra3c5us6ay.appsync-api.ap-east-1.amazonaws.com/graphql",
    cache: new InMemoryCache(),
});

export default client;
